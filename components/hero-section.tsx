"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Cloud, Droplet, Sprout, ArrowRight, BarChart3, Sun, Wind } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative flex-1 min-h-[calc(100vh-80px)] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/simple-dashboard-bg.png"
          alt="Smart Crop Dashboard Background"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-32 h-full flex flex-col justify-center">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-in slide-in-from-left-10 duration-700 fade-in">


            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
                Cultivating the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
                  Future of Farming
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-200 max-w-xl leading-relaxed">
                Experience the next generation of precision agriculture. Our advanced AI analyzes localized soil data and real-time weather patterns to maximize your yield potential.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/recommend">
                <Button size="lg" className="h-14 px-8 text-lg bg-green-600 hover:bg-green-500 text-white rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(22,163,74,0.4)] hover:shadow-[0_0_30px_rgba(22,163,74,0.6)]">
                  Get Crop Recommendation <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/features">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg bg-white/10 text-white border-white/20 hover:bg-white/20 rounded-full backdrop-blur-sm">
                  Explore Features
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10 text-white/80">
              <div>
                <div className="text-3xl font-bold text-white">98%</div>
                <div className="text-sm">Accuracy Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-sm">Crops Supported</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-sm">Real-time Analysis</div>
              </div>
            </div>
          </div>

          {/* Right Visual Cards (Floating Glass Cards) */}
          <div className="hidden lg:grid grid-cols-2 gap-6 relative">
            {/* Decorative Elements */}
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-green-500/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="space-y-6 translate-y-12">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-xl hover:bg-white/15 transition-all duration-300 group">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                  <Sprout className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Soil Analysis</h3>
                <p className="text-gray-300 text-sm">Detailed NPK profiling for optimal nutrient management.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-xl hover:bg-white/15 transition-all duration-300 group">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-600 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                  <Sun className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Yield Prediction</h3>
                <p className="text-gray-300 text-sm">Forecasting potential harvest outputs based on historical data.</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-xl hover:bg-white/15 transition-all duration-300 group">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                  <Cloud className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Weather Patterns</h3>
                <p className="text-gray-300 text-sm">Real-time integration of temperature, rainfall, and humidity.</p>
              </div>

              <div className="bg-gradient-to-br from-green-600/90 to-emerald-800/90 backdrop-blur-xl border border-green-500/30 p-6 rounded-2xl shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <BarChart3 className="w-24 h-24 text-white" />
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 shadow-lg backdrop-blur-sm group-hover:scale-110 transition-transform">
                  <Wind className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Smart Insights</h3>
                <p className="text-green-100 text-sm">Actionable recommendations driven by machine learning models.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
