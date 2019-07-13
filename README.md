# Files trace

[![Greenkeeper badge](https://badges.greenkeeper.io/hisco/files-trace.svg)](https://greenkeeper.io/)
[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]

  Find your code dependencies, supports typescript, javascript and coffe script
# Dependencies trace
A simple and naive approach to trace your code dependecies.
It's very fast and uses only a single regex execution per file.

## Motivation
Enable taking fast decisions based on files dependecy trees.

While the *correct* way to trace dependecies is by using some sort of AST analyzer this will require more computions then using a single regex execution per file.

`files-trace` was built for performance *over accuracy* and it's doing best effort to find all dependencies of your file.
If you find scenarios that `files-trace` couldn't find your dependencies - open an issue in the github repo and I will do my best effort to fix it.

## Use cases
The following use cases may be addressed with `files-trace`:
- Enfore project specific policies, such as files from folder X cannot require files from folder Y
- Check if file was changed including it's dependencies.
- Any other use cases when you need to scan the files dependency tree fast and where accuracy is second citizen.

## WIP - Work in progress
It's still at the very first stages, help is welcomed.

## License

  [MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/files-trace.svg
[npm-url]: https://npmjs.org/package/files-trace
[travis-image]: https://img.shields.io/travis/hisco/files-trace/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/hisco/files-trace
[coveralls-image]: https://coveralls.io/repos/github/hisco/files-trace/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/hisco/files-trace?branch=master
