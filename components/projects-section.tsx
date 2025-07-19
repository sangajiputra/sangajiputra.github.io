import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"

export function ProjectsSection() {
  const projects = [
    {
      title: "Rilis",
      description:
        "A dynamic news portal built for managing and publishing press releases and announcements. Features include categorized news, image uploads, search functionality, and admin controls.",
      image: "/rilis.png?height=200&width=400",
      technologies: ["Codeigniter", "MySql"],
      github: "#",
      demo: "#",
    },
    {
      title: "YPPH",
      description:
        "An informative and interactive school website for Yayasan Perguruan Pendidikan Harapan. Includes student information, academic calendars, announcements, gallery, and admin panel for content updates.",
      image: "/ypph.png?height=200&width=400",
      technologies: ["Codeigniter", "MySql"],
      github: "#",
      demo: "#",
    },
    {
      title: "Kanvasaur",
      description:
        "A sleek and modern company profile website for Kanvasaur, showcasing services, portfolio, team members, and contact forms. Designed to reflect creativity and innovation.",
      image: "/kanvasaur.png?height=200&width=400",
      technologies: ["Wordpress", "MySql"],
      github: "#",
      demo: "#",
    },
    {
      title: "HPNC",
      description:
        "Professional company profile site for HPNC featuring service highlights, testimonials, blog updates, and responsive design to build credibility and brand identity.",
      image: "/hpnc.png?height=200&width=400",
      technologies: ["Wordpress", "MySql"],
      github: "#",
      demo: "#",
    },
    {
      title: "Family Constellation Lab",
      description:
        "A dedicated website for trauma healing and family constellation therapy services. Includes therapist profiles, booking system, scheduling system, blog articles, and a calming UI to support visitors emotionally.",
      image: "/family.png?height=200&width=400",
      technologies: ["Wordpress", "MySql"],
      github: "#",
      demo: "#",
    },
    {
      title: "APP KBR MOBILE",
      description:
        "A mobile application for KBR Radio Network offering live audio streaming, news updates, podcast access, and user engagement features — all in one Flutter-powered app.",
      image: "/kbr.png?height=200&width=400",
      technologies: ["Flutter", "PostgreSql"],
      github: "#",
      demo: "#",
    },
  ];

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Some of my recent work that showcases my skills and creativity
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-purple-200 dark:border-purple-800 overflow-hidden"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-gray-800 dark:text-white">{project.title}</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge
                      key={techIndex}
                      variant="secondary"
                      className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
          {/* Placeholder Card for more projects */}
          <Card className="flex flex-col justify-center items-center text-center p-6 bg-white/70 dark:bg-gray-800/70 border-dashed border-2 border-purple-300 dark:border-purple-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="text-5xl mb-4 animate-pulse">🔒</div>
            <CardTitle className="text-xl text-gray-700 dark:text-gray-200">More Private Projects</CardTitle>
            <CardDescription className="text-gray-500 dark:text-gray-400">
              Some works are under NDA or client-requested confidentiality. Contact me for a tailored portfolio preview.
            </CardDescription>
          </Card>
        </div>
      </div>
    </section>
  )
}
