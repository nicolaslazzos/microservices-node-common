# How to publish the package to NPM

The package must be in a git repository, so we first commit the changes.

```
git add .
git commit -m "some message"
```

Then every time we are going to publish a new version, we have to update the version number, so with that command, npm will automatically update the version for us.

```
npm version patch
```

In this case, we are writing the package in TypeScript but we want to publish it as JavaScript and add the TypeScript types separately, so with the `build` script, we are generating the corresponging files in the `./build` folder (see `package.json`).

```
npm run build
```

Finally we can publish it to npm running the following command.

```
npm publish
```

If it's the first time publishing the package and it's public, we need to inidicate that through the following command.

```
npm publish --access public
```