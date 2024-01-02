import { Exception, ExceptionOptions } from './exception'

export class BizLogicException extends Exception {
  constructor(message: string, options?: ExceptionOptions) {
    super(message, 'BizLogicException', options)
  }
}
