# husky-4-to-5

> Easily migrate your husky 4 config to husky 5

While it should cover most basic migrations, it's __recommended__ to have a look at husky 5 [documentation](https://typicode.github.io/husky).

## Usage

If you're using using `npm` in your project:

```sh
npx github:typicode/husky-4-to-5#main --package-manager npm
```

If you're using using `yarn` in your project:

```sh
npx github:typicode/husky-4-to-5#main --package-manager yarn
```

## What it does

1. Installs [husky](https://github.com/typicode/husky) 5
1. Installs [pinst](https://github.com/typicode/pinst) if `package.json > private` field isn't `true`
1. Creates husky 5 hooks based on husky 4 config 
1. Updates `package.json > scripts`

`husky-4-to-5` will not remove old config files (`.huskyrc*`) or `package.json > husky` field.

## Clean

If there was error during the process, you can clean things up by running:

```sh
rm -rf .husky && git config --unset core.hooksPath
```
