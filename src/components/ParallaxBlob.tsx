import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface ParallaxBlobProps {
  className: string;
  speed?: number;
}

const ParallaxBlob = ({ className, speed = -0.15 }: ParallaxBlobProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const y = useTransform(smoothProgress, [0, 1], [speed * -100, speed * 100]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y, z: 0, willChange: "transform" }}
    />
  );
};

export default ParallaxBlob;
