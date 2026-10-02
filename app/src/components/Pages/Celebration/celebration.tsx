"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  FiActivity,
  FiArrowUpRight,
  FiCheckCircle,
  FiClock,
  FiCopy,
  FiCpu,
  FiLayers,
  FiLock,
  FiMail,
  FiMessageSquare,
  FiPhone,
  FiSend,
  FiShield,
  FiUploadCloud,
  FiUser,
  FiZap,
} from "react-icons/fi";
import { gsap } from "gsap";
import "./celebration.scss";

const projectDomains = [
  {
    id: "fullstack",
    title: "Full Stack Web Platform",
    desc: "Next.js 15, React, TypeScript, high-concurrency APIs, and scalable DB architecture.",
    icon: <FiLayers />,
  },
  {
    id: "ai-agents",
    title: "AI Agents & LLM Systems",
    desc: "Autonomous agent orchestration, LangChain, semantic vector search, and custom tools.",
    icon: <FiCpu />,
  },
  {
    id: "automation",
    title: "n8n Workflow Automation",
    desc: "Enterprise webhook integrations, lead scoring, automated notification pipelines.",
    icon: <FiZap />,
  },
  {
    id: "enterprise",
    title: "Enterprise Architecture & Audit",
    desc: "System scalability review, Core Web Vitals optimization, database refactoring.",
    icon: <FiShield />,
  },
];

const timelineOptions = [
  "Immediate (Next 7-14 Days)",
  "Within 1 Month",
  "1 — 3 Months",
  "Flexible / Long-Term Retainer",
];

const projectStatusOptions = [
  "Idea / Conceptual Phase",
  "Requirements & Scope Defined",
  "In Active Development / Refactoring",
  "Ready for Production Launch",
];

const trustPerks = [
  {
    icon: <FiLock />,
    title: "100% IP & NDA Protected",
    desc: "Your proprietary code and vision remain strictly confidential under mutual NDA.",
  },
  {
    icon: <FiClock />,
    title: "Rapid 24-Hour Turnaround",
    desc: "Guaranteed architectural response, blueprint review, and estimate within 24 hours.",
  },
  {
    icon: <FiUser />,
    title: "Direct Engineering Access",
    desc: "Work directly with Harshil as your technical architect with zero middlemen.",
  },
  {
    icon: <FiZap />,
    title: "Performance & SLA Standard",
    desc: "Enterprise-grade code quality, sub-second API speeds, and zero-compromise security.",
  },
];

