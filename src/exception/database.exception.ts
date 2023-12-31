import { Exception, ExceptionOptions } from './exception'

export class DatabaseException extends Exception {
  constructor(message: string, options?: ExceptionOptions) {
    super(message, 'DatabaseException', options)
  }
}
