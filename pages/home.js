import { motion } from 'framer-motion'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Front.module.css'

const boxConstant = {
  initial: {
    height: "100vh",
    top: 0,
  },
  animate: {
    height: 0,
    transition: {
      duration: 1.2,
      ease: [0.87, 0, 0.13, 1],
    },
    transitionEnd: {
      display: "none"
    }
  }
}

const blackBox = {
  initial: {
    height: "100vh",
    top: 0,
  },
  animate: {
    height: 0,
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

const redBox = {
  initial: {
    ...boxConstant.initial,
  },
  animate: {
    ...boxConstant.animate,
    transition: {
      ...boxConstant.animate.transition,
      delay: 1.85,
    }
  }
}

const yellowBox = {
  initial: {
    ...boxConstant.initial,
  },
  animate: {
    ...boxConstant.animate,
    transition: {
      ...boxConstant.animate.transition,
      delay: 1.90,
    }
  }
}

const greenBox = {
  initial: {
    ...boxConstant.initial,
  },
  animate: {
    ...boxConstant.animate,
    transition: {
      ...boxConstant.animate.transition,
      delay: 1.95,
    }
  }
}

const intro = {
  initial: { opacity: 0, y: 50 },
  animate: { 
    y: 0,
    opacity: 1,
    transition: {
      delayChildren: 0.5,
      duration: 1,
      ease: [0.87, 0, 0.13, 1],
      staggerChildren: 0.3,
    }
  },
}

const borderTopBtm = {
  initial: { scaleX: 0 },
  animate: { 
    scaleX: 1,
    transition: {
      duration: 0.3
    }
  }
}

const borderLeftRight = {
  initial: { scaleY: 0 },
  animate: { 
    scaleY: 1, 
    transition: {
      duration: 0.3
    }
  }
}

const InitialTransition = () => {
  return (
    <>
      <motion.div
        className={styles.initialPageBg}
        initial="initial"
        animate="animate"
        variants={blackBox}
      >
        <motion.div className={styles.box} variants={intro}>
          <motion.span className={styles.top} variants={borderTopBtm} />
          <motion.span className={styles.right} variants={borderLeftRight} />
          <motion.span className={styles.bottom} variants={borderTopBtm} />
          <motion.span className={styles.left} variants={borderLeftRight} />
          <h2 className={styles.logo}>Z</h2>
        </motion.div>
      </motion.div>
      <motion.div 
        className={`${styles.afterBox} ${styles.redBox}`} 
        initial="initial"
        animate="animate"
        variants={redBox} 
      />
      <motion.div 
        className={`${styles.afterBox} ${styles.yellowBox}`} 
        initial="initial"
        animate="animate"
        variants={yellowBox} 
      />
      <motion.div 
        className={`${styles.afterBox} ${styles.greenBox}`} 
        initial="initial"
        animate="animate"
        variants={greenBox} 
      />
    </>
  )
}

export default function Home({ isFirstMount }) {
  return (
    <motion.div className={styles.container} exit={{ opacity: 0 }}>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* {isFirstMount && <InitialTransition />} */}
      <InitialTransition />
      <div>HAHAHA</div>
      <Link href="/work">
        <a>work</a>
      </Link>
    </motion.div>
  )
}
