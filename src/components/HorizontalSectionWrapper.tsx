"use client";
import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface HorizontalSectionWrapperProps {
  id?: string;
  children?: ReactNode;
  className?: string;
  topContent?: ReactNode;
  bottomContent?: ReactNode;
}

export function HorizontalSectionWrapper({
  id,
  children,
  className = "",
  topContent,
  bottomContent,
}: HorizontalSectionWrapperProps) {
  return (
    <section
      id={id}
      data-section-id={id}
      className={`w-screen min-w-[100vw] h-screen flex-shrink-0 snap-center relative flex flex-col justify-center items-center overflow-y-auto overflow-x-hidden py-10 px-4 md:px-12 transition-all ${className}`}
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center space-y-6 my-auto relative z-10">
        {/* Top Entrance Component (Header/Title/Badge) */}
        {topContent && (
          <motion.div
            initial={{ opacity: 0, y: -90, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex justify-center"
          >
            {topContent}
          </motion.div>
        )}

        {/* Main Section Content */}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: topContent ? 70 : 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.8, delay: topContent ? 0.12 : 0, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col items-center justify-center"
          >
            {children}
          </motion.div>
        )}

        {/* Bottom Entrance Component (Cards/Actions/Details) */}
        {bottomContent && (
          <motion.div
            initial={{ opacity: 0, y: 90, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.75, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex justify-center"
          >
            {bottomContent}
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default HorizontalSectionWrapper;
