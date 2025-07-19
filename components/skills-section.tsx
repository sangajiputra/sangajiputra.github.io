"use client"

import { Card, CardContent } from "@/components/ui/card"

export function SkillsSection() {
  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        { name: "React/Next.js", level: 80 },
        { name: "TypeScript", level: 60 },
        { name: "Tailwind CSS", level: 70 },
        { name: "CSS3", level: 90 },
        { name: "HTML", level: 90 },
        { name: "Jquery", level: 80 },
        { name: "Bootstrap", level: 80 },
        { name: "Flutter", level: 80 },
      ],
    },
    {
      title: "Database",
      skills: [
        { name: "PostgreSQL", level: 90 },
        { name: "MySql", level: 90 },
      ],
    },
    {
      title: "Server",
      skills: [
        { name: "Nginx", level: 80 },
        { name: "Apache", level: 70 },
        { name: "Ubuntu", level: 80 },
        { name: "Debian", level: 80 },
        { name: "CentOS", level: 80 },
      ],
    },
    {
      title: "Framework",
      skills: [
        { name: "Codeigniter", level: 90 },
        { name: "React", level: 70 },
        { name: "Angular", level: 70 },
        { name: "Laravel", level: 80 },
        { name: "Express JS", level: 80 },
        { name: "Django", level: 80 },
      ],
    },
    {
      title: "Backend",
      skills: [
        { name: "PHP", level: 90 },
        { name: "Node.js", level: 85 },
        { name: "Python", level: 80 },
      ],
    },
    {
      title: "Tools & Others",
      skills: [
        { name: "Git/GitHub", level: 90 },
        { name: "Scrapping", level: 90 },
        { name: "AWS/Vercel", level: 80 },
        { name: "REST APIs", level: 88 },
      ],
    },
  ]

  const skillColors = [
    [
      "bg-gradient-to-r from-blue-500 to-cyan-500",
      "bg-gradient-to-r from-green-500 to-emerald-500",
      "bg-gradient-to-r from-purple-500 to-pink-500",
      "bg-gradient-to-r from-orange-500 to-red-500",
      "bg-gradient-to-r from-red-500 to-pink-500",
      "bg-gradient-to-r from-purple-500 to-pink-500",
      "bg-gradient-to-r from-orange-500 to-pink-500",
    ],
    [
      "bg-gradient-to-r from-indigo-500 to-purple-500",
      "bg-gradient-to-r from-yellow-500 to-orange-500",
      "bg-gradient-to-r from-teal-500 to-green-500",
      "bg-gradient-to-r from-pink-500 to-rose-500",
    ],
    [
      "bg-gradient-to-r from-violet-500 to-purple-500",
      "bg-gradient-to-r from-cyan-500 to-blue-500",
      "bg-gradient-to-r from-emerald-500 to-teal-500",
      "bg-gradient-to-r from-rose-500 to-pink-500",
      "bg-gradient-to-r from-purple-500 to-pink-500",
    ],
    [
      "bg-gradient-to-r from-blue-500 to-cyan-500",
      "bg-gradient-to-r from-green-500 to-emerald-500",
      "bg-gradient-to-r from-purple-500 to-pink-500",
      "bg-gradient-to-r from-orange-500 to-red-500",
      "bg-gradient-to-r from-red-500 to-pink-500",
      "bg-gradient-to-r from-purple-500 to-pink-500",
    ],
    [
      "bg-gradient-to-r from-indigo-500 to-purple-500",
      "bg-gradient-to-r from-yellow-500 to-orange-500",
      "bg-gradient-to-r from-teal-500 to-green-500",
      "bg-gradient-to-r from-pink-500 to-rose-500",
    ],
    [
      "bg-gradient-to-r from-violet-500 to-purple-500",
      "bg-gradient-to-r from-cyan-500 to-blue-500",
      "bg-gradient-to-r from-emerald-500 to-teal-500",
      "bg-gradient-to-r from-rose-500 to-pink-500",
    ],
  ]

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Skills & Expertise
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Technologies I work with to build amazing digital experiences
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <Card
              key={index}
              className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-purple-200 dark:border-purple-800"
            >
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">{category.title}</h3>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-1000 ease-out ${skillColors[index][skillIndex]}`}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
