import { useEffect, useState } from "react"

import {
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "firebase/auth"

import {
  auth,
  provider
} from "../firebase"

function Navbar() {

  const [user, setUser] =
    useState(null)

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        (currentUser) => {
          setUser(currentUser)
        }
      )

    return () => unsubscribe()

  }, [])


  // -------------------
  // LOGIN
  // -------------------
  const handleLogin =
    async () => {

      try {

        await signInWithPopup(
          auth,
          provider
        )

      } catch (error) {

        console.log(error)

        alert(
          "Login failed"
        )
      }
    }


  // -------------------
  // LOGOUT
  // -------------------
  const handleLogout =
    async () => {

      try {

        await signOut(auth)

      } catch (error) {

        console.log(error)
      }
    }

  return (
    <div
      className="
      flex
      justify-between
      items-center
      bg-white
      shadow-md
      px-8
      py-4
      "
    >

      <h1
        className="
        text-2xl
        font-bold
        text-blue-700
        "
      >
        Financial News AI
      </h1>

      {user ? (

        <div
          className="
          flex
          items-center
          gap-4
          "
        >

          <img
            src={user.photoURL}
            alt="profile"
            className="
            w-10
            h-10
            rounded-full
            "
          />

          <span
            className="
            font-medium
            text-gray-700
            "
          >
            {user.displayName}
          </span>

          <button
            onClick={handleLogout}
            className="
            bg-red-500
            text-white
            px-4
            py-2
            rounded-xl
            hover:bg-red-600
            transition
            "
          >
            Logout
          </button>

        </div>

      ) : (

        <button
          onClick={handleLogin}
          className="
          bg-blue-600
          text-white
          px-5
          py-2
          rounded-xl
          hover:bg-blue-700
          transition
          "
        >
          Sign in with Google
        </button>

      )}

    </div>
  )
}

export default Navbar