import { doc, collection, getDoc, setDoc } from 'firebase/firestore'

import { firestore } from './firebase'

export const makeLinkRef = slug => doc(firestore, 'links', slug)
export const linksCollectionRef = collection(firestore, 'links')

export async function getLinkBySlug(slug) {
  const snapshot = await getDoc(makeLinkRef(slug))

  if (snapshot.exists) {
    return {
      id: snapshot.id,
      ...snapshot.data()
    }
  }

  return null
}

export async function saveLink({
  slug,
  originalUrl
}) {
  const link = {
    slug,
    originalUrl,
    createdAt: new Date().toISOString()
  }
  await setDoc(makeLinkRef(slug), link)

  return link
}
