import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Shield, 
  Heart, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Award,
  Users,
  Sun,
  Utensils,
  Plane,
  Phone,
  Mail
} from "lucide-react"

export default function HealthGuaranteePage() {
  const warrantyParts = [
    {
      title: "Part 1: Protection Against Illness Upon Arrival",
      description: "We ensure that our kittens leave our care healthy and free from contagious diseases.",
      details: [
        "Veterinary examination required within 96 hours of receiving your kitten",
        "Full refund if vet determines kitten is seriously ill or unfit for sale",
        "Written statement from veterinarian required",
        "Veterinary fees are not reimbursed",
        "Shipping costs are non-refundable, but return shipping is covered",
        "Strict 96-hour limit applies regardless of vet availability"
      ]
    },
    {
      title: "Part 2: Protection Against Genetic Defects and Congenital Diseases",
      description: "We are committed to the long-term health of your kitten.",
      details: [
        "Replacement kitten for serious genetic defects diagnosed before age 2",
        "Covers conditions affecting longevity or quality of life",
        "Second opinion from veterinarian covered at our expense",
        "We work closely with you to ensure your kitten's well-being"
      ]
    }
  ]

  const coveredConditions = [
    "Life-threatening heart defects",
    "Degenerative nerve diseases"
  ]

  const notCoveredConditions = [
    "Mild heart murmurs",
    "Allergies or conditions that do not affect quality of life"
  ]

  const promises = [
    {
      icon: Award,
      title: "Certified Veterinary Care",
      description: "All our kittens come with complete veterinary certifications and up-to-date vaccination records."
    },
    {
      icon: Users,
      title: "Exercise & Socialization",
      description: "We prioritize ample exercise, natural light, and interaction with other kittens to ensure they are well-adjusted and social."
    },
    {
      icon: Utensils,
      title: "High-Quality Nutrition",
      description: "Our kittens are raised on a balanced diet of premium wet and dry food to ensure their health and development."
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-white to-indigo-50 py-20">
        <div className="container">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Health Guarantee
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              At Bonjuekittens, we bring over 25 years of experience in breeding healthy, well-socialized kittens. 
              Our knowledge of feline temperament, behavior, and health needs ensures that we provide you with a high-quality companion.
            </p>
          </div>
        </div>
      </section>

      {/* Warranty Overview */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Our Health Warranty
              </h2>
              <p className="text-xl text-muted-foreground">
                While we can't offer a guarantee that any living being will never get sick, we stand behind our kittens 
                with a Health Warranty that protects both you and your new kitten.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {warrantyParts.map((part, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-foreground mb-4">{part.title}</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">{part.description}</p>
                    <ul className="space-y-3">
                      {part.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-foreground/90">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Conditions Coverage */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-center mb-12">
              What's Covered vs. Not Covered
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Covered Conditions */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">Conditions Covered</h3>
                  </div>
                  <ul className="space-y-3">
                    {coveredConditions.map((condition, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-foreground/90">{condition}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Not Covered Conditions */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                      <XCircle className="h-6 w-6 text-red-600" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">Conditions Not Covered</h3>
                  </div>
                  <ul className="space-y-3">
                    {notCoveredConditions.map((condition, index) => (
                      <li key={index} className="flex items-start">
                        <XCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-foreground/90">{condition}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* VIP Delivery Service */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Plane className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                VIP Delivery Service (Optional)
              </h2>
              <p className="text-xl text-muted-foreground">
                Premium hand-delivery service for your peace of mind
              </p>
            </div>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">Service Features:</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-foreground/90">Hand-delivered to airport of your choice</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-foreground/90">Professional Pet Nanny accompanies your kitten</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-foreground/90">Ensures comfort, safety, and happiness during flight</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-foreground/90">Receive pictures to keep you updated on journey</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">Pickup Process:</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-foreground/90">Pick up at airport with just a photo ID</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-foreground/90">Simple and stress-free process</span>
                      </li>
                    </ul>
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <p className="text-blue-800 text-sm">
                        <strong>Note:</strong> This service is optional and available for an additional fee.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Promise */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Our Promise to You
            </h2>
            <p className="text-xl text-muted-foreground">
              At Bonjuekittens, we believe in raising kittens with love and care. 
              All our kittens are litter-trained, well-socialized, and ready to become cherished members of your family.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {promises.map((promise, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <promise.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{promise.title}</h3>
                  <p className="text-muted-foreground">{promise.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Health Warranty */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Why Choose Our Health Warranty?
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We understand how important it is to feel confident in the health and well-being of your new kitten. 
              Our Health Warranty offers peace of mind, knowing that we stand behind the quality of our kittens and 
              are here to support you throughout your kitten's life. With over 25 years of experience, our commitment 
              to excellence means we take every step to ensure you receive a healthy, happy, and well-adjusted kitten.
            </p>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-600">
        <div className="container text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Questions About Our Health Guarantee?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              We're here to answer any questions you may have about our health warranty or kitten care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center justify-center space-x-2">
                <Phone className="h-5 w-5" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>info@bonjuekittens.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 