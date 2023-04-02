import React from "react";
import { motion } from "framer-motion";
import { WeddingInvitationText, text } from "utils/animations";
import MusicPlayer from "./MusicPlayer";
import styles from 'styles/wedding.module.css';

const App = () => {
  const renderText = (value) => (
    <motion.span variants={text}>
      {value}
    </motion.span>
  )


  return (
    <div className="landing-page align-center">
      <div className={styles.flexContainer}>
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={WeddingInvitationText}
        >
          {renderText('Zunio')}&nbsp;
          {renderText(`&`)}&nbsp;
          {renderText('Angelita')}
        </motion.h1>
        <h2>We are getting married on July 20th 2023.</h2>
        {/* <MusicPlayer videoId="6POZlJAZsok" /> */}
        
      </div>
    </div>
  );
};

export default App;

