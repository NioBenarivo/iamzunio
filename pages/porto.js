import { motion } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import {
  SiCss3,
  SiGithub,
  SiHtml5,
  SiLinkedin,
  SiReact,
  SiNodeDotJs,
  SiApollographql,
  SiStyledComponents,
  SiZeit,
  SiFramer,
  SiNextDotJs,
  SiWordpress,
  SiJest,
  SiStorybook
} from 'react-icons/si'
import { IoLocation, IoPhonePortraitOutline } from "react-icons/io5"
import { useDarkmodeContext } from '@context/darkModeProvider'
import InitialTransitionPage from '@components/InitialTransitionPage'
import StaggerWrapper from '@components/StaggerWrapper'
import GlobalNav from '@components/GlobalNav'

const headline = isFirstMount => ({
  hidden: {
    y: 30,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: isFirstMount ? 2.8 : 0
    }
  }
})

const text = {
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

const scaledIcon = {
  hidden: { opacity: 0, scale: 0 },
  visible: { 
    opacity: 1,
    scale: 1,
    originX: 'bottom',
    originY: 'center',
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99],
    }
  }
}

const divider = {
  hidden: {
    scale: 0,
    opacity: 0,
    originX: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.6, -0.05, 0.01, 0.99],
    }
  }
}

const imageGallery = {
  initial: {
    x: 100,
    y: 0,
  },
  hover: {
    x: 100,
    y: 0,
    transition: {
      staggerChildren: 0.015,
    }
  }
}

const imageEl = (index) => ({
  initial: {
    x: 0,
    y: 0,
  },
  hover: {
    x: (0 + index * 40),
    y: (0 + index * 40)
  }
})

const renderPetProject = () => {
  let content = [];
  for (let i = 1; i <= 7; i++) {
    content.push(
      <motion.img
        key={`digital-garden-img-${i}`}
        alt={`digital-garden-${i}`} 
        src={`/assets/digital-garden-${i}.png`} 
        variants={imageEl(i)} 
      />
    );
  }
  return content;
}

const tokopediaLogo = {
  hidden: {
    strokeDashoffset: 2296,
  },
  visible: {
    strokeDashoffset: 0,
    transition: {
      duration: 2,
      ease: [0.85, 0, 0.15, 1]
    },
  }
}

const float = (x = 0, y = 0, delay = 0) => ({
  initial: {
    x: x,
    y: y
  },
  animate: {
    x: x,
    y: [y, y - 30, y],
    transition: {
      delay: delay,
      duration: 5,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'loop',
    }
  },
})

const floatText = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0,
  },
  hover: {
    opacity: 1,
    y: 0,
    scale: 1
  }
}

