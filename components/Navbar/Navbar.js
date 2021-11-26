import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { IoArrowBack } from 'react-icons/io5';
import styles from './Navbar.module.css';

export function debounce(func, wait, immediate) {
  var timeout;
  return function() {
      var context = this, args = arguments;
      var later = function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
  };
};

const Navbar = ({ title }) => {
  const router = useRouter();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(false);

  const handleScroll = debounce(() => {
    const currentScrollPos = window.pageYOffset;
    const visibleCondition = (
      prevScrollPos > currentScrollPos && 
      prevScrollPos - currentScrollPos > 70
    ) || currentScrollPos < 10;

    setVisible(visibleCondition);

    setPrevScrollPos(currentScrollPos);
  }, 50);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);

  }, [prevScrollPos, visible, handleScroll]);

  return (
    <div className={styles.navbar} style={{ top: visible ? '0' : '-60px' }}>
      <div onClick={() => router.back()}>
        <IoArrowBack size={24} />
      </div>
      <span>{title}</span>
    </div>
  );
};

export default Navbar;