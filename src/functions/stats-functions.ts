import { StatusType } from "../types/status";
import { TileType } from "../types/tile";

export const resetMovesCount = (setStatus: any, initialStatus: any) => {
    setStatus({...initialStatus, moves: 0});
}

export const calculateScore = (
    timeLeft: number,
    setStatus: React.Dispatch<React.SetStateAction<StatusType>>,
    status: StatusType,
    duplicatedTiles: TileType[]
    ) => {
    const matchedTiles = duplicatedTiles.filter(tile => tile.matched);
    setStatus({...status, score: timeLeft + matchedTiles.length / 2});
}