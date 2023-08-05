"use client";
import React, {useEffect} from 'react';
import styles from './page.module.css'
import Header from './components/Header'
import Aside from './components/Aside'
import Main from './components/Main'
import useStore from '@/zustand/store';

export default function Home() {
  const [isHidden, isDarkMode, updateIsDarkMode] = useStore((state) => 
  [state.isHidden, state.isDarkMode, state.updateIsDarkMode]
  );

  useEffect(() => {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode) {
      updateIsDarkMode(JSON.parse(darkMode));
    } 
  }, [isDarkMode]);
  return (
    <div className={isDarkMode ? `${styles.layout} ${styles.isDarkMode}` : styles.layout}>
      <Aside />
      <div className={isHidden ? styles.hiddenLayoutMain : styles.layoutMain}>
        <Header />
        <Main />
      </div>
    </div>
  )
}
