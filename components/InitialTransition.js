import { motion } from 'framer-motion'
import {
  blackBoxMotion,
  redBoxMotion,
  greenBoxMotion,
  yellowBoxMotion,
  introMotion,
  circleProps,
  circleWidth
} from '@utils/constants'

export default function InitialTransition() {
  return (
    <>
      <motion.div
        className="initialPageBg"
        initial="initial"
        animate="animate"
        variants={blackBoxMotion}
        onAnimationStart={() => document.body.style.overflow = 'hidden'}
        onAnimationComplete={() => document.body.style.overflow = 'visible'}
      >
        <motion.div className="circle" variants={introMotion}>
          <svg className="circle-loader" width={circleWidth} height={circleWidth} viewBox="0 0 120 120">
            <motion.circle {...circleProps} stroke="#c14953" />
            <motion.circle {...circleProps} stroke="#f5e960" />
            <motion.circle {...circleProps} stroke="#55d6c2" />
            <motion.circle {...circleProps} stroke="#ffffff" />
          </svg>
          <h2 className="logo">Z</h2>
        </motion.div>
      </motion.div>
      <motion.div 
        className="afterBox redBox"
        initial="initial"
        animate="animate"
        variants={redBoxMotion} 
      />
      <motion.div 
        className="afterBox yellowBox"
        initial="initial"
        animate="animate"
        variants={yellowBoxMotion} 
      />
      <motion.div 
        className="afterBox greenBox"
        initial="initial"
        animate="animate"
        variants={greenBoxMotion} 
      />
    </>
  )
}