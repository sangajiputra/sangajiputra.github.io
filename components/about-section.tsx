import { Card, CardContent } from "@/components/ui/card"
import { Code, Database, Globe, Rocket } from "lucide-react"

export function AboutSection() {
  const highlights = [
    {
      icon: <Code className="h-8 w-8" />,
      title: "Frontend Development",
      description: "React, Next.js, Vue.js, TypeScript",
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Backend Development",
      description: "Node.js, Python, PostgreSQL, MongoDB",
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Full Stack Solutions",
      description: "End-to-end web application development",
    },
    {
      icon: <Rocket className="h-8 w-8" />,
      title: "Modern Technologies",
      description: "Cloud deployment, CI/CD, Docker",
    },
  ]

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">About Me</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            I'm a passionate fullstack developer who loves creating innovative web solutions. With expertise in both
            frontend and backend technologies, I bring ideas to life through clean, efficient, and scalable code.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-purple-200 dark:border-purple-800"
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4 text-purple-500 group-hover:text-pink-500 transition-colors flex justify-center">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
