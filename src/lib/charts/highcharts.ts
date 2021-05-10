import { promisify } from 'util'
import type HighchartsExporter  from '../../types/lib/charts/highcharts-export-server';
import type { HighchartsOptions }  from '../../types/lib/charts/highcharts-export-server';
import { DrawOptions } from '../../types/lib/charts';

const exporter: HighchartsExporter = require('highcharts-export-server')

export async function init(): Promise<void> {
    await exporter.initPool()
}

export function destroy(): void {
    exporter.killPool();
}

export async function draw(options: DrawOptions): Promise<Buffer> {
    const drawer = promisify(exporter.export);
    const highchartsOptions: HighchartsOptions = {
        title: { text: options.title },
        series: [{
            type: 'line',
            data: options.data
        }]
    }
    const result = await drawer({
        type: 'png',
        options: highchartsOptions,
    });
    return Buffer.from(result.data, 'base64');
}
