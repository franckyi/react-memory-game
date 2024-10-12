import { StatusType } from "../types/status"
import { SettingsType } from "./settings"
import { StatsType } from "./stats"

export type MenuProps = {
    stats: StatsType
    setStats: (stats: StatsType) => void
    status: StatusType
    settings: SettingsType
    setSettings: (settings: SettingsType) => void
    timeLeft: number
    setTimeLeft: (timeLeft: number) => void
    // theme: string
    // setTheme: (theme: string) => void
    // limit: number
    // difficulty: string
    // setLimit: (limit: number) => void
}