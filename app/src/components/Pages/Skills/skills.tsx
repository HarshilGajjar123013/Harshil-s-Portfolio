"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  FiCpu,
  FiCode,
  FiLayers,
  FiServer,
  FiZap,
  FiSliders,
  FiShield,
} from "react-icons/fi";
import {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiPython,
  SiTailwindcss,
  SiBootstrap,
  SiDjango,
  SiGit,
  SiGithub,
  SiHtml5,
  SiN8N,
  SiGoogleappsscript,
  SiCursor,
  SiClaudecode,
  SiDeepmind,
} from "react-icons/si";
import { FaCss3Alt } from "react-icons/fa6";
import { VscVscode } from "react-icons/vsc";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./skills.scss";

type SkillCategory = "all" | "languages" | "frontend" | "backend" | "tools" | "ai";

interface SkillItem {
  name: string;
  level: number;
  badge: string;
  experience: string;
  icon: React.ReactNode;
}

interface SkillDomain {
  id: "languages" | "frontend" | "backend" | "tools" | "ai";
  title: string;
  tagline: string;
  icon: React.ReactNode;
  summary: string;
  skills: SkillItem[];
}

const skillDomains: SkillDomain[] = [
  {
    id: "languages",
    title: "Programming Languages",
    tagline: "Core Logic, Scripting & Algorithmic Foundations",
    icon: <FiCode />,
    summary:
      "Core programming languages used for developing scalable web applications, algorithm logic, and automated backend scripts.",
    skills: [
      {
        name: "JavaScript",
        level: 95,
        badge: "Advanced",
        experience: "3+ Years",
        icon: <SiJavascript />,
      },
      {
        name: "Python",
        level: 92,
        badge: "Advanced",
        experience: "3+ Years",
        icon: <SiPython />,
      },
    ],
  },
  {
    id: "frontend",
    title: "Frontend Development",
    tagline: "Modern, Responsive & Component-Driven UI",
    icon: <FiLayers />,
    summary:
      "Crafting dynamic, accessible, and high-performance user interfaces with modern React frameworks and flexible CSS utility systems.",
    skills: [
      {
        name: "React.js",
        level: 94,
        badge: "Advanced",
        experience: "3+ Years",
        icon: <SiReact />,
      },
      {
        name: "Next.js",
        level: 92,
        badge: "Advanced",
        experience: "2+ Years",
        icon: <SiNextdotjs />,
      },
      {
        name: "HTML5",
        level: 98,
        badge: "Expert",
        experience: "4+ Years",
        icon: <SiHtml5 />,
      },
      {
        name: "CSS3",
        level: 95,
        badge: "Expert",
        experience: "4+ Years",
        icon: <FaCss3Alt />,
      },
      {
        name: "Tailwind CSS",
        level: 94,
        badge: "Advanced",
        experience: "3+ Years",
        icon: <SiTailwindcss />,
      },
      {
        name: "Bootstrap",
        level: 90,
        badge: "Proficient",
        experience: "3+ Years",
        icon: <SiBootstrap />,
      },
    ],
  },
  {
    id: "backend",
    title: "Backend Development",
    tagline: "Scalable APIs & Robust Business Logic",
    icon: <FiServer />,
    summary:
      "Architecting robust server-side applications, relational database models, and RESTful API microservices.",
    skills: [
      {
        name: "Django",
        level: 90,
        badge: "Advanced",
        experience: "2+ Years",
        icon: <SiDjango />,
      },
    ],
  },
  {
    id: "tools",
    title: "Development Tools",
    tagline: "Version Control, IDE & Developer Productivity",
    icon: <FiSliders />,
    summary:
      "Proficient with industry-standard development environments, collaborative Git workflows, and productivity toolchains.",
    skills: [
      {
        name: "Git",
        level: 93,
        badge: "Advanced",
        experience: "3+ Years",
        icon: <SiGit />,
      },
      {
        name: "GitHub",
        level: 92,
        badge: "Advanced",
        experience: "3+ Years",
        icon: <SiGithub />,
      },
      {
        name: "VS Code",
        level: 96,
        badge: "Expert",
        experience: "4+ Years",
        icon: <VscVscode />,
      },
      {
        name: "Cursor",
        level: 95,
        badge: "Expert",
        experience: "2+ Years",
        icon: <SiCursor />,
      },
      {
        name: "Claude Code",
        level: 94,
        badge: "Expert",
        experience: "2+ Years",
        icon: <SiClaudecode />,
      },
      {
        name: "Antigravity",
        level: 95,
        badge: "Expert",
        experience: "2+ Years",
        icon: <SiDeepmind />,
      },
    ],
  },
  {
    id: "ai",
    title: "AI & Automation",
    tagline: "Intelligent Workflows & Automated Scripting",
    icon: <FiCpu />,
    summary:
      "Harnessing next-generation AI tools, workflow automation engines, and custom cloud scripts to build smart, efficient processes.",
    skills: [
      {
        name: "AI Tools (n8n, AppScript)",
        level: 94,
        badge: "Expert",
        experience: "2+ Years",
        icon: <FiCpu />,
      },
      {
        name: "n8n",
        level: 92,
        badge: "Advanced",
        experience: "2+ Years",
        icon: <SiN8N />,
      },
      {
        name: "AppScript",
        level: 90,
        badge: "Advanced",
        experience: "2+ Years",
        icon: <SiGoogleappsscript />,
      },
    ],
  },
];

