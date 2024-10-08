import { useEffect, useState } from 'react'
import Menu from './components/Menu'
import './assets/css/input.scss';
import western from './model/sets/western';
import Tile from './components/Tile';
import { Footer } from './components/Footer';
import { TileType } from './types/tile';

const initialGameStatus = {
  won: false,
  movesCount: 0
}

const App = () => {
  const [limit, setLimit] = useState(2)
  // const [theme, setTheme] = useState("western")
  // const [matched, setMatched] = useState(false)
  const [gameStatus, setGameStatus] = useState(initialGameStatus)
  
  const [initialTiles, setInitialTiles] = useState<TileType[]>(western)
  const [duplicatedTiles, setDuplicatedTiles] = useState<TileType[]>([])
  const [previousClicked, setPreviousClicked] = useState("")
  const [currentClicked, setClicked] = useState("")
  const [clickCount, setClickCount] = useState(0)
  const [isMatch, setIsMatch] = useState(false)

  useEffect(() => {
    setInitialTiles(initialTiles.slice(0, limit))

    setDuplicatedTiles([
      ...initialTiles,
      ...initialTiles.map((tile) => ({
        ...tile,
        id: tile.id + 100,
        tileName: `${tile.tileName}_pair`
      }))
    ])
    
    sortTilesRandomly();
  }, [limit, isMatch])

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
    if (clickCount > 2) {
      resetMove()
    }
  }, [clickCount])

  function handleTileClick(id: number) {
    const currentTile = duplicatedTiles.find(tile => tile.id === id);
    const previousTile = duplicatedTiles.find(tile => tile.tileName === currentClicked);
  
    if (!currentTile ||
      (previousTile && currentTile.id === previousTile.id) ||
      duplicatedTiles.every(tile => tile.matched)
    ) return;
  
    setClicked(currentTile.tileName);
    setPreviousClicked(currentClicked);
  
    if (clickCount < 2) {
      reverseClickedTile(id);
      setClickCount(clickCount + 1);
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
      {/* <Menu setLimit={setLimit} setTheme={setTheme} /> */}

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

      {duplicatedTiles.every(tile => tile.matched) && <h1>You win</h1>}

      <br/><br/>
      clickCount: {clickCount} <br/>
      previous: {previousClicked}---
      current: {currentClicked}

      <br/><br/>
      duplicatedTiles.length: {duplicatedTiles.length}<br/>
      duplicatedTiles:<br/>
      {JSON.stringify(duplicatedTiles)}

      {/* <Footer /> */}
    </>
  )
}

export default App
