"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function Dashboard() {
  const [user, setUser] = useState(null)

  // 🔐 Protect route + get user
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser()

      if (!data.user) {
        window.location.href = "/login"
      } else {
        setUser(data.user)
      }
    }

    checkUser()
  }, [])

  // 🚪 Logout function
  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = "/login"
  }

  return (
    
  <div className="h-screen flex flex-col justify-center items-center bg-black text-white">
    <h1 className="text-3xl font-bold mb-4">Dashboard 🚀</h1>

    <p className="mb-4">Welcome: {user?.email}</p>

    <button
      onClick={handleLogout}
      className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
    >
      Logout
    </button>
  </div>
)
}
