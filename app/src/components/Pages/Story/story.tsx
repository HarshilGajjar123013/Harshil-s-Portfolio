"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { FiArrowUpRight, FiFileText } from "react-icons/fi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./story.scss";

export default function Story() {
  const storyRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const polaroidsRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || !storyRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // About / My Story Staggered Upward Reveal
      const revealItems = [
        badgeRef.current,
        titleRef.current,
        introRef.current,
        polaroidsRef.current,
        bodyRef.current,
        ctaRef.current,
      ].filter(Boolean);

      gsap.fromTo(
        revealItems,
        {
          y: 24,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: storyRef.current,
            start: "top 72%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, storyRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section className="story-section" id="story" ref={storyRef}>
      <div className="story-container">
        {/* Section Heading */}
        <div className="story-header">
          <span className="story-badge" ref={badgeRef}>
            About Me
          </span>
          <h2 className="story-title" ref={titleRef}>
            My Story
          </h2>
        </div>

        {/* 1st Paragraph (Before Images) */}
        <div className="story-intro" ref={introRef}>
          <p className="editorial-text">
            <strong>
              I&apos;m Harshil, A Strategic And Innovation-Driven Full Stack Developer &amp; AI &amp; Automation Engineer.
            </strong>{" "}
            <span>
              Passionate About Architecting High-Performance Systems And Intelligent
              Workflows. I Leverage Modern Technology To Help Companies Meet Their
              Visionary Goals.
            </span>{" "}
            <strong>Analytical, Results-Focused, And Highly Collaborative,</strong>{" "}
            <span>
              I Excel At Crafting Seamless Digital Experiences That Drive Lasting Success.
            </span>
          </p>
        </div>

        {/* Pinned Polaroids Showcase (Between 1st & 2nd/3rd Paragraphs) */}
        <div className="polaroid-showcase" ref={polaroidsRef}>
          {/* Polaroid 1 (Tilted Left) */}
          <div className="polaroid-card polaroid-left">
            <div className="pushpin" aria-hidden="true">
              <span className="pin-head" />
              <span className="pin-shadow" />
            </div>
            <div className="polaroid-inner">
              <Image
                src="/assert/img/story.png"
                alt="Harshil Gajjar portrait"
                width={1254}
                height={1254}
                className="polaroid-photo photo-one"
                priority
              />
            </div>
          </div>

          {/* Polaroid 2 (Tilted Right & Overlapping) */}
          <div className="polaroid-card polaroid-right">
            <div className="pushpin" aria-hidden="true">
              <span className="pin-head" />
              <span className="pin-shadow" />
            </div>
            <div className="polaroid-inner">
              <Image
                src="/assert/img/story2.png"
                alt="Harshil Gajjar portrait"
                width={1254}
                height={1254}
                className="polaroid-photo photo-two"
              />
            </div>
          </div>
        </div>

        {/* 2 Paragraphs (After Images) */}
        <div className="story-body" ref={bodyRef}>
          <p className="editorial-text">
            <strong>
              I&apos;m Always Evolving—Refining My Technical Skills, Architectural Approaches, And Engineering Mindset
            </strong>{" "}
            <span>
              To Meet The Ever-Changing Challenges Of The Tech Landscape. I Thrive In Proactive,
              Ambitious Teams That Value Scalable Architecture, Clean Code, And
              Innovative Engineering Cultures.
            </span>
          </p>

          <p className="editorial-text secondary">
            <span>
              In My Free Time, I Love Diving Into Emerging AI Research, Automating
              Complex Processes, And Building Passion Projects. Being At The Intersection
              Of Creativity And Engineering Fills Me With Energy And Pure Drive!
            </span>
          </p>
        </div>

        {/* View Resume CTA */}
        <div className="story-cta-wrapper" ref={ctaRef}>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="resume-btn"
          >
            <FiFileText className="btn-icon" />
            <span>View My Resume</span>
            <FiArrowUpRight className="arrow-icon" />
          </a>
        </div>
      </div>
    </section>
  );
}
