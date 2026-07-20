import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import prisma from "@/lib/prisma"

export const metadata = {
  title: 'Our Breeds - Bonjuekittens',
  description: 'Learn about the different kitten breeds we offer, including their temperaments, characteristics, and lifespan.',
}

export default async function BreedsPage() {
  // Fetch breeds directly on the server
  const breeds = await prisma.breed.findMany({
    orderBy: { name: 'asc' }
  })

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-secondary/20 dark:to-background py-16">
        <div className="container">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">Our Kitten Breeds</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the unique characteristics, temperaments, and histories of the beautiful breeds we raise.
            </p>
          </div>
        </div>
      </section>

      {/* Breeds Grid */}
      <section className="py-16 flex-grow">
        <div className="container">
          {breeds.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground mb-4">No breeds found in the database.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {breeds.map((breed) => (
                <Card key={breed.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
                  {breed.imageUrl && (
                    <div className="relative">
                      <Image
                        src={breed.imageUrl}
                        alt={breed.name}
                        width={600}
                        height={400}
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white drop-shadow-md">
                        {breed.name}
                      </h3>
                    </div>
                  )}
                  <CardContent className="p-6">
                    {!breed.imageUrl && (
                      <h3 className="text-2xl font-bold text-foreground mb-4">{breed.name}</h3>
                    )}
                    
                    {breed.description && (
                      <p className="text-muted-foreground mb-6 line-clamp-3">
                        {breed.description}
                      </p>
                    )}

                    <div className="space-y-4">
                      {breed.temperament && (
                        <div>
                          <h4 className="font-semibold text-sm uppercase text-secondary/80 mb-2">Temperament</h4>
                          <div className="flex flex-wrap gap-2">
                            {breed.temperament.split(',').map((trait, i) => (
                              <Badge key={i} variant="outline" className="bg-secondary/10 border-secondary/20">
                                {trait.trim()}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                        {breed.size && (
                          <div>
                            <span className="block text-xs font-semibold text-muted-foreground uppercase">Size</span>
                            <span className="text-sm text-foreground">{breed.size}</span>
                          </div>
                        )}
                        {breed.lifespan && (
                          <div>
                            <span className="block text-xs font-semibold text-muted-foreground uppercase">Lifespan</span>
                            <span className="text-sm text-foreground">{breed.lifespan}</span>
                          </div>
                        )}
                        {breed.colors && (
                          <div className="col-span-2">
                            <span className="block text-xs font-semibold text-muted-foreground uppercase">Common Colors</span>
                            <span className="text-sm text-foreground">{breed.colors}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
