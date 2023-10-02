import React from 'react'
import Modal from 'react-modal';
import styles from '../../page.module.css'
import useStore from '@/zustand/store';
import { customStyles } from './customStyles';

export default function ModalDelete({boardOrTask , modalDeleteBoard, showDeleteBox, deleteFunction, children}) {
  const [isDarkMode] = useStore((state) => [state.isDarkMode]);
  
  let custom = customStyles(isDarkMode);
  return (
    <Modal
        isOpen={modalDeleteBoard}
        onRequestClose={showDeleteBox}
        contentLabel="Delete Modal"
        shouldCloseOnOverlayClick={true}
        style={custom}
        ariaHideApp={false}
      >
        <div className={styles.modalDivDelete}>
          <h3 className={styles.titleDelete}>Delete this {boardOrTask}?</h3>
          <p className={styles.txtDelete}>{children}</p>
          <div className={styles.buttonsDelete}>
            <button className={styles.btn} type="button" onClick={deleteFunction}>
              Delete
            </button>
            <button className={` ${styles.btn} ${styles.btnSecondaryLight}`} type="button" onClick={() => showDeleteBox()}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
  )
}
