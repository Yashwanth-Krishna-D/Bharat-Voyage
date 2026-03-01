import { MapPin, Calendar, Camera, Shield } from "lucide-react"

const features = [
  {
    icon: MapPin,
    title: "Curated Destinations",
    description: "Explore handpicked locations from the Himalayas to tropical beaches",
  },
  {
    icon: Calendar,
    title: "Smart Planning",
    description: "AI-powered itinerary suggestions tailored to your preferences",
  },
  {
    icon: Camera,
    title: "Cultural Insights",
    description: "Deep dive into local traditions, festivals, and authentic experiences",
  },
  {
    icon: Shield,
    title: "Safe Travel",
    description: "Real-time safety updates and 24/7 traveler support",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 text-balance">Everything You Need for the Perfect Journey</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Plan, Explore, and Experience India 
            like never before with our comprehensive travel companion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <feature.icon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mb-16"> 
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto my-16 text-balance">
          From bookings to experiences — everything your trip needs, in one place.
          </p>
        </div>
        
      </div>
    </section>
  )
}
