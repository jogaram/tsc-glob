# tsc-glob

The purpose of this command is to add support for file globbing to Typescript compiler `tsc`.

Globs can be provided by:
* Reading `filesGlob` property of tsconfig.json
* Providing it through command line arguments

**All options not supported by this package will be passed to tsc compiler command**

## Installation
Install the package

```bash
npm install --save-dev tsc-glob
```

## Usage

```bash
tsc-glob [options]
```

**Options**

| alias | command                  | description                                          |
| ----- | ------------------------ | ---------------------------------------------------- |
| -h    | --help                   | output usage information                             |
| -V    | --version                | output the version number                            |
| -f    | --tsconfig-file <path>   | tsconfig.json file location. Default ./tsconfig.json |
| -g    | --files-glob <globs>     | File globs                                           |

## Examples

Using alternative tsconfig.json file
```bash
tsc-glob --tsconfig-file config/tsconfig.json --outDir dist --declaration
```

Using command globs (ignores tsconfig.json filesGlob)
```bash
tsc-glob --files-globs src/**/ts/*.ts --outDir dist --declaration
```