export enum ChartEngine {
    highcharts= 'HIGHCHARTS',
    googleCharts= 'GOOGLE_CHARTS',
}

export interface DrawOptions {
    title: string;
    data: ReadonlyArray<number>;
}
