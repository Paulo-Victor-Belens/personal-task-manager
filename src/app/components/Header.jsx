"use client";
import React, { useEffect, useRef, useState } from 'react'
import { getSavedBoards } from '@/helpers/boardLocal';
import styles from '../page.module.css'
import Image from 'next/image'

import iconChevronDown from '../../images/icon-chevron-down.svg'
import logoMobile from '../../images/logo-mobile.svg'
import useStore from '@/zustand/store';
import EditDeleteBox from './modals/EditDeleteBox';
import ModalDelete from './modals/ModalDelete';
import ModalAddTask from './modals/ModalAddTask';
import ModalAsideMobile from './modals/ModalAsideMobile';
import ButtonsHeader from './ButtonsHeader';

export default function Header() {
  const [actualBoards,
      updateActualBoards,
      modalNewBoard,
      modalDeleteBoard,
      isDelete,
      isNewTask,
      updateModalDeleteBoard,
      updateIsDelete,
      modalEditBoard,
      updateModalEditBoard,
      updateIsNewTask,
      isDarkMode,
    ] = useStore(state => (
    [state.actualBoards,
      state.updateActualBoards,
      state.modalNewBoard,
      state.modalDeleteBoard,
      state.isDelete,
      state.isNewTask,
      state.updateModalDeleteBoard,
      state.updateIsDelete,
      state.modalEditBoard,
      state.updateModalEditBoard,
      state.updateIsNewTask,
      state.isDarkMode,
    ]
  ));

  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleMobile, setIsVisibleMobile] = useState(false);
  const [boardLocal, setBoardLocal] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [showAside, setShowAside] = useState(false);
  useEffect(() => {
    const boards = getSavedBoards('board');
    if (boards.length !== 0 && boards !== null) {
      try {
        setBoardLocal(boards)
        updateActualBoards(boards[0]);
      } catch (error) {
        console.error('Erro ao fazer parsing JSON:', error);
      }
    } else {
      setBoardLocal([])
    }
  }, [modalNewBoard, isDelete]);

  

  useEffect(() => {
    const boards = getSavedBoards('board');
    if (boards.length !== 0 && boards !== null) {
      try {
        if(actualBoards.columns.length === 0) {
          setIsDisabled(true);
          return;
        } return setIsDisabled(false);
      } catch (error) {
        console.error('Erro ao fazer parsing JSON:', error);
      }
    } setIsDisabled(true) 
  }, [actualBoards]);

  const showEditBox = () => {
    updateModalEditBoard(!modalEditBoard);
  }
  
  const showDeleteBox = () => {
    updateModalDeleteBoard(!modalDeleteBoard);
  }
  

  const deleteBoard = () => {
    const newBoards = boardLocal.filter((board) => board.id !== actualBoards.id);
    localStorage.removeItem('board');
    newBoards.length !== 0 
      ? localStorage.setItem('board', JSON.stringify(newBoards))
      : updateActualBoards(newBoards);
    ;
    
    updateIsDelete(!isDelete);
    showDeleteBox();
    // atualizar no estado global o actualBoards quando um board for deletado e criar o modal do edit 
  }

  const addTask = () => {
    if (actualBoards.columns.length === 0) {
      setIsDisabled(true);
      return;
    }
    setIsDisabled(false);
    updateIsNewTask(!isNewTask);
  };

  return (
    <header className={styles.header}>
        <div className={styles.headerDesk}>
          <h1 className={isDarkMode ? styles.containerModalDarkMode : ''}>{actualBoards.name}</h1>
          <ButtonsHeader 
            addTask={addTask}
            isDisabled={isDisabled}
            actualBoards={actualBoards}
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            textOrImage="text"
          />
        </div>
        <div className={styles.headerMobile}>
          <div className={styles.logoMobile}>
            <Image src={logoMobile} alt="Logo Mobile" />
            <h1 className={isDarkMode ? styles.containerModalDarkMode : ''}>
              <button
                onClick={() => setShowAside(true)}
                type="button"
                className={isDarkMode ? `${styles.showAside} ${styles.containerModalDarkMode}` : styles.showAside}
              >
                {actualBoards.name}
                <Image src={iconChevronDown} alt="Logo Mobile"/>
              </button>
            </h1>
          </div>
          <ButtonsHeader
            addTask={addTask}
            isDisabled={isDisabled}
            actualBoards={actualBoards}
            isVisible={isVisibleMobile}
            setIsVisible={setIsVisibleMobile}
            textOrImage="image"
          />
        </div>
              {isVisible || isVisibleMobile ? (
                <EditDeleteBox
                  whosEdit="Board"
                  whosDelete="Board"
                  handleClickEdit={showEditBox}
                  handleClickDelete={showDeleteBox}
                />
              ): null}
              {modalDeleteBoard && (
                <ModalDelete
                  boardOrTask={'board'}
                  modalDeleteBoard={modalDeleteBoard}
                  showDeleteBox={showDeleteBox}
                  deleteFunction={deleteBoard}
                >
                  {`Are you sure you want to delete the '${actualBoards.name}' board? This action will remove all columns and tasks and cannot be reversed.`}
                </ModalDelete>
              )}
              {isNewTask && (
                <ModalAddTask
                  titleModal="Add New Task"
                  boardLocal={boardLocal}
                />
              )}
              {showAside && (
                <div>
                  <ModalAsideMobile 
                    isOpen={showAside}
                    setIsOpen={setShowAside}
                  />
                </div>
              )}
    </header>
  )
}
