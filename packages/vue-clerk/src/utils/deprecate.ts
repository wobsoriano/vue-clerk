export function logDeprecation() {
  console.log(`
DEPRECATION NOTICE
==================

This project has graduated to an official SDK!

Please visit our migration guide:
https://clerk.com/docs/references/vue/migrating-from-vue-community-sdk

The community SDK will continue to work but will no longer
receive updates or security patches.
`.trim())
}
