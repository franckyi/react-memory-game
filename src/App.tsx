import { useEffect, useState } from 'react'
import Menu from './components/Menu'
import './assets/css/input.scss';
import Tile from './components/Tile';
import { TileType } from './types/tile';
import { defaultSettings, initialStatus, initialStats } from './model/initial-states';
import { isValidClick, resetMove, checkIsFirstClick, reverseClickedTile } from './functions/move-functions';
import { checkIfWon, startNewGame } from './functions/game-functions';
import { stopTime } from './functions/timer-functions';
import { calculateScore, checkIfRecord } from './functions/stats-functions';
import sets from './model/sets';

const App = () => {
  const [theme, setTheme] = useState<string>("western")
  const [status, setStatus] = useState(initialStatus)
  const [settings, setSettings] = useState(defaultSettings)
  const [stats, setStats] = useState(initialStats)

  const [initialTiles, setInitialTiles] = useState<TileType[]>(sets.western)
  const [duplicatedTiles, setDuplicatedTiles] = useState<TileType[]>(initialTiles)
  const [, setPreviousClicked] = useState("")
  const [currentClicked, setClicked] = useState("")
  const [clickCount, setClickCount] = useState(0)
  const [isTimerOn, setIsTimerOn] = useState(false)
  const [timeLeft, setTimeLeft] = useState(settings.time)

  const intervalId: number | undefined = undefined;

  function handleTileClick(id: number) {
    if (clickCount >= 2) {
      return;
    }

    if ( checkIsFirstClick(status, isTimerOn) ) {
      setIsTimerOn(true);
    }
    
    const previousTile = duplicatedTiles.find(tile => tile.tileName === currentClicked);
    const currentTile = duplicatedTiles.find(tile => tile.id === id);    

    if ( !isValidClick(previousTile, currentTile, status) ) {
      console.log("not allowed click");
      return;
    }

    if ( checkIfWon(duplicatedTiles) ) {
      stopTime(intervalId, setIsTimerOn);
      setStatus({ ...status, won: true, lost: false });
      calculateScore(timeLeft, setStatus, status, duplicatedTiles);
      return;
    }
    else {
      if (currentTile !== undefined) {
        reverseClickedTile(id, duplicatedTiles, setDuplicatedTiles);
        
        setClicked(() => currentTile.tileName);
        setPreviousClicked(() => currentClicked);
  
        setClickCount((prevClickCount) => {
          const newClickCount = prevClickCount + 1;
          setStatus({
            ...status,
            moves: status.moves + 1,
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
              }, 1000);
            }
          }

          return newClickCount;
        });
      }
    }

  }

  // handle difficulty and theme change
  useEffect(() => {
    startNewGame(setClickCount, initialTiles, settings, setDuplicatedTiles, setStatus, setTimeLeft);
  }, [theme, initialTiles, settings, stats.won, stats.lost]);

  // handle click count
  useEffect(() => {
    if (clickCount > 2) {
      resetMove(setClickCount, setPreviousClicked, setClicked)
    }
  }, [clickCount])

  useEffect(() => {
    if (stats.won) {
      alert(`Congrats 🎉 You did it!\nYour score is: ${status.score}`);
    }
  }, [stats.won])

  useEffect(() => {
    if (stats.lost) {
      alert(`You lose. Try again 🧐\n`);
    }
  }, [stats.lost])
  
  // handle win
  useEffect(() => {
    if ( checkIfWon(duplicatedTiles) ) {
      stopTime(intervalId, setIsTimerOn);
      calculateScore(timeLeft, setStatus, status, duplicatedTiles);

      setStats({
        ...stats,
        won: stats.won + 1,
      });
    }
  }, [duplicatedTiles, intervalId, stats, status, timeLeft]);


  // handle record
  useEffect(() => {
    checkIfRecord(stats, setStats, status.score);
  }, [status.score, stats])

  // handle lose
  useEffect(() => {
    if (status.remainingMoves === 0 || timeLeft === 0) {
      stopTime(intervalId, setIsTimerOn);

      if ( !checkIfWon(duplicatedTiles) ) {
        setStatus({ ...status, lost: true, won: false });
        setStats({
          ...stats,
          lost: stats.lost + 1
        })
      }

      setTimeout(() => {
        startNewGame(setClickCount, initialTiles, settings, setDuplicatedTiles, setStatus, setTimeLeft);
      }, 2000);
    }

  }, [status.remainingMoves, timeLeft, duplicatedTiles, initialTiles, intervalId]);

  // handle timer
  useEffect(() => {
    if (isTimerOn) {
      const intervalId = setInterval(() => {
        if (timeLeft > 0) {
          setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
        } else {
          stopTime(intervalId, setIsTimerOn);
        }
      }, 1000);
  
      return () => clearInterval(intervalId);
    }
  }, [isTimerOn, timeLeft]);
  
  return (
    <>
      <Menu
        stats={stats}
        status={status}
        settings={settings}
        setSettings={setSettings}
        timeLeft={timeLeft}
        setTimeLeft={setTimeLeft} 
        setTheme={setTheme}
        setInitialTiles={setInitialTiles}
      />

      {duplicatedTiles.length > 0 &&
        <main>
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
        </main>
      }
    </>
  )
}

export default App
