'use client'

import { useState, useEffect } from 'react'

import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [searchTimeout, setSearchTimeout] = useState(null)
  const [searchResults, setSearchResults] = useState([])
  const [posts, setPosts] = useState([])

  const filterPrompts = (searchText) => {
    const regex = new RegExp(`${searchText}`, 'i')
    const allPosts = posts
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    )
  }
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value)
        setSearchResults(searchResult);
      }, 500)
    )
  }
  const handleTagClick = (tag) => {
    setSearchText(tag);
    const searchResult = filterPrompts(tag)
    setSearchResults(searchResult);
  }
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/prompt')
      const data = await res.json()
      setPosts(data)
    }
    fetchPosts()
  })
  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>
      {searchResults.length === 0 && posts.length === 0 && (
        <span className='pb-4 head_text blue_gradient text-center'>There are no prompts yet.</span>
      )}
      <PromptCardList
        data={searchResults.length !== 0 ? searchResults : posts}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed