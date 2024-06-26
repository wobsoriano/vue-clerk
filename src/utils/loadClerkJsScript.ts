/*!
 * Original code by Clerk, Inc.
 * MIT Licensed, Copyright 2022 Clerk, Inc., see https://github.com/clerk/javascript/blob/main/packages/react/LICENSE for details
 *
 * Credits to the Clerk team:
 * https://github.com/clerk/javascript/blob/main/packages/react/src/utils/loadClerkJsScript.ts
 */

import { parsePublishableKey } from '@clerk/shared/keys'
import { loadScript } from '@clerk/shared/loadScript'
import { isValidProxyUrl, proxyUrlToAbsoluteURL } from '@clerk/shared/proxy'
import { addClerkPrefix } from '@clerk/shared/url'

import { errorThrower } from '../errors/errorThrower'
import type { IsomorphicClerkOptions } from '../types'
import { isDevOrStagingUrl } from './isDevOrStageUrl'

const FAILED_TO_LOAD_ERROR = 'Clerk: Failed to load Clerk'

type LoadClerkJsScriptOptions = Omit<IsomorphicClerkOptions, 'proxyUrl' | 'domain'> & {
  proxyUrl?: string
  domain?: string
}

async function loadClerkJsScript(opts: LoadClerkJsScriptOptions) {
  const { publishableKey } = opts

  if (!publishableKey)
    errorThrower.throwMissingPublishableKeyError()

  const existingScript = document.querySelector<HTMLScriptElement>('script[data-clerk-js-script]')

  if (existingScript) {
    return new Promise((resolve, reject) => {
      existingScript.addEventListener('load', () => {
        resolve(existingScript)
      })

      existingScript.addEventListener('error', () => {
        reject(FAILED_TO_LOAD_ERROR)
      })
    })
  }

  return loadScript(clerkJsScriptUrl(opts), {
    async: true,
    crossOrigin: 'anonymous',
    beforeLoad: applyClerkJsScriptAttributes(opts),
  }).catch(() => {
    throw new Error(FAILED_TO_LOAD_ERROR)
  })
}

function clerkJsScriptUrl(opts: LoadClerkJsScriptOptions) {
  const { clerkJSUrl, clerkJSVariant, clerkJSVersion = JS_PACKAGE_VERSION, proxyUrl, domain, publishableKey } = opts

  if (clerkJSUrl)
    return clerkJSUrl

  let scriptHost = ''
  if (!!proxyUrl && isValidProxyUrl(proxyUrl))
    scriptHost = proxyUrlToAbsoluteURL(proxyUrl).replace(/http(s)?:\/\//, '')
  else if (domain && !isDevOrStagingUrl(parsePublishableKey(publishableKey)?.frontendApi || ''))
    scriptHost = addClerkPrefix(domain)
  else
    scriptHost = parsePublishableKey(publishableKey)?.frontendApi || ''

  const variant = clerkJSVariant ? `${clerkJSVariant.replace(/\.+$/, '')}.` : ''

  return `https://${scriptHost}/npm/@clerk/clerk-js@${clerkJSVersion}/dist/clerk.${variant}browser.js`
}

function buildClerkJsScriptAttributes(options: LoadClerkJsScriptOptions) {
  const obj: Record<string, string> = {}

  if (options.publishableKey)
    obj['data-clerk-publishable-key'] = options.publishableKey

  if (options.proxyUrl)
    obj['data-clerk-proxy-url'] = options.proxyUrl

  if (options.domain)
    obj['data-clerk-domain'] = options.domain

  return obj
}

function applyClerkJsScriptAttributes(options: LoadClerkJsScriptOptions) {
  return (script: HTMLScriptElement) => {
    const attributes = buildClerkJsScriptAttributes(options)
    for (const attribute in attributes)
      script.setAttribute(attribute, attributes[attribute])
  }
}

export { loadClerkJsScript, buildClerkJsScriptAttributes, clerkJsScriptUrl }
export type { LoadClerkJsScriptOptions }
