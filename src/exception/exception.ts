export type ExceptionOptions = {
  errorCode: string | number
  details: string
}

export class Exception extends Error {
  message: string
  name: string
  options: ExceptionOptions

  constructor(message: string, name: string, options?: ExceptionOptions) {
    // console.log(options)
    super(message)
    this.message = message
    this.name = name
    this.options = options
  }
}
