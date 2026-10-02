"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  FiActivity,
  FiCpu,
  FiVolume2,
  FiVolumeX,
  FiGlobe,
  FiZap,
  FiBox,
  FiChevronDown,
} from "react-icons/fi";
import { gsap } from "gsap";
import { EARTH_LAND_POINTS } from "./earthPoints";
import "./priloader.scss";

export default function Preloader() {
  const [percent, setPercent] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [shouldRemove, setShouldRemove] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const centerContentRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeCanvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Background Interactive Matrix Constellation Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
    }

    const particleCount = 42;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.6 + 0.6,
        alpha: Math.random() * 0.45 + 0.15,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw particle connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 125) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - dist / 125) * 0.12})`;
            ctx.lineWidth = 0.75;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw and move particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 3D Holographic Earth Globe on Desktop (Exact Match to Reference HUD)
  useEffect(() => {
    const canvas = globeCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const cssWidth = 420;
    const cssHeight = 420;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = cssWidth * dpr;
    canvas.height = cssHeight * dpr;

    // Precompute 3D unit sphere Cartesian coordinates for Earth land points
    const earthPoints3D = EARTH_LAND_POINTS.map(([lat, lon]) => {
      const phi = (lat * Math.PI) / 180;
      const lam = (lon * Math.PI) / 180;
      return {
        x: Math.cos(phi) * Math.sin(lam),
        y: Math.sin(phi),
        z: Math.cos(phi) * Math.cos(lam),
      };
    });

    // India location in unit 3D sphere: lat ~ 22.0° N, lon ~ 78.4° E
    const indiaPhi = (22.0 * Math.PI) / 180;
    const indiaLam = (78.4 * Math.PI) / 180;
    const india3D = {
      x: Math.cos(indiaPhi) * Math.sin(indiaLam),
      y: Math.sin(indiaPhi),
      z: Math.cos(indiaPhi) * Math.cos(indiaLam),
    };

    // Precompute latitude grid circles at -30°, 0° (equator), 30°, 60°
    const latitudeLines = [-30, 0, 30, 60].map((latDeg) => {
      const phi = (latDeg * Math.PI) / 180;
      const pts = [];
      for (let lonDeg = 0; lonDeg <= 360; lonDeg += 5) {
        const lam = (lonDeg * Math.PI) / 180;
        pts.push({
          x: Math.cos(phi) * Math.sin(lam),
          y: Math.sin(phi),
          z: Math.cos(phi) * Math.cos(lam),
        });
      }
      return pts;
    });

    // Precompute longitude meridians
    const longitudeLines = [-60, -30, 0, 30, 60, 90, 120].map((lonDeg) => {
      const lam = (lonDeg * Math.PI) / 180;
      const pts = [];
      for (let latDeg = -80; latDeg <= 80; latDeg += 5) {
        const phi = (latDeg * Math.PI) / 180;
        pts.push({
          x: Math.cos(phi) * Math.sin(lam),
          y: Math.sin(phi),
          z: Math.cos(phi) * Math.cos(lam),
        });
      }
      return pts;
    });

    // Globe center and geometry matching reference image (Medium-Big size)
    const cx = 195;
    const cy = 242;
    const radius = 126;

    // Callout box target coordinates for leader line
    const boxLeft = 255;
    const boxTop = 32;
    const boxHeight = 52;
    const boxMidY = boxTop + boxHeight / 2; // 58px

    // Orbit parameters (tilted ellipse passing across India)
    const aOrb = radius * 1.35;
    const bOrb = radius * 0.44;
    const tiltOrb = 0.40; // ~23 deg positive tilt (top-left to bottom-right)
    const orbCx = cx - 4;
    const orbCy = cy + 15;

    const renderGlobe = () => {
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, cssWidth, cssHeight);

      const now = performance.now();

      // 1. Background Grid & Sci-Fi HUD Ticks
      // Background vertical coordinate hairlines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx, 15);
      ctx.lineTo(cx, cssHeight - 15);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx + 100, 15);
      ctx.lineTo(cx + 100, cssHeight - 15);
      ctx.stroke();

      // Left gauge: vertical line with terminal dot
      ctx.strokeStyle = "rgba(255, 255, 255, 0.22)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(38, 80);
      ctx.lineTo(38, 160);
      ctx.stroke();

      ctx.fillStyle = "#e2e8f0";
      ctx.beginPath();
      ctx.arc(38, 160, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Horizontal tick
      ctx.beginPath();
      ctx.moveTo(50, 120);
      ctx.lineTo(72, 120);
      ctx.stroke();

      // Left 5-dot column
      ctx.fillStyle = "rgba(255, 255, 255, 0.16)";
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.arc(22, 90 + i * 14, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }

      // Right crosshairs '+'
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 4; i++) {
        const yCross = 290 + i * 26;
        const xCross = 398;
        ctx.beginPath();
        ctx.moveTo(xCross - 4, yCross);
        ctx.lineTo(xCross + 4, yCross);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(xCross, yCross - 4);
        ctx.lineTo(xCross, yCross + 4);
        ctx.stroke();
      }

      // 2. Base Angles & Live Subtle 3D Breathing Drift
      const baseLon = (76 * Math.PI) / 180;
      const baseLat = (17 * Math.PI) / 180;
      const rotLon = baseLon + Math.sin(now * 0.0006) * 0.045;
      const rotLat = baseLat + Math.cos(now * 0.0005) * 0.025;

      const cosL = Math.cos(-rotLon);
      const sinL = Math.sin(-rotLon);
      const cosT = Math.cos(rotLat);
      const sinT = Math.sin(rotLat);

      const project = (p: { x: number; y: number; z: number }) => {
        const x1 = p.x * cosL + p.z * sinL;
        const z1 = -p.x * sinL + p.z * cosL;
        const x2 = x1;
        const y2 = p.y * cosT - z1 * sinT;
        const z2 = p.y * sinT + z1 * cosT;
        return {
          px: cx + x2 * radius,
          py: cy - y2 * radius,
          z: z2,
        };
      };

      // 3. Back Arc of Orbit Ring (Behind the sphere)
      ctx.save();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      let startedBack = false;
      for (let deg = 190; deg <= 350; deg += 3) {
        const th = (deg * Math.PI) / 180;
        const ex = aOrb * Math.cos(th);
        const ey = bOrb * Math.sin(th);
        const rx = ex * Math.cos(tiltOrb) - ey * Math.sin(tiltOrb);
        const ry = ex * Math.sin(tiltOrb) + ey * Math.cos(tiltOrb);
        const px = orbCx + rx;
        const py = orbCy + ry;
        if (!startedBack) {
          ctx.moveTo(px, py);
          startedBack = true;
        } else {
          ctx.lineTo(px, py);
        }
      }
      ctx.stroke();
      ctx.restore();

      // 4. Globe Sphere Rim Outline & Atmosphere
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.22)";
      ctx.lineWidth = 1;
      ctx.stroke();

      const atmGrad = ctx.createRadialGradient(
        cx,
        cy,
        radius * 0.82,
        cx,
        cy,
        radius
      );
      atmGrad.addColorStop(0, "rgba(255, 255, 255, 0)");
      atmGrad.addColorStop(1, "rgba(255, 255, 255, 0.08)");
      ctx.fillStyle = atmGrad;
      ctx.fill();

      // 5. Latitude & Longitude Wireframe Lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 0.8;
      latitudeLines.forEach((line) => {
        ctx.beginPath();
        let drawing = false;
        line.forEach((pt) => {
          const pr = project(pt);
          if (pr.z > 0) {
            if (!drawing) {
              ctx.moveTo(pr.px, pr.py);
              drawing = true;
            } else {
              ctx.lineTo(pr.px, pr.py);
            }
          } else {
            drawing = false;
          }
        });
        ctx.stroke();
      });

      longitudeLines.forEach((line) => {
        ctx.beginPath();
        let drawing = false;
        line.forEach((pt) => {
          const pr = project(pt);
          if (pr.z > 0) {
            if (!drawing) {
              ctx.moveTo(pr.px, pr.py);
              drawing = true;
            } else {
              ctx.lineTo(pr.px, pr.py);
            }
          } else {
            drawing = false;
          }
        });
        ctx.stroke();
      });

      // 6. Earth Continent Land Dots (Matrix of Earth)
      earthPoints3D.forEach((p) => {
        const pr = project(p);
        if (pr.z > 0) {
          const alpha = 0.35 + pr.z * 0.65;
          const dotR = 1.05 + pr.z * 0.35;
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(2)})`;
          ctx.beginPath();
          ctx.arc(pr.px, pr.py, dotR, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 7. Front Arc of Orbit Ring (In Front of Globe)
      ctx.save();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1.8;
      ctx.shadowColor = "#ffffff";
      ctx.shadowBlur = 8;
      ctx.beginPath();
      let startedFront = false;
      for (let deg = -10; deg <= 190; deg += 2) {
        const th = (deg * Math.PI) / 180;
        const ex = aOrb * Math.cos(th);
        const ey = bOrb * Math.sin(th);
        const rx = ex * Math.cos(tiltOrb) - ey * Math.sin(tiltOrb);
        const ry = ex * Math.sin(tiltOrb) + ey * Math.cos(tiltOrb);
        const px = orbCx + rx;
        const py = orbCy + ry;
        if (!startedFront) {
          ctx.moveTo(px, py);
          startedFront = true;
        } else {
          ctx.lineTo(px, py);
        }
      }
      ctx.stroke();
      ctx.restore();

      // 8. Orbiting Glowing Satellite Node
      const satAngle = (now * 0.00035) % (Math.PI * 2);
      const sx = aOrb * Math.cos(satAngle);
      const sy = bOrb * Math.sin(satAngle);
      const rxS = sx * Math.cos(tiltOrb) - sy * Math.sin(tiltOrb);
      const ryS = sx * Math.sin(tiltOrb) + sy * Math.cos(tiltOrb);
      const satX = orbCx + rxS;
      const satY = orbCy + ryS;

      // Soft radiant halo
      const satHalo = ctx.createRadialGradient(satX, satY, 1, satX, satY, 18);
      satHalo.addColorStop(0, "rgba(255, 255, 255, 0.65)");
      satHalo.addColorStop(0.5, "rgba(255, 255, 255, 0.2)");
      satHalo.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = satHalo;
      ctx.beginPath();
      ctx.arc(satX, satY, 18, 0, Math.PI * 2);
      ctx.fill();

      // Solid Satellite Node Core
      ctx.save();
      ctx.shadowColor = "#ffffff";
      ctx.shadowBlur = 14;
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(satX, satY, 4.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 9. India Target Beacon
      const indiaPr = project(india3D);
      const beaconX = indiaPr.px;
      const beaconY = indiaPr.py;

      // Outer radar pulse ripple
      const pulseR = 5 + ((now * 0.012) % 22);
      const pulseA = Math.max(0, 1 - pulseR / 22) * 0.7;
      ctx.strokeStyle = `rgba(255, 255, 255, ${pulseA.toFixed(2)})`;
      ctx.lineWidth = 1.3;
      ctx.beginPath();
      ctx.arc(beaconX, beaconY, pulseR, 0, Math.PI * 2);
      ctx.stroke();

      // Radiant Halo
      const beaconHalo = ctx.createRadialGradient(
        beaconX,
        beaconY,
        1,
        beaconX,
        beaconY,
        22
      );
      beaconHalo.addColorStop(0, "rgba(255, 255, 255, 0.85)");
      beaconHalo.addColorStop(0.5, "rgba(255, 255, 255, 0.25)");
      beaconHalo.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = beaconHalo;
      ctx.beginPath();
      ctx.arc(beaconX, beaconY, 22, 0, Math.PI * 2);
      ctx.fill();

      // Solid Glowing Beacon Core
      ctx.save();
      ctx.shadowColor = "#ffffff";
      ctx.shadowBlur = 16;
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(beaconX, beaconY, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 10. Leader Line (Beacon -> Diagonal -> Horizontal into Callout Box)
      ctx.save();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1.6;
      ctx.shadowColor = "#ffffff";
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.moveTo(beaconX, beaconY);
      ctx.lineTo(boxLeft - 20, boxMidY);
      ctx.lineTo(boxLeft, boxMidY);
      ctx.stroke();
      ctx.restore();

      ctx.restore();
      animId = requestAnimationFrame(renderGlobe);
    };

    renderGlobe();

    return () => cancelAnimationFrame(animId);
  }, []);

  // Main Counter & Progression Timer
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const duration = 5000; // 5.0 seconds relaxed cinematic pacing
    const startTime = performance.now();

    const updateCounter = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth custom ease-out curve for steady progression
      const eased = 1 - Math.pow(1 - progress, 2.2);
      const val = Math.floor(eased * 100);

      setPercent(val);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setPercent(100);
        setIsCompleted(true);
      }
    };

    const frameId = requestAnimationFrame(updateCounter);

    return () => {
      cancelAnimationFrame(frameId);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  // Audio Playback Handling with Browser Autoplay Policy
  const startAudio = () => {
    if (!audioRef.current) return;
    audioRef.current.volume = 0.55;
    audioRef.current
      .play()
      .then(() => {
        setIsPlayingAudio(true);
        setHasInteracted(true);
      })
      .catch(() => {
        setIsPlayingAudio(false);
      });
  };

  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;

    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      startAudio();
    }
  };

  // Attempt initial autoplay + listen for first document interaction
  useEffect(() => {
    startAudio();

    const handleFirstUserInteraction = () => {
      if (!hasInteracted && audioRef.current && audioRef.current.paused) {
        startAudio();
      }
    };

    window.addEventListener("pointerdown", handleFirstUserInteraction, { once: true });
    window.addEventListener("keydown", handleFirstUserInteraction, { once: true });

    return () => {
      window.removeEventListener("pointerdown", handleFirstUserInteraction);
      window.removeEventListener("keydown", handleFirstUserInteraction);
    };
  }, [hasInteracted]);

  // Audio smooth fade-out on completion
  useEffect(() => {
    if (!isCompleted || !audioRef.current) return;

    const audio = audioRef.current;
    const fadeInterval = setInterval(() => {
      if (audio.volume > 0.05) {
        audio.volume = Math.max(0, audio.volume - 0.05);
      } else {
        audio.volume = 0;
        audio.pause();
        clearInterval(fadeInterval);
      }
    }, 40);

    return () => clearInterval(fadeInterval);
  }, [isCompleted]);

  // Staggered 5-Column Shutter Exit Animation
  useEffect(() => {
    if (!isCompleted) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay: 0.55,
        onComplete: () => {
          document.documentElement.style.overflow = "";
          document.body.style.overflow = "";
          setShouldRemove(true);
        },
      });

      // 1. Dissolve center stage with elegant scale-up
      if (centerContentRef.current) {
        tl.to(centerContentRef.current, {
          scale: 1.05,
          opacity: 0,
          filter: "blur(8px)",
          duration: 0.45,
          ease: "power3.inOut",
        });
      }

      // 2. Staggered 5-Column Architectural Reveal Lift
      if (columnsRef.current) {
        const columns = columnsRef.current.children;
        tl.to(
          columns,
          {
            yPercent: -100,
            duration: 0.85,
            stagger: {
              each: 0.07,
              from: "random",
            },
            ease: "power4.inOut",
          },
          "-=0.2"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isCompleted]);

  const handleSkip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPercent(100);
    setIsCompleted(true);
  };

  if (shouldRemove) return null;

  // Step calculations for Desktop Left Panel
  const step1 = Math.min(100, Math.floor((percent / 25) * 100));
  const step2 = percent < 25 ? 0 : Math.min(100, Math.floor(((percent - 25) / 25) * 100));
  const step3 =
    percent < 50 ? 0 : percent < 75 ? percent : 100;
  const step4 = percent < 75 ? 0 : Math.min(100, Math.floor(((percent - 75) / 25) * 100));

  return (
    <div
      className={`preloader-overlay ${isCompleted ? "is-exiting" : ""}`}
      ref={containerRef}
      onClick={startAudio}
      aria-hidden="true"
    >
      {/* Background Audio Song Track */}
      <audio
        ref={audioRef}
        src="/audio/preloader.wav"
        preload="auto"
        loop
      />

      {/* Cyber HUD Corner Viewport Brackets */}
      <span className="hud-corner corner-tl" />
      <span className="hud-corner corner-tr" />
      <span className="hud-corner corner-bl" />
      <span className="hud-corner corner-br" />

      {/* Background Matrix Constellation Canvas */}
      <canvas ref={canvasRef} className="preloader-canvas" />

      {/* 5-Column Staggered Architectural Shutter Panels */}
      <div className="shutter-columns" ref={columnsRef}>
        <div className="column-panel" />
        <div className="column-panel" />
        <div className="column-panel" />
        <div className="column-panel" />
        <div className="column-panel" />
      </div>

      {/* Core Interactive Center Content */}
      <div className="preloader-content" ref={centerContentRef}>
        {/* Top Header HUD Bar */}
        <header className="preloader-header">
          <div className="hud-status">
            <span className="radar-ping" />
            <span className="hud-label-desktop">
              {"KERNEL // V4.2.0"} &bull; <strong className="state-ready">SYSTEM READY</strong>
            </span>
            <span className="hud-label-mobile">
              <strong className="state-ready">READY</strong>
            </span>
          </div>

          <div className="header-right-tools">
            {/* Audio Song Control Toggle */}
            <button
              type="button"
              onClick={toggleAudio}
              className={`sound-control-pill ${isPlayingAudio ? "is-active" : "is-muted"}`}
              title={isPlayingAudio ? "Mute rock audio" : "Play rock soundtrack"}
            >
              {isPlayingAudio ? (
                <FiVolume2 className="vol-icon" />
              ) : (
                <FiVolumeX className="vol-icon" />
              )}
              <span className="bolt">⚡</span>
              <span className="vol-text">
                <span className="vol-full">{isPlayingAudio ? "ROCK ON" : "PLAY ROCK"}</span>
                <span className="vol-compact">{isPlayingAudio ? "ROCK" : "PLAY"}</span>
              </span>

              {/* Animated Equalizer Waves */}
              <div className={`mini-eq ${isPlayingAudio ? "active" : ""}`}>
                <span className="b1" />
                <span className="b2" />
                <span className="b3" />
              </div>
            </button>

            {/* Skip Button */}
            <button
              type="button"
              onClick={handleSkip}
              className="skip-intro-btn"
              title="Skip entrance animation"
            >
              <span className="skip-text">SKIP</span>
              <span className="skip-arrow">&rarr;</span>
            </button>
          </div>
        </header>

        {/* Desktop Left HUD Checklist Panel */}
        <aside className="hud-panel-left" aria-hidden="true">
          <div className="panel-slashes">{"//////"}</div>
          <ul className="hud-checklist">
            <li className={`check-item ${percent >= 25 ? "done" : "active"}`}>
              <span className="item-label">INITIALIZING PORTFOLIO</span>
              <span className="item-status">
                <span className={`status-dot ${percent >= 25 ? "solid" : "pulse"}`} />
                <span className="status-val">{step1}%</span>
              </span>
            </li>
            <li className={`check-item ${percent >= 50 ? "done" : percent >= 25 ? "active" : "pending"}`}>
              <span className="item-label">LOADING ASSETS</span>
              <span className="item-status">
                <span className={`status-dot ${percent >= 50 ? "solid" : percent >= 25 ? "pulse" : "empty"}`} />
                <span className="status-val">{step2}%</span>
              </span>
            </li>
            <li className={`check-item ${percent >= 75 ? "done" : percent >= 50 ? "active" : "pending"}`}>
              <span className="item-label">PREPARING EXPERIENCES</span>
              <span className="item-status">
                <span className={`status-dot ${percent >= 75 ? "solid" : percent >= 50 ? "pulse" : "empty"}`} />
                <span className="status-val">{step3}%</span>
              </span>
            </li>
            <li className={`check-item ${percent >= 100 ? "done" : percent >= 75 ? "active" : "pending"}`}>
              <span className="item-label">FINALIZING UI</span>
              <span className="item-status">
                <span className={`status-dot ${percent >= 100 ? "solid" : percent >= 75 ? "pulse" : "empty"}`} />
                <span className="status-val">{step4}%</span>
              </span>
            </li>
          </ul>
        </aside>

        {/* Desktop Right HUD 3D Globe Panel */}
        <aside className="hud-panel-right" aria-hidden="true">
          <div className="globe-canvas-wrapper">
            <canvas ref={globeCanvasRef} className="globe-canvas" />
            <div className="globe-leader-callout">
              <div className="callout-box">
                <span className="loc-title">INDIA (IST)</span>
                <span className="loc-sub">LOCATION</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Center Stage: Futuristic HUD Compass & Morphing Typography */}
        <main className="center-stage">
          {/* Mobile Upper Telemetry (Shown on mobile left of dial) */}
          <div className="mobile-dial-telemetry-left">
            <div className="tele-row">
              <span className="tele-dot" />
              <span>{"KERNEL // V4.2.0"}</span>
            </div>
            <div className="tele-sub">{"LOCATION // INDIA"}</div>
            <div className="tele-sub">{"MODE // FOCUSED"}</div>
          </div>

          {/* Cyber HUD Orbital Dial */}
          <div className="hud-compass-wrapper">
            {/* Desktop Left Callout */}
            <div className="dial-callout-left">
              <div className="bracket-wrap">
                <span>{"// DEVELOPER"}</span>
                <span>{"// DESIGNER"}</span>
                <span>{"// CREATOR"}</span>
              </div>
            </div>

            {/* Rotating Orbital Rings with Satellite Nodes */}
            <div className="compass-ring ring-outer">
              <span className="orbit-node node-1" />
              <span className="orbit-node node-2" />
              <span className="orbit-node node-3" />
            </div>
            <div className="compass-ring ring-mid" />
            <div className="compass-ring ring-inner" />
            <div className="laser-sweep-line" />

            {/* Central 3D Sphere Monogram */}
            <div className="hud-center-monogram">
              <span className="monogram-glow">HG</span>
            </div>

            {/* Mobile Right Callout */}
            <div className="dial-callout-mobile-right">
              <div className="bracket-wrap">
                <span>{"// DEVELOPER"}</span>
                <span>{"// DESIGNER"}</span>
                <span>{"// CREATOR"}</span>
              </div>
            </div>

            {/* Desktop Right Telemetry Stack */}
            <div className="dial-telemetry-right">
              <span>IDEAS</span>
              <span>CODE</span>
              <span>DESIGN</span>
              <span>BUILD</span>
              <span className="repeat-row">
                REPEAT <span className="repeat-dot" />
              </span>
            </div>
          </div>

          {/* Morphing Typographic Identity */}
          <div className="morph-phrase-wrapper">
            <span className="slide-badge">{"01 // SALUTATION"}</span>
            <h2 className="salutation-title">
              नमस्ते <span className="accent-dot">&bull;</span> HELLO
            </h2>
            <h1 className="hero-name">HARSHIL GAJJAR</h1>
            <p className="hero-tagline">Engineering The Extraordinary</p>

            {/* Mobile Role Tags Line */}
            <div className="mobile-role-tags">
              <div>DEVELOPER &nbsp;/&nbsp; DESIGNER &nbsp;/&nbsp; PROBLEM SOLVER</div>
              <div>AI EXPLORER &nbsp;/&nbsp; LIFELONG LEARNER</div>
            </div>
          </div>

          {/* Precision Digital Counter Box with Corner Brackets */}
          <div className="counter-box">
            <span className="corner-bracket c-tl" />
            <span className="corner-bracket c-tr" />
            <span className="corner-bracket c-bl" />
            <span className="corner-bracket c-br" />

            <div className="counter-display">
              <span className="counter-digits">
                {percent < 10 ? `0${percent}` : percent}
              </span>
              <span className="counter-unit">%</span>
            </div>
          </div>

          {/* Glowing Hairline Progress Line */}
          <div className="progress-track-wrapper">
            <div
              className="progress-track-fill"
              style={{ width: `${percent}%` }}
            >
              <span className="progress-spark" />
            </div>
          </div>

          {/* Loading Caption */}
          <div className="loading-caption">
            L O A D I N G &nbsp; M Y &nbsp; W O R L D . . .
          </div>

          {/* Mobile 3-Card Telemetry Grid */}
          <div className="mobile-telemetry-grid">
            <div className="metric-card">
              <FiZap className="card-icon" />
              <div className="metric-val">14MS</div>
              <div className="metric-label">LATENCY</div>
            </div>

            <div className="metric-card">
              <FiBox className="card-icon" />
              <div className="metric-val">60 FPS</div>
              <div className="metric-label">PERFORMANCE</div>
            </div>

            <div className="metric-card">
              <FiGlobe className="card-icon" />
              <div className="metric-val">INDIA (IST)</div>
              <div className="metric-label">LOCATION</div>
            </div>
          </div>

          {/* Mobile Down Chevron */}
          <div className="mobile-down-indicator">
            <FiChevronDown />
          </div>
        </main>

        {/* Bottom Technical Telemetry Bar */}
        <footer className="preloader-footer">
          {/* Desktop Footer */}
          <div className="desktop-footer-content">
            <div className="footer-left">
              <span className="next-badge">N</span>
              <span className="footer-metric">{"LATENCY: 14MS // 60 FPS"}</span>
            </div>

            <div className="footer-ticker">
              AI AGENTS &nbsp;/&nbsp; NEXT.JS &nbsp;/&nbsp; REACT &nbsp;/&nbsp; DESIGN &nbsp;/&nbsp; CREATE &nbsp;/&nbsp; INNOVATE
            </div>

            <div className="footer-right">
              <span className="broadcast-icon">((&bull;))</span>
              <span className="access-label">REMOTE ACCESS</span>
              <span className="cursor-block">&block;</span>
            </div>
          </div>

          {/* Mobile Footer */}
          <div className="mobile-footer-content">
            <span className="next-badge">N</span>
            <div className="mobile-footer-pill">
              <FiCpu className="icon" />
              <span>{"AI AGENTS // NEXT.JS 16 // GSAP"}</span>
            </div>
            <span className="activity-icon-badge">
              <FiActivity />
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
