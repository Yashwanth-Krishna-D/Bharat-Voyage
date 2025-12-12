import React from "react"
import {Compass, Sparkles } from "lucide-react"

const Hero: React.FC = () => {
  return (
    // The main section is relative to position children absolutely
    <section className="relative min-h-screen flex flex-col" aria-labelledby="hero-title">
      {/* Background and overlays remain outside the content flow */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/assets/taj-mahal-at-sunrise-vibrant-colors.jpg"
          alt="Taj Mahal sunrise"
          className="w-full h-full object-cover brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-transparent" />
        {/* single radial overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.10) 40%, rgba(0,0,0,0.40) 100%)",
          }}
        />
      </div>

      {/* Navbar is now absolutely positioned at the top. 
        It does not affect the vertical centering of the main content block.
      */}
      <nav className="w-full z-20 absolute top-0 left-0 p-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-white/10 p-2 backdrop-blur-sm border border-white/10">
              <Compass className="h-7 w-7 text-white" />
            </div>
            <span className="text-white text-2xl font-semibold tracking-tight">Bharat Voyage</span>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="#destinations"
              className="px-4 py-2 rounded-lg text-sm font-medium bg-black backdrop-blur border border-white/10 text-white hover:bg-white/20 transition"
            >
              Destinations
            </a>

            <a
              href="#features"
              className="px-4 py-2 rounded-lg text-sm font-medium bg-black backdrop-blur border border-white/10 text-white hover:bg-white/20 transition"
            >
              Features
            </a>

            <a
              href="#login"
              className="px-4 py-2 rounded-lg text-sm font-medium bg-black backdrop-blur border border-white/10 text-white hover:bg-white/20 transition"
            >
              Login
            </a>
          </div>

          <div className="md:hidden">
            <button className="p-2 rounded-md bg-black border border-white/10 text-white">Menu</button>
          </div>
        </div>
      </nav>
      <div className="container mx-auto px-6 flex-1 flex items-center pt-20"> {/* Added pt-20 for nav clearance */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-12">
          {/* Left Section */}
          <div className="space-y-6 max-w-xl">
            <h1
              id="hero-title"
              className="text-4xl md:text-6xl font-extrabold leading-tight text-white tracking-tight"
              style={{
                WebkitTextStrokeWidth: "0.6px",
                WebkitTextStrokeColor: "rgba(0,0,0,0.35)",
              }}
            >
              <span className="block">Discover, plan,</span>
              <span className="block bg-gradient-to-r from-rose-300 via-amber-200 to-teal-200 bg-clip-text text-transparent">
                and explore.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/90">
                    Discover destinations you never knew you’d love. 
                    Bharat Voyage curates perfect itineraries, tailored to your style and pace. 
                    Just tell it how you want to travel — it does the rest.
            </p>

            <div className="mt-4 flex gap-3 text-sm text-white/80">
              <div className="flex items-center gap-2 bg-black p-2 rounded-lg border border-white/10">
                <Sparkles className="h-4 w-4" /> AI-curated trips
              </div>
              <div className="flex items-center gap-2 bg-black p-2 rounded-lg border border-white/10">
                <Compass className="h-4 w-4" /> Local insights
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Hero;