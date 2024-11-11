import { useDebugMode } from '../helpers/globalFlags';
import { Grid } from './Grid';
import { Sand } from './Sand';

/** 
 * - `0` means only the center tile (a 1x1 grid)
 * - `1` means the center tile plus 8 surrounding tiles (a 3x3 grid)
 * - `2` means everything in `1` plus an additional ring of 16 surrounding tiles (a 5x5 grid)
 * - etc
*/
const numberOfTileRingsAroundCenter = 3;
const tileSize = 1000;
const radiusOfMiddleTile = tileSize / 2;
const numberOfTilesToAllowBeyondCenter = 1;

export const boundaryDistance = radiusOfMiddleTile + numberOfTilesToAllowBeyondCenter * tileSize;
export function isOutOfBounds(coordValue: number) {
  return coordValue < -boundaryDistance || boundaryDistance < coordValue;
}

function generateTileCoordinates({ numberOfTileRingsAroundCenter }: {
  numberOfTileRingsAroundCenter: number;
}) {
  const tilesPerSide = 2 * numberOfTileRingsAroundCenter + 1;
  const startingOffset = (tilesPerSide - 1) / 2;
  const coordinates: Array<{ x: number; z: number; }> = [];
  for (let col = 0; col < tilesPerSide; col++) {
    for (let row = 0; row < tilesPerSide; row++) {
      const x = tileSize * (col - startingOffset);
      const z = tileSize * (row - startingOffset);
      coordinates.push({x, z});
    }
  }
  return coordinates;
}

const tileCoordinates = generateTileCoordinates({ numberOfTileRingsAroundCenter });

export function Ground() {
  const { isDebugMode } = useDebugMode();

  return (
    <>
      {isDebugMode && <Grid />}
      {tileCoordinates.map((coords, index) => (
        <Sand key={index} position={[coords.x, 0, coords.z]} />
      ))}
    </>
  );
}
