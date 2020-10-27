export function apidocAPI(method: string, path: string, name: string) {
  return `* @api {${method}} ${path} ${name}`
}

export function apidocDescription(description: string) {
  return `* @apiDescription ${description}`
}

export function apidocGroup(group: string) {
  return `* @apiGroup ${group}`
}

export function apidocParam(group: string, type: string, name: string, optional = false, description?: string) {
  const nameWithOptionality = optional ? `[${name}]` : name
  return `* @apiParam (${group}) {${type}} ${nameWithOptionality} ${description}`
}

export function apidocSuccess(type: string, name: string, optional = false, description?: string) {
  const nameWithOptionality = optional ? `[${name}]` : name
  return `* @apiSuccess {${type}} ${nameWithOptionality} ${description}`
}
