# Overview

The purpose of the directory is to abstract complex third party libraries.

For example, by abstracting the package `highcharts-export-server`, with our own interface defined in `src/lib/charts/index.ts`, we can easily switch between different data visualisation engine.

# Performance issue of package `highcharts-export-server`

This package renders the highcharts at server side. From an objective point of view, highcharts is an excellent library as it provides many types of chart and is highly customisable. But it has one drawback that it's heavy and slow.

Considering at the stage we only return a static image, which demolish some strength of highcharts. We should consider using a lighter library such as a npm package `google-charts-node` and make it as the default engine, where user can still choose to use highcharts.
