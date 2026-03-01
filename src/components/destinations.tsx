import { Card, CardContent } from "../components/ui/card"
import { MapPin } from "lucide-react"

const destinations = [
  {
    name: "Taj Mahal",
    location: "Agra",
    image: "/assets/taj-mahal-monument.jpg",
    description: "The epitome of love and architectural marvel",
  },
  {
    name: "Kerala Backwaters",
    location: "Kerala",
    image: "/assets/kerala-backwaters-houseboat.png",
    description: "Serene waterways through tropical paradise",
  },
  {
    name: "Jaipur City",
    location: "Rajasthan",
    image: "/assets/jaipur-pink-city-palace.jpg",
    description: "The Pink City of royal heritage",
  },
  {
    name: "Goa Beaches",
    location: "Goa",
    image: "/assets/goa-beach-sunset.jpg",
    description: "Sun, sand, and vibrant coastal culture",
  },
  {
    name: "Himalayan Trek",
    location: "Himachal Pradesh",
    image: "/assets/himalayan-mountains-trek.jpg",
    description: "Majestic peaks and spiritual journeys",
  },
  {
    name: "Varanasi Ghats",
    location: "Uttar Pradesh",
    image: "/assets/varanasi-ganges-river-ghats.jpg",
    description: "Ancient spiritual heart of India",
  },
]

export default function Destinations() {
  return (
    <section id="destinations" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 text-balance">Popular Destinations</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            From historic monuments to natural wonders, discover the diversity of India
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((destination, index) => (
            <Card key={index} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white mb-1">{destination.name}</h3>
                  <div className="flex items-center gap-1 text-white/90">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{destination.location}</span>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-muted-foreground leading-relaxed">{destination.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
