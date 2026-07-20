import Link from "next/link"
import { Heart, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-secondary/30 border-t border-border relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none" />
      <div className="container py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 group-hover:scale-110 transition-transform duration-300">
                <Heart className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-amber-600 to-yellow-600 dark:from-amber-400 dark:to-yellow-400 bg-clip-text text-transparent">
                Bonjuekittens
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Premium cat breeding with love, care, and dedication to healthy, beautiful kittens.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors cursor-pointer hover:scale-110 duration-300" />
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors cursor-pointer hover:scale-110 duration-300" />
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors cursor-pointer hover:scale-110 duration-300" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/kittens" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Available Kittens
              </Link>
              <Link href="/breeds" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Our Breeds
              </Link>
              <Link href="/testimonials" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Testimonials
              </Link>
              <Link href="/about" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                About Us
              </Link>
            </div>
          </div>

          {/* Policies */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Policies</h3>
            <div className="space-y-2">
              <Link href="/health-guarantee" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Health Guarantee
              </Link>
              <Link href="/shipping" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Shipping Info
              </Link>
              <Link href="/privacy" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-4 w-4" />
                <span>info@bonjuekittens.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Bonjuekittens. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
