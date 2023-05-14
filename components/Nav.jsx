"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders } from "next-auth/react"

const Nav = () => {
  const isUserLoggedIn = true
    const [providers, setProviders] = useState(null)
    const [toggleDropdovn, setToggleDropdovn] = useState(false)
    useEffect(() => {
        const setProvsders = async () => {
            const res = await getProviders()
            setProviders(res)
        }
    }, [])
  return (
      <nav className="flex flex-between w-full mb-16 pt-3">
          <Link href='/' className="flex gap-2 flex-center">
              <Image src="/assets/images/logo.svg" width={30} height={30} alt="Logo" className="object-contain"/>
                <p className="logo_text">Share Prompts</p>
          </Link>
          <div className="sm:flex hidden">
              {isUserLoggedIn ? (
                  <div className="flex gap-3 md:gap-5">
                      <Link href='/create-prompt' className="black_btn">
                          Create Post
                      </Link>
                      <button
                          onClick={() => signOut()}
                          className="outline_btn"
                      >Sign Out</button>
                      <Link href='/profile'>
                          <Image src="/assets/images/logo.svg" width={37} height={37} alt="Profile" className="rounded-full"/>
                      </Link>
                  </div>
              ): (
                      <>
                          {providers && Object.values(providers).map((provider) => (
                              <button
                                  type="button"
                                  key={provider.name}
                                  onClick={() => signIn(provider.id)}
                                  className="black_btn"
                              >Sign in with {provider.name}</button>
                          ))}
                  </>
              )}
          </div>
          <div className="sm:hidden flex relative">
              {isUserLoggedIn ? (
                  <div className="flex">
                      <Image
                          src="/assets/images/logo.svg"
                          width={37} height={37}
                          alt="profile" className="rounded-full"
                          onClick={() => {setToggleDropdovn((prev) => !prev)}}
                      />
                      {toggleDropdovn && (
                          <div className="dropdown">
                              <Link
                                  href='/profile'
                                  className="dropdown_Link"
                                  onClick={() => setToggleDropdovn(false)}
                              >My Profile</Link>
                              <Link
                                  href='/create-prompt'
                                  className="dropdown_Link"
                                  onClick={() => setToggleDropdovn(false)}
                              >Create Prompt</Link>
                              <button
                                  type="button"
                                  className="mt-4 w-full black_btn"
                                  onClick={() => {
                                      setToggleDropdovn(false)
                                      signOut()
                                  }}>Sign Out</button>
                          </div>
                      )}
                  </div>
              ) : (
                      <>
                          {providers && Object.values(providers).map((provider) => (
                              <button
                                  type="button"
                                  key={provider.name}
                                  onClick={() => signIn(provider.id)}
                                  className="black_btn"
                              >Sign in with {provider.name}</button>
                          ))}
                  </>
              )}
          </div>
    </nav>
  )
}

export default Nav