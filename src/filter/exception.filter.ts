import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import { Exception } from '../exception/exception'

class ExceptionResponse {
  constructor(
    private readonly status: 'success' | 'fail',
    private readonly message: string,
    private readonly statusCode: HttpStatus,
    private readonly path: string,
    private readonly data?: any,
  ) {}
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter<Error> {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: Exception, host: ArgumentsHost): any {
    const { httpAdapter } = this.httpAdapterHost
    const context = host.switchToHttp()
    const httpStatus = 404
    //exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
    console.log(exception.stack)
    console.log(exception.message)
    console.log(exception.name)
    console.log(exception.options)
    const responseBody = new ExceptionResponse(
      'fail',
      'message',
      // exception.message,
      httpStatus,
      httpAdapter.getRequestUrl(context.getRequest()),
    )

    httpAdapter.reply(context.getResponse(), responseBody, httpStatus)
  }
}
