export type MenuProps = {
    theme: string
    limit: number
    difficulty: string
    setLimit: (limit: number) => void
    setTheme: (theme: string) => void
}