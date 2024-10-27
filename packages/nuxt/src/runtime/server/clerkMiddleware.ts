import type { AuthObject } from '@clerk/backend'
import { createError, eventHandler, getRequestHeaders, getRequestProtocol, setResponseHeader } from 'h3'
import { AuthStatus, constants, makeAuthObjectSerializable, stripPrivateDataFromObject } from '@clerk/backend/internal'
import type { H3Event } from 'h3'
import type { InitialState } from '@clerk/types'
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

type Handler = (event: H3Event) => void

/**
 * Integrates Clerk authentication into your Nuxt application through Middleware.
 *
 * @param handler Optional callback function to handle the authenticated request
 *
 * @example
 * Basic usage:
 * ```ts
 * export default clerkMiddleware()
 * ```
 *
 * @example
 * With custom handler:
 * ```ts
 * export default clerkMiddleware((event) => {
 *   // Access auth data from the event context
 *   const { auth } = event.context
 *
 *   // Example: Require authentication for all API routes
 *   if (!auth.userId && event.path.startsWith('/api')) {
 *     throw createError({
 *       statusCode: 401,
 *       message: 'Unauthorized'
 *     })
 *   }
 * })
 * ```
 */
export function clerkMiddleware(handler?: Handler) {
  return eventHandler(async (event) => {
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

    const authObject = requestState.toAuth()
    event.context.auth = authObject
    event.context.__clerk_initial_state = createInitialState(authObject)

    handler?.(event)
  })
}

function createInitialState(auth: AuthObject) {
  const initialState = makeAuthObjectSerializable(stripPrivateDataFromObject(auth))
  return initialState as unknown as InitialState
}

declare module 'h3' {
  interface H3EventContext {
    auth: AuthObject
    /**
     * @internal
     */
    __clerk_initial_state: InitialState
  }
}
