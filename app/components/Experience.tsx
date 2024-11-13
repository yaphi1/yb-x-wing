'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { Keyboard } from './Keyboard';
import { Player } from './Player';
import { isMultiplayerEnabled, useDebugMode } from '../helpers/globalFlags';
import { OtherPlayers } from './OtherPlayers';
import { Ground } from './Ground';
import { Fog } from './Fog';
import { Stats } from '@react-three/drei';
import { button, useControls } from 'leva';

export function Experience() {
  const { isDebugMode } = useDebugMode();

  useControls(
    'Controls',
    {
      'Move': {
        value: 'Arrows',
        editable: false,
      },
      'Speed': {
        value: 'r/f',
        editable: false,
      },
      'Camera': {
        value: 'w/a/s/d/q/e',
        editable: false,
      },
      'Wings': {
        value: 't',
        editable: false,
      },
      'Pause': {
        value: 'p',
        editable: false,
      },
      'Reset': {
        value: 'n',
        editable: false,
      },
    },
  );

  useControls(
    'More Info',
    {
      'See the code': button(() => {
        window.open('https://github.com/yaphi1/yb-x-wing', '_blank');
      }),
    },
    {
      collapsed: true,
    }
  );

  return (
    <Keyboard>
      <Canvas>
        {isDebugMode && <Stats />}
        <color args={ [ '#ffe8e8' ] } attach="background" />
        <Environment preset="dawn" />
        <Fog color="#ffe8e8" near={200} far={2000} />
        <Ground />
        <Player />
        {isMultiplayerEnabled && <OtherPlayers />}
      </Canvas>
    </Keyboard>
  );
}
