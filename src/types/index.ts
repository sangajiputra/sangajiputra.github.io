export interface Profile {
  id: number
  name: string
  tagline: string
  bio: string
  location: string
  whatsapp: string
  github: string
  linkedin: string
  years_exp: number
  projects_done: number
  clients: number
  available: boolean
}

export interface Skill {
  id: number
  category: string
  icon: string
  items: string
  sort_order: number
}

export interface Experience {
  id: number
  company: string
  role: string
  period: string
  duration: string
  description: string
  stack: string
  sort_order: number
}

export interface Project {
  id: number
  title: string
  description: string
  stack: string
  url_demo: string
  url_github: string
  image_url: string
  status: 'live' | 'wip' | 'oss'
  color: 'pt-1' | 'pt-2' | 'pt-3' | 'pt-4' | 'pt-5' | 'pt-6'
  sort_order: number
  active: boolean
}

export interface CVData {
  profile: Profile
  skills: Skill[]
  experience: Experience[]
  projects: Project[]
}
