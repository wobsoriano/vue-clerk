import { eventHandler } from 'h3'
import { clerkClient, getAuth } from 'h3-clerk'

export default eventHandler(async (event) => {
  const { userId } = getAuth(event)

  if (!userId) {
    return null
  }

  return await clerkClient.users.getUser(userId)
})
