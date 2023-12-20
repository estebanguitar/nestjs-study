export type JwtVerify = {
  id: number
  username: string
  timestamp: number
  iat?: number
  exp?: number
}

export type Tokens = {
  accessToken: string
  refreshToken?: string
}
