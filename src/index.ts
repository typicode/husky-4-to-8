#!/usr/bin/env node
import chalk from 'chalk'
// @ts-ignore
import { install } from 'husky/lib/commands/install'
import { PackageManager } from './bin'
import { copyHooks } from './config'
import { info } from './log'
import { installDependencies, isPublic, readPkg, updateScripts } from './pkg'

export function run(pm: PackageManager): void {
  const pkg = readPkg()

  // Install dependencies
  installDependencies(pm, isPublic(pkg))

  // husky 5 install
  info('$ husky install')
  install()
  console.log()

  copyHooks()

  // Update package.json
  info('Updating package.json scripts')
  updateScripts()

  console.log(
    chalk`{green
✅ Husky have been upgraded to v5, you can delete your previous configuration.

🐺 {bold Happy coding, woof!}

👋 {bold If you're using husky 5 in a commercial project or just want to help, you can sponsor it here}:
- {underline https://github.com/sponsors/typicode}
- {underline https://opencollective.com/husky}

Thank you!
}`,
  )
}
