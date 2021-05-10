interface HighchartsOptions {
    title: {
        text: string;
    };
    xAxis?: {
        categories: ReadonlyArray<string>
    },
    series: ReadonlyArray<{
        type: string;
        data: ReadonlyArray<number>
    }>
}

type HighchartsExporterCallbackFunction = (
    error: boolean,
    result: { data: string },
) => void;

export interface HighchartsExporterOptions {
    type: 'png';
    options: Readonly<HighchartsOptions>;
}

export default interface HighchartsExporter {
    initPool(): void;

    killPool(): void;

    export(options: HighchartsExporterOptions,
           callback: HighchartsExporterCallbackFunction);
}
