'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Grid } from './Grid';
import { Keyboard } from './Keyboard';
import { Player } from './Player';

export function Experience() {
  return (
    <Keyboard>
      <Canvas>
        <Environment preset="dawn" />
        <PerspectiveCamera position={[-20, 10, 20]} makeDefault fov={50} />
        <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
        <Grid />
        <Player />
      </Canvas>
    </Keyboard>
  );
}
