import { useEffect, useState } from 'react'
import Menu from './components/Menu'
import './assets/css/input.scss';
import western from './model/sets/western';
import Tile from './components/Tile';
import { Footer } from './components/Footer';
import { TileType } from './types/tile';

// const initialGameStatus = {
//   won: false,
//   lost: false,
//   currentTile: ""
// }

// const initialMoveStatus = {
//   previousClicked: "",
//   currentClicked: "",
// }

const App = () => {
  const [limit, setLimit] = useState(2)
  // const [theme, setTheme] = useState("western")
  // const [matched, setMatched] = useState(false)
  // const [gameStatus, setGameStatus] = useState(initialGameStatus)
  
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
    console.log("reset");
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
    const currentTile = duplicatedTiles.filter( tile => tile.id === id)[0]
    const previousTile = duplicatedTiles.filter( tile => tile.tileName === currentClicked)[0]

    if (!currentTile || (previousTile && currentTile.id === previousTile.id)) return;
    
    setClicked(currentTile.tileName)
    setPreviousClicked(currentClicked)

    if (clickCount < 2) {
      reverseClickedTile(id)
      setClickCount(clickCount + 1)
    }
    
    else if (currentTile.matchCode !== previousTile.matchCode) {
      
      setTimeout(() => {
        setDuplicatedTiles(duplicatedTiles.map((tile) => {
          return { ...tile, revealed: false };
        }));
        resetMove();
        setIsMatch(false);
      }, 1000);

      resetMove()
      setIsMatch(false)
      console.log(previousTile.matchCode, currentTile.matchCode);
    }

    else if (currentTile.matchCode === previousTile.matchCode) {

      setDuplicatedTiles(duplicatedTiles.filter(tile => tile.matchCode !== currentTile.matchCode));

      resetMove()
      setIsMatch(true)
      console.log(previousTile.matchCode, currentTile.matchCode);
    }

  }

  return (
    <>
      {/* <Menu setLimit={setLimit} setTheme={setTheme} /> */}
      <div className="tiles">
      {duplicatedTiles.map((tile) => (
        !tile.matched &&
        <Tile
          key={tile.id}
          id={tile.id}
          img={tile.img}
          revealed={tile.revealed}
          handleTileClick={handleTileClick}
        />
      ))}
      </div>

      <br/>
      <h1>{isMatch ? "match" : "no match"}</h1>
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
