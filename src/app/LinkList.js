'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { onSnapshot, collection, doc, orderBy } from 'firebase/firestore'

import { firestore } from '../lib/firebase'

const LinkList = () => {
  const linksRef = collection(firestore, 'links')
  const linkDocRef = doc(firestore, 'links', 'linkId')

  const [links, setLinks] = useState([])

  useEffect(() => {
    const unsubscribe = onSnapshot(linksRef, orderBy('createdOn', 'desc'), snapshot => {
      const links = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      setLinks(links)
    })

    return () => unsubscribe()
  }, [linksRef])

  const deleteLink = linkId => {
    if (!confirm('Are you sure you want to delete this link?')) return

    linkDocRef.delete()
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Slug</th>
          <th>Long URL</th>
          <th>Created On</th>
          <th colSpan={2} />
        </tr>
      </thead>

      <tbody>
        {links.map(link => (
          <tr key={link.id}>
            <td>
              <a href={`/${link.slug}`}>{link.slug}</a>
            </td>
            <td>{link.longUrl}</td>
            <td>{link.createdOn.toDate().toLocaleDateString()}</td>
            <td>
              <button onClick={() => deleteLink(link.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default LinkList
