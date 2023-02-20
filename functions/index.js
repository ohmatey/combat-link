const functions = require('firebase-functions')

const {
  getLinkBySlug,
  saveLink
} = require('./links')

const isAuthenticated = (req, res) => {
  console.log('isAuthenticated', req.headers)
  console.log('res.locals', res.locals)

  return true
}

exports.setLink = functions.https.onRequest(async (req, res) => {
  try {
    // Check if the user is authenticated
    if (!isAuthenticated(req, res)) {
      res.status(401).send('Unauthorized')
      return
    }

    if (req.method !== 'PUT' || req.method !== 'POST') {
      res.status(405).send('Method not allowed')
      return
    }

    // Get the original URL from the request query parameters
    const {
      url,
      slug
    } = req.query

    if (!url) {
      res.status(400).send('The URL parameter is required.')
      return
    }

    // if (!isUrl(url)) {
    //   res.status(400).send('The URL parameter is not a valid URL.')
    //   return
    // }

    if (!slug) {
      res.status(400).send('The slug parameter is required.')
      return
    }

    // Save the link to the Firestore database
    await saveLink({
      slug,
      originalUrl: url
    })

    res.status(200).json({
      url,
      slug
    })
  } catch (error) {
    console.error('Error saving link:', error)
    res.status(500).send('Error saving link')
  }
})

exports.slug = functions.https.onRequest(async (req, res) => {
  try {
    // fail if not GET
    if (req.method !== 'GET') {
      res.status(405).send('Method not allowed')
      return
    }

    // Get the slug from the request URL parameter
    const { slug } = req.query

    if (!slug) {
      res.status(400).send('The slug parameter is required.')
      return
    }

    // Lookup the original URL for the provided slug in the database
    const link = await getLinkBySlug(slug)
    console.log('link', link)
    // If the slug is not found, return a 404 error
    if (!link) {
      res.status(404).send('The requested URL was not found.')
      return
    }

    // If the slug is found, redirect to the original URL
    res.redirect(link.originalUrl)
  } catch (error) {
    console.error('Error retrieving link:', error)
    res.status(500).send('Error retrieving link')
  }
})
