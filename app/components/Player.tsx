import * as THREE from 'three';
import { useKeyboardControls } from '@react-three/drei';
import { XWing } from './XWing';
import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const isDebug = false;
const turnAngle = 0.03;
const startingSpeed = 10;

const axes = {
	x: new THREE.Vector3(1, 0, 0),
	y: new THREE.Vector3(0, 1, 0),
	z: new THREE.Vector3(0, 0, 1),
};

type PlayerProps = {
  startingPosition?: THREE.Vector3;
  startingDirection?: THREE.Vector3;
};

export function Player({
  startingPosition = new THREE.Vector3(20, 2, 0),
  startingDirection = new THREE.Vector3(-1, 0, 0),
} : PlayerProps) {
  const xWingRef = useRef<THREE.Group>(null!);
  const speed = useRef(startingSpeed);
  const direction = useRef(startingDirection);

  useEffect(() => {
    const { x, y, z } = startingPosition;
    xWingRef.current.position.set(x, y, z);
  } ,[]);

  const isForwardPressed = useKeyboardControls(state => state.forward);
  const isBackwardPressed = useKeyboardControls(state => state.backward);
  const isLeftPressed = useKeyboardControls(state => state.left);
  const isRightPressed = useKeyboardControls(state => state.right);
  const isResetPressed = useKeyboardControls(state => state.reset);

  useFrame((state, delta) => {
    const speedScalar = speed.current * delta;
    const copyOfDirection: THREE.Vector3 = Object.create(direction.current);
    const velocity = copyOfDirection.multiplyScalar(speedScalar);

    if (isDebug) {
      // @ts-expect-error
      window.velocity = velocity;
      // @ts-expect-error
      window.position = xWingRef.current.position;
    }
  
    xWingRef.current.position.add(velocity);

    if (isLeftPressed) {
      direction.current.applyAxisAngle(axes.y, turnAngle);
      xWingRef.current.rotation.y += turnAngle;
    }
    if (isRightPressed) {
      direction.current.applyAxisAngle(axes.y, -turnAngle);
      xWingRef.current.rotation.y += -turnAngle;
    }
    if (isResetPressed) {
      const { x, y, z } = startingPosition;
      xWingRef.current.position.set(x, y, z);
    }
  });

  useEffect(() => {
    if (isForwardPressed) {
      console.log('forward');
    }
    console.log('x-wing ref', xWingRef);
  }, [isForwardPressed]);

  return (
    <XWing
      xWingRef={xWingRef}
    />
  );
}
