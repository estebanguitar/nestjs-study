import { RequestContext } from './request-context.model'

export const mid = (req: Request, res: Response, next: () => void) => {
  RequestContext.cls.run(new RequestContext(req, res), next)
}
