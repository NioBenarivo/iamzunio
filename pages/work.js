import { motion } from 'framer-motion'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Front.module.css'

export default function Work() {
  return (
    <motion.div className={`${styles.container} ${styles.work}`} exit={{ opacity: 0 }}>
      <Head>
        <title>Work</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>ZZZZZZ</div>
      <Link href="/home">
        <a>home</a>
      </Link>
    </motion.div>
  )
}
