import type { AuthObject } from '@clerk/backend'
import { createError, eventHandler, getRequestHeaders, getRequestProtocol, setResponseHeader } from 'h3'
import { AuthStatus, constants } from '@clerk/backend/internal'
import type { H3Event } from 'h3'
import { clerkClient } from './clerkClient'

function toWebRequest(event: H3Event) {
  const headers = getRequestHeaders(event) as HeadersInit
  const protocol = getRequestProtocol(event)
  const dummyOriginReqUrl = new URL(event.node.req.url || '', `${protocol}://clerk-dummy`)
  return new Request(dummyOriginReqUrl, {
    method: event.method,
    headers: new Headers(headers),
  })
}

export default eventHandler(async (event) => {
  const clerkRequest = toWebRequest(event)

  const requestState = await clerkClient(event).authenticateRequest(clerkRequest)

  const locationHeader = requestState.headers.get(constants.Headers.Location)
  if (locationHeader) {
    // Trigger a handshake redirect
    return new Response(null, { status: 307, headers: requestState.headers })
  }

  if (requestState.status === AuthStatus.Handshake) {
    throw createError('Clerk: handshake status without redirect')
  }

  if (requestState.headers) {
    requestState.headers.forEach((value, key) => {
      setResponseHeader(event, key, value)
    })
  }

  event.context.auth = requestState.toAuth()
})

declare module 'h3' {
  interface H3EventContext {
    auth: AuthObject
  }
}
