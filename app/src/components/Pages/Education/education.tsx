"use client";

import React, { useEffect, useRef } from "react";
import {
  FiAward,
  FiBookOpen,
  FiCalendar,
  FiCheckCircle,
  FiCode,
  FiCpu,
  FiLayers,
  FiMapPin,
  FiTrendingUp,
} from "react-icons/fi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./education.scss";

interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  badge: string;
  grade?: string;
  description: string;
  coreSubjects: string[];
  achievements: string[];
  icon: React.ReactNode;
}

const educationData: EducationItem[] = [
  {
    id: "btech",
    degree: "Bachelor of Technology (B.Tech) in Computer Science & Engineering",
    institution: "Gujarat Technological University",
    location: "Gujarat, India",
    period: "2021 — 2025",
    badge: "Degree Completed",
    grade: "First Class with Distinction (CGPA: 8.5/10)",
    description:
      "Deep foundational training in core computer science, software architecture, algorithm design, and distributed systems. Specialized in full-stack engineering, AI automation workflows, and scalable database systems.",
    coreSubjects: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "Database Management Systems (DBMS)",
      "Operating Systems & Linux",
      "Computer Networks & Cloud",
      "Artificial Intelligence & Machine Learning",
      "Web Technologies & Microservices",
      "Software Engineering & Agile",
    ],
    achievements: [
      "Built comprehensive end-to-end full stack web platforms as capstone projects",
      "Engineered automated AI workflows integrating LLMs, n8n, and custom REST APIs",
      "Active participant in technical symposiums, coding challenges, and hackathons",
    ],
    icon: <FiCpu className="edu-card-icon" />,
  },
  {
    id: "specialization",
    degree: "Advanced Full Stack & AI Engineering Certification",
    institution: "Industry Specializations & Professional Labs",
    location: "Online / Professional Training",
    period: "2023 — 2024",
    badge: "Specialized Credential",
    grade: "Excellence Honors",
    description:
      "Rigorous self-driven and accredited industry immersions focusing on Next.js App Router, modern reactive state management, LangChain agent frameworks, n8n workflow automations, and enterprise Cloud architectures.",
    coreSubjects: [
      "Next.js 15 & React Server Components",
      "TypeScript & High-Scalability Systems",
      "LangChain & Autonomous AI Agents",
      "n8n & Enterprise Automation Pipelines",
      "PostgreSQL, Prisma & Redis Caching",
      "RESTful & GraphQL API Architecture",
    ],
    achievements: [
      "Architected autonomous webhook & event-driven automation pipelines",
      "Mastered server-side rendering, edge functions, and performance profiling",
      "Developed high-converting, accessible UI systems with pixel-perfect precision",
    ],
    icon: <FiCode className="edu-card-icon" />,
  },
  {
    id: "hsc",
    degree: "Higher Secondary Certificate (HSC) — Science Stream",
    institution: "Gujarat Secondary and Higher Secondary Education Board",
    location: "Gujarat, India",
    period: "2019 — 2021",
    badge: "Academic Foundation",
    grade: "Distinction with Science & Math Honors",
    description:
      "Strong rigorous foundation in advanced Mathematics, Physics, and Computer Studies. Developed critical thinking, algorithmic logic, analytical problem solving, and early passion for software programming.",
    coreSubjects: [
      "Advanced Mathematics & Calculus",
      "Physics & Electronics Principles",
      "Computer Science & Problem Solving",
      "Analytical Reasoning & Statistics",
    ],
    achievements: [
      "Excelled with top percentile honors in Mathematics and Computer Studies",
      "Created early foundational software scripts and algorithmic exercises",
    ],
    icon: <FiLayers className="edu-card-icon" />,
  },
];

const highlights = [
  {
    stat: "4+",
    label: "Years of Tech Immersion",
    icon: <FiTrendingUp />,
  },
  {
    stat: "35+",
    label: "Core CS & AI Modules Mastered",
    icon: <FiBookOpen />,
  },
  {
    stat: "Top 5%",
    label: "Capstone Project Excellence",
    icon: <FiAward />,
  },
  {
    stat: "100%",
    label: "Passion for Continuous Mastery",
    icon: <FiCheckCircle />,
  },
];

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

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
            y: 30,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 2. Metrics & Highlights Stagger
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.children,
          {
            y: 24,
            opacity: 0,
            scale: 0.96,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.75,
            stagger: 0.08,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 3. Timeline Items Reveal
      const cards = gsap.utils.toArray<HTMLElement>(".edu-timeline-card");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          {
            y: 40,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
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

  return (
    <section className="education-section" id="education" ref={sectionRef}>
      <div className="education-container">
        {/* Section Header */}
        <div className="education-header" ref={headerRef}>
          <div className="badge-wrapper">
            <span className="education-badge">Academic Foundation</span>
          </div>
          <h2 className="education-title">
            Education &amp; Qualifications
          </h2>
          <p className="education-subtitle">
            A fusion of rigorous academic principles in computer science and cutting-edge practical specialization in Full Stack architecture, AI systems, and automated intelligence.
          </p>
        </div>

        {/* Highlights / Quick Stats Bar */}
        <div className="education-stats-grid" ref={statsRef}>
          {highlights.map((item, index) => (
            <div key={index} className="edu-stat-card">
              <div className="stat-icon-bubble">{item.icon}</div>
              <div className="stat-value">{item.stat}</div>
              <div className="stat-label">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Vertical Timeline Structure */}
        <div className="education-timeline" ref={timelineRef}>
          <div className="timeline-spine" aria-hidden="true" />

          {educationData.map((item) => (
            <div key={item.id} className="edu-timeline-row">
              {/* Timeline Center Node */}
              <div className="timeline-node" aria-hidden="true">
                <span className="node-dot" />
                <span className="node-pulse" />
              </div>

              {/* Card Container */}
              <article className="edu-timeline-card">
                <header className="card-top-bar">
                  <div className="degree-meta">
                    <div className="icon-badge-row">
                      <div className="card-glyph">{item.icon}</div>
                      <span className="status-pill">{item.badge}</span>
                      {item.grade && (
                        <span className="grade-pill">{item.grade}</span>
                      )}
                    </div>
                    <h3 className="degree-name">{item.degree}</h3>
                  </div>

                  <div className="period-badge">
                    <FiCalendar className="badge-icon" />
                    <span>{item.period}</span>
                  </div>
                </header>

                <div className="institution-row">
                  <span className="institution-name">{item.institution}</span>
                  <span className="separator">•</span>
                  <span className="location-tag">
                    <FiMapPin className="pin-icon" />
                    {item.location}
                  </span>
                </div>

                <p className="degree-description">{item.description}</p>

                {/* Core Courses / Skills Pills */}
                <div className="skills-block">
                  <h4 className="block-title">Key Competencies &amp; Coursework</h4>
                  <div className="subject-pills">
                    {item.coreSubjects.map((sub, i) => (
                      <span key={i} className="subject-tag">
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Achievements */}
                <div className="achievements-block">
                  <h4 className="block-title">Key Academic Milestones</h4>
                  <ul className="achievements-list">
                    {item.achievements.map((ach, i) => (
                      <li key={i} className="achievement-item">
                        <FiCheckCircle className="check-icon" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
