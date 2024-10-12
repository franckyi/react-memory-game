import { useEffect, useState } from 'react'
import Menu from './components/Menu'
import './assets/css/input.scss';
import western from './model/sets/western';
import Tile from './components/Tile';
// import { Footer } from './components/Footer';
import { TileType } from './types/tile';
import { defaultSettings, initialGameStatus, initialStats } from './model/initial-states';
import { isValidClick, resetMove, checkIsFirstMove, reverseClickedTile } from './functions/move-functions';
import { checkIfWon, createTiles } from './functions/game-functions';
import { stopTime } from './functions/timer-functions';

const App = () => {
  // const [theme, setTheme] = useState("western")
  const [status, setStatus] = useState(initialGameStatus)
  const [settings, setSettings] = useState(defaultSettings)
  const [stats, setStats] = useState(initialStats)

  const [initialTiles, setInitialTiles] = useState<TileType[]>(western)
  const [duplicatedTiles, setDuplicatedTiles] = useState<TileType[]>(initialTiles)
  const [previousClicked, setPreviousClicked] = useState("")
  const [currentClicked, setClicked] = useState("")
  const [clickCount, setClickCount] = useState(0)
  const [isTimerOn, setIsTimerOn] = useState(false)
  const [timeLeft, setTimeLeft] = useState(settings.time)

  let intervalId: number | undefined = undefined;

  function handleTileClick(id: number) {
    const previousTile = duplicatedTiles.find(tile => tile.tileName === currentClicked);
    const currentTile = duplicatedTiles.find(tile => tile.id === id);    
  
    if ( checkIsFirstMove(status, isTimerOn) ) {
      setIsTimerOn(true);
    }

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
            currentRemainingMoves: status.currentRemainingMoves - 1
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
    createTiles(initialTiles, settings, setDuplicatedTiles);
    setStatus({...initialGameStatus, movesCount: 0});
  }, [settings.difficulty]);

  useEffect(() => {
    if ( checkIfWon(duplicatedTiles) ) {
      stopTime(intervalId, setIsTimerOn);
      setStatus({ ...status, won: true, lost: false });
      setStats({ ...stats, won: stats.won + 1 });
    }
    else {
      setStatus({ ...status, won: false, lost: true });
      setStats({ ...stats, lost: stats.lost + 1 });
    }
  }, [duplicatedTiles]);
  

  // useEffect(() => {
    
  // }, [settings.difficulty])

  useEffect(() => {
    if (clickCount > 2) {
      resetMove(setClickCount, setPreviousClicked, setClicked)
    }
  }, [clickCount])

  // useEffect(() => {
  //   if (isTimerOn && timeLeft > 0) {
  //     countTime(intervalId);
  //   }
  //   else if (isTimerOn && timeLeft === 0) {
  //     stopTime();
  //   }
  // }, [isTimerOn, timeLeft,]);
  
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

      {/* TODO: Replace with alert or modal */}
      {/* {status.won? alert("You win") : alert("Try again")} */}
      {/* <h1>won: {status.won? "true" : "false"}</h1> */}

      {/* <Footer /> */}
    </>
  )
}

export default App
