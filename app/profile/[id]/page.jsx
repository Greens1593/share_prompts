'use client'

import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'next/navigation'

import Profile from '@components/Profile'


const UserProfile = () => {
  const name = useSearchParams().get('name')
  const capitalized = name.charAt(0).toUpperCase() + name.slice(1)
  const {id} = useParams()
  const [userPosts, setUserPosts] = useState([])
  
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${id.toString()}/posts`)
      const data = await res.json()
      setUserPosts(data)
    }
    if (id) fetchPosts()
  })
  return (
      <Profile
          name={capitalized}
          desc={`Welcome to ${capitalized} personalized profile page`}
          data={userPosts}
      />
  )
}

export default UserProfile;