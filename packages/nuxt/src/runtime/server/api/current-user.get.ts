import { eventHandler } from 'h3'
import { clerkClient, getAuth } from 'h3-clerk'

export default eventHandler((event) => {
  const { userId } = getAuth(event)

  if (!userId) {
    return null
  }

  return clerkClient.users.getUser(userId)
})
