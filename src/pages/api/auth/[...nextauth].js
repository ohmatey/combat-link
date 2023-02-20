import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { FirestoreAdapter } from '@next-auth/firebase-adapter'

import firebaseConfig from '../../../lib/firebaseConfig'

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
  ],
  adapter: FirestoreAdapter({
    ...firebaseConfig,
    // Optional emulator config (see below for options)
    emulator: {}
  })
})
