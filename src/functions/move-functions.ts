import { TileType } from "../types/tile";

export const isValidClick = (
    previousTile: TileType | undefined,
    currentTile: TileType | undefined,
    gameStatus: any) => {
    if (!currentTile || (previousTile && currentTile.id === previousTile.id) || gameStatus.currentRemainingMoves === 0) {
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

export const checkIsFirstMove = (gameStatus: any, isTimerOn: boolean) => {
    if (gameStatus.movesCount === 0 && !isTimerOn) {
      console.log("first move, start timer");
      return true;
    }
    return false;
}

export const resetMove = (
    setClickCount: any,
    setPreviousClicked: any,
    setClicked: any) => {
    setClickCount(0)
    setPreviousClicked("")
    setClicked("")
}
