import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { WeddingInvitationText, text } from "utils/animations";
import { GiSoundOff, GiSoundOn } from "react-icons/gi";
import styles from "styles/wedding-white.module.css";


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
        <Image
          unoptimized
          alt="img-content"
          src="/assets/logo.png"
          className={styles.weddingLogo}
          width={300}
          height={300}
        />
        <div className={styles.flexContainer}>
          <div className={styles.cardContainer}>
            <h2 className={styles.introText}>The Wedding of</h2>
            <div className={styles.imgFlexWrapper}>
              <div className={styles.imgContainer}>
                <Image
                  unoptimized
                  alt="img-content"
                  src="/assets/z.png"
                  fill
                />
              </div>
              <div className={styles.imgContainer}>
                <Image
                  unoptimized
                  alt="img-content"
                  src="/assets/&.png"
                  fill
                />
              </div>
              <div className={styles.imgContainer}>
                <Image
                  unoptimized
                  alt="img-content"
                  src="/assets/a.png"
                  fill
                />
              </div>
            </div>
            {/* <h1 className={styles.name}>
              {renderText("Zunio")}&nbsp;
              {renderText(`&`)}&nbsp;
              {renderText("Angelita")}
            </h1> */}

            
            <div className={styles.schedule}>
              <p className={styles.month}>JULY</p>
              <div className={styles.date}>
                <p>SATURDAY</p>
                <p>20</p>
                <p>6.30 PM</p>
              </div>
              <p className={styles.hotelText}>
                Mercure Hotel, 8th Floor Ballroom
              </p>
              <div>
                {audio ? (
                  <GiSoundOn onClick={handlePause} size={32}></GiSoundOn>
                ) : (
                  <GiSoundOff onClick={handlePlay} size={32}></GiSoundOff>
                )}
              </div>
            </div>
          </div>
        </div>
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
