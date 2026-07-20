import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Kitten Details - Bonjuekittens",
  description: "View detailed information about our available kittens. Learn about their breed, health records, and personality traits.",
}

export default function KittenLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 