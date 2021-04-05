import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";

export default function FadeInWrapper({ children }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.4,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{ duration: 0.7, staggerChildren: 0.2, ease: [0.6, -0.05, 0.01, 0.99] }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: -30 }
      }}
    >
      {children}
    </motion.div>
  );
}
