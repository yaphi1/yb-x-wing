const defaultGridSize = 10000;
const defaultDivisions = defaultGridSize / 10;

export function Grid({
  size = defaultGridSize,
  divisions = defaultDivisions,
  colorCenterLines = 'red',
  color = 'black',
} : {
  size?: number;
  divisions?: number;
  colorCenterLines?: string,
  color?: string,
}) {
  return (
    <gridHelper args={[size, divisions, colorCenterLines, color]} />
  );
}
