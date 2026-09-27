import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, ExternalLink, Globe, CheckCircle2 } from "lucide-react";
import { projects } from "@/data/projects";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TechBadge } from "@/components/ui/TechBadge";
import { ScreenshotCarousel } from "@/components/ui/ScreenshotCarousel";
import { GithubIcon, GooglePlayIcon } from "@/components/ui/Icons";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static paths at build time
export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const title = `${project.title} — ${project.subtitle}`;
  const description = project.description;
  const canonicalUrl = `https://satyamgawali.vercel.app/projects/${project.slug}`;

  return {
    title,
    description,
    keywords: [
      project.title,
      project.subtitle,
      ...project.technologies,
      "Satyam Gawali",
      "Flutter Project",
      "Mobile App Portfolio",
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${project.title} | Satyam Gawali`,
      description,
      url: canonicalUrl,
      type: "article",
      siteName: "Satyam Gawali Portfolio",
      images: [
        {
          url: project.imageUrl,
          width: 1200,
          height: 630,
          alt: `${project.title} Cover`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Satyam Gawali`,
      description,
      images: [project.imageUrl],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  // Cover images array
  const coverImages = project.coverImages ?? [project.imageUrl];

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": project.title,
    "alternateName": project.subtitle,
    "description": project.description,
    "applicationCategory": "MobileApplication",
    "operatingSystem": "Android, iOS, Web",
    "author": {
      "@type": "Person",
      "name": "Satyam Gawali",
      "url": "https://satyamgawali.vercel.app",
    },
    "url": `https://satyamgawali.vercel.app/projects/${project.slug}`,
    "image": `https://satyamgawali.vercel.app${project.imageUrl}`,
    ...(project.playStoreUrl ? { downloadUrl: project.playStoreUrl } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      <Navbar />
      <main className="flex-1 pt-32 pb-24 px-6 bg-brand-bg relative">
        {/* Subtle ambient lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-violet/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-12">
          {/* Back button */}
          <Link
            href="/#work"
            className="inline-flex items-center space-x-2 text-xs font-semibold text-brand-text-secondary hover:text-brand-text-primary transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Selected Work</span>
          </Link>

          {/* ROW 1: Two Columns — Left Content (~65%), Right Stacked Cover Images (~35%) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* LEFT COLUMN (~65%) */}
            <div className="lg:col-span-7 space-y-8">
              {/* Header Info Block */}
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  {project.badges?.map((badge) => (
                    <span
                      key={badge}
                      className="px-3 py-1 rounded-full bg-brand-violet/10 border border-brand-violet/25 text-[10px] font-mono font-semibold uppercase tracking-wider text-brand-violet-light"
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                <div className="space-y-2">
                  <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-text-primary tracking-tight font-sans">
                    {project.title}
                  </h1>
                  <p className="text-base font-mono text-brand-violet-light uppercase tracking-widest">
                    {project.subtitle}
                  </p>
                </div>

                <p className="text-base sm:text-lg text-brand-text-secondary leading-relaxed">
                  {project.description}
                </p>

                {/* Metrics Summary if available */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                    {project.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="p-3.5 rounded-2xl bg-brand-surface/80 border border-brand-card-border shadow-md"
                      >
                        <div className="text-base sm:text-lg font-bold text-brand-text-primary font-mono">
                          {metric.value}
                        </div>
                        <div className="text-xs text-brand-text-muted mt-0.5">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Stack */}
                <div className="space-y-2.5 pt-2">
                  <div className="text-xs font-mono text-brand-text-muted uppercase tracking-wider">
                    Technologies Used:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <TechBadge key={tech} name={tech} />
                    ))}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap items-center gap-3.5 pt-2">
                  {project.playStoreUrl && (
                    <a
                      href={project.playStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-brand-primary-btn-bg text-brand-primary-btn-text text-xs font-bold hover:opacity-90 transition-all shadow-lg shadow-black/5 dark:shadow-white/5"
                    >
                      <GooglePlayIcon className="w-3.5 h-3.5" />
                      <span>View on Google Play</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {project.webUrl && (
                    <a
                      href={project.webUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-full bg-brand-pill-bg border border-brand-pill-border text-xs font-semibold text-brand-text-secondary hover:text-brand-text-primary hover:bg-brand-surface-hover transition-all"
                    >
                      <Globe className="w-3.5 h-3.5 text-brand-cyan" />
                      <span>Visit Website</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {!project.playStoreUrl && !project.webUrl && project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-brand-primary-btn-bg text-brand-primary-btn-text text-xs font-bold hover:opacity-90 transition-all shadow-lg shadow-black/5 dark:shadow-white/5"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-full bg-brand-pill-bg border border-brand-pill-border text-xs font-semibold text-brand-text-secondary hover:text-brand-text-primary hover:bg-brand-surface-hover transition-all"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>View Source Code</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Overview & Case Study Content */}
              <div className="space-y-8 pt-8 border-t border-brand-border">
                {project.problem && (
                  <section className="space-y-3">
                    <h2 className="text-xl sm:text-2xl font-bold text-brand-text-primary tracking-tight">
                      The Problem
                    </h2>
                    <p className="text-base text-brand-text-secondary leading-relaxed">
                      {project.problem}
                    </p>
                  </section>
                )}

                {project.solution && (
                  <section className="space-y-3">
                    <h2 className="text-xl sm:text-2xl font-bold text-brand-text-primary tracking-tight">
                      The Solution
                    </h2>
                    <p className="text-base text-brand-text-secondary leading-relaxed">
                      {project.solution}
                    </p>
                  </section>
                )}

                <section className="space-y-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-brand-text-primary tracking-tight">
                    Engineering Highlights & Architecture
                  </h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {project.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="p-4 rounded-2xl bg-brand-surface/80 border border-brand-card-border flex items-start space-x-3 shadow-sm"
                      >
                        <CheckCircle2 className="w-4 h-4 text-brand-violet-light mt-0.5 shrink-0" />
                        <span className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>

                {project.challenges && (
                  <section className="space-y-3">
                    <h2 className="text-xl sm:text-2xl font-bold text-brand-text-primary tracking-tight">
                      Technical Challenges
                    </h2>
                    <p className="text-base text-brand-text-secondary leading-relaxed">
                      {project.challenges}
                    </p>
                  </section>
                )}

                {project.outcome && (
                  <section className="space-y-3">
                    <h2 className="text-xl sm:text-2xl font-bold text-brand-text-primary tracking-tight">
                      Project Outcome & Production Quality
                    </h2>
                    <p className="text-base text-brand-text-secondary leading-relaxed">
                      {project.outcome}
                    </p>
                  </section>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN (~35%): Stacked Images with Cascading Hover Fade */}
            <div className="lg:col-span-5 flex justify-center lg:justify-center w-full pt-10">
              <div className="sticky top-28 w-full flex items-center justify-center h-[380px] sm:h-[420px] relative group/stack">
                {coverImages.map((imgSrc, index) => {
                  const isFront = index === 0;
                  
                  let stackStyles = "scale-100 translate-x-0 translate-y-0 rotate-0";
                  if (index === 1) {
                    stackStyles = "scale-[0.89] translate-x-12 -translate-y-6 rotate-[7deg]";
                  } else if (index >= 2) {
                    stackStyles = "scale-[0.80] translate-x-24 -translate-y-12 rotate-[14deg]";
                  }

                  const defaultState = index === 0 ? "z-30 opacity-100" : index === 1 ? "z-20 opacity-100" : "z-10 opacity-100";

                  let hoverState = "";
                  if (index === 0) {
                    hoverState = "group-has-[.img-idx-1:hover]/stack:opacity-20 group-has-[.img-idx-2:hover]/stack:opacity-20";
                  } else if (index === 1) {
                    hoverState = "group-has-[.img-idx-2:hover]/stack:opacity-20";
                  }

                  return (
                    <div
                      key={index}
                      className={`absolute inset-0 flex items-center justify-center pointer-events-none ${stackStyles} ${defaultState} transition-all duration-300 ease-out`}
                    >
                      <div className={`relative h-full w-auto flex items-center justify-center transition-all duration-300 ease-out origin-center ${hoverState} hover:!opacity-100 hover:!scale-[1.04] hover:!-translate-y-2 hover:!z-50 pointer-events-auto cursor-pointer img-idx-${index}`}>
                        <Image
                          src={imgSrc}
                          alt={`${project.title} cover image ${index + 1}`}
                          width={800}
                          height={500}
                          className="w-auto h-full object-contain rounded-2xl drop-shadow-2xl transition-all duration-300"
                          priority={isFront}
                          unoptimized
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <hr className="border-brand-border my-12" />

          {/* ROW 2: Full Width Project Screenshot Gallery */}
          <div className="w-full">
            <ScreenshotCarousel project={project} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}