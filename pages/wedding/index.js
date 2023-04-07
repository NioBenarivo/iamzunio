import React, { useState } from "react";
import { motion } from "framer-motion";
import { WeddingInvitationText, text } from "utils/animations";
import { GiSoundOff, GiSoundOn } from "react-icons/gi";
import styles from "styles/wedding.module.css";

const Wedding = () => {
  const [audio, setAudio] = useState(false);

  const handlePlay = () => {
    setAudio(true);
    document.getElementById("audio").play();
  };

  const handlePause = () => {
    setAudio(false);
    document.getElementById("audio").pause();
  };

  // Render Text Animations
  const renderText = (value) => (
    <motion.span variants={text}>{value}</motion.span>
  );
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div className={styles.weddingWrapper}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={WeddingInvitationText}
          className={styles.flexContainer}
        >
          <h1 className={styles.name}>
            {renderText("Zunio")}&nbsp;
            {renderText(`&`)}&nbsp;
            {renderText("Angelita")}
          </h1>
          <h2 className={styles.desc}>
            {renderText("INVITING")}&nbsp;
            {renderText(`YOU`)}&nbsp;
            {renderText("TO")}&nbsp;
            {renderText("THE")}&nbsp;
            {renderText(`CELEBRATION`)}&nbsp;
            {renderText("OF")}&nbsp;
            {renderText("OUR")}&nbsp;
            {renderText(`WEDDING`)}&nbsp;
          </h2>

          <div className={styles.schedule}>
            <p className={styles.month}>JULY</p>
            <div className={styles.date}>
              <p>SATURDAY</p>
              <p>20</p>
              <p>6.30 PM</p>
            </div>
            <p className={styles.hotelName}>Mercure Hotel</p>
            <p className={styles.hotelFloor}>8th Floor Ballroom</p>
            <div>
              {audio ? (
                <GiSoundOn onClick={handlePause} size={32}></GiSoundOn>
              ) : (
                <GiSoundOff onClick={handlePlay} size={32}></GiSoundOff>
              )}
            </div>
          </div>
        </motion.div>
      </div>
      <div style={{ display: "none" }}>
        <audio id="audio" loop autoplay>
          <source src="/assets/music-bg.mp3" type="audio/mp3" />
        </audio>
      </div>
    </div>
  );
};

export default Wedding;
