import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';

export default function FadeInWrapper({ children, className, customVariant, inViewProps }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 1,
    triggerOnce: true,
    ...inViewProps
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const normalVariant = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      whileHover="hover"
      className={className}
      variants={customVariant ? customVariant : normalVariant}
    >
      {children}
    </motion.div>
  );
}
