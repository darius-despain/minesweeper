import {useContext, useEffect} from 'react'
import './Board.css';
import Square from './Square'
import {Context} from "../Context";

const emptySquare = 0;
const mine = 'x';

const generateBoard = mines => {
  let board = [];

  for(let i = 0; i < 10; i++){
    board.push([]);
    for(let j = 0; j < 10; j++) {
      if(mines.find(el => (el[0] === i && el[1] === j))) {
        board[i][j] = mine;
      } else {
        board[i][j] = emptySquare;
      }
    }
  }
//  console.log(`board after generate: `, board)
 return board;
}

const generateMines = totalMines => {
  let mines = [];
 do {
   let a = Math.floor(Math.random() * 9);
   let b = Math.floor(Math.random() * 9)
   if(!mines.find(el => (el[0] === a && el[1] === b))) {
     mines.push([a, b]);
   }
 }while(mines.length < 10);
  console.log(`mines: `, mines)
  return mines;
}

const Board = () => {
  const {values, setters} = useContext(Context);

  useEffect(() => {
    setters.setBoard(generateBoard(generateMines(10)))
  }, []);

  return (
    <div className='centered' >
      <table className='grid-container'>
        <tbody data-testid="board">
          {values.board.map((row, i) => {
            return (
              <tr key={i}>
                {row.map((square, j) => {
                  return (
                    <Square i={i} j={j} key={`${i},${j}`} />
                    // <td key={`${i},${j}`} onClick={() => {console.log(`${i},${j} has been clicked!`)}} className='grid-item'>{square}</td>
                  )
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )
}

export {Board, generateBoard, generateMines};