import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Plane, 
  Truck, 
  Shield, 
  MapPin, 
  Clock, 
  DollarSign, 
  CheckCircle, 
  AlertCircle,
  Phone,
  Mail
} from "lucide-react"

export default function ShippingDeliveryPage() {
  const shippingOptions = [
    {
      icon: Plane,
      title: "Airline Shipping",
      description: "Shipping by Airlines, we offer shipping to all destinations within the U.S. and Canada.",
      features: [
        "Shipping charges range from $150 to $300",
        "Includes airfare, shipping crate (pet taxi), veterinary health certificate",
        "Kitten care packet with food and essential care information",
        "Optional professional pet shipping agency with Pet Nannies",
        "Counter-to-counter service in pressurized, temperature-controlled compartment",
        "Flight duration: 4 to 9 hours",
        "Food and water provided for hydration during journey"
      ]
    },
    {
      icon: Truck,
      title: "Specialized Ground Service",
      description: "Alternatively, you can choose specialized ground transport for direct delivery to your doorstep.",
      features: [
        "Available throughout the U.S. and Canada",
        "Pricing based on distance and location",
        "Dedicated pet nanny accompanies your kitten",
        "More affordable than air travel",
        "May take longer than air travel"
      ]
    }
  ]

  const safetyFeatures = [
    "Food and feeding instructions provided",
    "Frozen water that gradually thaws during the trip",
    "Soft bed of shredded newspapers for comfort",
    "Chew toy for entertainment",
    "Sock with our scent for security",
    "Close journey monitoring and flight tracking",
    "Same-day arrival, often just hours after departure"
  ]

  const pickupItems = [
    "A clean, soft towel",
    "Fragrance-free baby wipes", 
    "Paper towels",
    "Fresh, clean water"
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-white to-indigo-50 py-20">
        <div className="container">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Shipping & Delivery Information
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We offer safe and reliable shipping options to bring your new kitten home. 
              Learn about our shipping methods, safety measures, and pickup procedures.
            </p>
          </div>
        </div>
      </section>

      {/* Shipping Options */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              How Are Kittens Shipped?
            </h2>
            <p className="text-xl text-muted-foreground">
              Choose the shipping method that works best for you and your new kitten
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {shippingOptions.map((option, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mr-4">
                      <option.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">{option.title}</h3>
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{option.description}</p>
                  <ul className="space-y-3">
                    {option.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-foreground/90">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Is Shipping Safe for the Kitten?
              </h2>
              <p className="text-xl text-muted-foreground">
                We understand your concerns, but rest assured, the safety and comfort of your kitten are our top priority.
              </p>
            </div>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <p className="text-foreground/90 mb-6 leading-relaxed">
                  Shipping via American airlines is safe and well-regulated, with stringent measures in place to protect pets during travel. 
                  We take great care to ensure that your kitten has everything it needs for a smooth journey.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">What's Included in Each Crate:</h3>
                    <ul className="space-y-3">
                      {safetyFeatures.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-foreground/90">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">Our Safety Commitment:</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-foreground/90">Close monitoring of entire journey</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-foreground/90">Flight and layover tracking</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-foreground/90">Same-day arrival typically</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-foreground/90">Often just hours after departure</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-center mb-12">
              Frequently Asked Questions
            </h2>

            <div className="space-y-8">
              {/* FAQ Item 1 */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Can I Travel to Pick Up My Kitten?
                  </h3>
                  <p className="text-foreground/90 leading-relaxed">
                    Absolutely! You're welcome to travel and pick up your kitten in person. Most airlines don't charge an additional fee for flying with a kitten, aside from the standard personal flight fee. However, some airlines may charge an extra fee for pet travel, so it's best to check with the airline directly.
                  </p>
                </CardContent>
              </Card>

              {/* FAQ Item 2 */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Does My Kitten Need a Vaccine After Arrival?
                  </h3>
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    No, we do not recommend vaccinating your new kitten within the first 14 days of arrival. Your kitten will already be up-to-date on vaccinations before leaving our care. It's important to let your kitten adjust to their new environment before any additional stress or vaccinations are introduced.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-blue-800">
                      <strong>Important:</strong> We recommend taking your kitten for a check-up within 48 hours of arrival to ensure their health and well-being. If any health issues are discovered, we will either provide you with a new kitten or issue a refund if no other kitten is available.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ Item 3 */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Can I Get a Discount?
                  </h3>
                  <p className="text-foreground/90 leading-relaxed">
                    Yes! If you and a friend purchase two or more kittens at the same time and they travel together on the same flight, we can offer a discount of $100 - $300 off the final price. Please note that this discount is not available for all kittens and breeds, so contact us directly for more information. Shipping will be arranged once the kitten is paid in full, and the sales agreement contract has been signed.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pickup Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Picking Up Your Kitten from the Airport
              </h2>
              <p className="text-xl text-muted-foreground">
                Everything you need to know about picking up your new kitten
              </p>
            </div>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">What You'll Receive:</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-foreground/90">Email confirmation with flight details</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-foreground/90">Precise airport location for pickup</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-foreground/90">Unique confirmation number</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-foreground/90">Arrival time and instructions</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">What to Bring:</h3>
                    <ul className="space-y-3">
                      {pickupItems.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-foreground/90">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <p className="text-yellow-800 text-sm">
                        <strong>Important:</strong> Please make sure to arrive on time and bring a valid ID for verification.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-600">
        <div className="container text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Still Have Questions?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Feel free to reach out to us if you have any further questions about shipping, delivery or pickup. We're happy to help!
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