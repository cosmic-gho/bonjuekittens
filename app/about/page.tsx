import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Heart, Award, Shield, Users } from "lucide-react"

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Love & Care",
      description:
        "Every kitten is raised with love in our family home, ensuring they are well-socialized and ready for their new families.",
    },
    {
      icon: Award,
      title: "Quality Breeding",
      description:
        "We maintain the highest standards in breeding, working only with champion bloodlines and health-tested parents.",
    },
    {
      icon: Shield,
      title: "Health First",
      description:
        "All our kittens receive comprehensive veterinary care, vaccinations, and come with a health guarantee.",
    },
    {
      icon: Users,
      title: "Family Focus",
      description:
        "We carefully match kittens with families to ensure the perfect fit for both the kitten and their new home.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="bg-gradient-to-br from-purple-50 to-indigo-50 py-16">
        <div className="container">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">About Bonjuekittens</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A family-owned cattery dedicated to breeding healthy, beautiful, and well-socialized kittens with love,
              care, and the highest ethical standards.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Our Story</h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Bonjuekittens began as a dream shared by our family - a passion for cats and a commitment to
                  ethical breeding practices. What started as a love for these magnificent creatures has grown into a
                  respected cattery known for producing healthy, beautiful, and well-tempered kittens.
                </p>
                <p>
                  For over a decade, we have been dedicated to preserving and improving the breeds we love: Persian,
                  Maine Coon, British Shorthair, and Ragdoll cats. Each of our breeding cats is carefully selected not
                  only for their beauty and conformation to breed standards but also for their health, temperament, and
                  genetic diversity.
                </p>
                <p>
                  Our kittens are raised in our home as part of our family, ensuring they are well-socialized,
                  confident, and ready to become beloved companions in their new homes. We believe that the early weeks
                  of a kitten's life are crucial for their development, which is why we provide constant love,
                  attention, and proper care from birth.
                </p>
              </div>
            </div>

            <div className="relative">
              <Image
                src="https://res.cloudinary.com/dxufnlb6q/image/upload/v1758088903/ChatGPT_Image_Sep_17_2025_07_01_18_AM_txqpfd.png"
                alt="Our cattery family"
                width={500}
                height={500}
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full opacity-20 blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Our Values & Commitment</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything we do is guided by our core values and commitment to excellence in cat breeding.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Breeding Philosophy */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Our Breeding Philosophy</h2>
              <p className="text-xl text-muted-foreground">
                Ethical breeding practices that prioritize health, temperament, and breed standards
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Health Testing</h3>
                  <p className="text-muted-foreground">
                    All our breeding cats undergo comprehensive health testing including genetic screening, heart
                    clearances, and regular veterinary examinations to ensure we're breeding only the healthiest cats.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Selective Breeding</h3>
                  <p className="text-muted-foreground">
                    We carefully plan each breeding to improve breed characteristics while maintaining genetic
                    diversity. Our goal is to produce kittens that excel in health, temperament, and conformation.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Early Socialization</h3>
                  <p className="text-muted-foreground">
                    From birth, our kittens are handled daily and exposed to various sights, sounds, and experiences to
                    ensure they develop into confident, well-adjusted cats.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Lifetime Support</h3>
                  <p className="text-muted-foreground">
                    Our relationship doesn't end when you take your kitten home. We provide ongoing support and are
                    always available to answer questions about your cat's care and development.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-secondary/20">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">Certifications & Memberships</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">CFA Registered</h3>
                  <p className="text-sm text-muted-foreground">Registered with the Cat Fanciers' Association</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Health Certified</h3>
                  <p className="text-sm text-muted-foreground">All breeding cats health tested and certified</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">TICA Member</h3>
                  <p className="text-sm text-muted-foreground">Member of The International Cat Association</p>
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
