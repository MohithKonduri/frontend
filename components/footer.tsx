"use client"

import { Leaf } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-8 mt-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-4">
          <Leaf className="w-5 h-5" />
          <span className="font-semibold">Smart Crop Advisory System</span>
        </div>
        <p className="text-primary-foreground/80 text-sm">Developed for small and marginal farmers using AI</p>
        <p className="text-primary-foreground/60 text-xs mt-4">
          © 2026 Smart Crop Advisory System. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
