import * as THREE from 'three';
import { PerspectiveCamera, useKeyboardControls } from '@react-three/drei';
import { XWing } from './XWing';
import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { setQuaternionFromDirection } from '../helpers/vectorHelpers';

const isDebug = true;
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
  startingDirection = new THREE.Vector3(0, 0, -1),
} : PlayerProps) {
  const xWingRef = useRef<THREE.Group>(null!);
  const groupRef = useRef<THREE.Group>(null!);
  const cameraRef = useRef<THREE.Group>(null!);

  const speed = useRef(startingSpeed);
  const direction = useRef(startingDirection);

  useEffect(() => {
    const { x, y, z } = startingPosition;
    groupRef.current.position.set(x, y, z);
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
      window.position = groupRef.current.position;
    }
  
    groupRef.current.position.add(velocity);

    if (isLeftPressed) {
      direction.current.applyAxisAngle(axes.y, turnAngle);
      groupRef.current.rotation.y += turnAngle;
    }
    if (isRightPressed) {
      direction.current.applyAxisAngle(axes.y, -turnAngle);
      groupRef.current.rotation.y += -turnAngle;
    }
    if (isResetPressed) {
      const { x, y, z } = startingPosition;
      groupRef.current.position.set(x, y, z);
    }
  });

  useEffect(() => {
    if (isForwardPressed) {
      console.log('forward');
    }
    console.log('x-wing ref', xWingRef);
  }, [isForwardPressed]);

  const cameraAngle = 0.8 * Math.PI;
  const cameraDistance = 20;
  const cameraHeight = 4;
  const cameraDirection = new THREE.Vector3(
    Math.sin(cameraAngle - Math.PI),
    0,
    Math.cos(cameraAngle - Math.PI),
  );
  const cameraPosition: [number, number, number] = [
    -cameraDistance * cameraDirection.x,
    cameraHeight,
    -cameraDistance * cameraDirection.z,
  ];

  return (
    <group ref={groupRef}>
      <XWing
        xWingRef={xWingRef}
      />
      <group
        ref={cameraRef}
        position={cameraPosition}
        quaternion={setQuaternionFromDirection({
          startingDirection,
          direction: cameraDirection,
        })}
      >
        <PerspectiveCamera makeDefault fov={50} />
      </group>
    </group>
  );
}
