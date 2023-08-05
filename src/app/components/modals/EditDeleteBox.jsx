import React from 'react'
import styles from '../../page.module.css'
import useStore from '@/zustand/store'
// Este componente vai servir tanto para editar/deletar o board quanto para editar/deletar as tasks

export default function EditDeleteBox({
  whosEdit,
  whosDelete,
  handleClickEdit,
  handleClickDelete
}) {
  const [isDarkMode] = useStore((state) => [state.isDarkMode])
  return (
    // o estilo aqui é só para poder ver o elemento na tela. Fique a vontade para mudar, caso queira.
    <div className={isDarkMode ? `${styles.editDeleteBox} ${styles.editDeleteBoxDarkMode} ` : styles.editDeleteBox}>
      <button onClick={handleClickEdit}>
        {`Edit ${whosEdit}`}
      </button>
      <button onClick={handleClickDelete}>
        {`Delete ${whosDelete}`}
      </button>
    </div>
  )
}
