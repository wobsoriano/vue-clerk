import { eventHandler } from 'h3'
import { clerkClient, getAuth } from '../clerkClient'

export default eventHandler(async (event) => {
  const { userId } = getAuth(event)

  if (!userId) {
    return null
  }

  return await clerkClient(event).users.getUser(userId)
})
