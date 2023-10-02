export const customStyles = (isDarkMode) => {
  if (typeof window !== 'undefined') {
    const vw = window.innerWidth;
    let width = 0;
    let top = '50%';
    switch (true) {
      case vw < 500:
        width = '90vw';
        top = '45%';
        break;
      case vw < 700:
        width = '65vw';
        break;
      case vw < 1000:
        width = '50vw';
        break;
      case vw < 1200:
        width = '40vw';
        break;
      default:
        width = '38vw';
        break;
    }
    return {
      overlay: {
        backgroundColor: isDarkMode ? "rgb(0, 0, 0, .8)" : "rgb(250, 250, 250, .7)",
      },
      content: {
        width,
        top,
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: isDarkMode ? "#2B2C37" : "#fff",
        border: isDarkMode ? "none" : "border: 1px solid rgb(204, 204, 204);",
      },
    };
  }

  return {};
};
