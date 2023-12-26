import { ArgumentsHost, HttpException } from '@nestjs/common'
import { Response } from 'express'
import { DBException } from '../exception/DB.exception'

type ExceptionType = {
  type: HttpException | DBException
}

export class GlobalExceptionFilter {
  catch<T extends ExceptionType>(exception: T, host: ArgumentsHost): any {
    const context = host.switchToHttp()
    // const request = context.getRequest<Request>()
    const response = context.getResponse<Response>()

    const errorType = this.getErrorType(exception)

    console.log(exception)
    console.log()
    // console.log( )
    response.status(404).json({
      status: 404,
      message: '404',
    })
  }

  private getErrorType(exception: unknown) {
    // return instanceof
    return ''
  }
}
