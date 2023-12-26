const fontColor = new Map<string, string>()
fontColor.set('trace', '\x1b[90m') //gray
fontColor.set('debug', '\x1b[0m') //white
fontColor.set('info', '\x1b[32m') //green
fontColor.set('warn', '\x1b[33m') //yellow
fontColor.set('error', '\x1b[31m') //red

const LOG_LEVEL = process.env.LOG_LEVEL || 'debug'

enum Level {
  'TRACE',
  'DEBUG',
  'INFO',
  'WARN',
  'ERROR',
}

export class LoggerFactory {
  // private static names = new Map<string, Log>()
  static names = new Map<string, Log>()

  private constructor() {}

  static create<Type>(cls: { new (): Type }): Log {
    const name = cls.name
    if (this.names.get(name) === undefined) this.names.set(name, new Log(name))
    return this.names.get(name)
  }
}

class Log {
  constructor(private readonly name: string) {}

  trace(message: string, ...args: any) {
    this.write('trace', message, ...args)
  }

  debug(message: string, ...args: any) {
    this.write('debug', message, ...args)
  }

  info(message: string, ...args: any) {
    this.write('info', message, ...args)
  }

  warn(message: string, ...args: any) {
    this.write('warn', message, ...args)
  }

  error(message: string, ...args: any) {
    this.write('error', message, ...args)
  }

  private write(meth, message: string, ...args: any) {
    // TODO Log level check and return
    const now = new Date().toISOString()

    if (typeof args === 'object') args = JSON.stringify(args)
    console[meth](`${fontColor.get(meth)}`, `[${meth.toUpperCase()}] [${now}] [${this.name}]: ${message}   ${args}`)
  }
}

import { NotFoundException } from '@nestjs/common'

class TestController {
  log = LoggerFactory.create(TestController)

  controllerRouteObjParam(params: objectClass) {
    this.log.trace('TestController.controllerRouteObjParam', params)
    this.log.debug('TestController.controllerRouteObjParam', params)
    this.log.info('TestController.controllerRouteObjParam', params)
    this.log.warn('TestController.controllerRouteObjParam', params)
    this.log.error('TestController.controllerRouteObjParam', params)
  }

  controllerRouteStrParam(params: string) {
    this.log.trace('TestController.controllerRouteStrParam', params)
    this.log.debug('TestController.controllerRouteStrParam', params)
    this.log.info('TestController.controllerRouteStrParam', params)
    this.log.warn('TestController.controllerRouteStrParam', params)
    this.log.error('TestController.controllerRouteStrParam', params)
  }

  controllerRouteArrParam(params: string[]) {
    this.log.trace('TestController.controllerRouteArrParam', params)
    this.log.debug('TestController.controllerRouteArrParam', params)
    this.log.info('TestController.controllerRouteArrParam', params)
    this.log.warn('TestController.controllerRouteArrParam', params)
    this.log.error('TestController.controllerRouteArrParam', params)
  }

  controllerRouteErrParam() {
    try {
      throw new NotFoundException()
    } catch (e) {
      this.log.trace('TestController.controllerRouteErrParam', e)
      this.log.debug('TestController.controllerRouteErrParam', e)
      this.log.info('TestController.controllerRouteErrParam', e)
      this.log.warn('TestController.controllerRouteErrParam', e)
      this.log.error('TestController.controllerRouteErrParam', e)
    }
  }
}

const controller = new TestController()
type objectClass = {
  a: number
  b: number
}
const objParam: objectClass = {
  a: 1,
  b: 2,
}
const strParam = 'test'
const arrParam = ['test1', 'test2', 'test3']
controller.controllerRouteObjParam(objParam)
setTimeout(() => controller.controllerRouteStrParam(strParam), 1000)
setTimeout(() => controller.controllerRouteArrParam(arrParam), 2000)
setTimeout(() => controller.controllerRouteErrParam(), 3000)
