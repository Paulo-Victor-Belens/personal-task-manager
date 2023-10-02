import React, { useState, useRef, useEffect } from 'react';
import Modal from 'react-modal';
import Image from 'next/image';
import verticalEllipsis from '../../../images/icon-vertical-ellipsis.svg';
import styles from '../../page.module.css';
import useStore from '@/zustand/store';
import EditDeleteBox from './EditDeleteBox';
import ModalDelete from './ModalDelete';
import ModalEditTask from './ModalEditTask';
import { getSavedBoards } from '@/helpers/boardLocal';
import { customStyles } from './customStyles';


export default function ModalTask({ openModal, closeModal, title, description, subtasks, columns, taskId, checkActive, setCheckActive }) {
  const [
    actualBoards,
    modalDeleteTask,
    modalEditTask,
    modalNewBoard,
    updateModalDeleteTask,
    updateModalEditTask,
    isDelete,
    updateIsDelete,
    isDarkMode,
  ] = useStore((state) => [
    state.actualBoards,
    state.modalDeleteTask,
    state.modalEditTask,
    state.modalNewBoard,
    state.updateModalDeleteTask,
    state.updateModalEditTask,
    state.isDelete,
    state.updateIsDelete,
    state.isDarkMode,
  ]);
  const [isVisible, setIsVisible] = useState(false);
  const [tasksStatus, setTasksStatus] = useState([]);
  const [boardLocal, setBoardLocal] = useState([]);
  const [checked, setChecked] = useState([]);
  // const [indiceDaBoardAtual, setIndiceDaBoardAtual] = useState(0);
  // const [indiceDaColunaQContemATask, setIndiceDaColunaQContemATask] = useState(0);
  // const [indiceQContemASub, setIndiceQContemASub] = useState(0);

  const myElementRef = useRef(null);

  // const customStyles = {
  //   content: {
  //     width: '520px',
  //     top: '50%',
  //     left: '50%',
  //     right: 'auto',
  //     bottom: 'auto',
  //     marginRight: '-50%',
  //     transform: 'translate(-50%, -50%)',
  //     transition: 'all 0.4s ease-in-out',
  //     backgroundColor: isDarkMode ? "#2B2C37" : "#fff",
  //   },
  // };

  const custom = customStyles(isDarkMode);
  // useEffect(() => {
  //   const indiceDaBoardAtual = boardLocal.findIndex((board) => board.id === actualBoards.id);
  //   const indiceDaColunaQContemATask = actualBoards.columns.findIndex((column) => column.id === columns.id)
  //   setIndiceDaBoardAtual(indiceDaBoardAtual);
  //   setIndiceDaColunaQContemATask(indiceDaColunaQContemATask);
  //   if(actualBoards.columns[indiceDaColunaQContemATask]){
  //     const indiceQContemASub = actualBoards.columns[indiceDaColunaQContemATask].tasks.findIndex((task) => task.id === taskId)
  //     setIndiceQContemASub(indiceQContemASub);
  //   }
  // }, [actualBoards, columns, subtasks])
  // console.log(actualBoards.id, 'ce9e22d3-f809-4c7c-ab43-ce3e0a63adda');
  // console.log(boardLocal, 'boardLocal');
  // console.log(indiceDaBoardAtual, 'indiceDaBoardAtual');
  // console.log(indiceDaColunaQContemATask, 'indiceDaColunaQContemATask');

  useEffect(() => {
    const boards = getSavedBoards('board');
    if (boards.length !== 0 && boards !== null) {
      try {
        const filtro = subtasks.map((subtask) => subtask.checked)
        setBoardLocal(boards)
        setChecked(filtro)
        setCheckActive(filtro.filter((item) => item === true).length);
      } catch (error) {
        console.error('Erro ao fazer parsing JSON:', error);
      }
    } else {
      setBoardLocal([])
      setChecked(subtasks.map((subtask) => subtask.checked))
    }
  }, [actualBoards, subtasks]);
  
  const handleCheck = (index) => {
    const newChecked = [...checked];
    newChecked[index] = !newChecked[index];
    subtasks.forEach((subtask, i) => {subtask.checked = newChecked[i]})
    setChecked(newChecked);
    setCheckActive(newChecked.filter((item) => item === true).length);
    const indiceDaBoardAtual = boardLocal.findIndex((board) => board.id === actualBoards.id);
    const indiceDaColunaQContemATask = actualBoards.columns.findIndex((column) => column.id === columns.id)
    const indiceQContemASub = actualBoards.columns[indiceDaColunaQContemATask].tasks.findIndex((task) => task.id === taskId)
    actualBoards.columns[indiceDaColunaQContemATask].tasks[indiceQContemASub].subtasks = subtasks;
    boardLocal[indiceDaBoardAtual] = actualBoards;
    // console.log(boardLocal);
    // Salvar no localStorage
    localStorage.removeItem('board');
    localStorage.setItem('board', JSON.stringify(boardLocal));
  }
  const handleClickOutside = (event) => {
    // console.log(myElementRef);
    // console.log(event.target);

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

  const showEditBox = () => {
    updateModalEditTask(!modalEditTask);
  }
  
  const showDeleteBox = () => {
    updateModalDeleteTask(!modalDeleteTask);
  }

  const deleteTask = () => {
    // Task removida
    const newTasks = columns.tasks.filter((column) => column.id !== taskId);
    // achar a coluna que tem a task e atualizar seu valor
    const indiceDaBoardAtual = boardLocal.findIndex((board) => board.id === actualBoards.id);
    const indiceDaColunaQContemATask = actualBoards.columns.findIndex((column) => column.id === columns.id)
    
    actualBoards.columns[indiceDaColunaQContemATask].tasks = newTasks;
    // console.log(actualBoards);
    boardLocal[indiceDaBoardAtual] = actualBoards;
    // console.log(boardLocal);
    // Salvar no localStorage
    localStorage.removeItem('board');
    localStorage.setItem('board', JSON.stringify(boardLocal));
    updateIsDelete(!isDelete);
    showDeleteBox();
    closeModal();
  }

    
  const handleChange = ({ target: { value } }, setState) => {
    setState(value);
    handleCheckInput(value);
  };

  return (
    <Modal
      isOpen={openModal}
      onRequestClose={closeModal}
      contentLabel="Delete Modal"
      shouldCloseOnOverlayClick={true}
      style={custom}
      ariaHideApp={false}
    >
      <div className={isDarkMode ? `${styles.containerModal} ${styles.containerModalDarkMode}` : styles.containerModal}>
        <div className={styles.headerModal}>
          <h3>{title}</h3>
          <button
              onClick={(event) => {
                setIsVisible(!isVisible)
                event.stopPropagation()
              }}
              style={{ padding: '5px' }}
              ref={myElementRef}
            >
              <Image src={verticalEllipsis} alt="Vertical Ellipsis" />
            </button>
        </div>
        <p className={styles.description}>{description}</p>

        <label className={styles.label} htmlFor="">Subtasks ({checkActive} of {subtasks.length})</label>
        <div className={styles.conatinerInputCollumn}>
          {subtasks && subtasks.length !== 0 && subtasks.map(({name}, index) => (
                <>
                {name.length !== 0 && (
                    <label className={isDarkMode ? styles.checkDark : styles.check} htmlFor={name} onChange={() => handleCheck(index)}>
                        <input type="checkbox" checked={ checked[index] } name={name} id={name}/>
                        <span>{name}</span>
                    </label>
                  )}
              </>
          ))}
        </div>

        <label className={styles.label} htmlFor="">Current Status</label>
        <div>
            <select 
              name="" 
              id=""
              value={tasksStatus}
              onChange={(e) => handleChange(e, setTasksStatus)}  
              className={isDarkMode ? `${styles.inputDark} ${styles.select}` : `${styles.input} ${styles.select}`}
            >
              {actualBoards && actualBoards.length !== 0 && actualBoards.columns.map((column, index) => (
                <option
                  key={index}
                  value={column.id}
                >tasks
                  {column.name}
                </option>
              ))}
              
            </select>
        </div>
        {isVisible && (
          <EditDeleteBox
            whosEdit="Task"
            whosDelete="Task"
            handleClickEdit={showEditBox}
            handleClickDelete={showDeleteBox}
          />  
        )}
        <ModalDelete 
          boardOrTask={'task'}
          modalDeleteBoard={modalDeleteTask} 
          showDeleteBox={showDeleteBox}
          deleteFunction={deleteTask}
        >
          {`Are you sure you want to delete the '${title}' task and its subtasks? This action cannot be reversed.`}
        </ModalDelete>
      </div>
      <ModalEditTask 
        openModal={modalEditTask}
        closeModal={updateModalEditTask}
        title="Edit Task"
        columnEdit={columns}
        taskId={taskId} 
        boardLocal={boardLocal}
      />
    </Modal>
  );
}
