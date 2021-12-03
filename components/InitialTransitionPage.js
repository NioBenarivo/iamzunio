import { motion } from 'framer-motion'
import {
  blackBox,
  intro,
  circleProps,
  circleWidth,
} from '@utils/constants'

export default function InitialTransition() {
  return (
    <>
      <motion.div
        className="initial-page__bg"
        initial="initial"
        animate="animate"
        variants={blackBox}
        onAnimationStart={() => document.body.style.overflow = 'hidden'}
        onAnimationComplete={() => document.body.style.overflow = 'visible'}
      >
        <motion.div className="circle" variants={intro}>
          <svg className="circle-loader" width={circleWidth} height={circleWidth} viewBox="0 0 120 120">
            <motion.circle {...circleProps} stroke="#0b0b0a" />
          </svg>
          <h2 className="logo">Z</h2>
        </motion.div>
      </motion.div>
    </>
  )
}