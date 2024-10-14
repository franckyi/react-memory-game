import { StatusType } from "../types/status";
import { TileType } from "../types/tile";

export const isValidClick = (
    previousTile: TileType | undefined,
    currentTile: TileType | undefined,
    status: StatusType
    ) => {
    if (!currentTile ||
      (previousTile && currentTile.id === previousTile.id) ||
      status.remainingMoves === 0 ||
      previousTile && previousTile.matched && currentTile.matched ||
      currentTile && currentTile.matched
    ) {
      return false;
    }

    return true;
}

export const reverseClickedTile = (
    id: number,
    duplicatedTiles: TileType[],
    setDuplicatedTiles: React.Dispatch<React.SetStateAction<TileType[]>>
    ) => {
    setDuplicatedTiles(
      duplicatedTiles.map((tile) => {
        if (tile.id === id) {
          return { ...tile, revealed: !tile.revealed };
        }
        return tile;
      })
    );
}

export const checkIsFirstClick = (status: StatusType, isTimerOn: boolean) => {
    if (status.moves === 0 && !isTimerOn) {
      console.log("first move, start timer");
      return true;
    }
    return false;
}

export const resetMove = (
    setClickCount: React.Dispatch<React.SetStateAction<number>>,
    setPreviousClicked: React.Dispatch<React.SetStateAction<string>>,
    setClicked: React.Dispatch<React.SetStateAction<string>>) => {
    setClickCount(0)
    setPreviousClicked("")
    setClicked("")
}
