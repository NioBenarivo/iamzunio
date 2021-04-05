import { motion } from 'framer-motion'
import { 
  SiTypescript,
  SiReact, 
  SiJira, 
  SiHtml5, 
  SiStyledComponents,
  SiCss3,
  SiNodeDotJs,
  SiGithub,
  SiSlack,
  SiStorybook,
  SiWebpack,
  SiWordpress
} from 'react-icons/si'
import Image from 'next/image'
import Head from 'next/head'
import Footer from '../components/Footer'
import FadeInWrapper from '../components/FadeInWrapper'

const boxConstant = {
  initial: {
    height: "100vh",
    top: 0,
  },
  animate: {
    height: 0,
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

const blackBox = {
  initial: {
    height: "100vh",
    top: 0,
  },
  animate: {
    height: 0,
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

const content = isFirstMount => ({
  animate: {
    transition: { staggerChildren: 0.2, delayChildren: isFirstMount ? 2.8 : 0 },
  },
});

const landingText = {
  initial: { y: -30, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
}

const text = {
  hidden: { y: -30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

const image = {
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

const InitialTransition = () => {
  return (
    <>
      <motion.div
        className="initialPageBg"
        initial="initial"
        animate="animate"
        variants={blackBox}
        onAnimationStart={() => document.body.style.overflow = 'hidden'}
        onAnimationComplete={() => document.body.style.overflow = 'visible'}
      >
        <motion.div className="box" variants={intro}>
          <motion.span className="top" variants={borderTopBtm} />
          <motion.span className="right" variants={borderLeftRight} />
          <motion.span className="bottom" variants={borderTopBtm} />
          <motion.span className="left" variants={borderLeftRight} />
          <h2 className="logo">Z</h2>
        </motion.div>
      </motion.div>
      <motion.div 
        className="afterBox redBox"
        initial="initial"
        animate="animate"
        variants={redBox} 
      />
      <motion.div 
        className="afterBox yellowBox"
        initial="initial"
        animate="animate"
        variants={yellowBox} 
      />
      <motion.div 
        className="afterBox greenBox"
        initial="initial"
        animate="animate"
        variants={greenBox} 
      />
    </>
  )
}

export default function Home({ isFirstMount }) {
  return (
    <motion.div className="container" exit={{ opacity: 0 }}>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isFirstMount && <InitialTransition />}
      <motion.div 
        initial="initial"
        animate="animate"
        variants={content(isFirstMount)} 
        className="content max-width-4 mx-auto">
        <div className="relative px3 landing">
          <motion.h1 className="regular" variants={landingText}>
            UX Engineer based in {' '}
            <a 
              href="https://goo.gl/maps/mnDwan2rYUTHeLKL8" 
              target="_blank" 
              rel="noopener">
              Jakarta.
            </a> 
            <br />
            Passionate about product design and engineering.
          </motion.h1>
        </div>
      </motion.div>

      <div className="relative flex flex-wrap flex-column justify-around items-center px3 my4 max-width-4 mx-auto">
        <FadeInWrapper>
          <div className="center">
            <Image
              alt="Tokopedia"
              src="/assets/tokopedia.logo-min.png"
              width={180}
              height={40}
            />
          </div>
        </FadeInWrapper>
        <FadeInWrapper>
          <div className="flex flex-wrap justify-around items-start my4 work">
            <motion.div className="col-7 order-0" variants={image}>
              <Image
                alt="Logistic-1"
                src="/assets/tokopedia-logistic.png"
                width={840}
                height={620}
              />
            </motion.div>
            <div className="flex flex-column col-5 px2 order-1">
              <motion.h2 className="mt0 mb1" variants={text}>Logistic</motion.h2>
              <motion.p className="mt0" variants={text}>Collaborate with merchant and payment team<br /> to produce user-merchant app</motion.p>
              <motion.div className="flex flex-wrap items-center mb1" variants={text}>
                <span className="mr1">Tech Stack:</span>
                <SiReact className="mr1" size={24} title="React" />
                <SiHtml5 className="mr1" size={24} title="HTML5" />
                <SiStyledComponents className="mr1" size={24} title="CSS-in-JS" />
                <SiCss3 className="mr1" size={24} title="CSS3" />
                <SiNodeDotJs className="mr1" size={24} title="NodeJS" />
              </motion.div>
              <motion.div className="flex flex-wrap items-center" variants={text}>
                <span className="mr1">Operation Stack:</span>
                <SiGithub className="mr1" size={24} title="Github" />
                <SiJira className="mr1" size={24} title="Jira" />
                <SiSlack className="mr1" size={24} title="Slack" />
              </motion.div>
            </div>
          </div>
        </FadeInWrapper>
        <FadeInWrapper>
          <div className="flex flex-wrap justify-around items-start my4 work">
            <motion.div className="col-7 order-0" variants={image}>
              <Image
                alt="Logistic-1"
                src="/assets/tokopedia-ds.png"
                width={840}
                height={620}
              />
            </motion.div>
            <div className="flex flex-column col-5 px2 order-1">
              <motion.h2 className="mt0 mb1" variants={text}>Design System</motion.h2>
              <motion.p className="mt0" variants={text}>Build Internal Design System and Design Guidelines</motion.p>
              <motion.div className="flex flex-wrap items-center mb1" variants={text}>
                <span className="mr1">Tech Stack:</span>
                <SiReact className="mr1" size={24} title="React" />
                <SiStorybook className="mr1" size={24} title="Storybook" />
                <SiStyledComponents className="mr1" size={24} title="Css-in-JS" />
                <SiNodeDotJs className="mr1" size={24} title="NodeJS" />
                <SiWebpack className="mr1" size={24} title="Webpack" />
                <SiTypescript className="mr1" size={24} title="TypeScript" />
                <SiWordpress className="mr1" size={24} title="Wordpress" />
              </motion.div>
              <motion.div className="flex flex-wrap items-center" variants={text}>
                <span className="mr1">Operation Stack:</span>
                <SiGithub className="mr1" size={24} />
                <SiJira className="mr1" size={24} />
                <SiSlack className="mr1" size={24} />
              </motion.div>
            </div>
          </div>
        </FadeInWrapper>
      </div>
      <Footer />
    </motion.div>
  )
}
