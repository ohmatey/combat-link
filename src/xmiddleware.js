// nextjs13 middleware to reroute users back to nextauth login page

import { getSession } from "next-auth/client"

export default async function middleware(req, res, next) {
  const session = await getSession({ req })

  if (session) {
    next()
  } else {
    res.redirect('/api/auth/signin')
  }
}