const marqueeTech = [
  "JAVASCRIPT",
  "PYTHON",
  "REACT.JS",
  "NEXT.JS",
  "HTML5",
  "CSS3",
  "TAILWIND CSS",
  "BOOTSTRAP",
  "DJANGO",
  "GIT",
  "GITHUB",
  "VS CODE",
  "CURSOR",
  "CLAUDE CODE",
  "ANTIGRAVITY",
  "AI TOOLS",
  "N8N",
  "APPSCRIPT",
];

const engineeringPillars = [
  {
    icon: <FiZap />,
    title: "High-Performance Execution",
    description:
      "Clean semantic markup, optimized client-side rendering, fast load speeds, and zero-layout-shift UI engineering.",
  },
  {
    icon: <FiCpu />,
    title: "Automated Intelligence",
    description:
      "Streamlined workflow automation pipelines with n8n, Google Apps Script, and intelligent AI tool integrations.",
  },
  {
    icon: <FiShield />,
    title: "Production-Grade Reliability",
    description:
      "Reliable backend architecture with Django, systematic Git version control, and clean component-driven design.",
  },
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState<SkillCategory>("all");
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const domainsContainerRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);

  const col1Domains = skillDomains.filter((d) =>
    ["frontend", "languages", "backend"].includes(d.id)
  );
  const col2Domains = skillDomains.filter((d) =>
    ["tools", "ai"].includes(d.id)
  );

  const filteredDomains =
    activeTab === "all"
      ? skillDomains
      : skillDomains.filter((d) => d.id === activeTab);

  const renderDomainCard = (domain: SkillDomain) => (
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
  );

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
            onClick={() => setActiveTab("languages")}
            className={`tab-btn ${activeTab === "languages" ? "active" : ""}`}
          >
            <FiCode className="tab-icon" />
            <span>Languages</span>
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
            onClick={() => setActiveTab("tools")}
            className={`tab-btn ${activeTab === "tools" ? "active" : ""}`}
          >
            <FiSliders className="tab-icon" />
            <span>Tools</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("ai")}
            className={`tab-btn ${activeTab === "ai" ? "active" : ""}`}
          >
            <FiCpu className="tab-icon" />
            <span>AI</span>
          </button>
        </nav>

        {/* Domains & Skill Matrix Grid */}
        <div
          className={`skills-domains-grid ${activeTab !== "all" ? "single-view" : ""}`}
          ref={domainsContainerRef}
        >
          {activeTab === "all" ? (
            <>
              <div className="skills-column">
                {col1Domains.map(renderDomainCard)}
              </div>
              <div className="skills-column">
                {col2Domains.map(renderDomainCard)}
              </div>
            </>
          ) : (
            filteredDomains.map(renderDomainCard)
          )}
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
