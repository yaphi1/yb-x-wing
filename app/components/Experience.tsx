'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { Grid } from './Grid';
import { Keyboard } from './Keyboard';
import { Player } from './Player';
import { isMultiplayerEnabled } from '../helpers/featureFlags';
import { OtherPlayers } from './OtherPlayers';

export function Experience() {
  return (
    <Keyboard>
      <Canvas>
        <Environment preset="dawn" />
        <Grid />
        <Player />
        {isMultiplayerEnabled && <OtherPlayers />}
      </Canvas>
    </Keyboard>
  );
}
