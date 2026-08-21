"use client"

import type React from "react"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Mail } from "lucide-react"
import { useForm } from "react-hook-form"
import { useState } from "react"

type FormValues = {
  customerName: string
  email: string
  phone: string
  state: string
  city: string
  breedingIntentions: string
  hasPets: string
  purchaseTimeline: string
  kittenName: string
  message: string
}

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
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
    },
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const onSubmit = async (formData: FormValues) => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, status: "new" }),
      })

      if (response.ok) {
        toast({
          title: "Message sent!",
          description: "Thank you for your inquiry. We'll get back to you within 24 hours.",
        })
        reset()
      } else {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || "Failed to send message")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header — amber/yellow theme consistent with the rest of the site */}
      <section className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 py-16">
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
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
                  {/* Name + Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="customerName">Full Name *</Label>
                      <Input
                        id="customerName"
                        {...register("customerName", { required: "Full name is required" })}
                        aria-invalid={!!errors.customerName}
                      />
                      {errors.customerName && (
                        <p className="text-sm text-destructive">{errors.customerName.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Enter a valid email address",
                          },
                        })}
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" {...register("phone")} />
                  </div>

                  {/* Location */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input id="state" placeholder="Enter your state" {...register("state")} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="Enter your city" {...register("city")} />
                    </div>
                  </div>

                  {/* Breeding Intentions */}
                  <div className="space-y-2">
                    <Label>Do you have intentions of breeding?</Label>
                    <Select
                      value={watch("breedingIntentions")}
                      onValueChange={(val) => setValue("breedingIntentions", val)}
                    >
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
                    <Label>Do you have any pets?</Label>
                    <Select value={watch("hasPets")} onValueChange={(val) => setValue("hasPets", val)}>
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
                    <Label>How soon are you ready to purchase?</Label>
                    <Select
                      value={watch("purchaseTimeline")}
                      onValueChange={(val) => setValue("purchaseTimeline", val)}
                    >
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
                      placeholder="Enter kitten name"
                      {...register("kittenName")}
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      rows={5}
                      placeholder="Tell us about yourself, your family, and what you're looking for in a kitten..."
                      {...register("message", { required: "Message is required" })}
                      aria-invalid={!!errors.message}
                    />
                    {errors.message && (
                      <p className="text-sm text-destructive">{errors.message.message}</p>
                    )}
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
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
                    <Mail className="h-6 w-6 text-primary mt-1" />
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
  )
}
