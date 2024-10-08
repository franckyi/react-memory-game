import { MenuProps } from "../types/menuProps"

const Menu = ( {gameStatus, settings, setSettings, theme, setTheme} : MenuProps ) => {

    function handleThemeChange(event: React.ChangeEvent<HTMLSelectElement>) {
        event.preventDefault()
        setTheme(event.target.value)
    }

    function handleSettingsChange(event: React.ChangeEvent<HTMLSelectElement>) {
        event.preventDefault()
        setSettings(settings.limit, event.target.value, settings.time)
    }

    return (
        <header className="menu">
            Moves: {gameStatus.movesCount}
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
                <label htmlFor="difficulty">Difficulty</label>
                <select name="difficulty" id="difficulty" onChange={handleSettingsChange}>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </form>
            <span>Difficulty: {settings.difficulty}</span>
        </header>
    )
}

export default Menu