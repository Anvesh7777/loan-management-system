"use client";

import { motion } from "framer-motion";

interface Props {
  title: string;
  value: string | number;
}

export default function StatCard({
  title,
  value,
}: Props) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      whileHover={{
        scale: 1.03,
        y: -4,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-white/5
        p-6
        backdrop-blur-md
        shadow-xl
      "
    >
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-br
          from-blue-500/10
          via-transparent
          to-purple-500/10
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
        "
      />

      <p className="relative text-sm text-zinc-400">
        {title}
      </p>

      <h2
        className="
          relative
          mt-3
          text-3xl
          font-bold
          text-white
        "
      >
        {value}
      </h2>
    </motion.div>
  );
}