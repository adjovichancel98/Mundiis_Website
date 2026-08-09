"use client";

import { motion } from "framer-motion";

export default function KineticHeading({
  text,
  className,
  as: Tag = "h1",
  inView = false,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2";
  inView?: boolean;
}) {
  const words = text.split(" ");

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-top">
          <motion.span
            className="inline-block"
            initial={{ y: "115%" }}
            {...(inView
              ? { whileInView: { y: 0 }, viewport: { once: true, amount: 0.4 } }
              : { animate: { y: 0 } })}
            transition={{
              duration: 0.85,
              ease: [0.19, 1, 0.22, 1],
              delay: i * 0.032,
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
