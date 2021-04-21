import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";

export default function ScaleInWrapper({ children, className }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const normalVariant = {
    hidden: { opacity: 1, scale: 0.3 },
    visible: { 
      opacity: 1,
      scale: [0.3, 1.3, 1],
      originX: 'bottom',
      originY: 'center',
      transition: {
        duration: 0.4,
        times: [0, 0.75, 1],
      }
    }
  }

  return (
    <motion.div
      style={{ display: 'inline-block' }}
      ref={ref}
      animate={controls}
      initial="hidden"
      className={className}
      variants={normalVariant}
    >
      {children}
    </motion.div>
  );
}
