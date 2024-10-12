import { useEffect, useState } from 'react'
import Menu from './components/Menu'
import './assets/css/input.scss';
import western from './model/sets/western';
import Tile from './components/Tile';
// import { Footer } from './components/Footer';
import { TileType } from './types/tile';
import { defaultSettings, initialStatus, initialStats } from './model/initial-states';
import { isValidClick, resetMove, checkIsFirstClick, reverseClickedTile } from './functions/move-functions';
import { checkIfWon, createTiles, startNewGame, handleWin } from './functions/game-functions';
import { stopTime } from './functions/timer-functions';
import { resetMovesCount } from './functions/stats-functions';

const App = () => {
  // const [theme, setTheme] = useState("western")
  const [status, setStatus] = useState(initialStatus)
  const [settings, setSettings] = useState(defaultSettings)
  const [stats, setStats] = useState(initialStats)

  const [initialTiles, setInitialTiles] = useState<TileType[]>(western)
  const [duplicatedTiles, setDuplicatedTiles] = useState<TileType[]>(initialTiles)
  const [previousClicked, setPreviousClicked] = useState("")
  const [currentClicked, setClicked] = useState("")
  const [clickCount, setClickCount] = useState(0)
  const [isTimerOn, setIsTimerOn] = useState(false)
  const [timeLeft, setTimeLeft] = useState(settings.time)
  const [restartGame, setRestartGame] = useState(false)

  let intervalId: number | undefined = undefined;

  function handleTileClick(id: number) {
    if ( checkIsFirstClick(status, isTimerOn) ) {
      setIsTimerOn(true);
    }
    
    const previousTile = duplicatedTiles.find(tile => tile.tileName === currentClicked);
    const currentTile = duplicatedTiles.find(tile => tile.id === id);    

    if ( !isValidClick(previousTile, currentTile, status) ) {
      console.log("wrong click");
      return;
    }

    if ( checkIfWon(duplicatedTiles) ) {
      stopTime(intervalId, setIsTimerOn);
      setStatus({ ...status, won: true, lost: false });
      return;
    }
    else {
      // continue game

      if (currentTile !== undefined) {
        reverseClickedTile(id, duplicatedTiles, setDuplicatedTiles);
        
        setClicked((prevClicked) => currentTile.tileName);
        setPreviousClicked((prevPrevClicked) => currentClicked);
  
        setClickCount((prevClickCount) => {
          const newClickCount = prevClickCount + 1;
          setStatus({
            ...status,
            movesCount: status.movesCount + 1,
            remainingMoves: status.remainingMoves - 1
          });
  
          if (newClickCount === 2) {
            if (previousTile && currentTile.matchCode === previousTile.matchCode) {
              setTimeout(() => {
                setDuplicatedTiles(
                  duplicatedTiles.map((tile) => {
                    if (tile.matchCode === currentTile.matchCode || tile.matchCode === previousTile.matchCode) {
                      return { ...tile, matched: true, revealed: true };
                    }
                    return tile;
                  })
                );
                resetMove(setClickCount, setPreviousClicked, setClicked);
              }, 500);
            } else if (previousTile && currentTile.matchCode !== previousTile.matchCode) {
              setTimeout(() => {
                setDuplicatedTiles(duplicatedTiles.map(tile => ({
                  ...tile,
                  revealed: tile.id === currentTile.id || tile.id === previousTile.id ? false : tile.revealed,
                })));
                resetMove(setClickCount, setPreviousClicked, setClicked);
              // reverseClickedTile(id);
              }, 500);
            }
          }

          return newClickCount;
        });
      }
    }

  }

  // handle difficulty change
  useEffect(() => {
    startNewGame(initialTiles, settings, setDuplicatedTiles, setStatus, setTimeLeft);
  }, [settings.difficulty]);

  // handle restart game
  useEffect(() => {
    if (restartGame) {
      startNewGame(initialTiles, settings, setDuplicatedTiles, setStatus, setTimeLeft);
    }
  }, [restartGame]);

  // handle click count
  useEffect(() => {
    if (clickCount > 2) {
      resetMove(setClickCount, setPreviousClicked, setClicked)
    }
  }, [clickCount])

  // handle win/lose
  useEffect(() => {
    if ( checkIfWon(duplicatedTiles) ) {
      stopTime(intervalId, setIsTimerOn);
      setStatus({ ...status, won: true, lost: false });
      setStats({ ...stats, won: stats.won + 1 });
      handleWin(setRestartGame);
    }
    else {
      setStatus({ ...status, won: false, lost: true });
      setStats({ ...stats, lost: stats.lost + 1 });
    }
  }, [duplicatedTiles]);

  useEffect(() => {
    if (isTimerOn) {
      const intervalId = setInterval(() => {
        setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
      }, 1000);
  
      return () => clearInterval(intervalId);
    }
  }, [isTimerOn]);
  
  return (
    <>
      <Menu
        stats={stats}
        setStats={setStats}
        status={status}
        settings={settings}
        setSettings={setSettings}
        timeLeft={timeLeft}
        setTimeLeft={setTimeLeft} 
      // setTheme={setTheme} theme={theme} 
      />

      {duplicatedTiles.length > 0 &&
        <div className="tiles" onClick={(e)=>e.preventDefault()}>
          {duplicatedTiles.map((tile) => (
            <Tile
              key={tile.id}
              id={tile.id}
              img={tile.img}
              revealed={tile.revealed}
              matched={tile.matched}
              handleTileClick={handleTileClick}
            />
          ))}
        </div>
      }

      {status.won && !restartGame && <button type="button" onClick={() => setRestartGame(true)}>Play again</button>}
    </>
  )
}

export default App
