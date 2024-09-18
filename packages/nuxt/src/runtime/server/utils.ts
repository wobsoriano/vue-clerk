/**
 * Taken from https://github.com/clerk/javascript/blob/7a298bed566b71043ac4b8bf3cf132ef3006cf36/packages/shared/src/underscore.ts#L90
 *
 * Returns true for `true`, true, positive numbers.
 * Returns false for `false`, false, 0, negative integers and anything else.
 */
export function isTruthy(value: unknown): boolean {
  // Return if Boolean
  if (typeof value === `boolean`) {
    return value
  }

  // Return false if null or undefined
  if (value === undefined || value === null) {
    return false
  }

  // If the String is true or false
  if (typeof value === `string`) {
    if (value.toLowerCase() === `true`) {
      return true
    }

    if (value.toLowerCase() === `false`) {
      return false
    }
  }

  // Now check if it's a number
  const number = Number.parseInt(value as string, 10)
  if (Number.isNaN(number)) {
    return false
  }

  if (number > 0) {
    return true
  }

  // Default to false
  return false
}
