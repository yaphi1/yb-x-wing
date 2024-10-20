import * as THREE from 'three';
import { PerspectiveCamera, useKeyboardControls } from '@react-three/drei';
import { XWing } from './XWing';
import { useCallback, useEffect, useRef, useState } from 'react';
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
const zoomSpeed = 10;
const verticalCameraSpeed = 10;

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
const initialCameraDistance = 20;
const initialCameraHeight = 10;

type PlayerProps = {
  startingPosition?: THREE.Vector3;
  startingDirection?: THREE.Vector3;
};

export function Player({
  startingPosition = initialPosition,
  startingDirection = initialDirection,
} : PlayerProps) {
  const [isPaused, setIsPaused] = useState(false);

  const groupRef = useRef<THREE.Group>(null!);
  const xWingRef = useRef<THREE.Group>(null!);
  const rotationBoxRef = useRef<THREE.Group>(null!);

  const speed = useRef(startingSpeed);
  const direction = useRef(startingDirection);

  const cameraRef = useRef<THREE.PerspectiveCamera>(null!);
  const cameraAngle = useRef(initialCameraAngle);
  const cameraDistance = useRef(initialCameraDistance);
  const cameraHeight = useRef(initialCameraHeight);

  const getCameraPosition = useCallback((): [number, number, number] => {
    return [
      cameraDistance.current * Math.sin(cameraAngle.current),
      cameraHeight.current,
      cameraDistance.current * Math.cos(cameraAngle.current),
    ];
  }, []);

  const updateCamera = useCallback(({ newCameraAngle, newCameraDistance, newCameraHeight } : {
    newCameraAngle?: number;
    newCameraDistance?: number;
    newCameraHeight?: number;
  }) => {
    cameraAngle.current = newCameraAngle ?? cameraAngle.current;
    cameraDistance.current = Math.max(newCameraDistance ?? cameraDistance.current, 0);
    cameraHeight.current = newCameraHeight ?? cameraHeight.current;
    cameraRef.current.position.set(...getCameraPosition());
    cameraRef.current.lookAt(groupRef.current.position);
  }, [getCameraPosition]);

  useEffect(() => {
    const { x, y, z } = startingPosition;
    groupRef.current.position.set(x, y, z);
  } , [startingPosition]);

  useEffect(() => {
    updateCamera({ newCameraAngle: initialCameraAngle });
  } , [updateCamera]);

  const isForwardPressed = useKeyboardControls(state => state.forward);
  const isBackwardPressed = useKeyboardControls(state => state.backward);
  const isLeftPressed = useKeyboardControls(state => state.left);
  const isRightPressed = useKeyboardControls(state => state.right);

  const isZoomInPressed = useKeyboardControls(state => state.zoomIn);
  const isZoomOutPressed = useKeyboardControls(state => state.zoomOut);
  const isRaiseCameraPressed = useKeyboardControls(state => state.raiseCamera);
  const isLowerCameraPressed = useKeyboardControls(state => state.lowerCamera);
  const isRotateClockwisePressed = useKeyboardControls(state => state.rotateClockwise);
  const isRotateCounterclockwisePressed = useKeyboardControls(state => state.rotateCounterclockwise);

  const isResetPressed = useKeyboardControls(state => state.reset);
  const isPausePressed = useKeyboardControls(state => state.pause);

  useEffect(() => {
    if (isPausePressed) {
      setIsPaused((wasPaused) => !wasPaused);
    }
  }, [isPausePressed]);

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

  const moveXWing = useCallback(({ delta } : { delta: number }) => {
    const speedScalar = speed.current * delta;
    const copyOfDirection: THREE.Vector3 = Object.create(direction.current);
    const velocity = copyOfDirection.multiplyScalar(speedScalar);
    groupRef.current.position.add(velocity);

    if (isDebug) {
      // @ts-expect-error - global reference added to window for debugging only
      window.velocity = velocity;
      // @ts-expect-error - global reference added to window for debugging only
      window.position = groupRef.current.position;
    }
  }, []);

  useFrame((state, delta) => {
    const isAtBottom = groupRef.current.position.y <= lowestPosition;

    if (!isPaused) {
      moveXWing({ delta });
    }

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
    if (isZoomInPressed) {
      updateCamera({ newCameraDistance: cameraDistance.current - zoomSpeed * delta });
    }
    if (isZoomOutPressed) {
      updateCamera({ newCameraDistance: cameraDistance.current + zoomSpeed * delta });
    }
    if (isRaiseCameraPressed) {
      updateCamera({ newCameraHeight: cameraHeight.current + verticalCameraSpeed * delta });
    }
    if (isLowerCameraPressed) {
      updateCamera({ newCameraHeight: cameraHeight.current - verticalCameraSpeed * delta });
    }
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
