import { GameStatusType } from "../types/gameStatus"
import { SettingsType } from "./settings"
import { StatsType } from "./stats"

export type MenuProps = {
    stats: StatsType
    setStats: (stats: StatsType) => void
    gameStatus: GameStatusType
    settings: SettingsType
    setSettings: (settings: SettingsType) => void
    timeLeft: number
    // theme: string
    // setTheme: (theme: string) => void
    // limit: number
    // difficulty: string
    // setLimit: (limit: number) => void
}