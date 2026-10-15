"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import {
  Layers,
  Cpu,
  Sparkles,
  Database,
  HardDrive,
  Globe,
  Boxes,
  Zap,
  Activity,
  CheckCircle2,
  ArrowDownUp,
} from "lucide-react";

interface ArchitectureNode {
  id: string;
  category: "core" | "state" | "architecture" | "networking" | "backend" | "ai" | "storage" | "tooling";
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  highlight: string;
  metric?: string;
  accent: "violet" | "cyan" | "indigo" | "emerald" | "amber";
  icon: React.ComponentType<{ className?: string }>;
  // Desktop canvas coordinates (viewBox: 0 0 700 510)
  x: number;
  y: number;
  width: number;
  height: number;
  portSide: "left" | "right" | "top" | "bottom";
  portCoords: { x: number; y: number };
  targetCoords: { x: number; y: number };
  pathData: string;
}

const NODES: ArchitectureNode[] = [
  // LEFT COLUMN SATELLITES
  {
    id: "clean-arch",
    category: "architecture",
    tag: "DOMAIN",
    title: "Clean Architecture",
    subtitle: "Domain · Repositories · Use Cases",
    description: "Strict layer boundaries isolating business logic from external frameworks, enabling deterministic testing and scalable feature growth.",
    highlight: "Promptixa · 53 Passing Unit & Widget Tests",
    metric: "53 Tests",
    accent: "violet",
    icon: Layers,
    x: 20,
    y: 70,
    width: 176,
    height: 72,
    portSide: "right",
    portCoords: { x: 196, y: 106 },
    targetCoords: { x: 232, y: 120 },
    pathData: "M 196 106 C 210 106, 218 120, 232 120",
  },
  {
    id: "rest-apis",
    category: "networking",
    tag: "NETWORKING",
    title: "REST APIs & Network",
    subtitle: "Dio · Interceptors · JSON Serialization",
    description: "Resilient client-server networking pipeline with bearer token refresh, automated request retries, and schema-validated payload decoding.",
    highlight: "Cloudinary & Gemini AI API pipelines",
    metric: "Auto-Retry",
    accent: "cyan",
    icon: Globe,
    x: 20,
    y: 190,
    width: 176,
    height: 72,
    portSide: "right",
    portCoords: { x: 196, y: 226 },
    targetCoords: { x: 232, y: 255 },
    pathData: "M 196 226 C 210 226, 218 255, 232 255",
  },
  {
    id: "local-storage",
    category: "storage",
    tag: "PERSISTENCE",
    title: "Local Storage",
    subtitle: "Hive · SQLite · Secure Box",
    description: "Sub-millisecond key-value box storage for instant feed caching and relational SQLite for structured offline transaction ledgers.",
    highlight: "Promptixa & Expense Tracker · Zero Layout Shift",
    metric: "<2ms Query",
    accent: "indigo",
    icon: HardDrive,
    x: 20,
    y: 310,
    width: 176,
    height: 72,
    portSide: "right",
    portCoords: { x: 196, y: 346 },
    targetCoords: { x: 232, y: 300 },
    pathData: "M 196 346 C 210 346, 218 300, 232 300",
  },

  // RIGHT COLUMN SATELLITES
  {
    id: "on-device-ai",
    category: "ai",
    tag: "EDGE AI",
    title: "On-Device AI & ML",
    subtitle: "Google ML Kit · Zero Cloud Latency",
    description: "Local on-device machine learning inference for speech-to-text, neural translation, and TTS without network latency or cloud reliance.",
    highlight: "CLVCA · Flagship Offline Voice Chat",
    metric: "100% Offline",
    accent: "emerald",
    icon: Sparkles,
    x: 504,
    y: 70,
    width: 176,
    height: 72,
    portSide: "left",
    portCoords: { x: 504, y: 106 },
    targetCoords: { x: 468, y: 120 },
    pathData: "M 504 106 C 490 106, 482 120, 468 120",
  },
  {
    id: "firebase",
    category: "backend",
    tag: "REALTIME CLOUD",
    title: "Firebase Suite",
    subtitle: "Firestore · Realtime DB · Auth",
    description: "Sub-second bidirectional synchronization, atomic transactions for username reservation, and declarative Firestore security rules.",
    highlight: "Who Knows Sagar · 80+ Concurrent Live Users",
    metric: "Realtime Sync",
    accent: "amber",
    icon: Database,
    x: 504,
    y: 190,
    width: 176,
    height: 72,
    portSide: "left",
    portCoords: { x: 504, y: 226 },
    targetCoords: { x: 468, y: 255 },
    pathData: "M 504 226 C 490 226, 482 255, 468 255",
  },
  {
    id: "dev-tools",
    category: "tooling",
    tag: "ECOSYSTEM",
    title: "Developer Tooling",
    subtitle: "Published Packages · pub.dev",
    description: "Modular open-source Flutter libraries authored and published for the global ecosystem, focusing on dynamic color systems and theming.",
    highlight: "Chroma Kit & Chroma Theme on pub.dev",
    metric: "Open Source",
    accent: "violet",
    icon: Boxes,
    x: 504,
    y: 310,
    width: 176,
    height: 72,
    portSide: "left",
    portCoords: { x: 504, y: 346 },
    targetCoords: { x: 468, y: 300 },
    pathData: "M 504 346 C 490 346, 482 300, 468 300",
  },
];

