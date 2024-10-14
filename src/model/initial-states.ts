import { SettingsType } from "../types/settings"
import { StatsType } from "../types/stats"
import { StatusType } from "../types/status"

export const initialStats: StatsType = {
    won: 0,
    lost: 0,
    record: 0
}


export const defaultSettings: SettingsType = {
    limit: 4,
    difficulty: "Easy",
    time: 45,
    remainingMoves: 24
}

export const initialStatus: StatusType = {
    won: false,
    lost: false,
    moves: 0,
    remainingMoves: defaultSettings.remainingMoves,
    score: 0
}