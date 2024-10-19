import * as THREE from 'three';
import { PerspectiveCamera, useKeyboardControls } from '@react-three/drei';
import { XWing } from './XWing';
import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { setQuaternionFromDirection } from '../helpers/vectorHelpers';

const isDebug = true;

const turnStrength = 1;
const rollAmount = 0.4;
const rollSpeed = 10;
const pitchAmount = 0.4;
const pitchSpeed = 10;
const verticalMovementStrength = 10;
const startingSpeed = 10;
const lowestPosition = 2;

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
  startingPosition = new THREE.Vector3(0, lowestPosition + 5, 0),
  startingDirection = new THREE.Vector3(0, 0, -1),
} : PlayerProps) {
  const xWingRef = useRef<THREE.Group>(null!);
  const groupRef = useRef<THREE.Group>(null!);
  const cameraRef = useRef<THREE.Group>(null!);
  const rotationBoxRef = useRef<THREE.Group>(null!);

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
    const turnAngle = turnStrength * delta;
    const isAtBottom = groupRef.current.position.y <= lowestPosition;

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
      rotationBoxRef.current.rotation.x = THREE.MathUtils.damp(
        rotationBoxRef.current.rotation.x, rollAmount, rollSpeed, delta
      );
    }
    if (isRightPressed) {
      direction.current.applyAxisAngle(axes.y, -turnAngle);
      groupRef.current.rotation.y += -turnAngle;
      rotationBoxRef.current.rotation.x = THREE.MathUtils.damp(
        rotationBoxRef.current.rotation.x, -rollAmount, rollSpeed, delta
      );
    }
    if (!isLeftPressed && !isRightPressed) {
      rotationBoxRef.current.rotation.x = THREE.MathUtils.damp(
        rotationBoxRef.current.rotation.x, 0, rollSpeed, delta
      );
    }
    if (isForwardPressed) {
      groupRef.current.position.y -= isAtBottom ? 0 : verticalMovementStrength * delta;
      rotationBoxRef.current.rotation.z = THREE.MathUtils.damp(
        rotationBoxRef.current.rotation.z, isAtBottom ? 0 : pitchAmount, pitchSpeed, delta
      );
    }
    if (isBackwardPressed) {
      groupRef.current.position.y += verticalMovementStrength * delta;
      rotationBoxRef.current.rotation.z = THREE.MathUtils.damp(
        rotationBoxRef.current.rotation.z, -pitchAmount, pitchSpeed, delta
      );
    }
    if (!isForwardPressed && !isBackwardPressed) {
      rotationBoxRef.current.rotation.z = THREE.MathUtils.damp(
        rotationBoxRef.current.rotation.z, 0, pitchSpeed, delta
      );
    }
    if (isResetPressed) {
      const { x, y, z } = startingPosition;
      groupRef.current.position.set(x, y, z);
    }
  });

  return (
    <group ref={groupRef}>
      <XWing
        xWingRef={xWingRef}
        rotationBoxRef={rotationBoxRef}
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
