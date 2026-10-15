"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { links } from "@/config/links";
import { HeroVisual } from "@/components/ui/HeroVisual";

export const Hero: React.FC = () => {
  const handleScrollToWork = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.getElementById("work");
    if (element) {
      const navbarHeight = 80;
      const elementTop = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementTop - navbarHeight, behavior: "smooth" });
    }
  };

  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById("contact");
    if (element) {
      const navbarHeight = 80;
      const elementTop = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementTop - navbarHeight, behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] pt-32 pb-20 flex items-center justify-center overflow-hidden px-6"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-brand-violet/8 rounded-full blur-[140px] -z-10 pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[300px] bg-brand-cyan/6 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Text column — Editorial Hierarchy */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-6 sm:space-y-7">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center space-x-2.5 w-fit px-3.5 py-1.5 rounded-full bg-brand-pill-bg border border-brand-pill-border backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono font-medium tracking-wide text-brand-text-secondary">
              Flutter Developer & Product Builder
            </span>
          </motion.div>

          {/* Large Editorial Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-brand-text-primary leading-[1.08] font-sans">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
            >
              Beyond the UI.
            </motion.span>
            <motion.span
              className="block mt-1 bg-gradient-to-r from-brand-text-primary via-brand-violet to-brand-cyan bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
            >
              I engineer the entire experience.
            </motion.span>
          </h1>

          {/* Concise Supporting Copy */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="text-base sm:text-lg text-brand-text-secondary leading-relaxed max-w-xl font-sans"
          >
            Specializing in Flutter, Dart, Riverpod, and on-device AI. From clean domain architectures and local offline synchronization to published developer tooling, I build resilient mobile systems with production-grade craft.
          </motion.p>

          {/* CTAs & Socials */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <button
              onClick={handleScrollToWork}
              className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-full bg-brand-primary-btn-bg text-brand-primary-btn-text font-bold text-sm hover:opacity-90 transition-all duration-200 shadow-xl shadow-black/5 dark:shadow-white/5 group cursor-pointer"
            >
              <span>Explore My Work</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </button>

            <a
              href="#contact"
              onClick={handleScrollToContact}
              className="inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-full bg-brand-pill-bg border border-brand-pill-border font-semibold text-sm text-brand-text-primary hover:bg-brand-surface-hover hover:border-brand-border-focus transition-all duration-200"
            >
              <Send className="w-4 h-4 text-brand-violet-light" />
              <span>Get In Touch</span>
            </a>

            {/* Social Icons */}
            <div className="flex items-center space-x-2 ml-1">
              {links.github && (
                <a
                  href={links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-brand-pill-bg border border-brand-pill-border hover:bg-brand-surface-hover hover:text-brand-text-primary text-brand-text-secondary transition-all duration-200"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              )}
              {links.linkedin && (
                <a
                  href={links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-brand-pill-bg border border-brand-pill-border hover:bg-brand-surface-hover hover:text-brand-text-primary text-brand-text-secondary transition-all duration-200"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          </motion.div>
        </div>

        {/* Visual column — Living Architecture */}
        <div className="lg:col-span-7 flex justify-center lg:justify-end w-full">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
};
