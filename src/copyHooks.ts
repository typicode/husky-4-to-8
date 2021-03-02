import fs from 'fs'
import chalk from 'chalk'
import { cosmiconfigSync } from 'cosmiconfig'
// @ts-ignore
import { add } from 'husky/lib/commands/add'

function searchResult(): {
  hooks: { [key: string]: string }
  filepath: string | undefined
} {
  const explorer = cosmiconfigSync('husky')

  const result = explorer.search()
  if (result === null) {
    throw new Error('no husky 4 config found')
  }

  interface Config {
    hooks?: { [key: string]: string }
  }
  const config = result?.config as Config

  return {
    hooks: config?.hooks || {},
    filepath: result?.filepath,
  }
}

function showManualUpdateMessage(hooks: { [key: string]: string }) {
  const names: string[] = []

  // Simple heuristic to check if hook needs to be manually updated
  const packageManagers = ['npm', 'npx', 'yarn', 'pnpm', 'pnpx']
  const otherCriterias = ['HUSKY_GIT_PARAMS', '&&', '||']
  if (hooks) {
    Object.entries(hooks).forEach(([name, script]) => {
      if (
        !packageManagers.some((s) => script.startsWith(s)) ||
        otherCriterias.some((s) => script.includes(s))
      ) {
        names.push(name)
      }
    })
  }

  // Show manual update message
  if (names.length > 0) {
    console.log(chalk`{yellow ⚠️ {bold ${names.join(', ')}} hook${
      names.length > 1 ? 's' : ''
    } may need to be manually updated to be run via package manager.

Examples:
  jest → npx --no-install jest
       → yarn jest

  jest && eslint → npx --no-install jest && npx --no-install eslint
                 → yarn jest && yarn eslint

  commitlint -E HUSKY_GIT_PARAMS → npx --no-install commitlint --edit $1
                                 → yarn commitlint --edit $1

See {underline https://typicode.github.io/husky/#/?id=migrate-from-v4-to-v5}
}`)
  }
}

export function copyHooks(): void {
  const { hooks } = searchResult()

  Object.entries(hooks).forEach(([name, script]) => {
    const file = `.husky/${name}`
    fs.unlinkSync(file)
    console.log(`{bold $ husky add ${file} '${script}'}`)
    add(file, script)
    console.log()
  })

  showManualUpdateMessage(hooks)
}
