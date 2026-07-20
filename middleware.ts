import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // Allow access to admin routes if authenticated
    return null
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token && token.role === "admin"
    },
  }
)

export const config = {
  matcher: ["/admin/dashboard/:path*"]
} 