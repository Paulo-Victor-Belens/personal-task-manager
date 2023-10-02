/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import useStore from '@/zustand/store';
import styles from '../../page.module.css';
import { customStyles } from './customStyles';
import AsideBoards from '../AsideBoards';
import DarkMode from '../DarkMode';
import { getSavedBoards } from '@/helpers/boardLocal';



function ModalAsideMobile({ isOpen, setIsOpen }) {
  const [isHidden, modalNewBoard, isDelete, actualBoards, isDarkMode] = useStore((state) => 
  [state.isHidden, state.modalNewBoard, state.isDelete, state.actualBoards, state.isDarkMode]
  );
  const [boards, setBoards] = useState([])

  useEffect(() => {
    const boards = getSavedBoards('board');
    if (boards.length !== 0 && boards !== null) {
      try {
        setBoards(boards)
      } catch (error) {
        console.error('Erro ao fazer parsing JSON:', error);
      }
    } else {
      setBoards([])
    }
  }, [modalNewBoard, isDelete, actualBoards]);

  const custom = customStyles(isDarkMode);

  custom.content.padding = '15px';
  custom.content.borderRadius = '10px';
  custom.content.top = '30%';
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="Modal de exemplo"
        shouldCloseOnOverlayClick={true}
        style={custom}
        ariaHideApp={false}
      >
        <div className={isDarkMode ? `${styles.containerModal} ${styles.containerModalDarkMode}` : styles.containerModal}>
          <aside className={isHidden ? styles.hiddenAsideContainerMobile : styles.asideContainerMobile}>
            <div className={isHidden ? styles.hiddenAsideContentMobile : styles.asideContentMobile}> 
              <div>
                <div>
                  <h4 className={styles.asideTitle}>ALL BOARDS ({boards.length})</h4>
                </div>
                <AsideBoards />
              </div>
              <div>
                <DarkMode />
              </div>
            </div>
          </aside>
        </div>
      </Modal>
    </div>
  );
}

export default ModalAsideMobile;
