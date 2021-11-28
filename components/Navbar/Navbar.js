import React from 'react';
import { useRouter } from 'next/router';
import { IoArrowBack } from 'react-icons/io5';
import styles from './Navbar.module.css';

const Navbar = ({ title }) => {
  const router = useRouter();
  return (
    <div className='navbar'>
      <div className={styles.innerNavbar}>
        <div onClick={() => router.back()}>
          <IoArrowBack size={24} />
        </div>
        <span>{title}</span>
      </div>
    </div>
  );
};

export default Navbar;