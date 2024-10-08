import { GameStatusType } from "../types/gameStatus"
import { SettingsType } from "./settings"

export type MenuProps = {
    gameStatus: GameStatusType
    settings: SettingsType
    setSettings: (settings: SettingsType) => void
    // theme: string
    // setTheme: (theme: string) => void
    // limit: number
    // difficulty: string
    // setLimit: (limit: number) => void
}