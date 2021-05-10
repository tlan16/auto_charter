import fetch from 'node-fetch';
import { promisify } from 'util'
import { WritableStream } from 'htmlparser2/lib/WritableStream';
import { LogService as Logger } from './LogService';
import type { DrawOptions } from '../types/lib/charts';

export const readUrl = promisify(async function (url: string, callback: (err: Error | undefined, r: DrawOptions) => void): Promise<void> {
    try {
        const result: DrawOptions = { title: '', data: [] };
        const s = getTableExtractorStream(result);
        const res = await fetch(url);
        res.body.pipe(s);
        s.once('close', () => {
            callback(undefined, result);
        })
    } catch (e) {
        throw new Error(e);
    }
})

function getTableExtractorStream(
    resultContainer: DrawOptions,
    extractors: ReadonlyArray<Extractor> = getDefaultExtractors()
): WritableStream {
    let inTable: boolean = false;
    let inTr: boolean = false;
    let inTd: boolean = false;
    let currentTag: string = '';
    let finished: boolean = false;
    let tableData: number[] = [];
    let cellText: string = '';
    let title: string = '';
    let rowData: number | undefined = undefined;
    return new WritableStream({
        ontext(text) {
            if (finished) return;
            if (inTable && inTr && inTd) {
                cellText += text;
            }
            if (currentTag.toLowerCase() === 'title' && !title.length) {
                title = text.trim();
                Logger.debug({ title });
            }
        },
        onopentag(tag) {
            if (finished) return;
            currentTag = tag;
            switch (tag) {
                case 'table':
                    inTable = true;
                    break
                case 'tr':
                    inTr = true;
                    break
                case 'td':
                    inTd = true;
            }
        },
        onclosetag(tag) {
            if (finished) return;
            switch (tag) {
                case 'table':
                    if (!tableData.length) break;
                    inTable = false;
                    resultContainer.data = tableData;
                    resultContainer.title = title;
                    finished = true;
                    break
                case 'tr':
                    inTr = false;
                    rowData = undefined;
                    break
                case 'td':
                    inTd = false;
                    for (const extractor of extractors) {
                        const extracted = extractor(cellText);
                        if (!rowData && extracted !== undefined) {
                            rowData = extracted;
                            tableData.push(extracted);
                            Logger.debug({ rowData });
                            break;
                        }
                    }
                    cellText = ''
            }
        },
    });
}

type Extractor = (text: string) => number | undefined;

/**
 * Note: to scale up, the extractor can be customised
 * and can be complex, as long as it implements the
 * type Extractor.
 */
function getDefaultExtractors(): ReadonlyArray<Extractor> {
    return [
        floutingNumberExtractor,
        integerNumberExtractor,
    ]
}

const floutingNumberExtractor: Extractor = (text: string) => {
    const regex = /\d+\.\d+/;
    const result = regex.exec(text)?.[0];
    return result ? Number(result) : undefined;
}

const integerNumberExtractor: Extractor = (text: string) => {
    const regex = /\d+/;
    const result = regex.exec(text)?.[0];
    return result ? Number(result) : undefined;
}
