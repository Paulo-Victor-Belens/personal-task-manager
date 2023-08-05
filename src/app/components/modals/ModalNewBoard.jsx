/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import useStore from '@/zustand/store';
import styles from '../../page.module.css';
import InputColumn from './InputColumn';
import { getSavedBoards, saveBoards } from '@/helpers/boardLocal';
import { v4 as uuidv4 } from 'uuid';
import { customStyles } from './customStyles';

function ModalNewBoard({ titleModal, handleClick }) {
  const [modalNewBoard, updateModalNewBoard, isDarkMode] = useStore((state) => 
  [state.modalNewBoard, state.updateModalNewBoard, state.isDarkMode]
  );

  const objInitial = {name: '', id: uuidv4()}; 
  const [columns, setColumns] = useState([objInitial]);
  const [boardName, setBoardName] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [id, setId] = useState(uuidv4()); 
  
  useEffect(() => {
    const boards = getSavedBoards('board');
    if (boards.length !== 0 && boards !== null) {
      try {
        setId(uuidv4()); 
      } catch (error) {
        console.error('Erro ao fazer parsing JSON:', error);
      }
    }
  }, []);
  

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };


  function fecharModal() {
    updateModalNewBoard(false);
  }
  
  const handleAddInput = (e) => {
    const newColumn = { name: e.target.value, id: uuidv4() };
    setColumns([...columns, newColumn]);
  };
  
  const handleCheckInput = (value) => {
    if (value.length > 1 && value !== undefined) {
      setIsDisabled(false);
    } 
  };
  
  const handleInputChange = (index, value) => {
    const newInputs = [...columns];
    const obj = newInputs.find((_col, i) => i === index)
    obj.name = value;
    obj.backgroundColor = getRandomColor();
    setColumns(newInputs);
  };
  
  const handleRemoveInput = (index) => {
    const newInputs = [...columns];
    const newInput = newInputs.filter((_col, i) => i !== index)
    setColumns(newInput);
  };
  
  const handleChange = ({ target: { value } }, setState) => {
    setState(value);
    handleCheckInput(value);
  };



  const saveBoard = () => {
    if (boardName.length > 1) {
      setIsDisabled(false);
      const columnsNotEmpty = columns.filter((col) => col.name !== "");
      saveBoards("board", {
        id,
        name: boardName, 
        columns: columnsNotEmpty,
      });
      fecharModal();
    } else {
      setIsDisabled(true);
    }
    
  };
  const custom = customStyles(isDarkMode);
  return (
    <div>
      <Modal
        isOpen={modalNewBoard}
        onRequestClose={fecharModal}
        contentLabel="Modal de exemplo"
        shouldCloseOnOverlayClick={true}
        style={custom}
        ariaHideApp={false}
      >
        <div className={isDarkMode ? `${styles.containerModal} ${styles.containerModalDarkMode}` : styles.containerModal}>
          <div>
            <h3>{titleModal}</h3>
          </div>
          <form className={styles.formAdd}>
            <label>Name</label>
            <div>
              <input 
                className={isDarkMode ? styles.inputDark : styles.input} 
                type="text" 
                placeholder="e.g. Web Design" 
                value={boardName}
                onChange={(e) => handleChange(e, setBoardName)}
                autoFocus
              />
            </div>
            { isDisabled && <p className={styles.error}>Please enter a name</p>}
            {columns.length !== 0 && (
              <label>Columns</label>
            )}
          
          <div className={styles.conatinerInputCollumn}>
            {columns && columns.map((inputValue, index) => (
              <InputColumn 
                key={index}
                index={index}
                inputValue={inputValue.name}
                handleInputChange={handleInputChange}
                handleRemoveInput={handleRemoveInput}
                isDarkMode={isDarkMode}
              />
            ))}
          </div>
            
            <button 
              className={isDarkMode ? ` ${styles.btn} ${styles.btnSecondaryLight} ${styles.btnDarkMode}` : ` ${styles.btn} ${styles.btnSecondaryLight}`}  
              onClick={handleAddInput}
              type='button'
            >
              + add new column
            </button>
            
            <button
              type="button"
              onClick={saveBoard}
              className={` ${styles.btn} ${styles.btnPrimaryLight}`}
            >
              create new board
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default ModalNewBoard;
