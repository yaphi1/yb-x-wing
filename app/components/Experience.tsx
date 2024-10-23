'use client';

import * as THREE from 'three';
import React, { useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Environment, Sky } from '@react-three/drei';
import { Keyboard } from './Keyboard';
import { Player } from './Player';
import { isMultiplayerEnabled } from '../helpers/globalFlags';
import { OtherPlayers } from './OtherPlayers';
import { Ground } from './Ground';

function Fog() {
  const { scene } = useThree()
  
  useEffect(() => {
    scene.fog = new THREE.Fog('#ffffff', 200, 2000);
  }, [scene])

  return null;
}

export function Experience() {
  return (
    <Keyboard>
      <Canvas>
        <Environment preset="dawn" />
        {/* <Fog color="#ffffff" near={1} far={10} /> */}
        <Fog />
        {/* <Sky /> */}
        <Ground />
        <Player />
        {isMultiplayerEnabled && <OtherPlayers />}
      </Canvas>
    </Keyboard>
  );
}
