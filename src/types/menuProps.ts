import { StatusType } from "./status"
import { SettingsType } from "./settings"
import { StatsType } from "./stats"
import { TileType } from "./tile"

export type MenuProps = {
    stats: StatsType
    setStats: React.Dispatch<React.SetStateAction<StatsType>>
    status: StatusType
    settings: SettingsType
    setSettings: React.Dispatch<React.SetStateAction<SettingsType>>
    timeLeft: number
    setTimeLeft: React.Dispatch<React.SetStateAction<number>>
    theme: string
    setTheme: React.Dispatch<React.SetStateAction<string>>
    setInitialTiles: React.Dispatch<React.SetStateAction<TileType[]>>
}