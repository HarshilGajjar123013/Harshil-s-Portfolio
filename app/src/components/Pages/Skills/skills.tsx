"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  FiCpu,
  FiCode,
  FiLayers,
  FiServer,
  FiZap,
  FiDatabase,
  FiSliders,
  FiShield,
} from "react-icons/fi";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiPython,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiTailwindcss,
  SiRedis,
  SiFigma,
  SiGit,
  SiPrisma,
} from "react-icons/si";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./skills.scss";

type SkillCategory = "all" | "frontend" | "backend" | "ai" | "devops";

interface SkillItem {
  name: string;
  level: number;
  badge: string;
  experience: string;
  icon: React.ReactNode;
}

interface SkillDomain {
  id: "frontend" | "backend" | "ai" | "devops";
  title: string;
  tagline: string;
  icon: React.ReactNode;
  summary: string;
  skills: SkillItem[];
}

const skillDomains: SkillDomain[] = [
  {
    id: "frontend",
    title: "Frontend & Interactive Engineering",
    tagline: "Pixel-Perfect, High-Performance User Interfaces",
    icon: <FiLayers />,
    summary:
      "Crafting responsive, accessible, and cinematic web applications with modern React ecosystems, Server Components, and physics-driven micro-interactions.",
    skills: [
      {
        name: "Next.js 15 (App Router, SSR, Server Actions)",
        level: 95,
        badge: "Expert",
        experience: "3+ Years",
        icon: <SiNextdotjs />,
      },
      {
        name: "React 19 / 18 (Hooks, Suspense, State)",
        level: 96,
        badge: "Expert",
        experience: "4+ Years",
        icon: <SiReact />,
      },
      {
        name: "TypeScript (Strict Typing & Generics)",
        level: 92,
        badge: "Advanced",
        experience: "3+ Years",
        icon: <SiTypescript />,
      },
      {
        name: "JavaScript (ESNext, Async/Await, V8)",
        level: 95,
        badge: "Expert",
        experience: "4+ Years",
        icon: <SiJavascript />,
      },
      {
        name: "TailwindCSS & SCSS Modules",
        level: 94,
        badge: "Expert",
        experience: "4+ Years",
        icon: <SiTailwindcss />,
      },
      {
        name: "GSAP & ScrollTrigger / Micro-Animations",
        level: 90,
        badge: "Advanced",
        experience: "2+ Years",
        icon: <FiZap />,
      },
    ],
  },
  {
    id: "backend",
    title: "Backend & Distributed Systems",
    tagline: "Scalable APIs, Realtime Sockets & Robust Data Layers",
    icon: <FiServer />,
    summary:
      "Designing fault-tolerant REST and GraphQL microservices, real-time event streaming systems, and high-throughput transactional database architectures.",
    skills: [
      {
        name: "Node.js & Express.js (High-Concurrency APIs)",
        level: 92,
        badge: "Advanced",
        experience: "3+ Years",
        icon: <SiNodedotjs />,
      },
      {
        name: "Python (FastAPI, Data Pipelines & Scripting)",
        level: 88,
        badge: "Proficient",
        experience: "3+ Years",
        icon: <SiPython />,
      },
      {
        name: "PostgreSQL & Prisma ORM",
        level: 90,
        badge: "Advanced",
        experience: "3+ Years",
        icon: <SiPostgresql />,
      },
      {
        name: "MongoDB & Mongoose (NoSQL Data Models)",
        level: 89,
        badge: "Advanced",
        experience: "3+ Years",
        icon: <SiMongodb />,
      },
      {
        name: "Redis (In-Memory Caching & Session Stores)",
        level: 85,
        badge: "Proficient",
        experience: "2+ Years",
        icon: <SiRedis />,
      },
      {
        name: "Prisma & Modern Data Layer ORMs",
        level: 91,
        badge: "Advanced",
        experience: "2+ Years",
        icon: <SiPrisma />,
      },
    ],
  },
  {
    id: "ai",
    title: "AI Engineering & Autonomous Agents",
    tagline: "LLM Workflows, Semantic Search & Intelligent Agents",
    icon: <FiCpu />,
    summary:
      "Leveraging generative AI models, vector embeddings, RAG architectures, and autonomous agent loops to automate complex business logic and conversational systems.",
    skills: [
      {
        name: "OpenAI & Anthropic APIs (Function Calling & Reasoning)",
        level: 94,
        badge: "Expert",
        experience: "2+ Years",
        icon: <FiCpu />,
      },
      {
        name: "LangChain & LlamaIndex Agent Frameworks",
        level: 90,
        badge: "Advanced",
        experience: "2+ Years",
        icon: <FiCpu />,
      },
      {
        name: "Semantic Vector Search & Embeddings",
        level: 88,
        badge: "Advanced",
        experience: "2+ Years",
        icon: <FiDatabase />,
      },
      {
        name: "Autonomous Multi-Agent Task Orchestration",
        level: 89,
        badge: "Advanced",
        experience: "2+ Years",
        icon: <FiSliders />,
      },
      {
        name: "Advanced Prompt Engineering & System Tuning",
        level: 95,
        badge: "Expert",
        experience: "2+ Years",
        icon: <FiZap />,
      },
    ],
  },
  {
    id: "devops",
    title: "Automation, DevOps & Cloud Systems",
    tagline: "Workflow Pipelines, CI/CD & Resilient Cloud Deployments",
    icon: <FiCode />,
    summary:
      "Streamlining operational overhead through n8n enterprise workflow automation, containerization with Docker, and automated CI/CD deployment pipelines.",
    skills: [
      {
        name: "n8n Enterprise Automation Pipelines",
        level: 95,
        badge: "Expert",
        experience: "2+ Years",
        icon: <FiZap />,
      },
      {
        name: "Docker Containerization & Environments",
        level: 86,
        badge: "Proficient",
        experience: "2+ Years",
        icon: <SiDocker />,
      },
      {
        name: "Git & GitHub Actions (Automated CI/CD)",
        level: 91,
        badge: "Advanced",
        experience: "4+ Years",
        icon: <SiGit />,
      },
      {
        name: "Vercel, AWS & Cloud Hosting Infrastructure",
        level: 90,
        badge: "Advanced",
        experience: "3+ Years",
        icon: <FiServer />,
      },
      {
        name: "Figma UI/UX Systems & Prototyping",
        level: 90,
        badge: "Advanced",
        experience: "3+ Years",
        icon: <SiFigma />,
      },
    ],
  },
];

