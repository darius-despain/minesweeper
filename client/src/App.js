import './App.css';
import {Board} from './components/Board'
import {Context} from "./Context";
import {useContext} from 'react'

function App() {
  const {values, setters} = useContext(Context);

  return (
    <>
      <h1 onClick={() => {window.location.reload()}} className='centered'> Minesweeper! </h1>
      <Board />
      <div className='centered'>
        {values.gameState === 'ongoing' ? <h2>Game running</h2> : <h2>Game ended! You {values.gameState}</h2>}
      </div>
    </>
  );
}

export default App;
