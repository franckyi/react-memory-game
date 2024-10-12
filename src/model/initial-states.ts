import { StatusType } from "../types/status"

export const initialStats = {
    won: 0,
    lost: 0,
    record: 0
}

export const initialStatus: StatusType = {
    won: false,
    lost: false,
    moves: 0,
    remainingMoves: 20
}
  
export const defaultSettings = {
    limit: 4,
    difficulty: "Easy",
    time: 60,
    remainingMoves: 20
}