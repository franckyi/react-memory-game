import { MenuProps } from "../types/menuProps"

const Menu = ( {theme, limit, difficulty, setLimit, setTheme} : MenuProps ) => {

    function handleThemeChange(event: React.ChangeEvent<HTMLSelectElement>) {
        event.preventDefault()
        setTheme(event.target.value)
    }

    return (
        <header className="menu">
            <div>
                <span>Current theme: {theme}</span>
                <span>Difficulty: {difficulty}</span>
            </div>
      
            <form action="">
                <label htmlFor="theme">Change theme</label>
                <select name="theme" id="theme" onChange={handleThemeChange}>
                    <option value="western" defaultChecked>Western</option>
                    <option value="kids">Kids</option>
                    <option value="beach">Beach</option>
                    <option value="random">Random</option>
                </select>
            </form>

            <form action="">
                <label htmlFor="difficulty">Difficulty</label>
                <select name="difficulty" id="difficulty">
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </form>
        </header>
    )
}

export default Menu