import { useEffect, useState } from 'react'
import Menu from './components/Menu'
import './assets/css/input.scss';
import western from './model/sets/western';
import Tile from './components/Tile';
// import { Footer } from './components/Footer';
import { TileType } from './types/tile';
import { GameStatusType } from './types/gameStatus';
// import { SettingsType } from './types/settings';

const initialGameStatus: GameStatusType = {
  won: false,
  movesCount: 0,
  currentRemainingMoves: 20
}

const defaultSettings = {
  limit: 4,
  difficulty: "Easy",
  time: 30,
  remainingMoves: 20
}

const App = () => {
  // const [limit, setLimit] = useState(defaultSettings.limit)
  // const [theme, setTheme] = useState("western")
  const [gameStatus, setGameStatus] = useState(initialGameStatus)
  const [settings, setSettings] = useState(defaultSettings)
  
  const [initialTiles, setInitialTiles] = useState<TileType[]>(western)
  const [duplicatedTiles, setDuplicatedTiles] = useState<TileType[]>(initialTiles)
  const [previousClicked, setPreviousClicked] = useState("")
  const [currentClicked, setClicked] = useState("")
  const [clickCount, setClickCount] = useState(0)

  useEffect(() => {
    console.log('difficulty changed:', settings);
    const limitedTiles = initialTiles.slice(0, settings.limit);
  
    const duplicated = [
      ...limitedTiles,
      ...limitedTiles.map((tile) => ({
        ...tile,
        id: tile.id + 100,
        tileName: `${tile.tileName}_pair`
      }))
    ];
  
    const shuffledTiles = duplicated.sort(() => Math.random() - 0.5);
  
    setDuplicatedTiles(shuffledTiles);
  }, [settings.limit, settings.difficulty]);

  function sortTilesRandomly() {
    duplicatedTiles.sort(() => Math.random() - 0.5);
  }

  function reverseClickedTile(id: number) {
    setDuplicatedTiles(
      duplicatedTiles.map((tile) => {
        if (tile.id === id) {
          return { ...tile, revealed: !tile.revealed };
        }
        return tile;
      })
    );
  }

  function resetMove() {
    setClickCount(0)
    setPreviousClicked("")
    setClicked("")
  }

  useEffect(() => {
    setGameStatus({...initialGameStatus, movesCount: 0});
  }, [settings.difficulty])

  useEffect(() => {
    if (clickCount > 2) {
      resetMove()
    }
  }, [clickCount])

  function startTimer() {
    // useEffect(() => {
      setTimeout(() => {
        setSettings({
          ...settings,
          time: settings.time - 1
        })
      }, 1000)
    // }, []);
  }

  function handleTileClick(id: number) {
    const currentTile = duplicatedTiles.find(tile => tile.id === id);
    const previousTile = duplicatedTiles.find(tile => tile.tileName === currentClicked);
  
    if (clickCount === 0) {
      startTimer();
    }

    if (!currentTile ||
      (previousTile && currentTile.id === previousTile.id) ||
      gameStatus.currentRemainingMoves === 0
    ) return;

    if (duplicatedTiles.every(tile => tile.matched)) {
      setGameStatus({ ...gameStatus, won: true });
      return;
    }
  
    setClicked(currentTile.tileName);
    setPreviousClicked(currentClicked);
  
    if (clickCount < 2) {
      reverseClickedTile(id);
      setClickCount(clickCount + 1);
      setGameStatus({
        ...gameStatus,
        movesCount: gameStatus.movesCount + 1,
        currentRemainingMoves: gameStatus.currentRemainingMoves - 1
      })
    }
  
    if (clickCount === 1) {

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
          resetMove();
        }, 500);
      }
      
      else if (previousTile && currentTile.matchCode !== previousTile.matchCode) {
        setTimeout(() => {
          setDuplicatedTiles(duplicatedTiles.map(tile => ({
            ...tile,
            revealed: tile.id === currentTile.id || tile.id === previousTile.id ? false : tile.revealed,
          })));
          resetMove();
        }, 500);
      }

    }

  }

  useEffect(() => {
    if (duplicatedTiles.length === 0) {
      setGameStatus((prevStatus) => ({
        ...prevStatus,
        won: true
      }));
    }
  }, [duplicatedTiles]);
  
  return (
    <>
      <Menu gameStatus={gameStatus} settings={settings} setSettings={setSettings} 
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
      {duplicatedTiles.every(tile => tile.matched) && <h1>You win</h1>}

      {/* <Footer /> */}
    </>
  )
}

export default App
