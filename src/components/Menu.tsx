import sets from "../model/sets"
import { MenuProps } from "../types/menuProps"

const Menu = ( {stats, status, settings, setSettings, timeLeft, setTimeLeft, setTheme, setInitialTiles} : MenuProps ) => {

    function handleDifficultyChange(event: React.ChangeEvent<HTMLSelectElement>) {
        event.preventDefault()
        console.log("event.target.value", event.target.value);
        console.log("settings", settings);
        setSettings({
            ...settings,
            difficulty: event.target.value,
            limit: event.target.value === "easy" ? 4 : event.target.value === "medium" ? 6 : 8,
            time: event.target.value === "easy" ? 45 : event.target.value === "medium" ? 40 : 35,
        })
        setTimeLeft(settings.time)
    }

    function handleThemeChange(event: React.ChangeEvent<HTMLSelectElement>) {
        event.preventDefault()
        setTheme(event.target.value)
        setInitialTiles(event.target.value === "western" ? sets.western : event.target.value === "beach" ? sets.beach : sets.animals);
    }

    return (
        <header className="menu">
            
            <div className="menu__first-row">
                <div>
                    <span>Won: {stats.won} </span>
                    <span>Lost: {stats.lost} </span>
                    <span>Record: {stats.record}</span>
                </div>

                <form action="">
                    <label htmlFor="theme">Theme </label>
                    <select name="theme" id="theme" onChange={handleThemeChange}>
                        <option value="western" defaultChecked>Western</option>
                        <option value="beach">Beach</option>
                        <option value="animals">Animals</option>
                    </select>
                </form>

                <form action="">
                <label htmlFor="difficulty">Difficulty </label>
                <select name="difficulty" id="difficulty" onChange={handleDifficultyChange}>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </form>
            </div>

            <div className="menu__second-row">
                <span>Moves: {status.moves} </span>
                <span>Remaining: {status.remainingMoves} </span>
                <span>Time: {timeLeft}</span>
            </div>

        </header>
    )
}

export default Menu