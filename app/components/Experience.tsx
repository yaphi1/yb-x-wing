'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { Keyboard } from './Keyboard';
import { Player } from './Player';
import { isMultiplayerEnabled } from '../helpers/globalFlags';
import { OtherPlayers } from './OtherPlayers';
import { Ground } from './Ground';
import { Fog } from './Fog';


export function Experience() {
  return (
    <Keyboard>
      <Canvas>
        <Environment preset="dawn" />
        <Fog color="#ffe8e8" near={200} far={2000} />
        <Ground />
        <Player />
        {isMultiplayerEnabled && <OtherPlayers />}
      </Canvas>
    </Keyboard>
  );
}
