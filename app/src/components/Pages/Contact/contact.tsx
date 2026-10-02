"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  FiArrowUpRight,
  FiCheck,
  FiClock,
  FiCopy,
  FiMail,
  FiMapPin,
  FiMessageSquare,
  FiSend,
  FiTag,
  FiUser,
} from "react-icons/fi";
import {
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
  FaBehance,
} from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./contact.scss";

const socialLinks = [
  {
    name: "GitHub",
    icon: <FaGithub />,
    href: "https://github.com",
    handle: "@harshilgajjar",
  },
  {
    name: "LinkedIn",
    icon: <FaLinkedinIn />,
    href: "https://linkedin.com",
    handle: "in/harshilgajjar",
  },
  {
    name: "Instagram",
    icon: <FaInstagram />,
    href: "https://instagram.com",
    handle: "@harshil.gajjar",
  },
  {
    name: "Behance",
    icon: <FaBehance />,
    href: "https://behance.net",
    handle: "harshilgajjar",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const emailAddress = "harshilgajjar.dev@gmail.com";

  const handleCopyEmail = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(emailAddress);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setIsSubmitted(false);
    }, 4500);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Header entrance
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 2. Info Cards entrance
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 3. Form Reveal
      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: formRef.current,
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

  return (
    <section
      className="contact-section"
      id="contact"
      ref={sectionRef}
    >
      <div className="contact-container">
        {/* Section Header */}
        <div className="contact-header" ref={headerRef}>
          <div className="badge-wrapper">
            <span className="contact-badge">Get In Touch</span>
          </div>
          <h2 className="contact-title">Contact Me</h2>
          <p className="contact-subtitle">
            Have a question, an exciting project opportunity, or just want to say hello? Leave a message below and I&apos;ll get back to you promptly.
          </p>
        </div>

        {/* Main Contact Grid (Contact Info on left, Standard Contact Form on right) */}
        <div className="contact-main-grid">
          {/* Left Column: Direct Info & Social Hub */}
          <div className="contact-info-column" ref={cardsRef}>
            {/* Live Availability Beacon Card */}
            <div className="info-card availability-card">
              <div className="availability-badge">
                <span className="pulse-indicator">
                  <span className="pulse-core" />
                  <span className="pulse-aura" />
                </span>
                <span className="availability-text">Available For Work</span>
              </div>
              <h3 className="card-headline">Let&apos;s Start a Conversation</h3>
              <p className="card-subtext">
                Currently open for freelance contracts, full-time engineering roles, and technical collaborations worldwide.
              </p>
            </div>

            {/* Direct Email with Copy Button Card */}
            <div className="info-card direct-email-card">
              <div className="card-top-icon">
                <FiMail />
              </div>
              <div className="email-meta">
                <span className="meta-label">Email Address</span>
                <a href={`mailto:${emailAddress}`} className="email-link">
                  {emailAddress}
                </a>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className={`btn-copy-email ${copiedEmail ? "copied" : ""}`}
                title="Copy email address"
              >
                {copiedEmail ? (
                  <>
                    <FiCheck className="icon" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <FiCopy className="icon" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </div>

            {/* Location & Timezone Card */}
            <div className="info-card location-card">
              <div className="loc-item">
                <div className="card-top-icon">
                  <FiMapPin />
                </div>
                <div>
                  <span className="meta-label">Location</span>
                  <div className="meta-value">Gujarat, India (Remote Worldwide)</div>
                </div>
              </div>

              <div className="loc-separator" />

              <div className="loc-item">
                <div className="card-top-icon">
                  <FiClock />
                </div>
                <div>
                  <span className="meta-label">Response Time</span>
                  <div className="meta-value">Within 24 Hours • IST (GMT +5:30)</div>
                </div>
              </div>
            </div>

            {/* Social Channels Stack */}
            <div className="info-card social-hub-card">
              <span className="meta-label">Connect Across Platforms</span>
              <div className="social-links-grid">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-hub-item"
                  >
                    <span className="s-icon">{social.icon}</span>
                    <span className="s-name">{social.name}</span>
                    <FiArrowUpRight className="s-arrow" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Standard Clean Contact Form */}
          <div className="contact-form-column">
            <form
              className="editorial-contact-form"
              ref={formRef}
              onSubmit={handleSubmit}
            >
              <div className="form-header-box">
                <h3 className="form-title">Send a Message</h3>
                <p className="form-desc">
                  Fill out the form below and I will get back to you as soon as possible.
                </p>
              </div>

              {/* Name & Email Inputs */}
              <div className="form-inputs-row">
                <div className="input-group">
                  <label htmlFor="contact-name" className="field-label">
                    Your Name
                  </label>
                  <div className="input-wrapper">
                    <FiUser className="input-icon" />
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="e.g. John Doe"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="text-input"
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label htmlFor="contact-email" className="field-label">
                    Your Email Address
                  </label>
                  <div className="input-wrapper">
                    <FiMail className="input-icon" />
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="john@example.com"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="text-input"
                    />
                  </div>
                </div>
              </div>

              {/* Subject Input */}
              <div className="form-field-group">
                <label htmlFor="contact-subject" className="field-label">
                  Subject
                </label>
                <div className="input-wrapper">
                  <FiTag className="input-icon" />
                  <input
                    id="contact-subject"
                    type="text"
                    placeholder="e.g. Project Inquiry, Full-Time Role, or Collaboration"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="text-input"
                  />
                </div>
              </div>

              {/* Message Input */}
              <div className="form-field-group">
                <label htmlFor="contact-message" className="field-label">
                  Your Message
                </label>
                <div className="input-wrapper textarea-wrapper">
                  <FiMessageSquare className="input-icon textarea-icon" />
                  <textarea
                    id="contact-message"
                    rows={5}
                    placeholder="Write your message here..."
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="text-area"
                  />
                </div>
              </div>

              {/* Form Submission Button & Feedback */}
              <div className="form-submit-row">
                <button
                  type="submit"
                  disabled={isSubmitted}
                  className={`btn-send-message ${isSubmitted ? "sent" : ""}`}
                >
                  {isSubmitted ? (
                    <>
                      <FiCheck className="btn-send-icon" />
                      <span>Message Sent Successfully!</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <FiSend className="btn-send-icon" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
