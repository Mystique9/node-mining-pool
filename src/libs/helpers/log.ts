import * as chalk from 'chalk'

// TODO https://stackoverflow.com/questions/41773168/define-prototype-function-with-typescript
const log = (console as any).log

log.error = (message: string): void => console.log(chalk.red(message))
log.info = (message: string): void => console.log(chalk.blue(message))
log.warn = (message: string): void => console.log(chalk.yellow(message))

export default log
