"use client";

import React, { useState, useEffect } from "react";
import { FiArrowUp } from "react-icons/fi";
import "./backToTop.scss";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      // Show button after scrolling past 350px
      if (currentScroll > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Calculate percentage (0 - 100)
      if (scrollHeight > 0) {
        const progress = Math.min(
          100,
          Math.max(0, (currentScroll / scrollHeight) * 100)
        );
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // SVG circular progress parameters
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (scrollProgress / 100) * circumference;

  return (
    <div
      className={`back-to-top-wrapper ${isVisible ? "visible" : ""}`}
      aria-hidden={!isVisible}
    >
      <button
        type="button"
        onClick={scrollToTop}
        className="back-to-top-btn"
        aria-label="Scroll back to top of the page"
        title="Back to Top"
      >
        {/* SVG Circular Scroll Progress Ring */}
        <svg
          className="progress-ring"
          width="54"
          height="54"
          viewBox="0 0 54 54"
          aria-hidden="true"
        >
          {/* Track background ring */}
          <circle
            className="ring-bg"
            cx="27"
            cy="27"
            r={radius}
            strokeWidth="2.5"
          />
          {/* Active progress indicator ring */}
          <circle
            className="ring-fill"
            cx="27"
            cy="27"
            r={radius}
            strokeWidth="2.5"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: strokeDashoffset,
            }}
          />
        </svg>

        {/* Center Icon & Pulse */}
        <div className="btn-inner">
          <FiArrowUp className="arrow-icon" />
        </div>

        {/* Floating Tooltip */}
        <span className="btn-tooltip" aria-hidden="true">
          Top
        </span>
      </button>
    </div>
  );
}
