"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  FiArrowUpRight,
  FiChevronDown,
  FiMail,
  FiMenu,
  FiX,
  FiZap,
} from "react-icons/fi";
import "./navbar.scss";

interface NavItem {
  label: string;
  href: string;
  id: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "#home", id: "home" },
  { label: "Story", href: "#story", id: "story" },
  { label: "Education", href: "#education", id: "education" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export default function Navbar() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [talkDropdownOpen, setTalkDropdownOpen] = useState(false);

  const talkDropdownRef = useRef<HTMLDivElement>(null);

  // ScrollSpy & Sticky Navbar Detection
  useEffect(() => {
    const handleScroll = () => {
      // 1. Detect if scrolled past threshold
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // 2. Active section spy
      const sections = ["home", "story", "education", "skills", "projects", "contact", "collaborate"];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Click outside listener for Let's Talk dropdown & Escape key handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        talkDropdownRef.current &&
        !talkDropdownRef.current.contains(event.target as Node)
      ) {
        setTalkDropdownOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setTalkDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setTalkDropdownOpen(false);

    if (targetId === "home") {
      const homeEl = document.getElementById("home");
      if (homeEl) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        router.push("/");
      }
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: "smooth",
      });
    } else {
      router.push(`/#${targetId}`);
    }
  };

  return (
    <>
      <header className={`navbar-wrapper ${isScrolled ? "scrolled" : ""}`}>
        <div className="navbar-container">
          {/* Brand Logo & Monogram */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "home")}
            className="navbar-brand"
            aria-label="Harshil Gajjar Homepage"
          >
            <span className="brand-monogram">HG</span>
            <span className="brand-text">
              <span className="brand-title">Harshil Gajjar</span>
              <span className="brand-sub">Full Stack &amp; AI</span>
            </span>
          </a>

          {/* Desktop Navigation Capsule */}
          <nav className="navbar-nav" aria-label="Main Navigation">
            <ul className="nav-list">
              {navItems.map((item) => (
                <li key={item.id} className="nav-item">
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`nav-link ${activeSection === item.id ? "active" : ""
                      }`}
                  >
                    <span>{item.label}</span>
                    {activeSection === item.id && (
                      <span className="active-dot" aria-hidden="true" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Action: Availability Status & Let's Talk Dropdown */}
          <div className="navbar-actions">
            {/* Live Availability Badge */}
            <div className="availability-pill" title="Currently available for hire and contracts">
              <span className="status-dot">
                <span className="status-pulse" />
              </span>
              <span className="status-text">Available</span>
            </div>

            {/* Let's Talk CTA with Dropdown Options */}
            <div className="talk-dropdown-wrapper" ref={talkDropdownRef}>
              <button
                type="button"
                onClick={() => setTalkDropdownOpen((prev) => !prev)}
                className={`navbar-cta-btn ${talkDropdownOpen ? "active" : ""}`}
                aria-expanded={talkDropdownOpen}
                aria-haspopup="true"
                id="talk-dropdown-trigger"
              >
                <span>Let&apos;s Talk</span>
                <FiChevronDown
                  className={`cta-chevron ${talkDropdownOpen ? "open" : ""}`}
                />
              </button>

              {talkDropdownOpen && (
                <div
                  className="talk-dropdown-menu"
                  role="menu"
                  aria-labelledby="talk-dropdown-trigger"
                >
                  {/* Option 1: Contact Us */}
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setTalkDropdownOpen(false);
                      handleNavClick(
                        { preventDefault: () => { } } as React.MouseEvent<HTMLAnchorElement>,
                        "contact"
                      );
                    }}
                    className="dropdown-option-item"
                  >
                    <div className="option-icon-box contact-box">
                      <FiMail className="opt-icon" />
                    </div>
                    <div className="option-text">
                      <span className="opt-title">Contact Us</span>
                      <span className="opt-sub">Send a direct message or general inquiry</span>
                    </div>
                    <FiArrowUpRight className="opt-arrow" />
                  </button>

                  <div className="dropdown-divider" />

                  {/* Option 2: Collaborate */}
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setTalkDropdownOpen(false);
                      router.push("/celebrate");
                    }}
                    className="dropdown-option-item highlight-item"
                  >
                    <div className="option-icon-box collaborate-box">
                      <FiZap className="opt-icon" />
                    </div>
                    <div className="option-text">
                      <div className="opt-title-row">
                        <span className="opt-title">Collaborate</span>
                        <span className="opt-badge">Launch</span>
                      </div>
                      <span className="opt-sub">Project blueprint &amp; kickoff celebration</span>
                    </div>
                    <FiArrowUpRight className="opt-arrow" />
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-menu-toggle"
              aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation Overlay */}
      <div
        className={`mobile-nav-drawer ${mobileMenuOpen ? "open" : ""}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="drawer-backdrop" onClick={() => setMobileMenuOpen(false)} />
        <div className="drawer-panel">
          <div className="drawer-header">
            <div className="drawer-brand">
              <span className="brand-monogram">HG</span>
              <span className="brand-title">Harshil Gajjar</span>
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="drawer-close-btn"
              aria-label="Close navigation"
            >
              <FiX />
            </button>
          </div>

          <nav className="drawer-nav">
            <ul className="drawer-list">
              {navItems.map((item) => (
                <li key={item.id} className="drawer-item">
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`drawer-link ${activeSection === item.id ? "active" : ""
                      }`}
                  >
                    <span>{item.label}</span>
                    <FiArrowUpRight className="drawer-arrow" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="drawer-footer">
            <div className="drawer-availability">
              <FiZap className="sparkle-icon" />
              <span>Available for Full-Time &amp; Freelance Roles</span>
            </div>
            <div className="drawer-action-group">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleNavClick(
                    { preventDefault: () => { } } as React.MouseEvent<HTMLAnchorElement>,
                    "contact"
                  );
                }}
                className="drawer-cta-btn secondary"
              >
                <FiMail className="btn-icon" />
                <span>Contact Us</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  router.push("/celebrate");
                }}
                className="drawer-cta-btn primary"
              >
                <FiZap className="btn-icon" />
                <span>Collaborate</span>
                <FiArrowUpRight className="btn-arrow" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
