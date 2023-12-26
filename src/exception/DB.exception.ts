import { ErrorParam, Errors } from './errors'

export class DBException extends Errors {
  constructor(message: string, param: ErrorParam) {
    super(message, param)
    console.log('DBException', param)
  }
}
