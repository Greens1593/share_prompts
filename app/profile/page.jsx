'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

import Profile from '@components/Profile'

const MyProfile = () => {
  const handleEdit = () => {
      
    }
  const handleDelete = () => {
      
    }
    const { data: session } = useSession()
    const [posts, setPosts] = useState([])
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${session?.user.id}/posts`)
      const data = await res.json()
      setPosts(data)
    }
    if (session?.user.id) fetchPosts()
  })
  return (
      <Profile
          name='My'
          desc='Welcome to your personalized profile page'
          data={posts}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
      />
  )
}

export default MyProfile;