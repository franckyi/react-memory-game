const westernSet = ["cowboy", "cactus", "saloon", "bandit", "bartender", "caravan", "drunk", "indian", "lady", "musicguy", "pianist", "sheriff", "shop", "tower"]

const western = westernSet.map((tileName, index = 0) => ({
    id: index + 1,
    tileName,
    img: `set/western/${tileName.toLowerCase()}.png`,
    revealed: false,
    matched: false,
}));

export default western