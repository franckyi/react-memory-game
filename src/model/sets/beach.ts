const beachSet = ["ananas", "ball", "bikini", "board", "flower", "ghiacciolo", "glasses", "icecream", "inflatable", "leaf", "oil", "redflower", "shorts", "star"]

const beach = beachSet.map((tileName, index = 0) => ({
    id: index + 1,
    matchCode: `#${index}_${tileName}`,
    tileName,
    img: `set/beach/${tileName.toLowerCase()}.png`,
    revealed: false,
    matched: false,
}));

export default beach