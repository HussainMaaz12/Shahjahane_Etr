"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode, MouseEvent } from "react";

const spring = { type: "spring" as const, stiffness: 420, damping: 26 };

type MotionLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
};

export function MotionLink({ href, children, className, onClick }: MotionLinkProps) {
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
      return;
    }
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(`/${href}`);
      }
    }
  };

  return (
    <motion.div
      whileHover={{ y: -2.5, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={spring}
      className="inline-flex"
    >
      <Link href={href} onClick={handleClick} className={className}>
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
      whileHover={{ y: -2.5, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={spring}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
}
