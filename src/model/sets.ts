import { SetType } from "../types/set";

const westernSet = ["cowboy", "cactus", "saloon", "bandit", "bartender", "caravan", "drunk", "indian", "lady", "musicguy", "pianist", "sheriff", "horseshoe", "tower"]
const beachSet = ["ananas", "ball", "bikini", "board", "flower", "ghiacciolo", "glasses", "icecream", "inflatable", "leaf", "oil", "redflower", "shorts", "star"]
const animalsSet = ["cangaroo", "chicken", "dog", "horse", "pig", "panda", "lion", "turtle", "sheep", "crocodile", "duck", "fox", "ghepard", "tucano"]

const western: SetType = westernSet.map((tileName, index = 0) => ({
    id: index + 1,
    matchCode: `#${index}_${tileName}`,
    tileName,
    img: `set/western/${tileName.toLowerCase()}.png`,
    revealed: false,
    matched: false,
}));

const beach: SetType = beachSet.map((tileName, index = 0) => ({
    id: index + 1,
    matchCode: `#${index}_${tileName}`,
    tileName,
    img: `set/beach/${tileName.toLowerCase()}.png`,
    revealed: false,
    matched: false,
}));

const animals: SetType = animalsSet.map((tileName, index = 0) => ({
    id: index + 1,
    matchCode: `#${index}_${tileName}`,
    tileName,
    img: `set/animals/${tileName.toLowerCase()}.png`,
    revealed: false,
    matched: false,
}));

const sets = {
    "western": western,
    "beach": beach,
    "animals": animals,
};

export default sets