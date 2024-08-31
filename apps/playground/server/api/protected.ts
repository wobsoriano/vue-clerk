import { clerkClient, getAuth } from 'h3-clerk'

export default eventHandler((event) => {
  const auth = getAuth(event)

  if (!auth.userId) {
    setResponseStatus(event, 403)
    return
  }

  return clerkClient.users.getUser(auth.userId)
})
