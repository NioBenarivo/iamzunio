import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Head from 'next/head'
import { motion, useViewportScroll } from 'framer-motion'
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
  SiWordpress,
  SiApollographql
} from 'react-icons/si'
import { GiSwimfins, GiNoodles, GiStairsCake, GiBriefcase } from "react-icons/gi";
import { IoBicycleOutline, IoLaptopOutline, IoFlagOutline } from "react-icons/io5";
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import Footer from '@components/Footer'
import FadeInWrapper from '@components/FadeInWrapper'
import InitialTransition from '@components/InitialTransition'
import {
  contentMotion,
  landingTextMotion,
  textMotion,
  imageMotion,
  profileTextMotion,
  backToTopMotion,
} from '@utils/constants'

export default function Home({ isFirstMount }) {
  const [darkMode, setDarkMode] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const { scrollYProgress } = useViewportScroll();
  const timer = useRef()
  const [sliderRef, slider] = useKeenSlider({
    mode: "free-snap",
    loop: true, 
    duration: 1000,
  })

  useEffect(() => {
    scrollYProgress.onChange(y => setIsComplete(y >= 1))
  }, [scrollYProgress]);

  useEffect(() => {
    timer.current = setInterval(() => {
      if (slider) {
        slider.next()
      }
    }, 5000)
    return () => {
      clearInterval(timer.current)
    }
  }, [slider])

  const renderBooks = () => {
    let content = [];
    for (let i = 1; i < 10; i++) {
      content.push(
        <div className="keen-slider__slide book-slides" key={`content-${i}`}>
          <Image
            alt={`book-${i}`}
            src={`/assets/book-${i}.jpeg`}
            width={180}
            height={260}
          />
        </div>
      );
    }
    return content;
  }

  return (
    <motion.div className={`container ${darkMode ? 'dark-theme' : 'light-theme'}`} exit={{ opacity: 0 }}>
      <Head>
        <title>Hi, I am Zunio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isFirstMount && <InitialTransition />}
      <motion.div 
        className="theme-mode" 
        onClick={() => setDarkMode(!darkMode)}
        whileHover={{ scale: 1.25, cursor: 'pointer' }}
      >
        <div className="theme-mode__btn">
          {
            darkMode ? <svg fill="#f2f5ff" id="Capa_1" enableBackground="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><g><path d="m123.467 31.566h9.066v9.067c0 4.143 3.357 7.5 7.5 7.5s7.5-3.357 7.5-7.5v-9.067h9.066c4.143 0 7.5-3.357 7.5-7.5s-3.357-7.5-7.5-7.5h-9.066v-9.066c0-4.143-3.357-7.5-7.5-7.5s-7.5 3.357-7.5 7.5v9.066h-9.066c-4.143 0-7.5 3.357-7.5 7.5s3.357 7.5 7.5 7.5z"/><path d="m388.533 480.434h-9.066v-9.067c0-4.143-3.357-7.5-7.5-7.5s-7.5 3.357-7.5 7.5v9.067h-9.067c-4.143 0-7.5 3.357-7.5 7.5s3.357 7.5 7.5 7.5h9.066v9.066c0 4.143 3.357 7.5 7.5 7.5s7.5-3.357 7.5-7.5v-9.066h9.066c4.143 0 7.5-3.357 7.5-7.5s-3.356-7.5-7.499-7.5z"/><path d="m139.25 305.7c0-13.271-10.796-24.066-24.066-24.066s-24.068 10.796-24.068 24.066 10.797 24.066 24.067 24.066 24.067-10.795 24.067-24.066zm-24.066 9.067c-5 0-9.067-4.067-9.067-9.066s4.067-9.066 9.067-9.066c4.999 0 9.066 4.067 9.066 9.066s-4.067 9.066-9.066 9.066z"/><path d="m131.75 263.5c13.27 0 24.066-10.796 24.066-24.066s-10.796-24.067-24.066-24.067-24.066 10.797-24.066 24.067 10.795 24.066 24.066 24.066zm0-33.134c4.999 0 9.066 4.067 9.066 9.067 0 4.999-4.067 9.066-9.066 9.066s-9.066-4.067-9.066-9.066 4.067-9.067 9.066-9.067z"/><path d="m462.3 255.666c-.011-6.411-4.423-11.787-10.729-13.074-6.296-1.279-12.45 1.93-14.968 7.814-21.044 49.196-69.145 80.929-122.624 80.929-.117 0-.242-.001-.359-.001-73.116-.195-132.759-59.838-132.953-132.953-.143-53.619 31.623-101.894 80.929-122.983 5.884-2.518 9.097-8.672 7.812-14.968-1.287-6.306-6.663-10.718-13.087-10.729h-.321c-49.345 0-97.096 17.697-134.458 49.832-3.141 2.701-3.496 7.437-.796 10.577 2.702 3.142 7.437 3.495 10.577.796 32.781-28.195 74.191-44.403 117.316-46.063-50.804 24.916-83.125 76.527-82.973 133.577.217 81.343 66.569 147.696 147.913 147.914.134 0 .266.001.4.001 56.893-.002 108.324-32.289 133.18-82.979-3.882 102.084-88.141 183.944-191.159 183.944-8.348 0-16.77-.549-25.034-1.632-.476-.062-.641-.589-.663-.892-.071-.97-.205-1.953-.397-2.922-2.131-10.735-11.224-18.696-22.113-19.359-8.759-.518-17.137 3.747-21.829 11.172-.079.126-.434.221-.782.082-19.635-7.83-37.752-18.818-53.85-32.661-3.139-2.701-7.875-2.346-10.576.797-2.701 3.141-2.344 7.876.797 10.576 17.356 14.926 36.895 26.776 58.071 35.221 7.049 2.812 15.046.287 19.021-6.003 1.768-2.799 4.926-4.42 8.236-4.211 4.024.245 7.52 3.318 8.311 7.308.073.371.125.742.151 1.102.562 7.652 6.185 13.683 13.673 14.664 8.908 1.167 17.986 1.759 26.983 1.759 113.754 0 206.3-92.546 206.3-206.3v-.335z"/><path d="m64.7 256c0-45.757 16.409-90.035 46.205-124.677 2.7-3.141 2.345-7.876-.796-10.577-3.14-2.7-7.875-2.346-10.577.796-32.135 37.362-49.832 85.113-49.832 134.458 0 49.343 17.699 97.092 49.837 134.451 1.483 1.724 3.58 2.608 5.688 2.608 1.732 0 3.473-.597 4.889-1.815 3.14-2.701 3.495-7.436.794-10.577-29.798-34.637-46.208-78.912-46.208-124.667z"/><path d="m463.083 381.033c-4.143 0-7.5 3.357-7.5 7.5v16.567c0 4.143 3.357 7.5 7.5 7.5s7.5-3.357 7.5-7.5v-16.566c0-4.143-3.357-7.501-7.5-7.501z"/><path d="m463.083 447.3c-4.143 0-7.5 3.357-7.5 7.5v16.566c0 4.143 3.357 7.5 7.5 7.5s7.5-3.357 7.5-7.5v-16.566c0-4.143-3.357-7.5-7.5-7.5z"/><path d="m504.5 422.45h-16.566c-4.143 0-7.5 3.357-7.5 7.5s3.357 7.5 7.5 7.5h16.566c4.143 0 7.5-3.357 7.5-7.5s-3.357-7.5-7.5-7.5z"/><path d="m438.233 422.45h-16.566c-4.143 0-7.5 3.357-7.5 7.5s3.357 7.5 7.5 7.5h16.566c4.143 0 7.5-3.357 7.5-7.5s-3.357-7.5-7.5-7.5z"/><path d="m48.917 64.7c4.143 0 7.5-3.357 7.5-7.5v-16.566c0-4.143-3.357-7.5-7.5-7.5s-7.5 3.357-7.5 7.5v16.566c0 4.143 3.357 7.5 7.5 7.5z"/><path d="m56.417 123.467v-16.567c0-4.143-3.357-7.5-7.5-7.5s-7.5 3.357-7.5 7.5v16.566c0 4.143 3.357 7.5 7.5 7.5s7.5-3.357 7.5-7.499z"/><path d="m73.767 89.55h16.566c4.143 0 7.5-3.357 7.5-7.5s-3.357-7.5-7.5-7.5h-16.566c-4.143 0-7.5 3.357-7.5 7.5 0 4.142 3.357 7.5 7.5 7.5z"/><path d="m24.066 74.55h-16.566c-4.143 0-7.5 3.357-7.5 7.5s3.357 7.5 7.5 7.5h16.566c4.143 0 7.5-3.357 7.5-7.5s-3.357-7.5-7.5-7.5z"/></g></svg> :
            <svg fill="#2d2d2a" id="Capa_1" enableBackground="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><g><path d="m256 115.967c-77.214 0-140.033 62.819-140.033 140.033 0 32.03 10.526 62.177 30.441 87.18 2.581 3.24 7.298 3.774 10.54 1.194 3.24-2.581 3.774-7.299 1.194-10.539-17.778-22.32-27.174-49.234-27.174-77.835 0-68.943 56.09-125.033 125.033-125.033s125.032 56.09 125.032 125.033-56.09 125.033-125.033 125.033c-28.603 0-55.52-9.398-77.84-27.179-3.239-2.581-7.958-2.047-10.539 1.193s-2.047 7.958 1.193 10.539c25.004 19.918 55.152 30.446 87.186 30.446 77.214 0 140.033-62.819 140.033-140.033s-62.819-140.032-140.033-140.032z"/><path d="m256 97.834c4.142 0 7.5-3.358 7.5-7.5v-26.417c0-4.142-3.358-7.5-7.5-7.5s-7.5 3.358-7.5 7.5v26.417c0 4.142 3.358 7.5 7.5 7.5z"/><path d="m256 41.417c4.142 0 7.5-3.358 7.5-7.5v-26.417c0-4.142-3.358-7.5-7.5-7.5s-7.5 3.358-7.5 7.5v26.417c0 4.142 3.358 7.5 7.5 7.5z"/><path d="m133.553 144.159c1.464 1.464 3.384 2.197 5.303 2.197s3.839-.732 5.303-2.197c2.929-2.929 2.929-7.678 0-10.606l-58.572-58.572c-2.929-2.929-7.678-2.929-10.606 0-2.929 2.929-2.929 7.678 0 10.606z"/><path d="m97.834 256c0-4.142-3.358-7.5-7.5-7.5h-82.834c-4.142 0-7.5 3.358-7.5 7.5s3.358 7.5 7.5 7.5h82.834c4.142 0 7.5-3.358 7.5-7.5z"/><path d="m133.553 367.841-58.572 58.572c-2.929 2.929-2.929 7.678 0 10.606 1.464 1.464 3.384 2.197 5.303 2.197s3.839-.732 5.303-2.197l58.572-58.572c2.929-2.929 2.929-7.678 0-10.607-2.929-2.928-7.678-2.928-10.606.001z"/><path d="m256 414.167c-4.142 0-7.5 3.358-7.5 7.5v82.833c0 4.142 3.358 7.5 7.5 7.5s7.5-3.358 7.5-7.5v-82.833c0-4.143-3.358-7.5-7.5-7.5z"/><path d="m378.447 367.841c-2.929-2.929-7.678-2.929-10.606 0-2.929 2.929-2.929 7.678 0 10.607l58.572 58.572c1.464 1.464 3.384 2.197 5.303 2.197 1.92 0 3.839-.732 5.303-2.197 2.929-2.929 2.929-7.678 0-10.606z"/><path d="m504.5 248.5h-82.833c-4.142 0-7.5 3.358-7.5 7.5s3.358 7.5 7.5 7.5h82.833c4.142 0 7.5-3.358 7.5-7.5s-3.358-7.5-7.5-7.5z"/><path d="m373.144 146.356c1.919 0 3.839-.732 5.303-2.197l58.572-58.572c2.929-2.929 2.929-7.678 0-10.606-2.929-2.929-7.678-2.929-10.606 0l-58.572 58.572c-2.929 2.929-2.929 7.678 0 10.606 1.464 1.465 3.384 2.197 5.303 2.197z"/><path d="m185.673 105.814c1.197 2.888 3.989 4.632 6.932 4.632.956 0 1.929-.184 2.867-.573 3.827-1.585 5.644-5.973 4.059-9.799l-15.85-38.264c-1.586-3.827-5.974-5.644-9.799-4.059-3.827 1.585-5.644 5.973-4.059 9.799z"/><path d="m61.81 183.682 38.264 15.85c.938.389 1.911.573 2.867.573 2.943 0 5.736-1.744 6.932-4.632 1.585-3.827-.232-8.214-4.059-9.799l-38.264-15.85c-3.826-1.584-8.214.232-9.799 4.059-1.585 3.826.232 8.213 4.059 9.799z"/><path d="m109.873 316.528c-1.585-3.827-5.973-5.644-9.799-4.059l-38.264 15.85c-3.827 1.585-5.644 5.973-4.059 9.799 1.196 2.888 3.989 4.632 6.932 4.632.957 0 1.929-.184 2.867-.573l38.264-15.85c3.827-1.585 5.644-5.973 4.059-9.799z"/><path d="m195.472 402.127c-3.826-1.585-8.214.232-9.799 4.059l-15.85 38.264c-1.585 3.827.232 8.214 4.059 9.799.939.389 1.911.573 2.867.573 2.943 0 5.736-1.744 6.932-4.632l15.85-38.264c1.585-3.826-.232-8.214-4.059-9.799z"/><path d="m326.327 406.186c-1.585-3.827-5.973-5.644-9.799-4.059-3.827 1.585-5.644 5.973-4.059 9.799l15.85 38.264c1.197 2.888 3.989 4.632 6.932 4.632.957 0 1.929-.184 2.867-.573 3.827-1.585 5.644-5.973 4.059-9.799z"/><path d="m450.19 328.318-38.264-15.85c-3.826-1.585-8.214.232-9.799 4.059s.232 8.214 4.059 9.799l38.264 15.85c.939.389 1.911.573 2.867.573 2.943 0 5.736-1.744 6.932-4.632 1.585-3.826-.232-8.213-4.059-9.799z"/><path d="m402.127 195.472c1.196 2.888 3.989 4.632 6.932 4.632.956 0 1.929-.184 2.867-.573l38.264-15.85c3.827-1.585 5.644-5.973 4.059-9.799-1.585-3.827-5.973-5.643-9.799-4.059l-38.264 15.85c-3.827 1.585-5.644 5.972-4.059 9.799z"/><path d="m316.528 109.873c.939.389 1.911.573 2.867.573 2.943 0 5.736-1.744 6.932-4.632l15.85-38.264c1.585-3.827-.232-8.214-4.059-9.799s-8.214.232-9.799 4.059l-15.85 38.264c-1.585 3.826.232 8.214 4.059 9.799z"/></g></svg> 
          }
        </div>
        
      </motion.div>
      <motion.div 
        initial="initial"
        animate="animate"
        variants={contentMotion(isFirstMount)} 
        className="content max-width-4 mx-auto">
        <div className="relative px3 landing">
          <motion.h1 className="regular" variants={landingTextMotion}>
            UX Engineer based in {' '}
            <a 
              href="https://goo.gl/maps/mnDwan2rYUTHeLKL8" 
              target="_blank"
              rel="noopener noreferrer">
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
            <motion.div className="col-7 order-0" variants={imageMotion}>
              <Image
                alt="Logistic-1"
                src="/assets/tokopedia-logistic.png"
                width={840}
                height={620}
              />
            </motion.div>
            <div className="flex flex-column col-5 px2 order-1">
              <motion.h2 className="mt0 mb1" variants={textMotion}>Logistic</motion.h2>
              <motion.p className="mt0" variants={textMotion}>Collaborate with merchant and payment team<br /> to produce user-merchant app</motion.p>
              <motion.div className="flex flex-wrap items-center mb1" variants={textMotion}>
                <span className="mr1">Tech Stack:</span>
                <SiReact className="mr1" size={24} title="React" />
                <SiHtml5 className="mr1" size={24} title="HTML5" />
                <SiStyledComponents className="mr1" size={24} title="CSS-in-JS" />
                <SiCss3 className="mr1" size={24} title="CSS3" />
                <SiNodeDotJs className="mr1" size={24} title="NodeJS" />
                <SiApollographql className="mr1" size={24} title="Apollo GraphQL" />
              </motion.div>
              <motion.div className="flex flex-wrap items-center" variants={textMotion}>
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
            <motion.div className="col-7 work-img" variants={imageMotion}>
              <Image
                alt="Logistic-1"
                src="/assets/tokopedia-ds.png"
                width={840}
                height={620}
              />
            </motion.div>
            <div className="flex flex-column col-5 px2 work-text">
              <motion.h2 className="mt0 mb1" variants={textMotion}>Design System</motion.h2>
              <motion.p className="mt0" variants={textMotion}>Build Internal Design System and Design Guidelines</motion.p>
              <motion.div className="flex flex-wrap items-center mb1" variants={textMotion}>
                <span className="mr1">Tech Stack:</span>
                <SiReact className="mr1" size={24} title="React" />
                <SiStorybook className="mr1" size={24} title="Storybook" />
                <SiStyledComponents className="mr1" size={24} title="Css-in-JS" />
                <SiNodeDotJs className="mr1" size={24} title="NodeJS" />
                <SiWebpack className="mr1" size={24} title="Webpack" />
                <SiTypescript className="mr1" size={24} title="TypeScript" />
                <SiWordpress className="mr1" size={24} title="Wordpress" />
              </motion.div>
              <motion.div className="flex flex-wrap items-center" variants={textMotion}>
                <span className="mr1">Operation Stack:</span>
                <SiGithub className="mr1" size={24} />
                <SiJira className="mr1" size={24} />
                <SiSlack className="mr1" size={24} />
              </motion.div>
            </div>
          </div>
        </FadeInWrapper>
      </div>
      <div className="col-12 bio p3 relative">
        <FadeInWrapper className="flex flex-wrap flex-column items-center">
          <div className="flex items-center flex-auto">
            <GiStairsCake size={64} className="mr1" />
            <motion.h2 variants={textMotion}>22 June 1994</motion.h2>
          </div>
          <div className="flex items-center flex-auto">
            <IoFlagOutline size={64} className="mr1" />
            <motion.h2 variants={textMotion}>Indonesia</motion.h2>
          </div>
          <div className="flex items-center flex-auto">
            <GiBriefcase size={64} className="mr1" />
            <motion.h2 variants={textMotion}>4+ Years Experience</motion.h2>
          </div>
        </FadeInWrapper>
      </div>
      <div className="col-12 activities">
        <FadeInWrapper className="flex flex-wrap items-center">
          <div className="col-3 center px1">
            <IoBicycleOutline size={96} />
            <motion.h2 variants={textMotion}>Bicycle</motion.h2>
            <motion.p variants={textMotion}>Ride multiple times a week. <br />Strengthen your core</motion.p>
          </div>
          <div className="col-3 center px1">
            <GiSwimfins size={96} />
            <motion.h2 variants={textMotion}>Swimming</motion.h2>
            <motion.p variants={textMotion}>Never sweat cause you're in water!<br />Love the deep blue sea</motion.p>
          </div>
          <div className="col-3 center px1">
            <IoLaptopOutline size={96} />
            <motion.h2 variants={textMotion}>Coding</motion.h2>
            <motion.p variants={textMotion}>Work and Hobby, why not?<br />Tech and Product enthusiast</motion.p>
          </div>
          <div className="col-3 center px1" >
            <GiNoodles size={96} />
            <motion.h2 variants={textMotion}>Ramen</motion.h2>
            <motion.p variants={textMotion}>Who doesn't love Ramen?<br />Slurpy noodles at its best</motion.p>
          </div>
        </FadeInWrapper>
      </div>
      <div className="col-12 books">
        <FadeInWrapper>
          <div className="max-width-4 mx-auto flex items-center my2 px3">
            <h2 className="m0 col-8">Book Collections</h2>
            <div ref={sliderRef} className="keen-slider col-4 relative">
              {renderBooks()}
            </div>
          </div>
        </FadeInWrapper>
      </div>
      <div className="col-12 relative">
        <FadeInWrapper>
          <Image
            alt="Profile"
            src="/assets/profile.jpg"
            layout="responsive"
            width="1200"
            height="720"
            objectFit="cover"
          />
        </FadeInWrapper>
        <div className="overlay">
          <FadeInWrapper customVariant={profileTextMotion}>
            <h2 className="m0">Zunio <br />Benarivo</h2>
            <a 
              href="mailto:zunibenarivo@gmail.com" 
              target="_blank" 
              rel="noopener noreferrer">
                Get in Touch
            </a>
            <motion.button 
              className="btt mt1"
              animate="animate"
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.93 }}
              variants={backToTopMotion(isComplete)}
              onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
            >
              Back to top
            </motion.button>
          </FadeInWrapper>
        </div>
      </div>
      <Footer />
    </motion.div>
  )
}
