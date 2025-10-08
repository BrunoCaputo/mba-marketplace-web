export function createApiPath(basePath: string, params?: URLSearchParams) {
  return params ? `${basePath}?${params.toString()}` : basePath
}