export default function Celebration() {
  const [selectedDomain, setSelectedDomain] = useState("fullstack");
  const [selectedTimeline, setSelectedTimeline] = useState(timelineOptions[0]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    budget: "$3,000 — $7,000",
    timeline: timelineOptions[0],
    projectStatus: projectStatusOptions[0],
    message: "",
    fileName: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const emailAddress = "harshilgajjar.dev@gmail.com";

  // Confetti Particle System
  const triggerConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = [
      "#18181b",
      "#10b981",
      "#3b82f6",
      "#f59e0b",
      "#8b5cf6",
      "#ec4899",
      "#ffffff",
    ];

    interface Particle {
      x: number;
      y: number;
      size: number;
      color: string;
      speedX: number;
      speedY: number;
      rotation: number;
      rotSpeed: number;
      opacity: number;
    }

    const particles: Particle[] = [];
    const count = 120;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 200,
        y: canvas.height * 0.35 + (Math.random() - 0.5) * 100,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * 16,
        speedY: Math.random() * -14 - 4,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 12,
        opacity: 1,
      });
    }

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let activeCount = 0;

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.speedY += 0.45; // gravity
        p.rotation += p.rotSpeed;
        p.opacity -= 0.007;

        if (p.opacity > 0) {
          activeCount++;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.globalAlpha = Math.max(0, p.opacity);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
          ctx.restore();
        }
      });

      if (activeCount > 0) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  };

  // Trigger celebration on initial mount
  useEffect(() => {
    const timer = setTimeout(() => {
      triggerConfetti();
    }, 400);

    // GSAP entrance
    if (heroRef.current && formCardRef.current) {
      gsap.fromTo(
        heroRef.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" }
      );

      gsap.fromTo(
        formCardRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, delay: 0.25, ease: "power3.out" }
      );
    }

    return () => clearTimeout(timer);
  }, []);

  const handleCopyEmail = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(emailAddress);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2400);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    triggerConfetti();
    setIsSubmitted(true);
  };

  return (
    <main className="celebration-page" id="collaborate">
      {/* Background Interactive Confetti Canvas */}
      <canvas ref={canvasRef} className="confetti-canvas" aria-hidden="true" />

      <div className="celebration-container">
        {/* Hero Section */}
        <section className="celebration-hero" ref={heroRef}>
          <div className="badge-pill">
            <span className="beacon-dot" />
            <span>Partnership Launchpad &bull; Step 1 of 1</span>
          </div>

          <h1 className="hero-title">
            Let&apos;s Celebrate A New Beginning.
            <span className="title-sub"> Ready To Architect The Extraordinary.</span>
          </h1>

          <p className="hero-description">
            You are one step away from translating your ambitious product vision into high-impact, production-ready software. Select your project parameters below to initiate our collaboration.
          </p>
        </section>

        {/* Interactive Collaboration Launchpad Card */}
        <div className="launchpad-card" ref={formCardRef}>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="launchpad-form">
              {/* Step 1: Contact Coordinates (2-Column Desktop/Tablet, 1-Column Mobile) */}
              <div className="form-section">
                <div className="section-label-group">
                  <span className="step-counter">01</span>
                  <div className="label-text">
                    <h2 className="step-title">Contact &amp; Identification</h2>
                    <p className="step-subtitle">
                      Provide your coordinates so Harshil can prepare an architectural review.
                    </p>
                  </div>
                </div>

                <div className="form-two-col-grid">
                  <div className="input-field">
                    <label htmlFor="user-name" className="field-lbl">
                      Full Name *
                    </label>
                    <div className="input-wrap">
                      <FiUser className="f-icon" />
                      <input
                        id="user-name"
                        type="text"
                        placeholder="e.g. Maya Patel"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="f-input"
                      />
                    </div>
                  </div>

                  <div className="input-field">
                    <label htmlFor="user-email" className="field-lbl">
                      Email Address *
                    </label>
                    <div className="input-wrap">
                      <FiMail className="f-icon" />
                      <input
                        id="user-email"
                        type="email"
                        placeholder="maya@company.com"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="f-input"
                      />
                    </div>
                  </div>

                  <div className="input-field">
                    <label htmlFor="user-phone" className="field-lbl">
                      Phone Number (Optional)
                    </label>
                    <div className="input-wrap">
                      <FiPhone className="f-icon" />
                      <input
                        id="user-phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="f-input"
                      />
                    </div>
                  </div>

                  <div className="input-field">
                    <label htmlFor="user-company" className="field-lbl">
                      Company / Organization (Optional)
                    </label>
                    <div className="input-wrap">
                      <FiLayers className="f-icon" />
                      <input
                        id="user-company"
                        type="text"
                        placeholder="Company or Startup Name"
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                        className="f-input"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Collaboration Type */}
              <div className="form-section">
                <div className="section-label-group">
                  <span className="step-counter">02</span>
                  <div className="label-text">
                    <h2 className="step-title">Collaboration Type</h2>
                    <p className="step-subtitle">
                      Choose the primary discipline that best matches your immediate requirements.
                    </p>
                  </div>
                </div>

                <div className="domains-grid">
                  {projectDomains.map((domain) => (
                    <button
                      key={domain.id}
                      type="button"
                      onClick={() => setSelectedDomain(domain.id)}
                      className={`domain-choice-card ${
                        selectedDomain === domain.id ? "selected" : ""
                      }`}
                    >
                      <div className="choice-icon">{domain.icon}</div>
                      <div className="choice-body">
                        <span className="choice-title">{domain.title}</span>
                        <p className="choice-desc">{domain.desc}</p>
                      </div>
                      <div className="choice-check">
                        {selectedDomain === domain.id && <FiCheckCircle />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Project Description */}
              <div className="form-section">
                <div className="section-label-group">
                  <span className="step-counter">03</span>
                  <div className="label-text">
                    <h2 className="step-title">Project Description</h2>
                    <p className="step-subtitle">
                      Share your vision, current technical stack, key deliverables, or architectural challenges.
                    </p>
                  </div>
                </div>

                <div className="textarea-field">
                  <label htmlFor="user-message" className="field-lbl">
                    Project Vision &amp; Technical Objectives *
                  </label>
                  <div className="input-wrap textarea-wrap">
                    <FiMessageSquare className="f-icon textarea-icon" />
                    <textarea
                      id="user-message"
                      rows={4}
                      placeholder="Describe the solution you want to build, expected timelines, target users, or integrations needed..."
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="f-textarea"
                    />
                  </div>
                </div>
              </div>

              {/* Step 4: Budget & Timeline (2-Column Desktop/Tablet, 1-Column Mobile) */}
              <div className="form-section">
                <div className="section-label-group">
                  <span className="step-counter">04</span>
                  <div className="label-text">
                    <h2 className="step-title">Scope &amp; Timeline</h2>
                    <p className="step-subtitle">
                      Define the target delivery window and budget scope.
                    </p>
                  </div>
                </div>

                <div className="form-two-col-grid">
                  <div className="input-field">
                    <label htmlFor="user-budget" className="field-lbl">
                      Budget / Investment Scope
                    </label>
                    <div className="input-wrap">
                      <select
                        id="user-budget"
                        value={formData.budget}
                        onChange={(e) =>
                          setFormData({ ...formData, budget: e.target.value })
                        }
                        className="f-select"
                      >
                        <option value="$1,000 — $3,000">$1,000 — $3,000</option>
                        <option value="$3,000 — $7,000">$3,000 — $7,000</option>
                        <option value="$7,000 — $15,000+">$7,000 — $15,000+</option>
                        <option value="Enterprise Scope">Enterprise Scope / Custom</option>
                      </select>
                    </div>
                  </div>

                  <div className="input-field">
                    <label htmlFor="user-timeline" className="field-lbl">
                      Desired Timeline
                    </label>
                    <div className="input-wrap">
                      <FiClock className="f-icon" />
                      <select
                        id="user-timeline"
                        value={selectedTimeline}
                        onChange={(e) => {
                          setSelectedTimeline(e.target.value);
                          setFormData({ ...formData, timeline: e.target.value });
                        }}
                        className="f-select"
                      >
                        {timelineOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 5: Project Status & Upload (2-Column Desktop/Tablet, 1-Column Mobile) */}
              <div className="form-section">
                <div className="section-label-group">
                  <span className="step-counter">05</span>
                  <div className="label-text">
                    <h2 className="step-title">Project Status &amp; Assets</h2>
                    <p className="step-subtitle">
                      Indicate the current maturity stage and attach any existing wireframes, PRDs, or specs.
                    </p>
                  </div>
                </div>

                <div className="form-two-col-grid">
                  <div className="input-field">
                    <label htmlFor="user-status" className="field-lbl">
                      Project Status
                    </label>
                    <div className="input-wrap">
                      <FiActivity className="f-icon" />
                      <select
                        id="user-status"
                        value={formData.projectStatus}
                        onChange={(e) =>
                          setFormData({ ...formData, projectStatus: e.target.value })
                        }
                        className="f-select"
                      >
                        {projectStatusOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="input-field">
                    <label htmlFor="user-file" className="field-lbl">
                      Upload Specs / Brief (Optional)
                    </label>
                    <div
                      className="input-wrap file-upload-wrap"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <FiUploadCloud className="f-icon upload-icon" />
                      <span className="file-name-text">
                        {formData.fileName || "Choose file (.pdf, .fig, .zip, .png)"}
                      </span>
                      <input
                        id="user-file"
                        type="file"
                        ref={fileInputRef}
                        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.zip"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setFormData({ ...formData, fileName: file.name });
                          }
                        }}
                        className="file-hidden-input"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Submit Button & Celebrate Button */}
              <div className="form-action-bar">
                <button type="submit" className="submit-launch-btn">
                  <span className="submit-label-full">Launch Collaboration &amp; Transmit Blueprint</span>
                  <span className="submit-label-short">Launch Collaboration</span>
                  <FiSend className="btn-icon" />
                </button>

                <button
                  type="button"
                  onClick={triggerConfetti}
                  className="celebrate-burst-btn"
                  title="Pop celebration confetti"
                >
                  <span>Celebrate</span>
                  <span className="celebrate-sparkle">✨</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="celebration-success-card">
              <div className="success-icon-badge">
                <FiCheckCircle className="check-icon" />
              </div>
              <h2 className="success-title">🎉 Blueprint Dispatched Successfully!</h2>
              <p className="success-desc">
                Thank you, <strong>{formData.name}</strong>. Harshil has received your project briefing and will conduct an initial architectural feasibility assessment.
              </p>
              <div className="next-steps-box">
                <h3 className="next-title">What happens next?</h3>
                <ul className="next-list">
                  <li>
                    <FiCheckCircle className="dot-icon" />
                    <span>Comprehensive architecture review &amp; timeline estimate within 12–24 hours.</span>
                  </li>
                  <li>
                    <FiCheckCircle className="dot-icon" />
                    <span>Direct technical walkthrough invitation via Google Meet / Zoom.</span>
                  </li>
                </ul>
              </div>

              <div className="success-actions">
                <button
                  type="button"
                  onClick={triggerConfetti}
                  className="pop-again-btn"
                >
                  <span>Celebrate Again ✨</span>
                </button>
                <Link href="/" className="back-home-btn">
                  <span>Return to Homepage</span>
                  <FiArrowUpRight className="icon" />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Direct Channel & Fast Track Strip */}
        <div className="direct-channel-strip">
          <div className="strip-info">
            <span className="strip-title">Prefer an immediate conversation?</span>
            <span className="strip-desc">
              Reach out directly to skip the queue or discuss time-sensitive engagements.
            </span>
          </div>

          <div className="strip-actions">
            <a
              href={`mailto:${emailAddress}`}
              className="strip-email-link"
              title="Send direct email"
            >
              <FiMail className="icon" />
              <span>{emailAddress}</span>
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              className={`strip-copy-btn ${copiedEmail ? "copied" : ""}`}
            >
              {copiedEmail ? <FiCheckCircle /> : <FiCopy />}
              <span>{copiedEmail ? "Copied to Clipboard!" : "Copy Email Address"}</span>
            </button>
          </div>
        </div>

        {/* Partnership Trust Guarantees */}
        <section className="trust-perks-grid">
          {trustPerks.map((perk, i) => (
            <div key={i} className="trust-card">
              <div className="perk-icon">{perk.icon}</div>
              <h3 className="perk-title">{perk.title}</h3>
              <p className="perk-desc">{perk.desc}</p>
            </div>
          ))}
        </section>

      </div>
    </main>
  );
}
