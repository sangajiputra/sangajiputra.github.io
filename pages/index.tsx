import Head from "next/head"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { SkillsSection } from "@/components/skills-section"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { FloatingElements } from "@/components/floating-elements"
import { ExperienceSection } from "@/components/experience-section"

export default function Home() {
  return (
    <>
      <Head>
        <title>Sang Aji Putra Choirul - Fullstack Developer</title>
        <meta
          name="description"
          content="Professional portfolio of Sang Aji Putra Choirul, a passionate fullstack developer specializing in modern web technologies."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative min-h-screen bg-gradient-to-br from-white via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
        <FloatingElements />
        <Navbar />
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  )
}
