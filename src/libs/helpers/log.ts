import * as chalk from 'chalk'

// TODO https://stackoverflow.com/questions/41773168/define-prototype-function-with-typescript
export const log = (message: string) => console.log(chalk.green(message))
export const logError = (message: string): void => console.log(chalk.red(message))
export const logInfo = (message: string): void => console.log(chalk.blue(message))
export const logWarn = (message: string): void => console.log(chalk.yellow(message))
