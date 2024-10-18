'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { TestBox } from './TestBox';

export function Experience() {
  return (
    <Canvas>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <TestBox position={[-1.2, 0, 0]} />
      <TestBox position={[1.2, 0, 0]} />
    </Canvas>
  );
}