const marqueeTech = [
  "NEXT.JS 15",
  "REACT 19",
  "TYPESCRIPT",
  "N8N AUTOMATION",
  "PYTHON",
  "LANGCHAIN",
  "OPENAI API",
  "POSTGRESQL",
  "NODE.JS",
  "DOCKER",
  "TAILWINDCSS",
  "REDIS",
  "GSAP",
  "PRISMA ORM",
  "MONGODB",
  "FIGMA",
];

const engineeringPillars = [
  {
    icon: <FiZap />,
    title: "High-Performance Execution",
    description:
      "Sub-150ms server responses, 98+ Core Web Vitals, server-side caching, and zero-layout-shift UI engineering.",
  },
  {
    icon: <FiCpu />,
    title: "Autonomous Intelligence",
    description:
      "Self-executing AI workflows, custom tool-augmented agent loops, and robust webhook automation pipelines.",
  },
  {
    icon: <FiShield />,
    title: "Production-Grade Reliability",
    description:
      "Strict static typing, comprehensive error boundaries, automated testing, and scalable microservice boundaries.",
  },
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState<SkillCategory>("all");
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const domainsContainerRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);

  const filteredDomains =
    activeTab === "all"
      ? skillDomains
      : skillDomains.filter((d) => d.id === activeTab);

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

      // 2. Pillars Reveal
      if (pillarsRef.current) {
        gsap.fromTo(
          pillarsRef.current.children,
          {
            y: 25,
            opacity: 0,
            scale: 0.97,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.75,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: pillarsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 3. Domain Cards Reveal
      const cards = gsap.utils.toArray<HTMLElement>(".domain-card");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          {
            y: 35,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  // Animate progress bars when tab changes or domains mount
  useEffect(() => {
    if (!domainsContainerRef.current) return;

    const meterFills =
      domainsContainerRef.current.querySelectorAll<HTMLElement>(".meter-fill");
    meterFills.forEach((fill) => {
      const targetWidth = fill.getAttribute("data-level") || "0";
      gsap.fromTo(
        fill,
        { width: "0%" },
        {
          width: `${targetWidth}%`,
          duration: 0.9,
          ease: "power2.out",
          delay: 0.15,
        }
      );
    });
  }, [activeTab]);

  return (
    <section className="skills-section" id="skills" ref={sectionRef}>
      <div className="skills-container">
        {/* Section Header */}
        <div className="skills-header" ref={headerRef}>
          <div className="badge-wrapper">
            <span className="skills-badge">Technical Arsenal</span>
          </div>
          <h2 className="skills-title">Core Capabilities &amp; Tech Stack</h2>
          <p className="skills-subtitle">
            A comprehensive overview of programming languages, modern frameworks, AI agent architectures, and automation tools I wield to engineer scalable, high-impact digital systems.
          </p>
        </div>

        {/* Infinite Running Tech Marquee */}
        <div className="tech-marquee-wrapper" ref={marqueeRef} aria-hidden="true">
          <div className="marquee-track">
            {marqueeTech.concat(marqueeTech).map((tech, i) => (
              <span key={i} className="marquee-tag">
                <span className="marquee-dot">•</span>
                <span className="marquee-text">{tech}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <nav
          className="skills-tabs-nav"
          aria-label="Filter skills by technical domain"
        >
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`tab-btn ${activeTab === "all" ? "active" : ""}`}
          >
            <span>All Domains</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("frontend")}
            className={`tab-btn ${activeTab === "frontend" ? "active" : ""}`}
          >
            <FiLayers className="tab-icon" />
            <span>Frontend</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("backend")}
            className={`tab-btn ${activeTab === "backend" ? "active" : ""}`}
          >
            <FiServer className="tab-icon" />
            <span>Backend</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("ai")}
            className={`tab-btn ${activeTab === "ai" ? "active" : ""}`}
          >
            <FiCpu className="tab-icon" />
            <span>AI &amp; Automation</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("devops")}
            className={`tab-btn ${activeTab === "devops" ? "active" : ""}`}
          >
            <FiCode className="tab-icon" />
            <span>DevOps &amp; Tools</span>
          </button>
        </nav>

        {/* Domains & Skill Matrix Grid */}
        <div className="skills-domains-grid" ref={domainsContainerRef}>
          {filteredDomains.map((domain) => (
            <article key={domain.id} className="domain-card">
              {/* Domain Header */}
              <header className="domain-header">
                <div className="domain-icon-box">{domain.icon}</div>
                <div className="domain-title-group">
                  <h3 className="domain-title">{domain.title}</h3>
                  <span className="domain-tagline">{domain.tagline}</span>
                </div>
              </header>

              <p className="domain-summary">{domain.summary}</p>

              {/* Skills List with Progress Meters */}
              <div className="skills-list">
                {domain.skills.map((skill, index) => (
                  <div key={index} className="skill-row">
                    <div className="skill-meta">
                      <div className="skill-name-col">
                        <span className="skill-icon">{skill.icon}</span>
                        <span className="skill-name">{skill.name}</span>
                      </div>
                      <div className="skill-tags">
                        <span className="skill-exp">{skill.experience}</span>
                        <span className="skill-pill">{skill.badge}</span>
                        <span className="skill-percent">{skill.level}%</span>
                      </div>
                    </div>

                    {/* Animated Progress Meter */}
                    <div className="skill-meter-track" aria-hidden="true">
                      <div
                        className="meter-fill"
                        data-level={skill.level}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Architectural Pillars Showcase */}
        <div className="engineering-pillars-grid" ref={pillarsRef}>
          {engineeringPillars.map((pillar, i) => (
            <div key={i} className="pillar-card">
              <div className="pillar-icon-bubble">{pillar.icon}</div>
              <h4 className="pillar-title">{pillar.title}</h4>
              <p className="pillar-desc">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
