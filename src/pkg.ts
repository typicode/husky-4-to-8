import cp from 'child_process'
import fs from 'fs'
import chalk from 'chalk'
import { PackageJson } from 'type-fest'
import writeJsonFile from 'write-json-file'
import { PackageManager } from './bin'
import { info } from './log'

export function readPkg(): PackageJson {
  return JSON.parse(fs.readFileSync('package.json', 'utf-8')) as PackageJson
}

export function isPublic(pkg: PackageJson): boolean {
  return pkg.private !== true
}

export function installDependencies(
  pm: PackageManager,
  isPublic: boolean,
): void {
  // Get arguments for package manager
  let args: string[] = []
  switch (pm) {
    case 'npm': {
      args = ['install', '--save-dev', '--quiet']
      break
    }
    case 'yarn': {
      args = ['add', '--dev']
      break
    }
    case 'pnpm': {
      args = ['install', '--save-dev']
      break
    }
  }

  // Add husky as a dependency
  args.push('husky@5')

  // Add pinst if the module is public
  if (isPublic) {
    args.push('pinst')
  }

  // Run command
  info(`$ ${pm} ${args.join(' ')}`)
  cp.spawnSync(pm, args, { stdio: 'inherit' })
}

function updateScript(pkg: PackageJson, name: string, script: string) {
  if (pkg.scripts?.[name] !== undefined) {
    console.log(
      chalk`{yellow ⚠️ {bold ${name}} script already set in package.json, please append {bold \`${script}\`} manually.}`,
    )
    return
  }

  pkg.scripts = { ...pkg.scripts, [name]: script }
}

export function updateScripts(): void {
  const pkg = readPkg()

  updateScript(pkg, 'postinstall', 'husky install')

  if (isPublic(pkg)) {
    updateScript(pkg, 'prepublishOnly', 'pinst --disable')
    updateScript(pkg, 'postpublish', 'pinst --enable')
  }

  writeJsonFile.sync('package.json', pkg, { detectIndent: true })
}
