"use client";
import styles from '../page.module.css';
import moonLigth from '../../images/icon-dark-theme.svg';
import sunLight from '../../images/icon-light-theme.svg';

import Image from 'next/image'; 
import useStore from '@/zustand/store';

const DarkMode = () => {
  const [isDarkMode, updateIsDarkMode] = useStore((state) => [state.isDarkMode, state.updateIsDarkMode]);

  const toogleDarkMode = () => {
    updateIsDarkMode(!isDarkMode);
    localStorage.setItem('darkMode', !isDarkMode)
  };
  return (
    <div className={styles.darkMode}>
      <div className={styles.toogleContent}>

        <Image src={sunLight} alt="Dark Mode" width={20} height={20} priority />

          <div className={styles.flipswitch}>
            <input 
              type="checkbox" 
              name="flipswitch" 
              className={styles.flipswitch_cb} 
              id="fs" 
              checked={isDarkMode}
              onChange={toogleDarkMode}
              />
            <label className={styles.flipswitch_label} htmlFor="fs">
                <div className={styles.flipswitch_inner}></div>
                <div className={styles.flipswitch_switch}></div>
            </label>
          </div>

        <Image src={moonLigth} alt="Dark Mode" width={20} height={20} priority />
        
      </div>

    </div>
  );
};

export default DarkMode;