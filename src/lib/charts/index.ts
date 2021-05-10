import { destroy, draw, init } from './highcharts';
import { ChartEngine } from '../../types/lib/charts';
import type { DrawOptions } from '../../types/lib/charts';

export class Charts {
    private readonly chartEngine: ChartEngine;
    constructor(chartEngine: ChartEngine) {
        this.chartEngine = chartEngine;
    }

    public static async init(): Promise<void> {
        await init();
    }

    public static async destroy(): Promise<void> {
        await destroy();
    }

    public async draw(options: DrawOptions): Promise<Buffer> {
        switch (this.chartEngine) {
            case ChartEngine.highcharts:
                return await draw(options);
            case ChartEngine.googleCharts:
                throw new Error('Not implemented');
        }
    }
}
