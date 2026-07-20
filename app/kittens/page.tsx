"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import { Search, Filter } from "lucide-react"

export default function KittensPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [breedFilter, setBreedFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [kittens, setKittens] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchKittens() {
      setLoading(true)
      try {
        // Use the current domain for API calls to avoid CORS issues
        const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'
        console.log('Fetching kittens from:', `${baseUrl}/api/kittens`)
        const res = await fetch(`${baseUrl}/api/kittens`)
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        const data = await res.json()
        console.log('Fetched kittens:', data)
        console.log('Number of kittens:', data.length)
        setKittens(data)
      } catch (e) {
        console.error('Error fetching kittens:', e)
        setKittens([])
      } finally {
        setLoading(false)
      }
    }
    fetchKittens()
  }, [])

  const filteredKittens = kittens.filter((kitten) => {
    const matchesSearch =
      kitten.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (kitten.breed?.name?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    const matchesBreed = breedFilter === "all" || (kitten.breed?.name === breedFilter)
    const matchesStatus = statusFilter === "all" || (kitten.status?.toLowerCase() === statusFilter.toLowerCase())
    return matchesSearch && matchesBreed && matchesStatus
  })

  console.log('Filtered kittens:', filteredKittens)
  console.log('Current filters:', { searchTerm, breedFilter, statusFilter })

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="bg-gradient-to-br from-purple-50 to-indigo-50 py-16">
        <div className="container">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">Available Kittens</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find your perfect feline companion from our carefully bred and lovingly raised kittens
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium text-foreground/90">Filter by:</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search kittens..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>

              <Select value={breedFilter} onValueChange={setBreedFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="All Breeds" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Breeds</SelectItem>
                  <SelectItem value="Persian">Persian</SelectItem>
                  <SelectItem value="Maine Coon">Maine Coon</SelectItem>
                  <SelectItem value="British Shorthair">British Shorthair</SelectItem>
                  <SelectItem value="Ragdoll">Ragdoll</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="reserved">Reserved</SelectItem>
                  <SelectItem value="sold">Sold</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Kittens Grid */}
      <section className="py-16">
        <div className="container">
          {loading ? (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground mb-4">Loading kittens...</p>
            </div>
          ) : filteredKittens.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground mb-4">No kittens found matching your criteria.</p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setBreedFilter("all")
                  setStatusFilter("all")
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-8">
                <p className="text-muted-foreground">
                  Showing {filteredKittens.length} of {kittens.length} kittens
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredKittens.map((kitten) => (
                  <Card key={kitten.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="relative">
                      <Image
                        src={kitten.images?.[0] || "/placeholder.svg"}
                        alt={kitten.name}
                        width={300}
                        height={300}
                        className="w-full h-64 object-cover"
                      />
                      <Badge
                        className={`absolute top-4 right-4 ${
                          kitten.status === "available"
                            ? "bg-green-500 hover:bg-green-500"
                            : kitten.status === "reserved"
                            ? "bg-orange-500 hover:bg-orange-500"
                            : "bg-secondary/200 hover:bg-secondary/200"
                        }`}
                      >
                        {kitten.status.charAt(0).toUpperCase() + kitten.status.slice(1)}
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold text-foreground">{kitten.name}</h3>
                        <span className="text-lg font-bold text-purple-600">${kitten.price?.toString()}</span>
                      </div>
                      <div className="space-y-1 mb-4">
                        <p className="text-muted-foreground">
                          {kitten.breed?.name} • {kitten.gender}
                        </p>
                        <p className="text-sm text-muted-foreground">{`${kitten.ageWeeks || "-"} weeks`} old</p>
                        <p className="text-sm text-muted-foreground">{kitten.color}</p>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{kitten.description}</p>
                      <div className="space-y-2">
                        <Link href={`/kittens/${kitten.id}`}>
                          <Button className="w-full">View Details</Button>
                        </Link>
                        {kitten.status === "available" && (
                          <Link href={`/contact?kitten=${kitten.id}`}>
                            <Button variant="outline" className="w-full bg-transparent">
                              Inquire Now
                            </Button>
                          </Link>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
