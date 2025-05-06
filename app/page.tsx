import Link from "next/link"
import { Metadata } from "next"
import { LandingHeader } from "@/components/landing-header"
import { LandingHero } from "@/components/landing-hero"
import { LandingFeatures } from "@/components/landing-features"
import { LandingStats } from "@/components/landing-stats"
import { LandingCTA } from "@/components/landing-cta"
import { LandingFooter } from "@/components/landing-footer"

export const metadata: Metadata = {
  title: "PulseBoard - Interactive Dashboard Demo | Advait K",
  description: "Professional dashboard showcase with interactive data visualization features, analytics, and modern UI design.",
  keywords: ["dashboard", "visualization", "data", "charts", "analytics", "portfolio", "Advait Kandalgaonkar"],
}

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen overflow-x-hidden">
      <LandingHeader />
      
      <main className="flex-1 w-full pt-16">
        <LandingHero />
        <div id="features">
          <LandingFeatures />
        </div>
        <div id="stats">
          <LandingStats />
        </div>
        <div id="cta">
          <LandingCTA />
        </div>
      </main>

      <LandingFooter />
    </div>
  )
}
