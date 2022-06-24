// import React, {useState} from 'react';

// const Context = React.createContext({});


import React, { useState } from "react";

const Context = React.createContext();

// Use AppProvider at the root of your project to provided to all children
const AppProvider = ({ children }) => {

  // stores discovered square coordinates
  const [discovered, setDiscovered] = useState([])

  //tracks if the game is running or if it's over
  const [gameState, setGameState] = useState('ongoing')

  const [board, setBoard] = useState([])

  const values = {
    discovered,
    gameState,
    board
  }

  const setters = {
    setDiscovered,
    setGameState,
    setBoard
  }

  return (
    <Context.Provider value={{values, setters}}>
      {children}
    </Context.Provider>
  );
};



export { AppProvider, Context };