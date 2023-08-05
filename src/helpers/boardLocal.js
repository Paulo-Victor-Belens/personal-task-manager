"use client";

export const getSavedBoards = (key) => {
  const boardsList = localStorage.getItem(key);
  return boardsList ? JSON.parse(boardsList) : [];
};

export const saveBoards = (key, obj) => {
  // const boardId = {...obj, id: Math.floor(Math.random() * 1000000)}
  const boardsList = getSavedBoards(key);
  const newBoardList = [...boardsList, obj];
  localStorage.setItem(key, JSON.stringify(newBoardList));
};

export const removeBoard = (key, id) => {
  if (!id) throw new Error('Você deve fornecer um ID');
  // localStorage.removeItem(id);
  const boardList = getSavedBoards(key);
  const localizationObject = boardList.map((element) => element.id);
  const indexBoard = localizationObject.indexOf(id);
  boardList.splice(indexBoard, 1);
  localStorage.setItem(key, JSON.stringify(boardList));
};
