import { motion } from 'framer-motion'
import {
  blackBox,
  intro,
  circleProps,
  circleWidth,
} from '@utils/constants'
import { useDarkmodeContext } from '@context/darkModeProvider'

export default function InitialTransition() {
  const { darkmode } = useDarkmodeContext();
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
        <motion.div className="circle" variants={intro}>
          <svg className="circle-loader" width={circleWidth} height={circleWidth} viewBox="0 0 120 120">
            <motion.circle {...circleProps} stroke={ darkmode ? "#0b0b0a" : "#FFFFFF"} />
          </svg>
          <h2 className="logo">Z</h2>
        </motion.div>
      </motion.div>
    </>
  )
}