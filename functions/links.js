const { firestore } = require('./firebaseAdmin')

exports.getLinkBySlug = async (slug) => {
  const snapshot = await firestore.collection('links').doc(slug).get()

  if (snapshot.exists) {
    return {
      id: snapshot.id,
      ...snapshot.data()
    }
  }

  return null
}

exports.saveLink = async ({
  slug,
  originalUrl
}) => {
  const link = {
    slug,
    originalUrl,
    createdAt: new Date().toISOString()
  }
  await firestore.collection('links').doc(slug).set(link)

  return link
}
