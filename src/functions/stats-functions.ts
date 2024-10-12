import { StatusType } from "../types/status";

export const resetMovesCount = (setStatus: any, initialStatus: any) => {
    setStatus({...initialStatus, moves: 0});
}

export const calculateScore = (
    timeLeft: number,
    setStatus: React.Dispatch<React.SetStateAction<StatusType>>,
    status: StatusType
    ) => {
    setStatus({...status, score: timeLeft + status.remainingMoves});
}