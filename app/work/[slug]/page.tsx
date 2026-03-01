import type { Metadata } from "next"
import { notFound } from "next/navigation"
import dynamic from "next/dynamic"
import { Navbar } from "@/components/navbar"
import { CustomCursor } from "@/components/custom-cursor"
import { ProjectDetail } from "@/components/project-detail"
import { Footer } from "@/components/footer"
import { client } from "@/sanity/lib/client"
import { PROJECT_BY_SLUG_QUERY, ALL_PROJECT_SLUGS_QUERY } from "@/sanity/lib/queries"

import { SmoothScroll } from "@/components/smooth-scroll"
interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await client.fetch(ALL_PROJECT_SLUGS_QUERY)
  return slugs.map((s: { slug: string }) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await client.fetch(PROJECT_BY_SLUG_QUERY, { slug })

  if (!project) return { title: "Project Not Found" }

  return {
    title: `${project.title} | Portfolio`,
    description: project.seo?.metaDescription || project.description,
    openGraph: {
      title: project.seo?.metaTitle || project.title,
      description: project.seo?.metaDescription || project.description,
      images: project.thumbnail?.asset?.url ? [project.thumbnail.asset.url] : [],
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await client.fetch(PROJECT_BY_SLUG_QUERY, { slug })

  if (!project) notFound()

 return (
  <SmoothScroll>
    <CustomCursor />
    <Navbar />
    <main>
      <ProjectDetail project={project} />
      <Footer />
    </main>
  </SmoothScroll>
)
}
//hello
