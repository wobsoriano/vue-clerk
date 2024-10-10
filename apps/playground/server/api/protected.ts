import { clerkClient, getAuth } from 'vue-clerk/server'

export default eventHandler((event) => {
  const auth = getAuth(event)

  if (!auth.userId) {
    setResponseStatus(event, 403)
    return
  }

  return clerkClient(event).users.getUser(auth.userId)
})
