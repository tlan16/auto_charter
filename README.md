# Requirements

The task is to:

·  Write a program in NodeJS/PHP/Java (or another language of your choice)

·  The program should accept a URL and give back an image file.

·  The input is a wikipedia URL

   e.g. `https://en.wikipedia.org/wiki/Women%27s_high_jump_world_record_progression`

·  The program then attempts to scan the page for a table

·  In the table it tries to find a numeric column

·  It then plots the numbers on an image as a chart that it writes to file

That's it. Please don't spend more than a few hours on it. Keep it simple and document any assumptions or changes to the spec you make. I'm interested in your holistic approach to the problem, not just the code.

A sample table from Wikipedia:

![](example.png)

# View api specification
```shell
cd spec
pnpm install
pnpm run start
```
It should prompt an url to view the spec.

# Local development

The app is tested on node version `v14.16.1`, other in-support versions should work, but not yet tested on.

I suggest you use tools like `nvm` to switch between node versions.

## Install dependencies

[pnpm](https://github.com/pnpm/pnpm) is the prefered package manager.
To install dependencies:
```shell
➜  smoke git:(main) ✗ pnpm install
Lockfile is up-to-date, resolution step is skipped
Already up-to-date

> smoke@ preinstall /Volumes/Projects/smoke
> export ACCEPT_HIGHCHARTS_LICENSE=1
```

## To run
```shell
➜  smoke git:(main) ✗ pnpm run dev

> smoke@ dev /Volumes/Projects/smoke
> ts-node src/index.ts

[INFO ]  Server listening at http://127.0.0.1:3000

```

Or you can choose to run in watch mode:
```shell
➜  smoke git:(main) ✗ pnpm run dev:watch

> smoke@ dev:watch /Volumes/Projects/smoke
> nodemon src/index.ts

[nodemon] 2.0.7
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: ts,json
[nodemon] starting `ts-node src/index.ts`
[INFO ]  Server listening at http://127.0.0.1:3000
```

## To run test
```shell
➜  smoke git:(main) ✗ pnpm run test

> smoke@ test /Volumes/Projects/smoke
> jest --runInBand
 PASS  tests/e2e/routes/draw.spec.ts (12.618 s)
 PASS  tests/e2e/routes/guide.spec.ts

Test Suites: 2 passed, 2 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        13.671 s, estimated 17 s
Ran all test suites.
```

# Note on performance

This app is build in a way that the data visualisation engine can be easily swapped to others. Currently it's using server-side rendered `highcharts`. Given it's a complex and heavy library, it is slow. Other options, such as server-side rendered google charts can be much lighter and hence shorter response time.

More on [src/lib/README.md](src/lib/README.md)

# Notes on data extractor

This app is build in a way so that data extractor can be easily defined and switch for different sits.

The data extractor is a stack of functions all implements a certain interface. For example the default extractor stack is:

1. First try to match the first floating point. E.g. `foo 12.34 bar` => 12.34
2. If the previous extractor didn't extract any data, this extractor does a "softer" extraction on any integer. E.g. `foo123bar` -> 123

There is no limitation on the number of extractor stack, but it may impact performance.
