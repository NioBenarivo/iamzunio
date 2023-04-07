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
    <div className={styles.weddingWrapper}>
      <div className={styles.flexContainer}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={WeddingInvitationText}
          className={styles.flexContainer}
        >
          <h1 className={styles.name}>
            {renderText('Zunio')}&nbsp;
            {renderText(`&`)}&nbsp;
            {renderText('Angelita')}
          </h1>
          <h2 className={styles.desc}>
            {renderText('INVITING')}&nbsp;
            {renderText(`YOU`)}&nbsp;
            {renderText('TO')}&nbsp;
            {renderText('THE')}&nbsp;
            {renderText(`CELEBRATION`)}&nbsp;
            {renderText('OF')}&nbsp;
            {renderText('OUR')}&nbsp;
            {renderText(`WEDDING`)}&nbsp;
          </h2>
        </motion.div>
        
        <div className={styles.schedule}>
          <p className={styles.month}>JULY</p>
          <div className={styles.date}>
            <p>SATURDAY</p>
            <p>20</p>
            <p>6.30 PM</p>
          </div>
          <p className={styles.hotelName}>Mercure Hotel</p>
          <p className={styles.hotelFloor}>8th Floor Ballroom</p>
        </div>
        {/* <MusicPlayer videoId="6POZlJAZsok" /> */}
      </div>
    </div>
  );
};

export default App;