export default function Porto({ isFirstMount }) {
  const constraintsRef = useRef(null);
  const { darkmode, toggleMode } = useDarkmodeContext()
  const themeClassname = darkmode ? 'dark-mode' : 'light-mode';

  return (
    <motion.div exit={{ opacity: 0 }} className={`${themeClassname} top`}>
      {isFirstMount && <InitialTransitionPage />}
      <div className="landing">
        <motion.h1 initial="hidden" animate="visible" variants={headline(isFirstMount)}>
          <motion.span variants={text}>UX</motion.span>{' '}
          <motion.span variants={text}>Engineer</motion.span>{' '}
          <br />
          <motion.span variants={text}>based</motion.span>{' '}
          <motion.span variants={text}>in</motion.span>{' '}
          <motion.a variants={text}
            href="https://goo.gl/maps/mnDwan2rYUTHeLKL8" 
            target="_blank"
            rel="noopener noreferrer">
            Jakarta.
          </motion.a> 
          <br />
          <motion.span variants={text}>Passionate</motion.span>{' '}
          <motion.span variants={text}>about</motion.span>{' '}
          <br />
          <motion.span variants={text}>design</motion.span>{' '}
          <motion.span variants={text}>and</motion.span> {' '}
          <motion.span variants={text}>engineering</motion.span>
        </motion.h1>
      </div>
      <section>
        <div className="wrapper skillset">
          <StaggerWrapper inViewProps={{ threshold: 0.8 }}>
            <motion.h2 variants={text}>Experiences</motion.h2>
            <motion.svg
              variants={tokopediaLogo}
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="-61.48365 -22.04525 532.8583 132.2715">
                <motion.path
                  stroke={darkmode ? '#FFFFFF' : '#0b0b0a'}
                  fill='transparent'
                  id="logo"
                  d="M219.135 61.998c-4.453 4.518-9.782 6.794-15.957 6.794-4.993 0-9.239-1.021-13.571-3.537V54.893c3.486 2.362 7.861 4.613 12.182 4.613 9.006 0 14.371-6.199 14.371-14.985 0-8.795-5.55-15.179-14.558-15.179-4.029 0-7.288 1.447-9.838 4.346-2.733 3.144-4.144 7.635-4.144 13.572v40.921h-.679c-4.963 0-8.989-4.025-8.989-8.988V45.726c0-14.201 8.684-25.667 23.607-25.667 7.364 0 13.349 2.518 17.886 7.579 4.266 4.727 6.382 10.723 6.382 17.932 0 6.418-2.229 11.904-6.692 16.428zm104.671-.344c-4.438 4.762-10.147 7.138-17.074 7.138-7.304 0-13.261-2.522-17.792-7.582-4.262-4.786-6.382-10.784-6.382-17.932 0-12.65 9.768-23.219 22.611-23.219 4.959 0 9.262 1.042 13.611 3.429v10.467c-3.489-2.362-7.865-4.613-12.182-4.613-9.006 0-14.371 6.198-14.371 14.986 0 8.675 5.675 15.178 14.555 15.178 4.02 0 7.334-1.51 9.983-4.543 2.631-3.018 4-7.449 4-13.404V8.989c0-4.963 4.024-8.989 8.992-8.989h.675v43.086c0 7.59-2.194 13.8-6.626 18.568zm27.298-46.196c-1.016 1.136-2.47 1.66-4.247 1.66-3.316 0-5.689-2.45-5.689-5.74 0-3.371 2.331-5.646 5.689-5.646 3.237 0 5.695 2.398 5.695 5.646 0 1.606-.469 2.982-1.448 4.08zm49.118 26.101c0-3.81-1.441-6.826-4.342-9.114-2.609-2.056-5.872-3.103-9.832-3.103-8.749 0-14.364 6.839-14.364 15.271 0 8.121 5.949 14.893 14.275 14.893 5.784 0 8.882-3.383 12.183-7.592v12.144c-1.684 1.259-3.618 2.632-5.594 3.438-2.083.871-4.567 1.296-7.442 1.296-13.914 0-23.091-11.526-23.091-24.845 0-6.839 2.124-12.491 6.4-16.901 4.54-4.67 10.489-6.987 17.776-6.987 13.816 0 23.7 7.931 23.7 22.263v25.514h-.68c-4.964 0-8.989-4.024-8.989-8.988zm-132.334-2.736c-1.225-3.78-2.754-5.638-6.28-7.604-8.374-4.683-16.618-.699-20.455 7.566zm-7.376 29.826c-6.176 1.31-12.235.3-18.145-3.001-5.765-3.223-9.631-8.014-11.564-14.339-3.912-12.798 4.105-27.06 16.995-30.516 6.39-1.711 12.52-.935 18.341 2.32 9.671 5.403 13.194 13.764 12.58 24.538l-38.948-.081c.572 4.395 3.298 7.834 7.125 9.972 3.881 2.17 7.452 2.688 10.766 1.66 3.674-1.155 6.656-4.154 9.083-6.948l7.939 5.783c-3.24 5.793-7.649 9.222-14.172 10.612zm81.514-47.636h9.665v46.823h-.677c-4.961 0-8.988-4.024-8.988-8.988zM14.145 67.836C4.694 67.836 0 61.404 0 52.424V18.349c0-4.964 4.023-8.988 8.99-8.988h.677v11.652H26v9.286H9.667v23.199c0 3.946 1.762 5.055 5.53 5.055H26v9.283zm56.146-5.92c-4.78 4.581-10.519 6.876-17.187 6.876-6.606 0-12.316-2.297-17.088-6.876-4.793-4.595-7.184-10.443-7.184-17.491 0-13.751 10.504-24.366 24.272-24.366 6.609 0 12.331 2.314 17.137 6.922 4.823 4.625 7.23 10.456 7.23 17.444 0 7.048-2.391 12.896-7.18 17.491zm45.193-29.637c-1.418 2.378-2.516 4.085-3.29 5.115-.854 1.119-1.695 2.015-2.528 2.632 6.718 2.173 9.22 6.827 9.22 13.761v14.049h-.68c-4.965 0-8.99-4.024-8.99-8.988v-4.109c0-4.487-2.01-7.536-6.769-7.536h-8.78v20.633h-.677c-4.965 0-8.99-4.024-8.99-8.988V8.989C84 4.026 88.025 0 92.99 0h.677v37.822h2.857c3.139 0 5.205-1.071 6.387-3.103l8.122-13.704 11.016-.01zm49.903 29.637c-4.776 4.581-10.517 6.876-17.186 6.876-6.604 0-12.312-2.297-17.09-6.876-4.79-4.595-7.178-10.443-7.178-17.491 0-13.751 10.499-24.366 24.268-24.366 6.611 0 12.334 2.314 17.139 6.922 4.821 4.625 7.23 10.456 7.23 17.444 0 7.048-2.391 12.896-7.183 17.491zM158.41 33.53c-2.664-2.79-6.052-4.188-10.209-4.188-8.896 0-14.221 6.487-14.221 15.083 0 8.477 5.453 15.081 14.221 15.081 8.775 0 14.22-6.604 14.22-15.081 0-4.501-1.349-8.112-4.011-10.895zm-95.1 0c-2.664-2.79-6.048-4.188-10.206-4.188-8.898 0-14.221 6.487-14.221 15.083 0 8.477 5.452 15.081 14.221 15.081 8.771 0 14.223-6.604 14.223-15.081 0-4.501-1.351-8.112-4.017-10.895z" 
                  strokeDasharray="2296 2296"
                  strokeWidth="2"
                />
            </motion.svg>
          </StaggerWrapper>
          <StaggerWrapper className="skillset-desc">
              <motion.p variants={text}>working at Tokopedia for 4+ years</motion.p>
              <motion.p variants={text}>contributing into 4 different teams and division</motion.p>
              <motion.p variants={text}>build responsive and interactive page</motion.p>
              <motion.p variants={text}>create design system library and guidelines</motion.p>
          </StaggerWrapper>
          
          <div className="flex flex-column">
            <StaggerWrapper inViewProps={{ threshold: 0.5 }}>
              <motion.h3 variants={text}>Tokopedia - Operational</motion.h3>
              <div className="skillset-img">
                <img alt="Logistic-1" src="/assets/tokopedia-ops.png" />
              </div>
            </StaggerWrapper>
            <StaggerWrapper inViewProps={{ threshold: 0.5 }}>
              <motion.h3 variants={text}>Tokopedia - Design System - UNIFY</motion.h3>
              <div className="skillset-img">
                <img alt="Logistic-1" src="/assets/tokopedia-ds.png" />
              </div>
            </StaggerWrapper>
            <StaggerWrapper inViewProps={{ threshold: 0.5 }}>
              <motion.h3 variants={text}>Tokopedia - Logistic Tribe</motion.h3>
              <div className="skillset-img">
                <img alt="Logistic-1" src="/assets/tokopedia-logistic.png" />
              </div>
            </StaggerWrapper>
          </div>
        </div>
      </section>
      <section>
        <div className="wrapper">
          <StaggerWrapper>
            <div className="recent-project__mobile">
              <motion.h2 variants={text}>Pet Project</motion.h2>
              <motion.h3 variants={text}>Digital Garden App</motion.h3>
              <Image 
                alt="Digital Garden App"
                src="/assets/digital-garden-7.png" 
                width={320}
                height={240}
                layout="responsive" 
              />
            </div>
          </StaggerWrapper>
          <StaggerWrapper inViewProps={{ threshold: 0.5 }}>
            <div className="recent-project">
                <motion.h2 variants={text}>Pet Project</motion.h2>
                <div className="flex">
                  <motion.h3 variants={text}>Digital Garden App</motion.h3>
                  <motion.div 
                    initial="initial"
                    className="img-wrapper"
                    variants={imageGallery}
                    whileHover="hover">
                    {renderPetProject()}
                  </motion.div>
                </div>
            </div>
          </StaggerWrapper>
        </div>
      </section>
      <section className="stack">
        <div className="wrapper">
          <StaggerWrapper>
            <div className="stack-container__mobile">  
              <motion.h2 variants={text} className="center">My Stack Universe</motion.h2>
              <div className="flex items-center justify-center">
                <motion.div variants={scaledIcon}>
                  <SiCss3 size={48} title="CSS3" />
                </motion.div>
                <motion.div variants={scaledIcon}>
                  <SiHtml5 size={48} title="HTML5" />
                </motion.div>
                <motion.div variants={scaledIcon}>
                  <SiReact size={48} title="React" />
                </motion.div>
                <motion.div variants={scaledIcon}>
                  <SiStorybook size={48} title="Storybook" />
                </motion.div>
                <motion.div variants={scaledIcon}>
                  <SiNodeDotJs size={48} title="NodeJS" />  
                </motion.div>
                <motion.div variants={scaledIcon}>
                  <SiApollographql size={48} title="Apollo GraphQL" />
                </motion.div>
                <motion.div variants={scaledIcon}>
                  <SiStyledComponents size={48} title="Styled Components" />
                </motion.div>
                <motion.div variants={scaledIcon}>
                  <SiWordpress size={48} title="Wordpress" />
                </motion.div>
                <motion.div variants={scaledIcon}>
                  <SiJest size={48} title="Jest" />
                </motion.div>
              </div>
            </div>
            </StaggerWrapper>
            <StaggerWrapper>
              <div className="stack-container" ref={constraintsRef}>
                <motion.div 
                  className="floating-icon"
                  initial="initial" 
                  animate="animate" 
                  whileHover="hover" 
                  variants={float(0, -100)}
                  drag 
                  dragConstraints={constraintsRef}
                >
                  <motion.p variants={floatText}>CSS3</motion.p>
                  <SiCss3 size={48} title="CSS3" />
                </motion.div>
                <motion.div 
                  className="floating-icon"
                  initial="initial" 
                  animate="animate" 
                  whileHover="hover" 
                  variants={float(100, 100, 0.5)}
                  drag 
                  dragConstraints={constraintsRef}
                >
                  <motion.p variants={floatText}>HTML5</motion.p>
                  <SiHtml5 size={48} title="HTML5" />
                </motion.div>
                <motion.div 
                  className="floating-icon"
                  initial="initial" 
                  animate="animate" 
                  whileHover="hover" 
                  variants={float(350, -100, 1)}
                  drag 
                  dragConstraints={constraintsRef}
                >
                  <motion.p variants={floatText}>React</motion.p>
                  <SiReact size={48} title="React" />
                </motion.div>
                <motion.div 
                  className="floating-icon"
                  initial="initial" 
                  animate="animate" 
                  whileHover="hover" 
                  variants={float(-100, 100, 1.5)}
                  drag 
                  dragConstraints={constraintsRef}
                >
                  <motion.p variants={floatText}>Node JS</motion.p>
                  <SiNodeDotJs size={48} title="NodeJS" />  
                </motion.div>
                <motion.div 
                  className="floating-icon"
                  initial="initial" 
                  animate="animate" 
                  whileHover="hover"
                  variants={float(200, -100, 2)}
                  drag 
                  dragConstraints={constraintsRef}
                >
                  <motion.p variants={floatText}>GraphQL</motion.p>
                  <SiApollographql size={48} title="Apollo GraphQL" />
                </motion.div>
                <motion.div 
                  className="floating-icon"
                  initial="initial" 
                  animate="animate" 
                  whileHover="hover" 
                  variants={float(-200, -100, 2.5)}
                  drag 
                  dragConstraints={constraintsRef}
                >
                  <motion.p variants={floatText}>Styled Components</motion.p>
                  <SiStyledComponents size={48} title="Styled Components" />
                </motion.div>
                <motion.div 
                  className="floating-icon"
                  initial="initial" 
                  animate="animate" 
                  whileHover="hover" 
                  variants={float(300, 100, 3)}
                  drag 
                  dragConstraints={constraintsRef}
                >
                  <motion.p variants={floatText}>Wordpress</motion.p>
                  <SiWordpress size={48} title="Wordpress" />
                </motion.div>
                <motion.div 
                  className="floating-icon"
                  initial="initial" 
                  animate="animate" 
                  whileHover="hover" 
                  variants={float(-300, 100, 3.5)}
                  drag 
                  dragConstraints={constraintsRef}
                >
                  <motion.p variants={floatText}>Jest</motion.p>
                  <SiJest size={48} title="Jest" />
                </motion.div>
                <motion.div 
                  className="floating-icon"
                  initial="initial" 
                  animate="animate" 
                  whileHover="hover" 
                  variants={float(-350, -100, 4)}
                  drag 
                  dragConstraints={constraintsRef}
                >
                  <motion.p variants={floatText}>Storybook</motion.p>
                  <SiStorybook size={48} title="Storybook" />
                </motion.div>
                <motion.h2 variants={text} className="my4">My Stack Universe</motion.h2>
              </div>
          </StaggerWrapper>
        </div>
      </section>
      <section className="education">
        <div className="wrapper">
          <StaggerWrapper inViewProps={{ threshold: '0.5' }}>
            <motion.h2 variants={text}>Education</motion.h2>
            <a 
              href="https://goo.gl/maps/tTQp9hymLBvNz39s7" 
              target="_blank" 
              rel="noopener noreferrer">
              <motion.p variants={text} className="left-align">Binus</motion.p>
              <motion.p variants={text} className="center">International</motion.p>
              <motion.p variants={text} className="right-align">University</motion.p>
            </a>
            <motion.h3 variants={text} className="right-align">Bachelor of Computer Science</motion.h3>
          </StaggerWrapper>
        </div>
      </section>
      <section>
        <div className="wrapper">
          <StaggerWrapper>
            <div className="powered-by">
              <motion.h2 variants={text}>Powered By</motion.h2>
              <div className="flex">
                <motion.div variants={scaledIcon}>
                  <SiZeit size={48} className="mr2" title="Vercel" />
                </motion.div>
                <motion.div variants={scaledIcon}>
                  <SiNextDotJs size={48} className="mr2" title="NextJS" />
                </motion.div>
                <motion.div variants={scaledIcon}>
                  <SiFramer size={48} title="Framer Motion" />
                </motion.div>
              </div>
            </div>
          </StaggerWrapper>
        </div>
      </section>
      <section className="contact">
        <div className="wrapper">
          <StaggerWrapper>
            <div className="contact-me">
              <motion.a 
                href="mailto:zunibenarivo@gmail.com" 
                target="_blank" 
                rel="noopener noreferrer"
                variants={text}>
                  Get in Touch
              </motion.a>
              <motion.div variants={divider} className="divider" />
            </div>
            <br />
            <motion.a href="https://github.com/NioBenarivo" 
              target="_blank" 
              rel="noopener noreferrer"
              variants={scaledIcon}
            >
              <SiGithub size={48} title="Github" />
            </motion.a>
            <motion.a href="https://www.linkedin.com/in/zunio-benarivo-954679118/" 
              target="_blank" 
              rel="noopener noreferrer"
              variants={scaledIcon}
            >
              <SiLinkedin size={48} title="LinkedIn" />
            </motion.a>
            <br />
            <div className="flex items-center contact-info">
              <motion.a 
                href="https://goo.gl/maps/mnDwan2rYUTHeLKL8" 
                target="_blank"
                rel="noopener noreferrer"
                variants={scaledIcon}
              >
                <IoLocation size={48} title="Location" />
              </motion.a>
              <motion.p variants={text}>Jl. Pantai Indah Selatan 2, RT.3/RW.3, Kapuk Muara, Kec. Penjaringan, Kota Jkt Utara, Daerah Khusus Ibukota Jakarta 14460</motion.p>
            </div>
            <div className="flex items-center contact-info">
              <motion.div variants={scaledIcon}>
                <IoPhonePortraitOutline size={48} title="Phone" />
              </motion.div>
              <motion.p variants={text}>+62 813 2970 6944</motion.p>
            </div>
          </StaggerWrapper>
        </div>
      </section>
      <GlobalNav darkmode={darkmode} toggleMode={toggleMode} />
    </motion.div>
  )
}