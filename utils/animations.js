export const headline = {
  hidden: {
    y: 30,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    }
  }
};

export const text = {
  hidden: {
    scaleY: 0,
    originY: 0,
    opacity: 0
  },
  visible: {
    scaleY: 1,
    originY: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

export const tokopediaLogo = {
  hidden: {
    strokeDashoffset: 2296
  },
  visible: {
    strokeDashoffset: 0,
    transition: {
      duration: 2,
      ease: [0.85, 0, 0.15, 1]
    }
  }
};