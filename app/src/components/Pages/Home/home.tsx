"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import {
  FaBehance,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";
import { FiArrowUpRight } from "react-icons/fi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./home.scss";

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const portraitImgRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  const socialLinks = [
    {
      name: "GitHub",
      icon: <FaGithub />,
      href: "https://github.com",
    },
    {
      name: "Instagram",
      icon: <FaInstagram />,
      href: "https://instagram.com",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedinIn />,
      href: "https://linkedin.com",
    },
    {
      name: "Behance",
      icon: <FaBehance />,
      href: "https://behance.net",
    },
  ];

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || !heroRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    // Desktop (min-width: 1025px)
    mm.add("(min-width: 1025px)", () => {
      // 1. Portrait Scale Down & Y shift (1 -> 0.95, Y: 0 -> -40px)
      if (portraitImgRef.current) {
        gsap.to(portraitImgRef.current, {
          y: -40,
          scale: 0.95,
          transformOrigin: "bottom center",
          force3D: true,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      // 2. Left Content Subtle Upward Shift
      if (leftContentRef.current) {
        gsap.to(leftContentRef.current, {
          y: -25,
          opacity: 0.88,
          force3D: true,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      // 3. Social Buttons Subtle Parallax
      if (socialRef.current) {
        gsap.to(socialRef.current, {
          y: -15,
          opacity: 0.92,
          force3D: true,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    });

    // Tablet (769px to 1024px)
    mm.add("(min-width: 769px) and (max-width: 1024px)", () => {
      // Scale: 1 -> 0.96, Y: 0 -> -25px
      if (portraitImgRef.current) {
        gsap.to(portraitImgRef.current, {
          y: -25,
          scale: 0.96,
          transformOrigin: "bottom center",
          force3D: true,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      if (leftContentRef.current) {
        gsap.to(leftContentRef.current, {
          y: -18,
          opacity: 0.9,
          force3D: true,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      if (socialRef.current) {
        gsap.to(socialRef.current, {
          y: -10,
          force3D: true,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    });

    // Mobile (max-width: 768px)
    mm.add("(max-width: 768px)", () => {
      // Scale: 1 -> 0.97, Y: 0 -> -15px
      if (portraitImgRef.current) {
        gsap.to(portraitImgRef.current, {
          y: -15,
          scale: 0.97,
          transformOrigin: "bottom center",
          force3D: true,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      if (leftContentRef.current) {
        gsap.to(leftContentRef.current, {
          y: -10,
          opacity: 0.92,
          force3D: true,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      if (socialRef.current) {
        gsap.to(socialRef.current, {
          y: -6,
          force3D: true,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <main className="hero-page" ref={heroRef} id="home">
      {/* Background Giant Typography Header */}
      <div className="giant-title-wrapper" aria-hidden="true">
        <h1 className="giant-title">
          <span className="outline-text">HARSHIL</span>
          <span className="solid-text">GAJJAR</span>
        </h1>
      </div>

      {/* Center Hero Portrait Image with Smooth Bottom Fade */}
      <div className="portrait-container">
        <div className="portrait-frame" ref={portraitImgRef}>
          <Image
            src="/assert/img/Harshil2.png"
            alt="Harshil Gajjar"
            width={1800}
            height={1278}
            priority
            className="portrait-img"
          />
        </div>
      </div>

      {/* Left Content: Title, Description, and CTA */}
      <div className="hero-left-content" ref={leftContentRef}>
        <h2 className="role-title">
          Full Stack Developer &amp; AI &amp; Automation Engineer
        </h2>
        <p className="role-description">
          Building high-impact web applications, intelligent AI systems, and scalable automated workflows designed to accelerate business growth.
        </p>
        <Link href="/celebrate" className="collaborate-btn">
          <span>Let&apos;s collaborate</span>
          <FiArrowUpRight className="arrow-icon" />
        </Link>
      </div>

      {/* Right Content: Social Media Links Stack */}
      <div className="hero-right-content" ref={socialRef}>
        <nav aria-label="Social profiles" className="social-pill-list">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-pill"
            >
              <span className="social-icon">{social.icon}</span>
              <span className="social-label">{social.name}</span>
            </a>
          ))}
        </nav>
      </div>
    </main>
  );
}
