'use client'

import { useState, useMemo } from 'react'

import {
  getLinkBySlug,
  saveLink
} from '../lib/firestore'

const NewLinkform = () => {
  const [longUrl, setLongUrl] = useState('')
  const [slug, setSlug] = useState('')
  const [error, setError] = useState('')

  const createdLink = useMemo(() => {
    return `${process.env.NEXT_PUBLIC_LINK_DOMAIN}/${slug} -> ${longUrl || '...'}`
  }, [slug, longUrl])

  const handleLongUrlChange = (event) => {
    setLongUrl(event.target.value)
  }

  const handleSlugChange = (event) => {
    setSlug(event.target.value)
  }

  const handleCreateLink = async (event) => {
    event.preventDefault()

    setError('')

    try {
      // Check if the slug is available
      const snapshot = await getLinkBySlug(slug)
      if (snapshot.exists) {
        setError(`The slug "${slug}" is already in use.`)
        return
      }

      // Create the link
      const newLink = {
        longUrl: longUrl,
        slug
      }
      await saveLink(newLink)

      // Set the created link and clear the inputs
      setLongUrl('')
      setSlug('')
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <form onSubmit={handleCreateLink}>
      <div>
        <label htmlFor="longUrl">Long URL:</label>
        <input
          type="text"
          id="longUrl"
          value={longUrl}
          onChange={handleLongUrlChange}
        />
      </div>
      <div>
        <label htmlFor="slug">Slug:</label>
        <input
          type="text"
          id="slug"
          value={slug}
          onChange={handleSlugChange}
        />
      </div>
      <button type="submit">Create Link</button>
      {error && <div>{error}</div>}
      {createdLink && <div>Created Link: <a href={createdLink}>{createdLink}</a></div>}
    </form>
  )
}

export default NewLinkform
