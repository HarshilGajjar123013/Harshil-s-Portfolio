"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  FiArrowUpRight,
  FiCode,
  FiCpu,
  FiExternalLink,
  FiFolder,
  FiGithub,
  FiLayers,
  FiZap,
} from "react-icons/fi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./projects.scss";

type ProjectCategory = "all" | "fullstack" | "ai" | "enterprise";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: "fullstack" | "ai" | "enterprise";
  categoryLabel: string;
  year: string;
  role: string;
  description: string;
  impactMetrics: { label: string; value: string }[];
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  accentColor: string;
  previewGradient: string;
  featured?: boolean;
}

const projectsData: Project[] = [
  {
    id: "designs-of-dreams",
    title: "Designs of Dreams (DoD)",
    subtitle: "High-End Luxury The Heritage Collections to create dignified, sustainable livelihoods for local Indian artisans, especially rural women, while bringing the timeless grace of handcrafted sarees, dupattas, and bespoke embroidery to modern celebrations.",
    category: "fullstack",
    categoryLabel: "Full Stack E-Commerce",
    year: "2026",
    role: "Full Stack Engineer",
    description:
      "Crafted an ultra-luxurious digital boutique and bespoke Atelier Admin Panel. Includes bespoke  customization previews, real-time inventory management, secure Stripe payment checkouts, and automated customer lifecycle marketing pipelines.",
    impactMetrics: [
      { label: "Conversion Rate", value: "4.8%" },
      { label: "Performance Score", value: "98/100" },
      { label: "Order Automation", value: "100%" },
    ],
    tags: [
      "Next.js 15",
      "React",
      "TypeScript",
      "Checkout",
      "REST APIs",
      "SCSS",
      "Cloudinary",
    ],
    liveUrl: "https://dodshop.vercel.app/",
    // githubUrl: "https://github.com",
    accentColor: "#0f172a",
    previewGradient: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
    featured: true,
  },
  {
    id: "careersensora",
    title: "Careersensora — Smart ATS & Career Intelligence",
    subtitle: "AI-Powered Applicant Tracking System & Resume Scoring Engine",
    category: "enterprise",
    categoryLabel: "Enterprise SaaS",
    year: "2023 — 2024",
    role: "Full Stack Developer",
    description:
      "Developed a modern recruitment intelligence portal providing automated resume parsing, candidate skill vector matching, interview scheduling pipelines, and real-time hiring funnel analytics.",
    impactMetrics: [
      { label: "Screening Speed", value: "10x Faster" },
      { label: "Candidate Match Accuracy", value: "92%" },
      { label: "Realtime Analytics", value: "Interactive" },
    ],
    tags: [
     "Next.js 15",
      "React",
      "TypeScript",
      "REST APIs",
      "SCSS",
    ],
    liveUrl: "https://careersensora.vercel.app/",
    // githubUrl: "https://github.com",
    accentColor: "#18181b",
    previewGradient: "linear-gradient(135deg, #111827 0%, #1f2937 100%)",
  },
];

const categoryTabs = [
  { id: "all", label: "All Projects", icon: <FiFolder /> },
  { id: "fullstack", label: "Full Stack Web", icon: <FiLayers /> },
  { id: "ai", label: "AI & Automation", icon: <FiCpu /> },
  { id: "enterprise", label: "Enterprise SaaS", icon: <FiCode /> },
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredProjects =
    activeCategory === "all"
      ? projectsData
      : projectsData.filter((p) => p.category === activeCategory);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || !sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Header Reveal
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          {
            y: 28,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 2. Tabs Reveal
      if (tabsRef.current) {
        gsap.fromTo(
          tabsRef.current,
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: tabsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  // Animate cards on category change
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".project-card");
    gsap.fromTo(
      cards,
      {
        y: 25,
        opacity: 0,
        scale: 0.98,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
      }
    );
  }, [activeCategory]);

  return (
    <section className="projects-section" id="projects" ref={sectionRef}>
      <div className="projects-container">
        {/* Section Header */}
        <div className="projects-header" ref={headerRef}>
          <div className="badge-wrapper">
            <span className="projects-badge">Featured Portfolio</span>
          </div>
          <h2 className="projects-title">Featured Works &amp; Innovations</h2>
          <p className="projects-subtitle">
            A curated showcase of scalable web applications, autonomous AI agents, enterprise automation systems, and high-impact digital experiences.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <nav
          className="projects-tabs-nav"
          ref={tabsRef}
          aria-label="Filter projects by category"
        >
          {categoryTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as ProjectCategory)}
              className={`tab-btn ${activeCategory === tab.id ? "active" : ""}`}
              type="button"
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
              {activeCategory === tab.id && (
                <span className="active-glow" aria-hidden="true" />
              )}
            </button>
          ))}
        </nav>

        {/* Projects Grid */}
        <div className="projects-grid" ref={gridRef}>
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className={`project-card ${project.featured ? "featured-card" : ""}`}
            >
              {/* Card Header & Metadata */}
              <div className="card-inner">
                <div className="card-top-header">
                  <div className="meta-left">
                    <span className="category-pill">{project.categoryLabel}</span>
                    <span className="year-pill">{project.year}</span>
                  </div>
                  <div className="role-tag">{project.role}</div>
                </div>

                {/* Title & Subtitle */}
                <div className="card-title-group">
                  <h3 className="project-heading">
                    {project.title}
                    <FiArrowUpRight className="heading-arrow" />
                  </h3>
                  <h4 className="project-subheading">{project.subtitle}</h4>
                </div>

                {/* Narrative Description */}
                <p className="project-narrative">{project.description}</p>



                {/* Visual Interface Mockup Preview */}
                <div
                  className="card-preview-window"
                  style={{ background: project.previewGradient }}
                  aria-hidden="true"
                >
                  <div className="preview-browser-bar">
                    <span className="browser-dot red" />
                    <span className="browser-dot yellow" />
                    <span className="browser-dot green" />
                    <div className="browser-address">
                      https://{project.id}.harshilgajjar.dev
                    </div>
                  </div>

                  <div className="preview-canvas">
                    <div className="canvas-header-skeleton">
                      <div className="skeleton-title" />
                      <div className="skeleton-badge" />
                    </div>
                    <div className="canvas-blocks">
                      <div className="block-pill primary" />
                      <div className="block-pill secondary" />
                      <div className="block-pill tertiary" />
                    </div>
                    <div className="canvas-code-row">
                      <FiZap className="zap-icon" />
                      <span className="code-text">
                        status: &apos;deployed&apos; • engine: &apos;next15-ai-runtime&apos;
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tech Stack Pills */}
                <div className="tags-container">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="tech-badge">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Card Action Links */}
                <footer className="card-footer-actions">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-live-demo"
                    >
                      <span>Explore Live</span>
                      <FiExternalLink className="btn-icon" />
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-github-code"
                      aria-label={`View ${project.title} source code on GitHub`}
                    >
                      <FiGithub className="btn-icon" />
                      <span>Source Code</span>
                    </a>
                  )}
                </footer>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Collaboration Callout */}
        <div className="projects-cta-box">
          <div className="cta-content">
            <h3 className="cta-title">Have a Visionary Project in Mind?</h3>
            <p className="cta-desc">
              Whether you need a high-performance web platform, custom AI agent workflows, or enterprise automation pipelines, let&apos;s build something extraordinary together.
            </p>
          </div>
          <Link href="/celebrate" className="cta-collaborate-btn">
            <span>Let&apos;s Build Together</span>
            <FiArrowUpRight className="btn-arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}
