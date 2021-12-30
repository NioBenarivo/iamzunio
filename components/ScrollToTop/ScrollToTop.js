import React, { useEffect, useState } from 'react';
import { IoArrowUpCircleOutline } from 'react-icons/io5';
import styles from './ScrollToTop.module.css';

const ScrollArrow = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollTop = () => {
    if (window) {
      window.scrollTo({
        top: 0
      });
    }
  };

  useEffect(() => {
    if (window) {
      window.addEventListener('scroll', toggleVisible);
    }
  }, []);

  return (
    <IoArrowUpCircleOutline
      className={styles.scrollTop}
      onClick={scrollTop}
      size={32}
      style={{ display: visible ? 'inline' : 'none' }}
    />
  );
};

export default ScrollArrow;
