import * as THREE from 'three';
import { PerspectiveCamera, useKeyboardControls } from '@react-three/drei';
import { XWing } from './XWing';
import { useCallback, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const isDebug = true;

const turnStrength = 1;
const rollAmount = 0.4;
const rollSpeed = 10;
const pitchAmount = 0.4;
const pitchSpeed = 10;
const verticalMovementStrength = 10;
const startingSpeed = 10;
const lowestPosition = 2;

const TURN_DIRECTION = {
  LEFT: 1,
  RIGHT: -1,
} as const;

type TurnDirection = typeof TURN_DIRECTION[keyof typeof TURN_DIRECTION];

const axes = {
	x: new THREE.Vector3(1, 0, 0),
	y: new THREE.Vector3(0, 1, 0),
	z: new THREE.Vector3(0, 0, 1),
};

const initialPosition = new THREE.Vector3(0, lowestPosition + 5, 0);
const initialDirection = new THREE.Vector3(0, 0, -1);

// const initialCameraAngle = 0.8 * Math.PI;
const initialCameraAngle = 0;
const cameraDistance = 20;
const cameraHeight = 10;

const getCameraPosition = ({ cameraAngle } : { cameraAngle: number; }) => {
  return new THREE.Vector3(
    cameraDistance * Math.sin(cameraAngle),
    cameraHeight,
    cameraDistance * Math.cos(cameraAngle),
  );
};

type PlayerProps = {
  startingPosition?: THREE.Vector3;
  startingDirection?: THREE.Vector3;
};

export function Player({
  startingPosition = initialPosition,
  startingDirection = initialDirection,
} : PlayerProps) {
  const xWingRef = useRef<THREE.Group>(null!);
  const groupRef = useRef<THREE.Group>(null!);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null!);
  const rotationBoxRef = useRef<THREE.Group>(null!);

  const speed = useRef(startingSpeed);
  const direction = useRef(startingDirection);
  const cameraAngle = useRef(initialCameraAngle);

  useEffect(() => {
    console.log('setting starting position', startingPosition);
    const { x, y, z } = startingPosition;
    groupRef.current.position.set(x, y, z);
  } , [startingPosition]);

  const updateCamera = useCallback(({ newCameraAngle } : { newCameraAngle: number; }) => {
    cameraAngle.current = newCameraAngle;
    const { x, y, z } = getCameraPosition({ cameraAngle: newCameraAngle });
    cameraRef.current.position.set(x, y, z);
    cameraRef.current.lookAt(groupRef.current.position);
  }, []);

  useEffect(() => {
    updateCamera({ newCameraAngle: initialCameraAngle });
  } , [updateCamera]);

  const isForwardPressed = useKeyboardControls(state => state.forward);
  const isBackwardPressed = useKeyboardControls(state => state.backward);
  const isLeftPressed = useKeyboardControls(state => state.left);
  const isRightPressed = useKeyboardControls(state => state.right);

  const isZoomInPressed = useKeyboardControls(state => state.zoomIn);
  const isZoomOutPressed = useKeyboardControls(state => state.zoomOut);
  const isRotateClockwisePressed = useKeyboardControls(state => state.rotateClockwise);
  const isRotateCounterclockwisePressed = useKeyboardControls(state => state.rotateCounterclockwise);

  const isResetPressed = useKeyboardControls(state => state.reset);

  const turn = useCallback(({ delta, turnDirection } : {
    delta: number;
    turnDirection: TurnDirection;
  }) => {
    const turnAngle = turnStrength * delta * turnDirection;
    const rollTarget = rollAmount * turnDirection;
    direction.current.applyAxisAngle(axes.y, turnAngle);
    groupRef.current.rotation.y += turnAngle;
    rotationBoxRef.current.rotation.x = THREE.MathUtils.damp(
      rotationBoxRef.current.rotation.x, rollTarget, rollSpeed, delta
    );
  }, []);

  useFrame((state, delta) => {
    const speedScalar = speed.current * delta;
    const copyOfDirection: THREE.Vector3 = Object.create(direction.current);
    const velocity = copyOfDirection.multiplyScalar(speedScalar);
    const isAtBottom = groupRef.current.position.y <= lowestPosition;

    if (isDebug) {
      // @ts-expect-error - global reference added to window for debugging only
      window.velocity = velocity;
      // @ts-expect-error - global reference added to window for debugging only
      window.position = groupRef.current.position;
    }
  
    groupRef.current.position.add(velocity);

    if (isLeftPressed) {
      turn({ delta, turnDirection: TURN_DIRECTION.LEFT });
    }
    if (isRightPressed) {
      turn({ delta, turnDirection: TURN_DIRECTION.RIGHT });
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
    if (isRotateCounterclockwisePressed) {
      updateCamera({ newCameraAngle: cameraAngle.current - delta });
    }
    if (isRotateClockwisePressed) {
      updateCamera({ newCameraAngle: cameraAngle.current + delta });
    }
    /*
      todo:
      - add camera distance and height change
      - add pause
      - take dev log photos
    */
  });

  return (
    <group ref={groupRef}>
      <XWing
        xWingRef={xWingRef}
        rotationBoxRef={rotationBoxRef}
      />
      <PerspectiveCamera ref={cameraRef} makeDefault fov={50} />
    </group>
  );
}
