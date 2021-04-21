export const circleWidth = 120
export const circleStrokeWidth = 8
export const circleRadius = (circleWidth / 2) - (circleStrokeWidth / 2)
export const circleStrokeDash = 2 * Math.PI * circleRadius

const boxConstantMotion = {
  initial: {
    height: "100vh",
    top: 0,
  },
  animate: {
    scaleY: 0,
    originY: 0,
    transition: {
      duration: 1.2,
      ease: [0.87, 0, 0.13, 1],
    },
    transitionEnd: {
      display: "none"
    }
  }
}

export const blackBoxMotion = {
  initial: {
    height: "100vh",
    top: 0,
  },
  animate: {
    scaleY: 0,
    originY: 0,
    transition: {
      when: "afterChildren",
      duration: 1.2,
      ease: [0.87, 0, 0.13, 1],
      staggerChildren: 0.5,
    },
    transitionEnd: {
      display: "none"
    }
  },
};

export const blackBox = {
  initial: {
    height: "100vh",
    top: 0,
  },
  animate: {
    scaleY: 0,
    originY: 0,
    transition: {
      when: "afterChildren",
      duration: 1.2,
      ease: [0.87, 0, 0.13, 1],
      staggerChildren: 0.5,
    },
    transitionEnd: {
      display: "none"
    }
  },
};

export const redBoxMotion = {
  initial: {
    ...boxConstantMotion.initial,
  },
  animate: {
    ...boxConstantMotion.animate,
    transition: {
      ...boxConstantMotion.animate.transition,
      delay: 1.85,
    }
  }
}

export const yellowBoxMotion = {
  initial: {
    ...boxConstantMotion.initial,
  },
  animate: {
    ...boxConstantMotion.animate,
    transition: {
      ...boxConstantMotion.animate.transition,
      delay: 1.90,
    }
  }
}

export const greenBoxMotion = {
  initial: {
    ...boxConstantMotion.initial,
  },
  animate: {
    ...boxConstantMotion.animate,
    transition: {
      ...boxConstantMotion.animate.transition,
      delay: 1.95,
    }
  }
}

export const introMotion = {
  initial: { 
    opacity: 0, 
    y: 50,
    scale: 1
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      delayChildren: 0.5,
      duration: 1.5,
      ease: [0.87, 0, 0.13, 1],
      staggerChildren: 0.1,
    },
  },
}

export const intro = {
  initial: { 
    opacity: 0, 
    y: 50,
    scale: 1
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      delayChildren: 0.5,
      duration: 1.5,
      ease: [0.87, 0, 0.13, 1],
      staggerChildren: 0.1,
    },
  },
}

const circleMotion = {
  initial: {
    strokeDashoffset: circleStrokeDash
  },
  animate: {
    strokeDashoffset: 0,
    transition: {
      duration: 1,
      ease: [0.85, 0, 0.15, 1]
    }
  }
}

export const contentMotion = isFirstMount => ({
  animate: {
    transition: { staggerChildren: 0.2, delayChildren: isFirstMount ? 2.8 : 0 },
  },
});

export const landingTextMotion = {
  initial: { y: 20, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
}

export const textMotion = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export const imageMotion = {
  hidden: {
    y: 20,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: [0.6, -0.05, 0.01, 0.99],
    }
  }
}

export const profileTextMotion = {
  hidden: {
    x: 20, 
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99],
    }
  }
}

export const backToTopMotion = isComplete => ({
  animate: {
    y: isComplete ? 0 : 30,
    opacity: isComplete ? 1 : 0,
    transition: {
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
})

export const circleProps = {
  className: "circle-loader__el",
  cx: "60",
  cy: "60",
  r: circleRadius,
  fill: "none",
  strokeWidth: circleStrokeWidth,
  strokeDasharray: circleStrokeDash,
  variants: circleMotion,
}