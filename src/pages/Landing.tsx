import Hero from "../components/hero"
import Features from "../components/features"
import Destinations from "../components/destinations"
import LoginSection from "../components/login-section"

export default function Landing() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <Destinations />
      <LoginSection />
    </main>
  )
}
