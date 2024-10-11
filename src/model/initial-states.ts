import { GameStatusType } from "../types/gameStatus"

export const initialStats = {
    won: 0,
    lost: 0,
    record: 0
}

export const initialGameStatus: GameStatusType = {
    won: false,
    lost: false,
    movesCount: 0,
    currentRemainingMoves: 20
}
  
export const defaultSettings = {
    limit: 4,
    difficulty: "Easy",
    time: 30,
    remainingMoves: 20
}