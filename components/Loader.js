import { motion } from 'framer-motion';

const pulseVariants = {
  initial: {
    scale: 0.95,
    background: 'rgba(255, 82, 82, 1)',
    boxShadow: '0 0 0 0 rgba(255, 82, 82, 1)'
  },
  animate: {
    background: 'rgba(255, 82, 82, 1)',
    boxShadow: [
      '0 0 0 0 rgba(255, 82, 82, 0.7)',
      '0 0 0 30px rgba(255, 82, 82, 0)',
      '0 0 0 0 rgba(255, 82, 82, 0)'
    ],
    scale: [0.95, 1, 0.95],
    transition: {
      repeat: Infinity,
      duration: 2,
      times: [0, 0.7, 1]
    }
  },
  exit: {
    scale: [0.95, 1.5, 0],
    transition: {
      duration: 1,
      times: [0, 0.7, 1]
    }
  }
};

const Loader = () => (
  <div className="loading-container">
    <motion.div
      key="loader"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pulseVariants}
      className="loading"
    />
  </div>
);

export default Loader;
