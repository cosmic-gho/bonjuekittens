"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ClientWrapper } from "@/components/client-wrapper"
import { HydrationSafe } from "@/components/hydration-safe"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    breedingIntentions: "",
    hasPets: "",
    purchaseTimeline: "",
    kittenName: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          status: 'new',
        }),
      })

      if (response.ok) {
        toast({
          title: "Message sent!",
          description: "Thank you for your inquiry. We'll get back to you within 24 hours.",
        })

        setFormData({
          customerName: "",
          email: "",
          phone: "",
          state: "",
          city: "",
          breedingIntentions: "",
          hasPets: "",
          purchaseTimeline: "",
          kittenName: "",
          message: "",
        })
      } else {
        const errorData = await response.json().catch(() => ({}))
        const errorMessage = errorData.error || 'Failed to send message'
        throw new Error(errorMessage)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send message. Please try again.'
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <HydrationSafe>
      <div className="min-h-screen bg-background">
        <Navigation />

        {/* Header */}
        <section className="bg-gradient-to-br from-purple-50 to-indigo-50 py-16">
          <div className="container">
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">Contact Us</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Ready to welcome a new kitten into your family? We'd love to hear from you! Get in touch to learn more
                about our available kittens or ask any questions.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Send us a message</CardTitle>
                </CardHeader>
                <CardContent>
                <ClientWrapper>
                  <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="customerName">Full Name *</Label>
                      <Input
                        id="customerName"
                        value={formData.customerName}
                        onChange={(e) => handleChange("customerName", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                    />
                  </div>

                  {/* Location Fields */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => handleChange("state", e.target.value)}
                        placeholder="Enter your state"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleChange("city", e.target.value)}
                        placeholder="Enter your city"
                      />
                    </div>
                  </div>

                  {/* Breeding Intentions */}
                  <div className="space-y-2">
                    <Label htmlFor="breedingIntentions">Do you have intentions of breeding?</Label>
                    <Select value={formData.breedingIntentions} onValueChange={(value) => handleChange("breedingIntentions", value)}>
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
                    <Select value={formData.hasPets} onValueChange={(value) => handleChange("hasPets", value)}>
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
                    <Select value={formData.purchaseTimeline} onValueChange={(value) => handleChange("purchaseTimeline", value)}>
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

                  {/* Kitten Name */}
                  <div className="space-y-2">
                    <Label htmlFor="kittenName">Name of Kitten (if interested in a specific one)</Label>
                    <Input
                      id="kittenName"
                      value={formData.kittenName}
                      onChange={(e) => handleChange("kittenName", e.target.value)}
                      placeholder="Enter kitten name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      placeholder="Tell us about yourself, your family, and what you're looking for in a kitten..."
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
                </ClientWrapper>
              </CardContent>
            </Card>

              {/* Contact Information */}
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Get in touch</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Mail className="h-6 w-6 text-purple-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground">Email</h3>
                      <p className="text-muted-foreground">info@bonjuekittens.com</p>
                      <p className="text-sm text-muted-foreground">We respond within 24 hours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>What to expect</CardTitle>
                  </CardHeader>
                  <CardContent>
                  <div className="space-y-4 text-sm text-muted-foreground">
                    <p>
                      <strong>Response Time:</strong> We typically respond to inquiries within 24 hours during business
                      days.
                    </p>
                    <p>
                      <strong>Kitten Visits:</strong> We welcome visits to meet our kittens by appointment. This helps
                      ensure the best match for your family.
                    </p>
                    <p>
                      <strong>Application Process:</strong> Interested families complete an application to help us
                      understand your needs and preferences.
                    </p>
                    <p>
                      <strong>Health Records:</strong> All kittens come with complete health records, vaccinations, and
                      our health guarantee.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

        <Footer />
      </div>
    </HydrationSafe>
  )
}
