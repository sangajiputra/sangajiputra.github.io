"use client"

import { Briefcase } from "lucide-react"
import { motion } from "framer-motion"

export function ExperienceSection() {
  const experiences = [
    {
      company: "Fastprint Indonesia",
      position: "Fullstack Developer",
      period: "2023 – Present",
      description:
        "Developed and maintained web applications using Codeigniter and biggest project is make ERP like Odoo using Django."
    },
    {
      company: "Jpayroll.com",
      position: "Fullstack Developer",
      period: "2022 – 2023",
      description:
        "Developed and maintained web applications using Angular."
    },
    {
      company: "Bantaihost.com",
      position: "Fullstack Developer",
      period: "2021 - 2022",
      description:
        "Led the development of client hosting dashboards and billing systems. Implemented automation for invoice generation, domain integration, and cPanel/WHM API. Improved user experience with responsive front-end interfaces and streamlined admin workflows.",
    },
    {
      company: "X-Metrix Probolinggo",
      position: "Fullstack Developer",
      period: "2019 - 2021",
      description:
        "Developed and maintained custom ERP and internal management systems for retail and service operations. Worked across the full stack to build modules such as inventory, point-of-sale, and staff scheduling. Integrated barcode scanning and reporting features to support daily operations.",
    },
    {
      company: "PT. Canisnfelis",
      position: "Fullstack Developer",
      period: "2016 - 2019",
      description:
        "Built and maintained multiple company websites, e-commerce platforms, and internal dashboards using PHP and MySQL. Collaborated with designers and marketing teams to deliver SEO-optimized, mobile-friendly interfaces. Provided ongoing system support and infrastructure maintenance.",
    }
  ]

  const animationVariants = [
    { x: -50, opacity: 0 },
    { x: 50, opacity: 0 },
    { y: -50, opacity: 0 },
    { y: 50, opacity: 0 },
    { scale: 0.8, opacity: 0 }
  ]

  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-1 sm:px-1 lg:px-1">
        <h2 className="text-4xl font-bold text-center mb-12">
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Work Experience
          </span>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            My work experience
          </p>
        </h2>

        <div className="space-y-8">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={animationVariants[idx % animationVariants.length]}
              animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="border-l-4 border-purple-400 pl-6 relative"
            >
              <div className="absolute -left-[11px] top-1.5 w-5 h-5 bg-purple-400 rounded-full flex items-center justify-center text-white">
                <Briefcase className="w-3 h-3" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {exp.position} <span className="text-purple-500">@ {exp.company}</span>
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{exp.period}</p>
              <p className="text-gray-700 dark:text-gray-300">{exp.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
