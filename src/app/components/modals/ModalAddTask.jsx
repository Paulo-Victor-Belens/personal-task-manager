/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState } from 'react';
import Modal from 'react-modal';
import useStore from '@/zustand/store';
import InputColumn from './InputColumn';
import styles from '../../page.module.css';
import { v4 as uuidv4 } from 'uuid';
import { customStyles } from './customStyles';


function ModalAddTask({ titleModal, boardLocal }) {

  const [isNewTask, 
    actualBoards, 
    updateIsNewTask, 
    updateActualBoards,
    isDarkMode,
  ] = useStore((state) => 
  [ state.isNewTask, 
    state.actualBoards,
    state.updateIsNewTask, 
    state.updateActualBoards,
    state.isDarkMode,
  ]
    );

  const custom = customStyles(isDarkMode);

  const [taskTitle, setTaskTitle] = useState('');
  const [tasksDescription, setTasksdescription] = useState('');
  const [tasksStatus, setTasksStatus] = useState(actualBoards.columns[0].id);
  const [subTasks, setSubTasks] = useState([{ name: '', checked: false }]);

  const handleAddInput = (e) => {
    setSubTasks([...subTasks, { name: e.target.value, checked: false }]);
  };
  
  const handleCheckInput = (value) => {
    if (value.length > 1 && value !== undefined) {
    } 
  };
  
  const handleInputChange = (index, value) => {
    const newInputs = [...subTasks];
    const obj = newInputs.find((_col, i) => i === index)
    obj.name = value;
    setSubTasks(newInputs);
  };
  
  const handleRemoveInput = (index) => {
    const newInputs = [...subTasks];
    const newInput = newInputs.filter((_col, i) => i !== index);
    setSubTasks(newInput);
  };
  
  const handleChange = ({ target: { value } }, setState) => {
    setState(value);
    handleCheckInput(value);
  };

  const saveTask = () => {
    actualBoards.columns.map((column) => {
      if (column.tasks === undefined) {
        column.tasks = [];
      }
    });

    const colunmByName = actualBoards.columns.filter((column) => column.id === tasksStatus);

    const tasks = {
      id: uuidv4(),
      title: taskTitle,
      description: tasksDescription,
      subtasks: subTasks,
      status: colunmByName[0].name,
    };

    const columns2 = {...colunmByName[0], tasks: [...colunmByName[0].tasks, tasks]};
  
    const actualColumns = actualBoards.columns.map((column) => {
      if (column.id === tasksStatus) {
        return columns2;
      }
      return column;
    });
  
    const actualBoardUpdate = {
      ...actualBoards, 
      columns: actualColumns,
    };

    // Atualize o array "boardLocal" com o "actualBoardUpdate"
    const updatedBoardLocal = boardLocal.map((board) => {
      console.log(board.id, actualBoards.id);
      if (board.id === actualBoards.id) {
        return actualBoardUpdate;
      }
      return board;
    });

    localStorage.removeItem('board');
    localStorage.setItem('board', JSON.stringify(updatedBoardLocal));
    updateActualBoards(actualBoardUpdate);
    updateIsNewTask(false);
  };
  console.log(subTasks)
  return (
    <div>
      <Modal
        isOpen={isNewTask}
        onRequestClose={() => updateIsNewTask(false)}
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
            <label className={styles.label}>Title</label>
            <div>
              <input 
                className={isDarkMode ? styles.inputDark : styles.input}
                type="text" 
                placeholder="e.g. Take coffee break" 
                value={taskTitle}
                onChange={(e) => handleChange(e, setTaskTitle)}
              />
            </div>
            <label className={styles.label} htmlFor="desc">Description</label>
            <div>
              <textarea 
                name="description"
                className={isDarkMode ? `${styles.inputDark} ${styles.textarea}` : `${styles.input} ${styles.textarea}`} 
                id="desc" 
                maxLength={100}
                placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
                value={tasksDescription}
                onChange={(e) => handleChange(e, setTasksdescription)}  
              />
            </div>
            <label className={styles.label} >Subtaks</label>

            <div className={styles.conatinerInputCollumn}>
              {subTasks && subTasks.map((inputValue, index) => (
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
              + add new subtask
            </button>


            <label className={styles.label} htmlFor="">Status</label>
            <div>
              <select 
                name="" 
                id=""
                value={tasksStatus}
                onChange={(e) => handleChange(e, setTasksStatus)}  
                className={isDarkMode ? `${styles.inputDark} ${styles.select}` : `${styles.input} ${styles.select}`}
              >
                {actualBoards.columns.map((column, index) => (
                  <option
                    key={index}
                    value={column.id}
                  >
                    {column.name}
                  </option>
                ))}
                
              </select>
            </div>
            <button
              type="button"
              onClick={saveTask}
              className={` ${styles.btn} ${styles.btnPrimaryLight}`}
              disabled={taskTitle === ''}
            >
              Create Task
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default ModalAddTask;
