"use client"

import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return
    
    if (!session) {
      // Redirect to NextAuth login page
      router.push("/admin/login")
    } else if (session.user.role === "admin") {
      // Redirect to dashboard if already authenticated
      router.push("/admin/dashboard")
    } else {
      // Not an admin, sign out and redirect to login
      signOut({ callbackUrl: "/admin/login" })
    }
  }, [session, status, router])

  // Show loading while checking authentication
  return (
    <div className="min-h-screen bg-secondary/20 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p className="text-muted-foreground">Checking authentication...</p>
      </div>
    </div>
  )
}
