"use client";

import Link from "next/link";
import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

const spring = { type: "spring" as const, stiffness: 420, damping: 28 };

type MotionLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function MotionLink({ href, children, className }: MotionLinkProps) {
  return (
    <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }} transition={spring} className="inline-flex">
      <Link href={href} className={className}>
        {children}
      </Link>
    </motion.div>
  );
}

export function MotionButton({
  children,
  className,
  ...props
}: HTMLMotionProps<"button">) {
  return (
    <motion.button
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      transition={spring}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
}
