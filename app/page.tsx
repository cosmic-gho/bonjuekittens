import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { Heart, Shield, Truck, Award, Star, ArrowRight, Phone, Mail } from "lucide-react"
import prisma from "@/lib/prisma"
import { HeroImageSlider } from "@/components/hero-image-slider"

// Force dynamic rendering to get fresh data
export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getFeaturedKittens() {
  try {
    const kittens = await prisma.kitten.findMany({
      where: { status: 'available' },
      include: { breed: true },
      orderBy: { createdAt: 'desc' },
      take: 3,
    })
    return kittens
  } catch (error) {
    console.error('Error fetching kittens:', error)
    return []
  }
}

async function getBreeds() {
  try {
    const breeds = await prisma.breed.findMany({
      orderBy: { name: 'asc' },
      take: 4,
    })
    return breeds
  } catch (error) {
    console.error('Error fetching breeds:', error)
    return []
  }
}

async function getTestimonials() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { status: 'published' },
      orderBy: { createdAt: 'desc' },
      take: 3,
    })
    return testimonials
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return []
  }
}

export default async function HomePage() {
  const features = [
    {
      icon: Heart,
      title: "Loving Care",
      description: "Every kitten is raised with love and attention in our family home environment.",
    },
    {
      icon: Shield,
      title: "Health Guarantee",
      description: "2-year health guarantee against genetic defects for your peace of mind.",
    },
    {
      icon: Truck,
      title: "Safe Delivery",
      description: "Professional transportation services to bring your kitten home safely.",
    },
    {
      icon: Award,
      title: "Champion Bloodlines",
      description: "Our breeding cats come from champion bloodlines with excellent pedigrees.",
    },
  ]

  const featuredKittens = await getFeaturedKittens()
  const featuredBreeds = await getBreeds()
  const testimonials = await getTestimonials()

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/30">
      {/* Dynamic Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-amber-500/20 dark:bg-amber-600/20 blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse duration-10000" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-yellow-500/20 dark:bg-yellow-600/20 blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse duration-10000 delay-1000" />
      </div>

      <Navigation />

      <HeroImageSlider />

      {/* Features Section */}
      <section className="py-24 relative z-10">
        <div className="container">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">Why Choose Us?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ethical breeding practices and healthy, well-socialized kittens.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="glass-card border-none hover:-translate-y-2 transition-all duration-300 group overflow-hidden bg-background/40 dark:bg-black/40">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardContent className="p-8 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-yellow-500/20 dark:from-amber-500/30 dark:to-yellow-500/30 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Kittens Section */}
      <section className="py-24 relative z-10">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div className="text-left animate-in fade-in slide-in-from-left-4 duration-700">
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">Available Kittens</h2>
              <p className="text-xl text-muted-foreground">Meet some of our adorable kittens</p>
            </div>
            <Link href="/kittens" className="hidden md:block">
              <Button variant="ghost" className="hover:bg-primary/10 text-primary rounded-full group">
                View All <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {featuredKittens.length === 0 ? (
            <div className="text-center py-12 glass-card rounded-2xl">
              <p className="text-muted-foreground">No kittens available at the moment. Please check back soon!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredKittens.map((kitten: any, index) => (
                <Card key={kitten.id} className="glass-card overflow-hidden border-white/20 dark:border-white/10 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 group rounded-3xl bg-background/40 dark:bg-black/40" style={{ animationDelay: `${index * 150}ms` }}>
                  <div className="relative overflow-hidden">
                    {kitten.images && kitten.images.length > 0 ? (
                      <Image
                        src={kitten.images[0]}
                        alt={kitten.name}
                        width={400}
                        height={300}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-64 bg-secondary flex items-center justify-center">
                        <span className="text-muted-foreground">No image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {kitten.featured && (
                      <Badge className="absolute top-4 right-4 bg-amber-400/90 text-amber-950 backdrop-blur-md border-none shadow-lg">
                        <Star className="h-3 w-3 mr-1 fill-current" />
                        Featured
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-8 relative">
                    <div className="absolute -top-6 right-8 bg-background/80 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-white/20 dark:border-white/10">
                      <span className="text-xl font-bold text-primary">${kitten.price?.toString()}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{kitten.name}</h3>
                    <div className="flex items-center gap-2 text-muted-foreground mb-4">
                      <Badge variant="secondary" className="bg-primary/5 text-primary-foreground/70 rounded-full">{kitten.breed?.name}</Badge>
                      <span className="text-sm">• {kitten.gender} • {kitten.ageWeeks} weeks</span>
                    </div>
                    <Link href={`/kittens/${kitten.id}`}>
                      <Button className="w-full bg-foreground text-background hover:bg-primary hover:text-primary-foreground transition-all duration-300 rounded-full h-12">
                        View Details
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          <div className="mt-8 text-center md:hidden">
            <Link href="/kittens">
              <Button variant="outline" className="w-full glass rounded-full">
                View All Kittens <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Breeds Section */}
      <section className="py-24 relative z-10">
        <div className="container">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">Our Cat Breeds</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Discover the beautiful breeds we specialize in at Bonjuekittens</p>
          </div>

          {featuredBreeds.length === 0 ? (
            <div className="text-center py-12 glass-card rounded-2xl">
              <p className="text-muted-foreground">Loading breed information...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {featuredBreeds.map((breed: any, index: number) => (
                <Card key={breed.id} className="glass-card overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group border-white/20 dark:border-white/10 bg-background/40 dark:bg-black/40" style={{ animationDelay: `${index * 150}ms` }}>
                  <div className="relative overflow-hidden">
                    <Image
                      src={breed.imageUrl || "/placeholder.svg"}
                      alt={breed.name}
                      width={300}
                      height={300}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <CardContent className="p-6 relative">
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{breed.name}</h3>
                    <p className="text-muted-foreground text-sm mb-6 line-clamp-3 leading-relaxed">
                      {breed.description}
                    </p>
                    <Link href={`/breeds`}>
                      <Button variant="outline" className="w-full glass hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 rounded-full">
                        Learn More
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center">
            <Link href="/breeds">
              <Button variant="outline" size="lg" className="glass rounded-full px-8 h-12">
                View All Breeds
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 relative z-10">
        <div className="container">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">What Our Customers Say</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Hear from families who have welcomed our kittens into their homes</p>
          </div>

          {testimonials.length === 0 ? (
            <div className="text-center py-12 glass-card rounded-2xl">
              <p className="text-muted-foreground">No testimonials available yet.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial: any, index: number) => (
                <Card key={testimonial.id} className="glass-card text-center border-white/20 dark:border-white/10 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 bg-background/40 dark:bg-black/40 relative overflow-hidden group" style={{ animationDelay: `${index * 150}ms` }}>
                   <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-yellow-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  <CardContent className="p-10">
                    <div className="flex justify-center mb-6">
                      {testimonial.imageUrl ? (
                        <Image
                          src={testimonial.imageUrl}
                          alt={testimonial.customerName}
                          width={80}
                          height={80}
                          className="rounded-full object-cover border-4 border-primary/20 shadow-md group-hover:border-primary/50 transition-colors duration-300"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-secondary/50 flex items-center justify-center border-4 border-primary/20 shadow-md">
                          <span className="text-muted-foreground text-3xl">🐾</span>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-center mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < testimonial.rating ? 'text-amber-400 fill-current' : 'text-muted/30'} group-hover:scale-110 transition-transform duration-300`} style={{ transitionDelay: `${i * 50}ms` }}
                        />
                      ))}
                    </div>
                    <p className="text-foreground/80 mb-6 italic leading-relaxed text-lg">"{testimonial.comment}"</p>
                    <p className="font-bold text-foreground text-lg">{testimonial.customerName}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative z-10">
        <div className="container relative">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-[3rem] opacity-10 dark:opacity-20 blur-xl"></div>
          <div className="glass-card bg-gradient-to-r from-amber-500/90 to-yellow-500/90 dark:from-amber-700/90 dark:to-yellow-700/90 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden border-white/20">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 relative z-10 drop-shadow-md">Ready to Find Your Purr-fect Companion?</h2>
            <p className="text-xl text-amber-100 mb-10 max-w-2xl mx-auto relative z-10 font-light">
              Contact us today to learn more about our available kittens and start your journey to welcoming a new family member.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <Link href="/contact">
                <Button size="lg" className="bg-background text-amber-600 hover:bg-secondary/20 h-14 px-8 rounded-full text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  Contact Us
                </Button>
              </Link>
              <Link href="/kittens">
                <Button size="lg" variant="outline" className="border-white/50 text-white hover:bg-background/20 h-14 px-8 rounded-full text-lg backdrop-blur-sm transition-all duration-300">
                  View Kittens
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
