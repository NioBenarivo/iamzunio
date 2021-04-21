import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";

export default function FadeInWrapper({ children, className, customVariant, inViewProps }) {
  const controls = useAnimation();

  const [ref, inView] = useInView({
    threshold: 1,
    triggerOnce: true,
    ...inViewProps
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const normalVariant = {
    hidden: {
      scaleY: 0,
      originY: 0,
      opacity: 0,
    },
    visible: {
      scaleY: 1,
      originY: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.6, -0.05, 0.01, 0.99],
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      className={className}
      variants={customVariant ? customVariant : normalVariant}
    >
      {children}
    </motion.div>
  );
}
