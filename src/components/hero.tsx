import React from "react"
import { Compass, Sparkles } from "lucide-react"
import Navbar from "./Navbar"

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col" aria-labelledby="hero-title">
      <div className="absolute inset-0 -z-10">
        <img
          src="/assets/taj-mahal-at-sunrise-vibrant-colors.jpg"
          alt="Taj Mahal sunrise"
          className="w-full h-full object-cover brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-transparent" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.10) 40%, rgba(0,0,0,0.40) 100%)",
          }}
        />
      </div>

      <Navbar>
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#destinations"
            className="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
          >
            Destinations
          </a>

          <a
            href="#features"
            className="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
          >
            Features
          </a>

          <a
            href="#login"
            className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            Login
          </a>
        </div>

        <div className="md:hidden">
          <button className="p-2 rounded-md bg-slate-100 border border-slate-200 text-slate-700">Menu</button>
        </div>
      </Navbar>

      <div className="container mx-auto px-6 flex-1 flex items-center pt-20">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-12">
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