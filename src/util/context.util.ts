import { ExecutionContext, HttpStatus } from "@nestjs/common";
import { log } from "console";
import { CookieOptions } from "express";
import { User } from "src/entities/user.entity";

type Headers = {
    'content-type': string,
    'authorization': string,
    'user-agent': string,
    'accept': string,
    'cache-control': string,
    'host': string,
    acceptEncoding: string,
    'connection': string,
    'content-length': string,
}
type RequsetUser = {
    userId: number,
    token: string,
}
type FilteredRequest = RequsetUser & {
    method: string,
    headers: Headers,
    url: string,
    cookies: any
}

type FilteredResponse = {
    cookie(name: string, value: string, options: CookieOptions): any
    cookie(name: string, value: any, options?: CookieOptions): any
    header(field: string, value?: string | string[]): any,
    status(code: HttpStatus): any
}

export class ContextService {
    
    static getRequest = (context: ExecutionContext): FilteredRequest => {
        return context.switchToHttp().getRequest<FilteredRequest>()
    } 
    static getResponse = (contenxt: ExecutionContext) => {
        return contenxt.switchToHttp().getResponse<FilteredResponse>()
    }   

    static setUser = (context: ExecutionContext) => {
        // context.switchToHttp().getRequest<FilteredRequest>().userId
    }
}
