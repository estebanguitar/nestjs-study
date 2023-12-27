import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'

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

  catch(exception: Error, host: ArgumentsHost): any {
    const { httpAdapter } = this.httpAdapterHost
    const context = host.switchToHttp()
    const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
    const responseBody = new ExceptionResponse(
      'fail',
      exception.message,
      httpStatus,
      httpAdapter.getRequestUrl(context.getRequest()),
    )

    httpAdapter.reply(context.getResponse(), responseBody, httpStatus)
  }
}
