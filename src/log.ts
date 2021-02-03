import chalk from 'chalk'

export function error(msg: string): void {
  console.log(chalk.red(msg))
}

export function info(msg: string): void {
  console.log(chalk.bold.blackBright.bgWhiteBright(msg))
}
