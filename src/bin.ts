#!/usr/bin/env node
import yargs from 'yargs/yargs'
// @ts-ignore
import { hideBin } from 'yargs/helpers'
import { run } from './index'
import { error } from './log'

export type PackageManager = 'npm' | 'yarn' | 'pnpm'
export type PackageManagers = ReadonlyArray<PackageManager>

const packageManagers: PackageManagers = ['npm', 'yarn', 'pnpm']
const argv = yargs(hideBin(process.argv)).option('package-manager', {
  alias: 'pm',
  describe: 'package manager to be used',
  choices: packageManagers,
  demandOption: true,
}).argv

try {
  run(argv['package-manager'])
} catch (e) {
  error((e as Error).message)
  process.exit(1)
}
