"use client";
import styles from '../page.module.css';
import { useEffect, useState } from 'react';
import { getSavedBoards } from '@/helpers/boardLocal';
import Boards from './BoardFile';
import incoBoard from '../../images/icon-board.svg';
import Image from 'next/image';
import useStore from '@/zustand/store';

const AsideBoards = () => {
  const [modalNewBoard, isDelete ,updateModalNewBoard] = useStore((state) => [
    state.modalNewBoard, state.isDelete ,state.updateModalNewBoard
  ]);
  const [boardLocal, setBoardLocal] = useState([]);

  useEffect(() => {
    const boards = getSavedBoards('board');
    if (boards.length !== 0 && boards !== null) {
      try {
        setBoardLocal(boards)
      } catch (error) {
        console.error('Erro ao fazer parsing JSON:', error);
      }
    } else {
      setBoardLocal([])
    }
  }, [modalNewBoard, isDelete]);

  return (
  <>
    <div className={styles.asideBoards}>
      <div className={styles.boards}>
        {boardLocal && boardLocal.map((board) =>  (
            <Boards 
              key={board.name}
              title={board.name}
              id={board.id}
            />
          ))}
        
      </div>
      <button
        className={styles.btnCreateBoard}
        onClick={() => updateModalNewBoard(!modalNewBoard)}
      >
        <Image 
          src={incoBoard} 
          alt="icon board" 
          width={16} height={16} 
          className={styles.iconBoard} 
        />
        + Create New Board
      </button>
    </div>
  </>
  )
};

export default AsideBoards;