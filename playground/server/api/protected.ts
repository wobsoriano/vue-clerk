import { clerkClient } from 'h3-clerk'

export default eventHandler(async (event) => {
  const { auth } = event.context

  if (!auth.userId) {
    setResponseStatus(event, 403)
    return ''
  }

  return await clerkClient.users.getUser(auth.userId)
})
