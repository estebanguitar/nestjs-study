const SERVER_LOG_LEVEL = process.env.LOG_LEVEL || 'debug'
const LOG_LEVELS = ['trace', 'debug', 'info', 'warn', 'error'] as const
type LogLevel = (typeof LOG_LEVELS)[number]
const fontColor = {
  trace: '\x1b[90m',
  debug: '\x1b[0m',
  info: '\x1b[32m',
  warn: '\x1b[33m',
  error: '\x1b[31m',
} as Record<LogLevel, string>

const LEVEL = {
  trace: 0,
  debug: 1,
  info: 2,
  warn: 3,
  error: 4,
} as Record<LogLevel, number>

export class LoggerFactory {
  static names = new Map<string, Log>()

  private constructor() {}

  static create<Type>(cls: { new (...args): Type }): Log {
    const name = cls.name
    this.names.has(name) || this.names.set(name, new Log(name))
    return this.names.get(name)
  }
}

export class Log {
  constructor(private readonly name: string) {}

  trace(message: string, ...args: any[]) {
    this.write('trace', message, ...args)
  }

  debug(message: string, ...args: any[]) {
    this.write('debug', message, ...args)
  }

  info(message: string, ...args: any[]) {
    this.write('info', message, ...args)
  }

  warn(message: string, ...args: any[]) {
    this.write('warn', message, ...args)
  }

  error(message: string, ...args: any[]) {
    this.write('error', message, ...args)
  }

  private write(meth: LogLevel, message: string, ...args: any[]) {
    if (LEVEL[SERVER_LOG_LEVEL] > LEVEL[meth]) return

    const now = new Date().toISOString()
    console[meth](`${fontColor[meth]}`, `[${meth.toUpperCase()}] [${now}] [${this.name}]: ${message}`, ...args)
  }
}
