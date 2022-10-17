export interface JwtStatus {
  expired: boolean
  userId: string
}

export interface RefreshTokenRes {
  userId: string
}
