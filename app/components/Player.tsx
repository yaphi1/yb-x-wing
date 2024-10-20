import * as THREE from 'three';
import { PerspectiveCamera, useKeyboardControls } from '@react-three/drei';
import { XWing } from './XWing';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';

const startingSpeed = 200;
const minSpeed = 0;
const topSpeed = 300;
const acceleration = 100;
const turnStrength = 1;
const rollAmount = 0.6;
const rollSpeed = 2;
const pitchAmount = 0.6;
const pitchSpeed = 2;
const yawAmount = 0.3;
const yawSpeed = 2;
const groundClippingBuffer = pitchAmount / pitchSpeed * startingSpeed;
const lowestPosition = 20 + groundClippingBuffer;
const zoomSpeed = 10;
const verticalCameraSpeed = 10;

const TURN_DIRECTION = {
  LEFT: 1,
  CENTER: 0,
  RIGHT: -1,
} as const;
type TurnDirection = typeof TURN_DIRECTION[keyof typeof TURN_DIRECTION];

const PITCH_DIRECTION = {
  UP: 1,
  CENTER: 0,
  DOWN: -1,
} as const;
type PitchDirection = typeof PITCH_DIRECTION[keyof typeof PITCH_DIRECTION];

const axes = {
	x: new THREE.Vector3(1, 0, 0),
	y: new THREE.Vector3(0, 1, 0),
	z: new THREE.Vector3(0, 0, 1),
};

const initialPosition = new THREE.Vector3(0, lowestPosition + 20, 0);
const initialDirection = new THREE.Vector3(0, 0, -1);

const CAMERA_ANGLE_PRESETS = {
  BACK: 0,
  BACK_RIGHT: 0.2 * Math.PI,
  FRONT_RIGHT: 0.8 * Math.PI,
};
const initialCameraAngle = CAMERA_ANGLE_PRESETS.BACK_RIGHT;
const initialCameraDistance = 20;
const initialCameraHeight = 8;

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
  const pitchAndRollBoxRef = useRef<THREE.Group>(null!);
  const swayBoxRef = useRef<THREE.Group>(null!);
  const yawBoxRef = useRef<THREE.Group>(null!);

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

  const resetPosition = useCallback(() => {
    const { x, y, z } = startingPosition;
    groupRef.current.position.set(x, y, z);
  }, [startingPosition]);

  useEffect(() => {
    resetPosition();
  } , [resetPosition]);

  useEffect(() => {
    updateCamera({ newCameraAngle: initialCameraAngle });
  } , [updateCamera]);

  const isForwardPressed = useKeyboardControls(state => state.forward);
  const isBackwardPressed = useKeyboardControls(state => state.backward);
  const isLeftPressed = useKeyboardControls(state => state.left);
  const isRightPressed = useKeyboardControls(state => state.right);

  const isAcceleratePressed = useKeyboardControls(state => state.accelerate);
  const isDeceleratePressed = useKeyboardControls(state => state.decelerate);

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
    pitchAndRollBoxRef.current.rotation.x = THREE.MathUtils.damp(
      pitchAndRollBoxRef.current.rotation.x, rollTarget, rollSpeed, delta
    );

    const yawTarget = yawAmount * turnDirection;
    yawBoxRef.current.rotation.y = THREE.MathUtils.damp(
      yawBoxRef.current.rotation.y, yawTarget, yawSpeed, delta
    );
  }, []);

  const moveXWing = useCallback(({ delta } : { delta: number; }) => {
    const speedScalar = speed.current * delta;
    const copyOfDirection: THREE.Vector3 = Object.create(direction.current);
    const velocity = copyOfDirection.multiplyScalar(speedScalar);
    groupRef.current.position.add(velocity);
  }, []);

  const pitch = useCallback(({ delta, pitchDirection } : {
    delta: number;
    pitchDirection: PitchDirection;
  }) => {
    const isGoingDown = pitchDirection === PITCH_DIRECTION.DOWN;
    const isAtBottom = groupRef.current.position.y <= lowestPosition;
    const isHittingBottom = isAtBottom && isGoingDown;
    const pitchTarget = isHittingBottom ? 0 : -pitchAmount * pitchDirection;

    pitchAndRollBoxRef.current.rotation.z = THREE.MathUtils.damp(
      pitchAndRollBoxRef.current.rotation.z, pitchTarget, pitchSpeed, delta
    );
    direction.current.y = -pitchAndRollBoxRef.current.rotation.z;
  }, []);

  const sway = useCallback(({ elapsedTime } : { elapsedTime: number; }) => {
    const amplitude = 0.02;
    const frequency = 1.5;
    swayBoxRef.current.rotation.x = amplitude * Math.sin(elapsedTime * frequency);
  }, []);

  useFrame((state, delta) => {
    sway({ elapsedTime: state.clock.elapsedTime });
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
      turn({ delta, turnDirection: TURN_DIRECTION.CENTER });
    }
    if (isForwardPressed) {
      pitch({ delta, pitchDirection: PITCH_DIRECTION.DOWN });
    }
    if (isBackwardPressed) {
      pitch({ delta, pitchDirection: PITCH_DIRECTION.UP });
    }
    if (!isForwardPressed && !isBackwardPressed) {
      pitch({ delta, pitchDirection: PITCH_DIRECTION.CENTER });
    }
    if (isAcceleratePressed) {
      speed.current = Math.min(topSpeed, speed.current + acceleration * delta);
    }
    if (isDeceleratePressed) {
      speed.current = Math.max(minSpeed, speed.current - acceleration * delta);
    }
    if (isResetPressed) {
      resetPosition();
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
        pitchAndRollBoxRef={pitchAndRollBoxRef}
        swayBoxRef={swayBoxRef}
        yawBoxRef={yawBoxRef}
      />
      <PerspectiveCamera ref={cameraRef} makeDefault fov={50} />
    </group>
  );
}
