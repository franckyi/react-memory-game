import { initialStatus } from "../model/initial-states";
import { SettingsType } from "../types/settings";
import { StatusType } from "../types/status";
import { TileType } from "../types/tile";
import { resetMovesCount } from "./stats-functions";

export const createTiles = (
    initialTiles: TileType[],
    settings: SettingsType,
    setDuplicatedTiles: React.Dispatch<React.SetStateAction<TileType[]>>
  ) => {
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
        return true
    }
    return false;
}

export const startNewGame = (
    initialTiles: TileType[],
    settings: SettingsType,
    setDuplicatedTiles: React.Dispatch<React.SetStateAction<TileType[]>>,
    setStatus: React.Dispatch<React.SetStateAction<StatusType>>,
    setTimeLeft: React.Dispatch<React.SetStateAction<number>>,
    setTimeUp: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
    console.log("ready to play");

    createTiles(initialTiles, settings, setDuplicatedTiles);
    resetMovesCount(setStatus, initialStatus);
    setTimeLeft(settings.time);
    setStatus(initialStatus);
    setTimeUp(false);
}

