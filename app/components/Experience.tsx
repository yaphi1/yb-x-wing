'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { Grid } from './Grid';
import { Keyboard } from './Keyboard';
import { Player } from './Player';
import { isMultiplayerEnabled } from '../helpers/featureFlags';
import { OtherPlayers } from './OtherPlayers';
import { Sand } from './Sand';

export function Experience() {
  return (
    <Keyboard>
      <Canvas>
        <Environment preset="dawn" />
        {/* <Grid /> */}
        <Sand />
        <Sand position={[1000, 0, 0]} />
        <Sand position={[-1000, 0, 0]} />
        <Sand position={[0, 0, 1000]} />
        <Sand position={[1000, 0, 1000]} />
        <Player />
        {isMultiplayerEnabled && <OtherPlayers />}
      </Canvas>
    </Keyboard>
  );
}
