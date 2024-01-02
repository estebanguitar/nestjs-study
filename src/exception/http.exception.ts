import { Exception, ExceptionOptions } from './exception'

export class HTTPException extends Exception {
  constructor(message: string, options?: ExceptionOptions) {
    super(message, 'HTTPException', options)
  }
}
