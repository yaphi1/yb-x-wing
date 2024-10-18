'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from "@react-three/drei";
import { TestBox } from './TestBox';
import { Grid } from './Grid';

export function Experience() {
  return (
    <Canvas>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <TestBox position={[-1.2, 0, 0]} />
      <TestBox position={[1.2, 0, 0]} />

      <Grid />
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
    </Canvas>
  );
}
