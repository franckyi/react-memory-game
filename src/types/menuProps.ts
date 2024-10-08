import { GameStatusType } from "../types/gameStatus"
import { SettingsType } from "./settings"

export type MenuProps = {
    gameStatus: GameStatusType
    settings: SettingsType
    theme: string
    setSettings: (limit: number, difficulty: string, time: number) => void
    setTheme: (theme: string) => void
    // limit: number
    // difficulty: string
    // setLimit: (limit: number) => void
}