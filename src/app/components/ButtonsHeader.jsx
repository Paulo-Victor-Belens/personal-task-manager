"use client";
import React, { useEffect, useRef } from 'react';
import styles from '../page.module.css';
import verticalEllipsis from '../../images/icon-vertical-ellipsis.svg';
import addTaskMobile from '../../images/icon-add-task-mobile.svg';
import Image from 'next/image'


export default function ButtonsHeader({ addTask, isDisabled, actualBoards, isVisible, setIsVisible, textOrImage}) {
  const myElementRef = useRef(null);

  const handleClickOutside = (event) => {
    if (myElementRef.current && !myElementRef.current.contains(event.target)) {
      setIsVisible(false);
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  return (
    <div className={styles.btns_header} >
            <button
              className={` ${styles.btn} ${styles.btnPrimaryLight}`}
              onClick={addTask}
              disabled={isDisabled}
            >
             {textOrImage === 'text' ? '+ Add New Task' : (<Image src={addTaskMobile} alt="Add task Mobile" />)} 
            </button>
            <div className={styles.divElli}>
              <button
                onClick={(event) => {
                  setIsVisible(!isVisible)
                  event.stopPropagation()
                }}
                style={{ padding: '5px' }}
                disabled={actualBoards.length !== 0 ? false : true}
                ref={myElementRef}
              >
                <Image src={verticalEllipsis} alt="Vertical Ellipsis" />
              </button>
            </div>
          </div>
  )
}
