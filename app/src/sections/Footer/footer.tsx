"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FiArrowUp,
  FiArrowUpRight,
  FiCheck,
  FiClock,
  FiCopy,
  FiMail,
  FiMapPin,
  FiTerminal,
} from "react-icons/fi";
import {
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
  FaBehance,
} from "react-icons/fa";
import "./footer.scss";

const navLinks = [
  { label: "Home", href: "#home", id: "home" },
  { label: "My Story", href: "#story", id: "story" },
  { label: "Academic Journey", href: "#education", id: "education" },
  { label: "Technical Arsenal", href: "#skills", id: "skills" },
  { label: "Featured Projects", href: "#projects", id: "projects" },
  { label: "Contact", href: "#contact", id: "contact" },
];

const specializations = [
  "Full Stack Web Platforms",
  "Autonomous AI Agent Workflows",
  "Enterprise n8n Automations",
  "Next.js 15 & Server Components",
  "Distributed Systems & APIs",
  "High-Converting UI/UX Engineering",
];

const socialLinks = [
  {
    name: "GitHub",
    icon: <FaGithub />,
    href: "https://github.com",
    handle: "github.com/harshilgajjar",
  },
  {
    name: "LinkedIn",
    icon: <FaLinkedinIn />,
    href: "https://linkedin.com",
    handle: "linkedin.com/in/harshilgajjar",
  },
  {
    name: "Instagram",
    icon: <FaInstagram />,
    href: "https://instagram.com",
    handle: "instagram.com/harshil.gajjar",
  },
  {
    name: "Behance",
    icon: <FaBehance />,
    href: "https://behance.net",
    handle: "behance.net/harshilgajjar",
  },
];

export default function Footer() {
  const router = useRouter();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [istTime, setIstTime] = useState("");

  const emailAddress = "harshilgajjar.dev@gmail.com";

  // Live IST Clock (Gujarat, India)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setIstTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(emailAddress);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2400);
    }
  };

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    if (targetId === "home") {
      const homeEl = document.getElementById("home");
      if (homeEl) {
        scrollToTop();
      } else {
        router.push("/");
      }
      return;
    }
    const el = document.getElementById(targetId);
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: "smooth",
      });
    } else {
      router.push(`/#${targetId}`);
    }
  };

  return (
    <footer className="luxury-footer" role="contentinfo">
      <div className="footer-container">
        {/* Top Massive Callout Banner */}
        <div className="footer-hero-banner">
          <div className="banner-left">
            <span className="banner-eyebrow">
              <span className="live-dot" />
              Available for Full-Time Roles &amp; High-Impact Projects
            </span>
            <h2 className="banner-headline">
              Let&apos;s build something <span className="highlight-text">extraordinary</span> together.
            </h2>
          </div>

          <div className="banner-right">
            <a
              href="#collaborate"
              onClick={(e) => handleNavClick(e, "collaborate")}
              className="footer-cta-action"
            >
              <span>Initiate Conversation</span>
              <FiArrowUpRight className="cta-icon" />
            </a>
          </div>
        </div>

        {/* 4-Column Editorial Links Grid */}
        <div className="footer-columns-grid">
          {/* Column 1: Brand & Direct Connect */}
          <div className="footer-col brand-col">
            <div className="brand-header">
              <span className="brand-monogram">HG</span>
              <div className="brand-info">
                <span className="brand-name">HARSHIL GAJJAR</span>
                <span className="brand-title">Full Stack Developer &amp; AI Engineer</span>
              </div>
            </div>

            <p className="brand-bio">
              Architecting high-performance web systems, autonomous AI agent pipelines, and intelligent automated workflows for ambitious organizations.
            </p>

            <div className="direct-email-chip">
              <FiMail className="mail-icon" />
              <span className="email-text">{emailAddress}</span>
              <button
                type="button"
                onClick={handleCopyEmail}
                className={`copy-btn ${copiedEmail ? "copied" : ""}`}
                title="Copy email to clipboard"
                aria-label="Copy email"
              >
                {copiedEmail ? <FiCheck /> : <FiCopy />}
              </button>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="footer-col nav-col">
            <h3 className="col-heading">Navigation</h3>
            <ul className="footer-links-list">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.id)}
                    className="footer-nav-link"
                  >
                    <span>{link.label}</span>
                    <FiArrowUpRight className="link-arrow" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Core Specializations */}
          <div className="footer-col spec-col">
            <h3 className="col-heading">Specializations</h3>
            <ul className="footer-links-list skills-list">
              {specializations.map((spec, i) => (
                <li key={i} className="spec-item">
                  <span className="spec-dot">•</span>
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Location, Time & Socials */}
          <div className="footer-col presence-col">
            <h3 className="col-heading">Local Presence</h3>

            <div className="location-info-box">
              <div className="info-row">
                <FiMapPin className="row-icon" />
                <span className="row-text">Gujarat, India (Remote Worldwide)</span>
              </div>
              <div className="info-row">
                <FiClock className="row-icon" />
                <span className="row-text">
                  IST ({istTime || "GMT +5:30"})
                </span>
              </div>
            </div>

            <div className="social-links-stack">
              <span className="social-label">Connect &amp; Follow</span>
              <div className="social-icons-row">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon-btn"
                    title={social.name}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Giant Monogram Horizon Watermark */}
        <div className="footer-giant-watermark" aria-hidden="true">
          <span className="watermark-text">HARSHIL GAJJAR</span>
        </div>

        {/* Bottom Bar: Copyright & Tech Badges */}
        <div className="footer-bottom-bar">
          <div className="bottom-left">
            <p className="copyright-text">
              &copy; {new Date().getFullYear()} Harshil Gajjar. All rights reserved.
            </p>
            <span className="tech-badge">
              <FiTerminal className="badge-icon" />
              <span>Next.js 15 App Router &bull; TypeScript &bull; GSAP</span>
            </span>
          </div>

          <div className="bottom-right">
            <button
              type="button"
              onClick={scrollToTop}
              className="footer-back-to-top"
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <div className="arrow-bubble">
                <FiArrowUp />
              </div>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
