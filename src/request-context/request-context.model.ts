import { AsyncLocalStorage } from 'node:async_hooks'

export class RequestContext<TRequest = any, TResponse = any> {
  static cls = new AsyncLocalStorage<RequestContext>()

  private static get currentContext() {
    return this.cls.getStore()
  }

  private static get request() {
    return this.currentContext.request
  }

  private static get response() {
    return this.currentContext.response
  }

  static set before(data: any) {
    this.request.before = data
  }

  static set after(data: any) {
    this.request.after = data
  }

  static get before() {
    return this.request.before
  }

  static get after() {
    return this.request.after
  }

  // static set beforeAndAfter(before: any, after: any) {
  //   this.before(before)
  //   this.after(after)
  // }

  // static get beforeAndAfter(): any[] {
  //   return [this.before, this.after]
  // }

  constructor(
    private readonly request: TRequest,
    private readonly response: TResponse,
  ) {}
}
