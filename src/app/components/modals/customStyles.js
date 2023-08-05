export const customStyles = (isDarkMode) => {
  return {
    overlay: {
      backgroundColor: isDarkMode ? "rgb(0, 0, 0, .8)" : "rgb(250, 250, 250, .7)",
    },
    content: {
      width: '38vw', 
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: isDarkMode ? "#2B2C37" : "#fff",
      border: isDarkMode ? "none" : "border: 1px solid rgb(204, 204, 204);",
    },
  }
};