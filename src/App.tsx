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
  const [previousClicked, setPreviousClicked] = useState<null | TileType>(null)
  const [currentClicked, setClicked] = useState<null | TileType>(null)
  const [clickCount, setClickCount] = useState(0)

  useEffect(() => {
    setInitialTiles(initialTiles.slice(0, limit))

    setDuplicatedTiles([
      ...initialTiles,
      ...initialTiles.map((tile) => ({
        ...tile, // Copy all the properties
        id: tile.id + 100,
        tileName: `${tile.tileName}_pair` // Modify the tileName
      }))
    ])
    
    sortTilesRandomly();
  }, [limit])

  function sortTilesRandomly() {
    duplicatedTiles.sort(() => Math.random() - 0.5);
  }

  function resetMove() {
    console.log("reset");
    setClickCount(0)
    setPreviousClicked(null)
    setClicked(null)
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

  function handleTileClick(id: number) {
    const currentTile = duplicatedTiles.filter( tile => tile.id === id)[0]

    if (clickCount >= 2) {
      // if tiles do not match hide them
      // if (previousClicked !== currentTile.tileName) {
        // remove class from the two tiles
        // duplicatedTiles.map((tile) => {
        //   return { ...tile, revealed: false}
        // })

        // setTimeout(() => {
          // reverseClickedTile(id)
          // reverseClickedTile(previousClicked)
        // }, 1000)
      // }
      
      // else remove them from list

      resetMove()
    } else {
      reverseClickedTile(id)
      
      setClicked(currentTile)
      setPreviousClicked(currentClicked)
      
      setClickCount(clickCount + 1)
    }

  }

  return (
    <>
      {/* <Menu setLimit={setLimit} setTheme={setTheme} /> */}
      <div className="tiles">
      {duplicatedTiles.map((tile) => (
        <Tile
          key={tile.id}
          id={tile.id}
          img={tile.img}
          revealed={tile.revealed}
          handleTileClick={handleTileClick}
        />
      ))}
      </div>

      <br/><br/>
      clickCount: {clickCount}<br/>
      previous: {previousClicked}<br/>
      current: {currentClicked}
      {/* <br/><br/>
      initialTiles.length: {initialTiles.length}<br/>
      initialTiles:<br/>
      {JSON.stringify(initialTiles)} */}

      <br/><br/>
      duplicatedTiles.length: {duplicatedTiles.length}<br/>
      duplicatedTiles:<br/>
      {JSON.stringify(duplicatedTiles)}

      <Footer />
    </>
  )
}

export default App
