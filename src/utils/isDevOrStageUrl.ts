/*!
 * Original code by Clerk, Inc.
 * MIT Licensed, Copyright 2022 Clerk, Inc., see https://github.com/clerk/javascript/blob/main/packages/react/LICENSE for details
 *
 * Credits to the Clerk team:
 * https://github.com/clerk/javascript/blob/main/packages/react/src/utils/isDevOrStageUrl.tsx
 */

import { createDevOrStagingUrlCache } from '@clerk/shared/keys'

const { isDevOrStagingUrl } = createDevOrStagingUrlCache()
export { isDevOrStagingUrl }
