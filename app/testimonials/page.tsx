export const dynamic = "force-dynamic";
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import prisma from "@/lib/prisma"
import Image from "next/image"

async function getTestimonials() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { status: 'published' },
      orderBy: { createdAt: 'desc' },
    })
    return testimonials
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return []
  }
}

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials()

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-white to-indigo-50 py-20">
        <div className="container">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Customer Testimonials
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Read what our happy customers have to say about their Bonjuekittens experience and the beautiful 
              kittens they've welcomed into their families.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 bg-background">
        <div className="container">
          {testimonials.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">No Testimonials Yet</h2>
              <p className="text-muted-foreground">
                We're waiting for our first customer testimonials. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial: any) => (
                <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-4">
                      {testimonial.imageUrl ? (
                        <Image
                          src={testimonial.imageUrl}
                          alt={testimonial.customerName}
                          width={80}
                          height={80}
                          className="rounded-full object-cover mb-4 border-2 border-purple-200"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-secondary/60 flex items-center justify-center mb-4">
                          <span className="text-gray-400 text-2xl">🐾</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating || 5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                      <span className="ml-2 text-sm text-muted-foreground">
                        {testimonial.rating || 5}/5
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-4 italic leading-relaxed">
                      "{testimonial.comment}"
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-foreground">
                        {testimonial.customerName}
                      </p>
                      <Badge variant="secondary" className="text-xs">
                        {new Date(testimonial.createdAt).toLocaleDateString()}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-600">
        <div className="container text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Join Our Happy Family?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Browse our available kittens and start your journey to finding the perfect feline companion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/kittens"
                className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-purple-600 bg-background rounded-lg hover:bg-secondary/20 transition-colors"
              >
                View Available Kittens
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white border-2 border-white rounded-lg hover:bg-background hover:text-purple-600 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 