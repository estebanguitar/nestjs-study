export enum ErrorType {
  a,
  b,
}

export class ErrorParam {
  type: ErrorType
  status: number
  ip: string
}

export class Errors extends Error {
  constructor(message: string, param: ErrorParam) {
    super(message)
    console.log('Errors', param)
  }
}
