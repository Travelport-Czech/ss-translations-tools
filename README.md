# ss-translations-tools
Export and import tools for [ss-translations](https://github.com/Travelport-Czech/ss-translations)

## Install

```
> npm install @travelport-czech/ss-translations-tools
```

## Export and Import to/from Excel
example in `/tests/translateExport.test.ts` and `/tests/translateImport.test.ts` 

## Prepare development environment

Clone project
```bash
> git clone ...
```
Install dependencies
```bash
> npm install
```
Run tests
```bash
> npm run test
```

## Version release workflow

Version is automatically changed if the master branch is changed

* Based on the commit messages, increment the version from the lastest release.
If the string "BREAKING CHANGE" is found anywhere in any of the commit messages or descriptions the major version will be incremented.
* If a commit message begins with the string "feat" then the minor version will be increased. This works for most common commit metadata for feature additions: "feat: new API" and "feature: new API".
* All other changes will increment the patch version.

## Publish

Login to NPM and run:

```
npm publish --access public
```