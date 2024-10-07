export type TileProps = {
    id: number
    // tileName: string
    img: string
    revealed: boolean
    // matched: boolean
    handleTileClick: (id: number) => void
    // setRevealed: (revealed: boolean) => void
    // setMatched: (matched: boolean) => void
}