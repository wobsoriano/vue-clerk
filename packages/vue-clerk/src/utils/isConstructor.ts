/*!
 * Original code by Clerk, Inc.
 * MIT Licensed, Copyright 2022 Clerk, Inc., see https://github.com/clerk/javascript/blob/main/packages/react/LICENSE for details
 *
 * Credits to the Clerk team:
 * https://github.com/clerk/javascript/blob/main/packages/react/src/utils/isConstructor.ts
 */

export function isConstructor<T>(f: any): f is T {
  return typeof f === 'function'
}
