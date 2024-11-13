import { useControls, buttonGroup } from 'leva';

const colorPresets: Record<string, string> = {
  light: '#fff1d6',
  dark: '#333333',
  sand: '#b79d75',
  indigo: '#6671a7',
};

type ColorSetter = (value: { bodyColor: string; }) => void;

function generatePresetControls(fn: ColorSetter) {
  const presets: Record<string, () => void> = {};
  const colors = Object.keys(colorPresets);

  colors.forEach(color => {
    const capitalizedLabel = color[0].toUpperCase() + color.slice(1);
    presets[capitalizedLabel] = () => {
      fn({ bodyColor: colorPresets[color] });
    };
  });

  return presets;
}

export function useColors() {
  const [{ bodyColor }, set] = useControls('Colors', () => ({
    bodyColor: {
      value: colorPresets.light,
      label: 'Body Color',
    },
    'Presets': buttonGroup(
      generatePresetControls((color) => { set(color); })
    ),
  }));

  return { bodyColor };
}
