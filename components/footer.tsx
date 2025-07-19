import { Github, Linkedin, Mail, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="text-3xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              SANG AJI PUTRA CHOIRUL
            </span>
          </div>
          <p className="text-gray-400 mb-8">Fullstack Developer • Creating Digital Experiences</p>

          {/* <div className="flex justify-center space-x-6 mb-8">
            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
              <Github className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
              <Linkedin className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
              <Twitter className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
              <Mail className="h-6 w-6" />
            </a>
          </div> */}

          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-400">© 2025 Sang Aji Putra Choirul. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
