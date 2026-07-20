"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Heart, Phone, Mail } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/kittens", label: "Available Kittens" },
    { href: "/breeds", label: "Breeds" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/shipping-delivery", label: "Shipping & Delivery" },
    { href: "/health-guarantee", label: "Health Guarantee" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/60 backdrop-blur-md supports-[backdrop-filter]:bg-background/40">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 group-hover:scale-110 transition-transform duration-300">
            <Heart className="h-4 w-4 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 dark:from-amber-400 dark:to-yellow-400 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
            Bonjuekittens
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors hover:scale-105"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
         
          {/* <Link href="/admin">
            <Button variant="outline" size="sm">
              Admin
            </Button>
          </Link> */}
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
          </div>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col space-y-4 mt-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-lg font-medium text-foreground/80 hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-border">
              
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                  <Mail className="h-4 w-4" />
                  <span>info@bonjuekittens.com</span>
                </div>
                {/* <Link href="/admin">
                  <Button variant="outline" className="w-full bg-transparent">
                    Admin Login
                  </Button>
                </Link> */}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
