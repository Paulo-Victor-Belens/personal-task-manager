"use client";
import { useEffect, useState } from 'react';
import { getSavedBoards } from '@/helpers/boardLocal';
import incoBoard from '../../images/icon-board.svg';
import Image from 'next/image';
import styles from '../page.module.css';
import useStore from '@/zustand/store';


const Boards = ({id, title}) => {
  const [modalNewBoard, updateActualBoards, actualBoards, isDelete] = useStore((state) => 
  [state.modalNewBoard,
    state.updateActualBoards,
    state.actualBoards,
    state.isDelete,
  ]
  );
  const [isActive, setIsActive] = useState(false);
  const [boardLocal, setBoardLocal] = useState([]);

  useEffect(() => {
    const boards = getSavedBoards('board');
    if (boards.length !== 0 && boards !== null) {
      try {
        setBoardLocal(boards)
        if( id === actualBoards.id) {
          updateActualBoards(boards[0]);
        }
      } catch (error) {
        console.error('Erro ao fazer parsing JSON:', error);
      }
    }
  }, []);
  
  useEffect(() => {
    const boards = getSavedBoards('board');
    if (boards.length !== 0 && boards !== null) {
      try {
        setBoardLocal(boards)
        if( id === actualBoards.id) {
          // const actualBoard = boards.find((obj) => obj.id === id);
          // updateActualBoards(actualBoard);
          setIsActive(true);
        } setIsActive(false);

      } catch (error) {
        console.error('Erro ao fazer parsing JSON:', error);
      }
    } else {
      setBoardLocal([])
    }
  }, [modalNewBoard, isDelete]);


  const active = () => {
    setIsActive(!isActive);
    const actualObj = boardLocal.find((obj) => obj.id === id);
    updateActualBoards(actualObj);
  };

  // console.log(id, 'id que tá chegando');
  // console.log(actualBoards.id, 'id que tá no store');
  // console.log(id === actualBoards.id)

    // console.log(id, 'id que tá chegando');

  return (
    <div
    onClick={ active }
    className={id === actualBoards.id ? styles.boardsActive : styles.boardBtn}>
      <h4>
        <Image 
          src={incoBoard} 
          alt="icon board" 
          width={16} 
          height={16} 
          className={styles.iconBoard} 
        />
        {title}
      </h4>
    </div>
);
};

export default Boards;