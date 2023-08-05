import React, { useState } from 'react'
import ModalTask from '../modals/ModalTask';
import styles from '../../page.module.css';
import useStore from '@/zustand/store';

export default function Task({id, title, subtasks, description, columns}) {
  const [isDarkMode] = useStore((state) => [state.isDarkMode]);
  const [isTaskOpen, setIsTaskOpen] = useState(false);
  const [checkActive, setCheckActive] = useState(0);
  const toggleTask = () => {
    setIsTaskOpen(!isTaskOpen);
  };

  const columnByTask = columns.find((column) => column.tasks
    .find((task) => task.id === id));
  return (
    <div>
      <div onClick={toggleTask} className={isDarkMode ? `${styles.divTask} ${styles.divTaskDarkMode}` : styles.divTask}>
        <h3>{title}</h3>
        <p>{`${checkActive} of ${subtasks[0].name.length !== 0 ? subtasks.length : 0 } subtasks`}</p>
      </div>
        <ModalTask
          openModal={isTaskOpen}
          taskId={id}
          closeModal={toggleTask}
          title={title}
          subtasks={subtasks}
          description={description}
          columns={columnByTask}
          checkActive={checkActive}
          setCheckActive={setCheckActive}
        />
    </div>
  )
}




