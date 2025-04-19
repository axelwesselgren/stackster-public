type APIResponse<T> = {
  data?: T,
  message: string,
  code: number
}

export type { APIResponse };