// Color mapping helper
const getAccentClasses = (accent: ArchitectureNode["accent"], isSelected: boolean) => {
  switch (accent) {
    case "cyan":
      return {
        badge: "text-brand-cyan bg-brand-cyan/10 border-brand-cyan/20",
        border: isSelected ? "border-brand-cyan shadow-brand-cyan/20 ring-1 ring-brand-cyan/50" : "hover:border-brand-cyan/50",
        icon: "text-brand-cyan",
        pathColor: "#06b6d4",
      };
    case "emerald":
      return {
        badge: "text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
        border: isSelected ? "border-emerald-500 shadow-emerald-500/20 ring-1 ring-emerald-500/50" : "hover:border-emerald-500/50",
        icon: "text-emerald-500 dark:text-emerald-400",
        pathColor: "#10b981",
      };
    case "amber":
      return {
        badge: "text-amber-500 dark:text-amber-400 bg-amber-500/10 border-amber-500/20",
        border: isSelected ? "border-amber-500 shadow-amber-500/20 ring-1 ring-amber-500/50" : "hover:border-amber-500/50",
        icon: "text-amber-500 dark:text-amber-400",
        pathColor: "#f59e0b",
      };
    case "indigo":
      return {
        badge: "text-brand-indigo bg-brand-indigo/10 border-brand-indigo/20",
        border: isSelected ? "border-brand-indigo shadow-brand-indigo/20 ring-1 ring-brand-indigo/50" : "hover:border-brand-indigo/50",
        icon: "text-brand-indigo",
        pathColor: "#6366f1",
      };
    case "violet":
    default:
      return {
        badge: "text-brand-violet-light bg-brand-violet/10 border-brand-violet/20",
        border: isSelected ? "border-brand-violet shadow-brand-violet/20 ring-1 ring-brand-violet/50" : "hover:border-brand-violet/50",
        icon: "text-brand-violet-light",
        pathColor: "#8b5cf6",
      };
  }
};

