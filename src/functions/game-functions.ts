import { SettingsType } from "../types/settings";
import { TileType } from "../types/tile";

export const createTiles = (
    initialTiles: TileType[],
    settings: SettingsType,
    setDuplicatedTiles: React.Dispatch<React.SetStateAction<TileType[]>>
  ) => {
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
}

export const checkIfWon = (tiles: TileType[]) => {
    if (tiles.every(tile => tile.matched)) {
        console.log("won");
        return true
    }
    return false;
}
