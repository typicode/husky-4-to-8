# husky-4-to-6

> Easily migrate your husky 4 config to husky 6

While it should cover most basic migrations, it's **recommended** to have a look at husky 6 [documentation](https://typicode.github.io/husky).

If your `package.json` is not at the same level as `.git`, please update manually.

## Usage

### npm 6

```shell
npm install husky@6 --save-dev \
  && npx husky-init \
  && npx github:typicode/husky-4-to-6 --remove-v4-config
```

### npm 7

```shell
npm install husky@6 --save-dev \
  && npx husky-init \
  && npm exec -- github:typicode/husky-4-to-6 --remove-v4-config
```

### yarn

Yarn 1

```shell
yarn add husky@6 --dev \
  && npx husky-init \
  && npm exec -- github:typicode/husky-4-to-6 --remove-v4-config
```

Yarn 2

```shell
yarn add husky@6 --dev \
  && yarn dlx husky-init --yarn2 \
  && npm exec -- github:typicode/husky-4-to-6 --remove-v4-config
```

## What each command does

`husky init` sets up Git hooks and updates your `package.json` scripts (you may want to commit your changes to `package.json` before running `husky init`).

`husky-4-to-6` creates hooks based on your husky v4 config. If `--remove-v4-config` is passed, previous config will be deleted (recommended).

## Revert

If there's an error during the process, you can clean things up by running:

```sh
rm -rf .husky && git config --unset core.hooksPath
```
