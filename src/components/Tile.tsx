// import { TileType } from "../types/tile"
import { TileProps } from "../types/tileProps"

const Tile = ( {id, img, revealed, handleTileClick} : TileProps ) => {

    return (
        <div
            className={`tile ${revealed ? "tile--revealed" : ""}`}
            onClick={() => handleTileClick(id)}
        >
            <img
                className={"tile__img"}
                src={img}
                width={90}
                height="auto"
                alt=""
                draggable="false" />
        </div>
    )
}

export default Tile