import { StatsType } from "../types/stats";
import { StatusType } from "../types/status";
import { TileType } from "../types/tile";

export const resetMovesCount = (
    setStatus: React.Dispatch<React.SetStateAction<StatusType>>,
    initialStatus: StatusType
) => {
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

export const checkIfRecord = (
    stats: StatsType,
    setStats: React.Dispatch<React.SetStateAction<StatsType>>,
    score: number
    ) => {
    if (score > stats.record) {
        setStats({
            ...stats,
            record: score
        });
    }
}