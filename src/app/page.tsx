import { Suspense } from 'react'
import { headers } from 'next/headers'
import { getProfile, getSkills, getExperience, getProjects } from '@/lib/db'
import type { Profile, Skill, Experience, Project } from '@/types'

// Komponen statis — tidak butuh DB
import CVNav       from '@/components/sections/CVNav'
import CVHero      from '@/components/sections/CVHero'
import CVAbout     from '@/components/sections/CVAbout'
import CVCTA       from '@/components/sections/CVCTA'
import CVFooter    from '@/components/sections/CVFooter'

// Komponen async — fetch DB masing-masing
import CVSkills     from '@/components/sections/CVSkills'
import CVExperience from '@/components/sections/CVExperience'
import CVProjects   from '@/components/sections/CVProjects'

// Skeleton per section
import {
  SkeletonHero, SkeletonSkills,
  SkeletonExperience, SkeletonProjects,
  SkeletonCTA, SkeletonFooter,
} from '@/components/Skeletons'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// Fetch profile dulu — dipakai di Nav, Hero, CTA, Footer
async function PageContent() {
  headers()
  const profile = await getProfile() as Profile
  const waUrl = `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent('Hi ' + profile.name + ', saya tertarik untuk diskusi project bersama kamu!')}`

  return (
    <>
      <CVNav    profile={profile} waUrl={waUrl} />

      {/* Hero — langsung tampil, tidak ada Suspense */}
      <CVHero   profile={profile} waUrl={waUrl} />

      {/* About — static, tidak butuh DB */}
      <CVAbout />

      {/* Skills — stream, skeleton dulu */}
      <Suspense fallback={<SkeletonSkills />}>
        <CVSkillsAsync />
      </Suspense>

      {/* Experience — stream setelah skills */}
      <Suspense fallback={<SkeletonExperience />}>
        <CVExperienceAsync />
      </Suspense>

      {/* Projects — paling berat, paling bawah, stream terakhir */}
      <Suspense fallback={<SkeletonProjects />}>
        <CVProjectsAsync />
      </Suspense>

      {/* CTA & Footer — static */}
      <CVCTA    profile={profile} waUrl={waUrl} />
      <CVFooter profile={profile} />
    </>
  )
}

// Async server components — masing-masing fetch sendiri
async function CVSkillsAsync() {
  const skills = await getSkills() as Skill[]
  return <CVSkills skills={skills} />
}

async function CVExperienceAsync() {
  const experience = await getExperience() as Experience[]
  return <CVExperience experience={experience} />
}

async function CVProjectsAsync() {
  const projects = await getProjects(true) as Project[]
  return <CVProjects projects={projects} />
}

export default function HomePage() {
  return (
    <Suspense fallback={<SkeletonHero />}>
      <PageContent />
    </Suspense>
  )
}
