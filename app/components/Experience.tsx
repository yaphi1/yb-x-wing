'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from "@react-three/drei";
import { Grid } from './Grid';
import { XWing } from './XWing';

export function Experience() {
  return (
    <Canvas>
      <Environment preset="dawn" />
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
      <Grid />
      <XWing position={[0, 2, 0]} />
    </Canvas>
  );
}