export const HeroVisual: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Mouse tilt physics for gentle parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 120, damping: 20 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], prefersReducedMotion ? [0, 0] : [5, -5]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], prefersReducedMotion ? [0, 0] : [-5, 5]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY, prefersReducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  // Active node data for inspector HUD
  const activeNode = NODES.find((n) => n.id === activeId);
  const isFlutterActive = activeId === "flutter-core";
  const isRiverpodActive = activeId === "riverpod-state";

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[700px] select-none"
      style={{ perspective: 1200 }}
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-gradient-to-tr from-brand-violet/15 via-brand-indigo/15 to-brand-cyan/15 blur-3xl -z-10 pointer-events-none" />

      {/* 3D Tilt Wrapper */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        transition={{ type: "spring", stiffness: 140, damping: 22 }}
        className="relative w-full rounded-3xl border border-brand-card-border bg-brand-surface/75 backdrop-blur-xl shadow-2xl shadow-black/10 dark:shadow-black/70 overflow-hidden p-3 sm:p-5"
      >
        {/* Technical Blueprint Grid Pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.07] text-brand-text-primary">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="arch-grid-pattern" width="28" height="28" patternUnits="userSpaceOnUse">
                <path d="M 28 0 L 0 0 0 28" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#arch-grid-pattern)" />
          </svg>
        </div>

        {/* Top Telemetry Header Bar */}
        <div className="relative z-20 flex items-center justify-between pb-3 mb-2 border-b border-brand-border/60 text-[10px] font-mono text-brand-text-muted">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold tracking-wider text-brand-text-secondary uppercase">
              Living Architecture
            </span>
            <span className="hidden sm:inline-block text-brand-text-muted">· v3.2.0</span>
          </div>

          <div className="flex items-center space-x-3">
            <span className="hidden md:inline-flex items-center space-x-1 text-brand-violet-light">
              <Zap className="w-3 h-3" />
              <span>Reactive Core</span>
            </span>
            <div className="px-2 py-0.5 rounded-full bg-brand-pill-bg border border-brand-pill-border text-[9px] uppercase tracking-wider text-brand-text-primary">
              Interactive Graph
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* DESKTOP / TABLET SPATIAL CANVAS (visible on >= md)         */}
        {/* ========================================================= */}
        <div className="hidden md:block relative w-full aspect-[700/510] max-h-[510px]">
          {/* SVG Animated Connector Paths */}
          <svg
            viewBox="0 0 700 510"
            className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
          >
            <defs>
              <linearGradient id="busGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>

            {/* Central Vertical Spine / Bus (Flutter <-> Riverpod) */}
            <g>
              <line
                x1="350"
                y1="184"
                x2="350"
                y2="226"
                stroke="url(#busGradient)"
                strokeWidth={isFlutterActive || isRiverpodActive ? "3" : "2"}
                strokeOpacity={isFlutterActive || isRiverpodActive ? "0.9" : "0.4"}
              />
              {/* Traveling packet on spine */}
              {!prefersReducedMotion && (
                <circle r="2.5" fill="#a78bfa">
                  <animate
                    attributeName="cy"
                    values="184;226;184"
                    dur="2.5s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="cx"
                    values="350;350;350"
                    dur="2.5s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}
            </g>

            {/* Satellite Node Connectors */}
            {NODES.map((node) => {
              const isSelected = activeId === node.id;
              const { pathColor } = getAccentClasses(node.accent, isSelected);

              return (
                <g key={`path-${node.id}`}>
                  {/* Base subtle guide line */}
                  <path
                    d={node.pathData}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-brand-border/80 dark:text-white/10 transition-opacity duration-300"
                    opacity={isSelected ? 0.15 : 0.4}
                  />

                  {/* Active highlight line */}
                  <path
                    d={node.pathData}
                    fill="none"
                    stroke={pathColor}
                    strokeWidth={isSelected ? "2.5" : "1.5"}
                    strokeDasharray={isSelected ? "5 5" : "none"}
                    strokeOpacity={isSelected ? 1 : 0.25}
                    className="transition-all duration-300"
                  />

                  {/* Node junction dots */}
                  <circle
                    cx={node.portCoords.x}
                    cy={node.portCoords.y}
                    r={isSelected ? 4 : 2.5}
                    fill={pathColor}
                    className="transition-all duration-300"
                  />
                  <circle
                    cx={node.targetCoords.x}
                    cy={node.targetCoords.y}
                    r={isSelected ? 3.5 : 2}
                    fill={pathColor}
                    className="transition-all duration-300"
                  />
                </g>
              );
            })}
          </svg>

          {/* SATELLITE CARDS (HTML Overlay in 3D coordinate space) */}
          {NODES.map((node) => {
            const isSelected = activeId === node.id;
            const { badge, border, icon: IconColor } = getAccentClasses(node.accent, isSelected);
            const Icon = node.icon;

            return (
              <button
                key={node.id}
                type="button"
                onMouseEnter={() => setActiveId(node.id)}
                onMouseLeave={() => setActiveId((curr) => (curr === node.id ? null : curr))}
                onFocus={() => setActiveId(node.id)}
                onBlur={() => setActiveId(null)}
                onClick={() => setActiveId((curr) => (curr === node.id ? null : node.id))}
                style={{
                  position: "absolute",
                  left: `${(node.x / 700) * 100}%`,
                  top: `${(node.y / 510) * 100}%`,
                  width: `${(node.width / 700) * 100}%`,
                  height: `${(node.height / 510) * 100}%`,
                  transform: isSelected ? "translateZ(14px) scale(1.02)" : "translateZ(6px)",
                }}
                className={`group text-left p-2.5 rounded-xl border bg-brand-surface-card/90 backdrop-blur-md transition-all duration-200 cursor-pointer shadow-md ${
                  isSelected
                    ? `${border} bg-brand-surface-hover/95 shadow-lg`
                    : "border-brand-card-border hover:border-brand-border-focus"
                }`}
                aria-label={`${node.title} - ${node.subtitle}`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-semibold tracking-wider border ${badge}`}
                  >
                    {node.tag}
                  </span>
                  <Icon className={`w-3.5 h-3.5 ${IconColor} transition-transform group-hover:scale-110`} />
                </div>
                <div className="mt-1 font-sans text-xs font-bold text-brand-text-primary tracking-tight truncate">
                  {node.title}
                </div>
                <div className="font-mono text-[9px] text-brand-text-muted truncate mt-0.5">
                  {node.subtitle}
                </div>
              </button>
            );
          })}

          {/* CENTRAL CORE: FLUTTER ENGINE */}
          <button
            type="button"
            onMouseEnter={() => setActiveId("flutter-core")}
            onMouseLeave={() => setActiveId((curr) => (curr === "flutter-core" ? null : curr))}
            onFocus={() => setActiveId("flutter-core")}
            onBlur={() => setActiveId(null)}
            onClick={() => setActiveId((curr) => (curr === "flutter-core" ? null : "flutter-core"))}
            style={{
              position: "absolute",
              left: `${(232 / 700) * 100}%`,
              top: `${(80 / 510) * 100}%`,
              width: `${(236 / 700) * 100}%`,
              height: `${(104 / 510) * 100}%`,
              transform: isFlutterActive ? "translateZ(24px) scale(1.02)" : "translateZ(14px)",
            }}
            className={`group text-left p-3.5 rounded-2xl border bg-brand-surface-card/95 backdrop-blur-xl transition-all duration-200 cursor-pointer shadow-xl ${
              isFlutterActive
                ? "border-brand-cyan shadow-brand-cyan/20 ring-1 ring-brand-cyan/50 bg-brand-surface-hover"
                : "border-brand-card-border hover:border-brand-cyan/40"
            }`}
            aria-label="Flutter UI Engine"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5">
                <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold tracking-wider text-brand-cyan bg-brand-cyan/10 border border-brand-cyan/20">
                  UI LAYER
                </span>
                <span className="text-[10px] font-mono text-brand-text-muted">Flutter 3.x</span>
              </div>
              <div className="flex items-center space-x-1 text-[9px] font-mono font-semibold text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                <Activity className="w-2.5 h-2.5 animate-pulse" />
                <span>60 FPS</span>
              </div>
            </div>

            <div className="mt-2 flex items-center space-x-2">
              <div className="w-6 h-6 rounded-lg bg-brand-cyan/15 flex items-center justify-center shrink-0">
                <Layers className="w-3.5 h-3.5 text-brand-cyan" />
              </div>
              <div>
                <div className="font-sans text-xs sm:text-sm font-extrabold text-brand-text-primary tracking-tight">
                  Flutter Engine
                </div>
                <div className="font-mono text-[9px] text-brand-text-muted truncate">
                  Impeller · Material 3 · Custom Canvas
                </div>
              </div>
            </div>

            <div className="mt-2 pt-1.5 border-t border-brand-border/50 flex items-center justify-between text-[9px] font-mono text-brand-text-secondary">
              <span>Hardware Accelerated</span>
              <span className="text-brand-cyan">Mobile & Web</span>
            </div>
          </button>

          {/* CENTRAL CORE: RIVERPOD STATE ENGINE */}
          <button
            type="button"
            onMouseEnter={() => setActiveId("riverpod-state")}
            onMouseLeave={() => setActiveId((curr) => (curr === "riverpod-state" ? null : curr))}
            onFocus={() => setActiveId("riverpod-state")}
            onBlur={() => setActiveId(null)}
            onClick={() => setActiveId((curr) => (curr === "riverpod-state" ? null : "riverpod-state"))}
            style={{
              position: "absolute",
              left: `${(232 / 700) * 100}%`,
              top: `${(226 / 510) * 100}%`,
              width: `${(236 / 700) * 100}%`,
              height: `${(104 / 510) * 100}%`,
              transform: isRiverpodActive ? "translateZ(24px) scale(1.02)" : "translateZ(14px)",
            }}
            className={`group text-left p-3.5 rounded-2xl border bg-brand-surface-card/95 backdrop-blur-xl transition-all duration-200 cursor-pointer shadow-xl ${
              isRiverpodActive
                ? "border-brand-violet shadow-brand-violet/20 ring-1 ring-brand-violet/50 bg-brand-surface-hover"
                : "border-brand-card-border hover:border-brand-violet/40"
            }`}
            aria-label="Riverpod State Engine"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5">
                <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold tracking-wider text-brand-violet-light bg-brand-violet/10 border border-brand-violet/20">
                  ORCHESTRATION
                </span>
                <span className="text-[10px] font-mono text-brand-text-muted">Riverpod 2.x</span>
              </div>
              <div className="flex items-center space-x-1 text-[9px] font-mono font-semibold text-brand-violet-light bg-brand-violet/10 px-1.5 py-0.5 rounded">
                <ArrowDownUp className="w-2.5 h-2.5" />
                <span>AsyncNotifier</span>
              </div>
            </div>

            <div className="mt-2 flex items-center space-x-2">
              <div className="w-6 h-6 rounded-lg bg-brand-violet/15 flex items-center justify-center shrink-0">
                <Cpu className="w-3.5 h-3.5 text-brand-violet-light" />
              </div>
              <div>
                <div className="font-sans text-xs sm:text-sm font-extrabold text-brand-text-primary tracking-tight">
                  Riverpod State Core
                </div>
                <div className="font-mono text-[9px] text-brand-text-muted truncate">
                  Unidirectional · Code Gen · Zero Leaks
                </div>
              </div>
            </div>

            <div className="mt-2 pt-1.5 border-t border-brand-border/50 flex items-center justify-between text-[9px] font-mono text-brand-text-secondary">
              <span>State Graph Cache</span>
              <span className="text-brand-violet-light">Reactive Stream</span>
            </div>
          </button>

          {/* BOTTOM ARCHITECTURE HUD / INSPECTOR BAR (Desktop) */}
          <div
            style={{
              position: "absolute",
              left: `${(20 / 700) * 100}%`,
              top: `${(416 / 510) * 100}%`,
              width: `${(660 / 700) * 100}%`,
              height: `${(76 / 510) * 100}%`,
              transform: "translateZ(8px)",
            }}
            className="p-3 rounded-xl border border-brand-card-border bg-brand-surface/90 backdrop-blur-md flex flex-col justify-center transition-all duration-200"
          >
            {activeNode ? (
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-brand-violet/15 text-brand-violet-light border border-brand-violet/25">
                      [{activeNode.tag}]
                    </span>
                    <span className="text-xs font-bold text-brand-text-primary font-sans">
                      {activeNode.title}
                    </span>
                    <span className="text-[10px] font-mono text-brand-text-muted hidden lg:inline">
                      · {activeNode.subtitle}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-[9px] font-mono text-emerald-500 dark:text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{activeNode.metric || "Active"}</span>
                  </div>
                </div>
                <p className="text-[11px] text-brand-text-secondary leading-snug line-clamp-1">
                  {activeNode.description}
                </p>
                <div className="flex items-center justify-between text-[9px] font-mono text-brand-text-muted pt-0.5">
                  <span className="text-brand-violet-light">Verified: {activeNode.highlight}</span>
                  <span className="text-brand-cyan">Connected ➔ Riverpod State Engine</span>
                </div>
              </div>
            ) : isFlutterActive ? (
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/25">
                      [CORE UI]
                    </span>
                    <span className="text-xs font-bold text-brand-text-primary font-sans">
                      Flutter Rendering Engine
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-brand-cyan">Impeller 60 FPS</span>
                </div>
                <p className="text-[11px] text-brand-text-secondary leading-snug">
                  Hardware-accelerated widget pipeline delivering sub-frame render times and fluid gestures across Android, iOS & Web.
                </p>
              </div>
            ) : isRiverpodActive ? (
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-brand-violet/15 text-brand-violet-light border border-brand-violet/25">
                      [STATE ENGINE]
                    </span>
                    <span className="text-xs font-bold text-brand-text-primary font-sans">
                      Riverpod State Orchestration
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-brand-violet-light">AsyncNotifier Graph</span>
                </div>
                <p className="text-[11px] text-brand-text-secondary leading-snug">
                  Compile-safe reactive state graph managing asynchronous mutations, caches, and dependency injection without memory leaks.
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-bold text-brand-text-primary font-sans">
                      Living Architecture Graph
                    </span>
                  </div>
                  <p className="text-[11px] text-brand-text-muted">
                    Hover or tap any layer to inspect architectural contract, data flow & production details.
                  </p>
                </div>
                <div className="hidden sm:flex items-center space-x-2 text-[9px] font-mono text-brand-text-muted">
                  <span className="px-2 py-1 rounded bg-brand-pill-bg border border-brand-pill-border">
                    Impeller 60FPS
                  </span>
                  <span className="px-2 py-1 rounded bg-brand-pill-bg border border-brand-pill-border">
                    Offline First
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ========================================================= */}
        {/* MOBILE RESPONSIVE STACK (visible on < md)                  */}
        {/* ========================================================= */}
        <div className="block md:hidden space-y-3">
          {/* Central Stack Card (Flutter & Riverpod together) */}
          <div className="p-3.5 rounded-2xl border border-brand-card-border bg-brand-surface-card/90 space-y-3">
            {/* Flutter UI Segment */}
            <button
              type="button"
              onClick={() => setActiveId((curr) => (curr === "flutter-core" ? null : "flutter-core"))}
              className={`w-full text-left p-2.5 rounded-xl border transition-all ${
                isFlutterActive
                  ? "border-brand-cyan bg-brand-surface-hover shadow-md"
                  : "border-brand-card-border/60 bg-brand-bg/40"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-lg bg-brand-cyan/15 flex items-center justify-center">
                    <Layers className="w-3.5 h-3.5 text-brand-cyan" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-brand-text-primary font-sans">
                      Flutter Engine
                    </div>
                    <div className="text-[9px] font-mono text-brand-text-muted">
                      Impeller · Material 3
                    </div>
                  </div>
                </div>
                <span className="text-[9px] font-mono text-emerald-500 font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded">
                  60 FPS
                </span>
              </div>
            </button>

            {/* Riverpod State Segment */}
            <button
              type="button"
              onClick={() => setActiveId((curr) => (curr === "riverpod-state" ? null : "riverpod-state"))}
              className={`w-full text-left p-2.5 rounded-xl border transition-all ${
                isRiverpodActive
                  ? "border-brand-violet bg-brand-surface-hover shadow-md"
                  : "border-brand-card-border/60 bg-brand-bg/40"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-lg bg-brand-violet/15 flex items-center justify-center">
                    <Cpu className="w-3.5 h-3.5 text-brand-violet-light" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-brand-text-primary font-sans">
                      Riverpod State Engine
                    </div>
                    <div className="text-[9px] font-mono text-brand-text-muted">
                      AsyncNotifier · Reactive Graph
                    </div>
                  </div>
                </div>
                <span className="text-[9px] font-mono text-brand-violet-light font-semibold bg-brand-violet/10 px-1.5 py-0.5 rounded">
                  State Core
                </span>
              </div>
            </button>
          </div>

          {/* 6 Satellite Nodes Grid */}
          <div className="grid grid-cols-2 gap-2">
            {NODES.map((node) => {
              const isSelected = activeId === node.id;
              const { badge, border, icon: IconColor } = getAccentClasses(node.accent, isSelected);
              const Icon = node.icon;

              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setActiveId((curr) => (curr === node.id ? null : node.id))}
                  className={`text-left p-2.5 rounded-xl border bg-brand-surface-card/90 transition-all ${
                    isSelected ? `${border} bg-brand-surface-hover` : "border-brand-card-border"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[8px] font-mono font-bold px-1 py-0.2 rounded border ${badge}`}>
                      {node.tag}
                    </span>
                    <Icon className={`w-3.5 h-3.5 ${IconColor}`} />
                  </div>
                  <div className="text-xs font-bold text-brand-text-primary mt-1 truncate">
                    {node.title}
                  </div>
                  <div className="text-[9px] font-mono text-brand-text-muted truncate mt-0.5">
                    {node.subtitle}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Mobile Architecture HUD / Inspector */}
          <div className="p-3 rounded-xl border border-brand-card-border bg-brand-surface/90 text-left">
            {activeNode ? (
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-brand-text-primary">
                    {activeNode.title}
                  </span>
                  <span className="text-[9px] font-mono text-emerald-500 font-semibold">
                    {activeNode.metric}
                  </span>
                </div>
                <p className="text-[11px] text-brand-text-secondary leading-snug">
                  {activeNode.description}
                </p>
                <div className="text-[9px] font-mono text-brand-violet-light pt-0.5">
                  Verified: {activeNode.highlight}
                </div>
              </div>
            ) : isFlutterActive ? (
              <p className="text-[11px] text-brand-text-secondary leading-snug">
                Flutter Engine: Hardware-accelerated 60 FPS UI rendering with Impeller and custom canvas across Android, iOS & Web.
              </p>
            ) : isRiverpodActive ? (
              <p className="text-[11px] text-brand-text-secondary leading-snug">
                Riverpod State Engine: Compile-safe unidirectional state machine driving async lifecycle and reactive caching.
              </p>
            ) : (
              <div className="flex items-center space-x-2 text-[11px] text-brand-text-muted font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
                <span>Tap any layer above to inspect technical implementation.</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
