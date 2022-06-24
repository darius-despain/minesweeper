// import './App.css';
import {useContext, useState, useEffect} from 'react'
import {Context} from "../Context";

const Square = ({i, j}) => {
  const {values, setters} = useContext(Context);
  const [flag, setFlag] = useState({})

  const clickHandler = (row, column) => {
    if(values.gameState === 'ongoing') {
      console.log(`${row},${column} has been clicked!`)
      if(values.board[row][column] === 'x'){
        console.log(`you've hit a mine! you lose`)
        setters.setGameState('lose');
      } else if(!values.discovered.find(el => (el[0] === i && el[1] === j))){
        console.log(`you're safe`)

        setters.setDiscovered([...values.discovered, [row, column]])
        // console.log(`discovered within clickHandler: `, values.discovered)
        //run countProximity on clicked square
        let boardTemp = [...values.board];
        boardTemp[i][j] = parseInt(countProximity(i, j));
        setters.setBoard(boardTemp);
        // console.log(`board within clickHandler: `, values.board)
      }
    }
  }

  const rightClickHandler = (e) => {
    e.preventDefault();
    console.log(`flag: `, flag)
    if(flag.hasOwnProperty("backgroundColor")) {
      setFlag({});
      console.log(`trying to unset flag on ${i}, ${j}`)
    } else {
      setFlag({"backgroundColor": "red"});
      console.log(`trying to set flag on ${i}, ${j}`)
    }
  }

  const countProximity = (row, column) => {
    let sum = 0;
    for(let i = row-1; i <= row+1; i++){
      for(let j = column-1; j <= column+1; j++){
        if(!(i === row && j === column) && (0 <= i && i <= 9) && (0 <= j && j <= 9) ) {
          if(values.board[i][j] === 'x') sum ++;
        }
      }
    }
    // console.log(`sum: ${sum}`)

    // executes click handler on all squares in proximity that are not clicked if the sum is zero
    if(sum === 0){
      // let newSquares = []
      for(let i = row-1; i <= row+1; i++){
        for(let j = column-1; j <= column+1; j++){
          const isSameCoord = i === row && j === column
          const isNotOnEdge =  (0 <= i && i <= 9) && (0 <= j && j <= 9)
          const isDiscovered = values.discovered.find(el => (el[0] === i && el[1] === j))
          if(!isSameCoord && isNotOnEdge && !isDiscovered) {
            console.log(`trying to run click handler on ${i}, ${j}`) // replace this line with however I uncover the other squares automatically
            // clickHandler(i, j);
          }
        }
      }
    }
    return sum;
  }

  useEffect(() => {
    if(values.discovered.length >= 90) {
    console.log("you've won!")
    setters.setGameState('win');
    }
  }, [values.discovered])

  return (
    <>
      <td  style={flag} onClick={() => clickHandler(i, j)} onContextMenu={rightClickHandler} className='grid-item'>
        { values.discovered.find(el => (el[0] === i && el[1] === j)) ? values.board[i][j] : ' '}
      </td>
    </>
  );
}


export default Square;
