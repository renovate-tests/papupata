import { Response } from 'express'

interface ExtendedResponse extends Response {
  sentData: any
}

export default function createMockResponse(): ExtendedResponse {
  let statusCode = 200,
    sent = false,
    resData: any = null,
    headers: any = {}
  const implemented: Partial<ExtendedResponse> = {
    send(data) {
      this.end(data)
      return this
    },
    status(code) {
      statusCode = code
      return this
    },

    sendStatus(status) {
      statusCode = status
      this.end()
      return this
    },

    get statusCode() {
      return statusCode
    },

    redirect(statusOrTarget: number | string, statusOrTarget2?: string | number) {
      if (typeof statusOrTarget === 'number') {
        this.status(statusOrTarget)
        this.set('Location', statusOrTarget2?.toString())
      } else {
        this.status(statusOrTarget2 || 301)
        this.set('Location', statusOrTarget)
      }
    },

    json(data) {
      this.end(data)
      return this
    },

    jsonp(data) {
      this.end(data)
      return this
    },

    end(data?: any) {
      if (sent) throw new Error('Response already sent')
      sent = true
      resData = data
      return this
    },

    get sentData() {
      return resData
    },

    set(header: any, value?: any) {
      headers[header] = value
      return this
    },

    get(header) {
      return headers[header]
    },
  }
  return new Proxy(implemented, {
    get(target, key) {
      if (key in target) {
        return (target as any)[key]
      }
      throw new Error(key.toString() + ' not implemented in mock response')
    },
  }) as ExtendedResponse
}
