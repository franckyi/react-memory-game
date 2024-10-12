const westernSet = ["cowboy", "cactus", "saloon", "bandit", "bartender", "caravan", "drunk", "indian", "lady", "musicguy", "pianist", "sheriff", "shop", "tower"]
const beachSet = ["ananas", "ball", "bikini", "board", "flower", "ghiacciolo", "glasses", "icecream", "inflatable", "leaf", "oil", "redflower", "shorts", "star"]

const western = westernSet.map((tileName, index = 0) => ({
    id: index + 1,
    matchCode: `#${index}_${tileName}`,
    tileName,
    img: `set/western/${tileName.toLowerCase()}.png`,
    revealed: false,
    matched: false,
}));

const beach = beachSet.map((tileName, index = 0) => ({
    id: index + 1,
    matchCode: `#${index}_${tileName}`,
    tileName,
    img: `set/beach/${tileName.toLowerCase()}.png`,
    revealed: false,
    matched: false,
}));

const sets = [western, beach];

export default sets