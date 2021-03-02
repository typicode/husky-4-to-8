# husky-4-to-5

> Easily migrate your husky 4 config to husky 5

While it should cover most basic migrations, it's **recommended** to have a look at husky 5 [documentation](https://typicode.github.io/husky).

## Usage

### npm

```shell
npm install husky@5 \
  && npx --no-install husky init \
  && npm exec -- github:typicode/husky-4-to-5
```

### yarn

```shell
yarn add husky@5 \
  && yarn husky init \
  && npm exec -- github:typicode/husky-4-to-5
```

## What it does

`husky init` will modify `package.json > scripts`. You may want to commit your changes to this file before running `husky init`.

`husky-4-to-5` will run `husky add` for each hook defined in `.huskyrc*` or `package.json > husky`. It won't remove previous config however.

## Clean

If there's an error during the process, you can clean things up by running:

```sh
rm -rf .husky && git config --unset core.hooksPath
```
