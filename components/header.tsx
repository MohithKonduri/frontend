"use client"

import Link from "next/link"
import { Leaf } from "lucide-react"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2 text-white font-bold text-xl tracking-tight">
          <Leaf className="w-6 h-6 text-green-400" />
          <span>Smart Crop Advisory</span>
        </Link>
        <nav className="hidden md:flex gap-8 items-center">
          <Link href="/dashboard" className="text-sm font-medium text-gray-200 hover:text-green-400 transition-colors">
            Home
          </Link>
          <Link href="/recommend" className="text-sm font-medium text-gray-200 hover:text-green-400 transition-colors">
            Get Recommendation
          </Link>
          <Link href="/" className="px-5 py-2 bg-green-600/90 text-white rounded-full text-sm font-medium hover:bg-green-500 transition-all shadow-lg shadow-green-900/20">
            Logout
          </Link>
        </nav>
      </div>
    </header>
  )
}
