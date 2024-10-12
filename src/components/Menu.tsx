import { initialStats } from "../model/initial-states"
import { MenuProps } from "../types/menuProps"

const Menu = ( {stats, setStats, status, settings, setSettings, timeLeft, setTimeLeft
    // theme, setTheme
} : MenuProps ) => {

    function handleDifficultyChange(event: React.ChangeEvent<HTMLSelectElement>) {
        event.preventDefault()
        setSettings({
            ...settings,
            difficulty: event.target.value,
            limit: event.target.value === "easy" ? 4 : event.target.value === "medium" ? 6 : 8,
            time: event.target.value === "easy" ? 60 : event.target.value === "medium" ? 45 : 30,
            remainingMoves: event.target.value === "easy" ? 20 : event.target.value === "medium" ? 18 : 16,
        })
        setTimeLeft(settings.time)
    }

    return (
        <header className="menu">
            <span>Won: {stats.won}</span>
            Moves: {status.movesCount}
            <span>Remaining: {status.remainingMoves}</span>
            <span>Time: {timeLeft}</span>
            {/* <div>
                <span>Current theme: {theme}</span>
            </div>
      
            <form action="">
                <label htmlFor="theme">Change theme</label>
                <select name="theme" id="theme" onChange={handleThemeChange}>
                    <option value="western" defaultChecked>Western</option>
                    <option value="kids">Kids</option>
                    <option value="beach">Beach</option>
                    <option value="random">Random</option>
                </select>
            </form> */}

            <form action="">
                <label htmlFor="difficulty">Difficulty </label>
                <select name="difficulty" id="difficulty" onChange={handleDifficultyChange}>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </form>
        </header>
    )
}

export default Menu