/*!
 * Original code by Clerk, Inc.
 * MIT Licensed, Copyright 2022 Clerk, Inc., see https://github.com/clerk/javascript/blob/main/packages/react/LICENSE for details
 *
 * Credits to the Clerk team:
 * https://github.com/clerk/javascript/blob/main/packages/react/src/errors/errorThrower.ts
 */

import type { ErrorThrowerOptions } from '@clerk/shared/error'
import { buildErrorThrower } from '@clerk/shared/error'

const errorThrower = buildErrorThrower({ packageName: PACKAGE_NAME })

export { errorThrower }

/**
 * Overrides options of the internal errorThrower (eg setting packageName prefix).
 *
 * @internal
 */
export function setErrorThrowerOptions(options: ErrorThrowerOptions) {
  errorThrower.setMessages(options).setPackageName(options)
}
