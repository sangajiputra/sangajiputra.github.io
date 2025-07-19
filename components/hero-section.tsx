"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Download, Mail } from "lucide-react"

export function HeroSection() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20 dark:from-purple-900/40 dark:via-blue-900/40 dark:to-pink-900/40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left order-2 lg:order-1">
            <div className="mb-6">
              <h1 className="text-5xl lg:text-7xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  SANG AJI
                </span>
                <br />
                <span className="text-gray-800 dark:text-white">PUTRA CHOIRUL</span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-2">Fullstack Developer</p>
              <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">
                Crafting digital experiences across the universe of web development
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                <Mail className="mr-2 h-4 w-4" />
                Contact Me
              </Button>
              <Button size="lg" variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download CV
              </Button>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-2xl opacity-30 animate-pulse" />
              <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl">
                <img src="/profile.jpg" alt="Sang Aji Putra Choirul" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-gray-400" />
      </div>
    </section>
  )
}
