"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, MapPin, Calendar, DollarSign, Phone, Mail, Star, PawPrint, ArrowLeft, X } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface Kitten {
  id: number
  name: string
  gender: string
  ageWeeks: number
  color: string
  price: number
  description: string
  healthRecords: string
  images: string[]
  status: string
  featured: boolean
  breed?: {
    id: number
    name: string
    description: string
    characteristics: string
    colors: string
    patterns: string
    temperament: string
    size: string
    lifespan: string
    imageUrl: string
  }
}

export default function KittenDetailsPage() {
  const params = useParams()
  const [kitten, setKitten] = useState<Kitten | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedImage, setSelectedImage] = useState(0)
  const [inquiryOpen, setInquiryOpen] = useState(false)
  const [inquiryData, setInquiryData] = useState({
    customerName: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    breedingIntentions: "",
    hasPets: "",
    purchaseTimeline: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const fetchKitten = async () => {
      try {
        const response = await fetch(`/api/kittens/${params.id}`)
        if (response.ok) {
          const data = await response.json()
          setKitten(data)
        } else {
          setError("Kitten not found")
        }
      } catch (err) {
        setError("Failed to load kitten details")
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchKitten()
    }
  }, [params.id])

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...inquiryData,
          kittenId: kitten?.id || null,
          status: 'new',
        }),
      })

      if (response.ok) {
        toast({
          title: "Inquiry sent!",
          description: "Thank you for your interest in " + kitten?.name + ". We'll get back to you within 24 hours.",
        })
        
        setInquiryData({
          customerName: "",
          email: "",
          phone: "",
          state: "",
          city: "",
          breedingIntentions: "",
          hasPets: "",
          purchaseTimeline: "",
          message: "",
        })
        setInquiryOpen(false)
      } else {
        throw new Error('Failed to send inquiry')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send inquiry. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInquiryChange = (field: string, value: string) => {
    setInquiryData(prev => ({ ...prev, [field]: value }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading kitten details...</p>
        </div>
      </div>
    )
  }

  if (error || !kitten) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Kitten Not Found</h1>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Link href="/kittens">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Kittens
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      {/* Header */}
      <header className="bg-background border-b shadow-sm border-border">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/kittens" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Kittens</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-indigo-500">
                  <Heart className="h-4 w-4 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Bonjuekittens
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-background shadow-lg">
              {kitten.images && kitten.images.length > 0 ? (
                <img
                  src={kitten.images[selectedImage]}
                  alt={kitten.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-secondary/40">
                  <PawPrint className="h-16 w-16 text-gray-400" />
                </div>
              )}
            </div>
            
            {/* Thumbnail Gallery */}
            {kitten.images && kitten.images.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {kitten.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-purple-500' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${kitten.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Kitten Details */}
          <div className="space-y-6">
            {/* Header Info */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">{kitten.name}</h1>
                  <p className="text-xl text-muted-foreground">{kitten.breed?.name || 'Unknown Breed'}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {kitten.featured && (
                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                </div>
              </div>

              {/* Status and Price */}
              <div className="flex items-center justify-between p-4 bg-background border border-border rounded-lg shadow-sm">
                <div>
                  <Badge 
                    variant={kitten.status === "available" ? "default" : "secondary"}
                    className={kitten.status === "available" ? "bg-green-100 text-green-800 border-green-200" : "bg-yellow-100 text-yellow-800 border-yellow-200"}
                  >
                    {kitten.status.charAt(0).toUpperCase() + kitten.status.slice(1)}
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-purple-600">${kitten.price?.toString()}</p>
                  <p className="text-sm text-muted-foreground">Adoption Fee</p>
                </div>
              </div>
            </div>

            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <PawPrint className="h-4 w-4 text-purple-600" />
                    <span className="text-sm text-muted-foreground">Gender:</span>
                    <span className="font-medium">{kitten.gender}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-purple-600" />
                    <span className="text-sm text-muted-foreground">Age:</span>
                    <span className="font-medium">{kitten.ageWeeks} weeks</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full border-2 border-purple-600"></div>
                    <span className="text-sm text-muted-foreground">Color:</span>
                    <span className="font-medium">{kitten.color}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full border-2 border-purple-600"></div>
                    <span className="text-sm text-muted-foreground">Size:</span>
                    <span className="font-medium">{kitten.breed?.size || 'Unknown'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">About {kitten.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/90 leading-relaxed">{kitten.description}</p>
              </CardContent>
            </Card>

            {/* Health Records */}
            {kitten.healthRecords && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Health Records</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/90">{kitten.healthRecords}</p>
                </CardContent>
              </Card>
            )}

            {/* Breed Information */}
            {kitten.breed && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">About {kitten.breed.name} Breed</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-foreground/90">{kitten.breed.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Characteristics</h4>
                      <p className="text-sm text-muted-foreground">{kitten.breed.characteristics}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Temperament</h4>
                      <p className="text-sm text-muted-foreground">{kitten.breed.temperament}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Colors</h4>
                      <p className="text-sm text-muted-foreground">{kitten.breed.colors}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Lifespan</h4>
                      <p className="text-sm text-muted-foreground">{kitten.breed.lifespan}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Contact Section */}
            <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
              <CardHeader>
                <CardTitle className="text-lg text-purple-900">Interested in {kitten.name}?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground/90">
                  Ready to welcome {kitten.name} into your family? Contact us to arrange a visit or ask any questions.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Dialog open={inquiryOpen} onOpenChange={setInquiryOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-purple-600 hover:bg-purple-700 text-white w-full">
                        <Mail className="h-4 w-4 mr-2" />
                        Send Inquiry
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Inquiry about {kitten.name}</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleInquirySubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="customerName">Full Name *</Label>
                            <Input
                              id="customerName"
                              value={inquiryData.customerName}
                              onChange={(e) => handleInquiryChange("customerName", e.target.value)}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email *</Label>
                            <Input
                              id="email"
                              type="email"
                              value={inquiryData.email}
                              onChange={(e) => handleInquiryChange("email", e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={inquiryData.phone}
                            onChange={(e) => handleInquiryChange("phone", e.target.value)}
                          />
                        </div>

                        {/* Location Fields */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="state">State</Label>
                            <Input
                              id="state"
                              value={inquiryData.state}
                              onChange={(e) => handleInquiryChange("state", e.target.value)}
                              placeholder="Enter your state"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input
                              id="city"
                              value={inquiryData.city}
                              onChange={(e) => handleInquiryChange("city", e.target.value)}
                              placeholder="Enter your city"
                            />
                          </div>
                        </div>

                        {/* Breeding Intentions */}
                        <div className="space-y-2">
                          <Label htmlFor="breedingIntentions">Do you have intentions of breeding?</Label>
                          <Select value={inquiryData.breedingIntentions} onValueChange={(value) => handleInquiryChange("breedingIntentions", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select breeding intentions" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="yes">Yes</SelectItem>
                              <SelectItem value="no">No</SelectItem>
                              <SelectItem value="maybe">Maybe/Undecided</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Pets */}
                        <div className="space-y-2">
                          <Label htmlFor="hasPets">Do you have any pets?</Label>
                          <Select value={inquiryData.hasPets} onValueChange={(value) => handleInquiryChange("hasPets", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select pet status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="yes">Yes</SelectItem>
                              <SelectItem value="no">No</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Purchase Timeline */}
                        <div className="space-y-2">
                          <Label htmlFor="purchaseTimeline">How soon are you ready to purchase?</Label>
                          <Select value={inquiryData.purchaseTimeline} onValueChange={(value) => handleInquiryChange("purchaseTimeline", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select purchase timeline" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="immediately">Immediately</SelectItem>
                              <SelectItem value="within_week">Within a week</SelectItem>
                              <SelectItem value="within_month">Within a month</SelectItem>
                              <SelectItem value="within_3_months">Within 3 months</SelectItem>
                              <SelectItem value="more_than_3_months">More than 3 months</SelectItem>
                              <SelectItem value="just_browsing">Just browsing</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="message">Message *</Label>
                          <Textarea
                            id="message"
                            rows={4}
                            value={inquiryData.message}
                            onChange={(e) => handleInquiryChange("message", e.target.value)}
                            placeholder={`Tell us about yourself and why you're interested in ${kitten.name}...`}
                            required
                          />
                        </div>
                        
                        <div className="flex justify-end gap-2 pt-4">
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => setInquiryOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Sending..." : "Send Inquiry"}
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  <p>✉️ info@bonjuekittens.com</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 