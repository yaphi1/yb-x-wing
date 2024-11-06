import * as THREE from 'three';
import { PerspectiveCamera, useKeyboardControls } from '@react-three/drei';
import { XWing } from './XWing/XWing';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { JsonObject, useUpdateMyPresence } from '@liveblocks/react';
import { type Presence } from '../helpers/multiplayerConfig';
import { isMultiplayerEnabled } from '../helpers/globalFlags';
import { boundaryDistance, isOutOfBounds } from './Ground';
import { updateWings, type WingRefs } from '../helpers/wingHelpers';

const startingSpeed = 1;
const minSpeed = 0;
const topSpeed = 200;
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
} as const;

const initialPosition = new THREE.Vector3(0, lowestPosition + 20, 0);
const initialDirection = new THREE.Vector3(0, 0, -1);

const CAM_PRESETS = {
  BACK: 'BACK',
  BACK_RIGHT: 'BACK_RIGHT',
  FRONT_RIGHT: 'FRONT_RIGHT',
  FRONT: 'FRONT',
} as const;
const CAM_PRESET_ANGLES = {
  [CAM_PRESETS.BACK]: 0,
  [CAM_PRESETS.BACK_RIGHT]: 0.2 * Math.PI,
  [CAM_PRESETS.FRONT_RIGHT]: 0.8 * Math.PI,
  [CAM_PRESETS.FRONT]: Math.PI,
} as const;
const initialCameraAngle = CAM_PRESET_ANGLES.BACK_RIGHT;
const initialCameraDistance = 20;
const initialCameraHeight = 8;

const noop = () => {};

type PlayerProps = {
  startingPosition?: THREE.Vector3;
  startingDirection?: THREE.Vector3;
};

export function Player({
  startingPosition = initialPosition,
  startingDirection = initialDirection,
} : PlayerProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [areWingsOpen, setAreWingsOpen] = useState(false);

  /**
   * Reason for conditional hook:
   * 
   * `isMultiplayerEnabled` is a constant that won't be flipped at runtime,
   * so this is effectively not a conditional in practice.
  */
  // eslint-disable-next-line
  const updatePresenceBroadlyTyped = isMultiplayerEnabled ? useUpdateMyPresence() : noop;
  const updatePresence = useCallback((updatedValue: Presence, options?: { addToHistory: boolean; }) => {
    // This type assertion is because the EulerTuple is just an array of numbers and strings but
    // the LiveBlocks JsonObject doesn't know that even though it accepts arrays of strings and numbers
    const compatibleValue = updatedValue as Partial<JsonObject>;
    updatePresenceBroadlyTyped(compatibleValue, options);
  }, [updatePresenceBroadlyTyped]);

  const xWingGroupRef = useRef<THREE.Group>(null!);
  const pitchAndRollBoxRef = useRef<THREE.Group>(null!);
  const swayBoxRef = useRef<THREE.Group>(null!);
  const yawBoxRef = useRef<THREE.Group>(null!);
  const wingRefs: WingRefs = {
    topLeft: useRef<THREE.Group>(null!),
    bottomLeft: useRef<THREE.Group>(null!),
    topRight: useRef<THREE.Group>(null!),
    bottomRight: useRef<THREE.Group>(null!),
  };

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
    cameraRef.current.lookAt(xWingGroupRef.current.position);
  }, [getCameraPosition]);

  const resetPosition = useCallback(() => {
    const { x, y, z } = startingPosition;
    xWingGroupRef.current.position.set(x, y, z);
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
  const isToggleWingsPressed = useKeyboardControls(state => state.toggleWings);

  useEffect(() => {
    if (isPausePressed) {
      setIsPaused((wasPaused) => !wasPaused);
    }
  }, [isPausePressed]);
  
  useEffect(() => {
    if (isToggleWingsPressed) {
      setAreWingsOpen((wereWingsOpen) => !wereWingsOpen);
    }
  }, [isToggleWingsPressed]);
  
  const isCamPresetPressed: Record<string, boolean> = useMemo(() => { return {}; }, []);
  isCamPresetPressed[CAM_PRESETS.BACK] = useKeyboardControls(state => state.cam1);
  isCamPresetPressed[CAM_PRESETS.BACK_RIGHT] = useKeyboardControls(state => state.cam2);
  isCamPresetPressed[CAM_PRESETS.FRONT_RIGHT] = useKeyboardControls(state => state.cam3);
  isCamPresetPressed[CAM_PRESETS.FRONT] = useKeyboardControls(state => state.cam4);
  const haveCamPresetsBeenPressed = Object.values(isCamPresetPressed);

  useEffect(() => {
    for (const camPreset of Object.values(CAM_PRESETS)) {
      if (isCamPresetPressed[camPreset]) {
        updateCamera({ newCameraAngle: CAM_PRESET_ANGLES[camPreset] });
      }
    }
  }, [isCamPresetPressed, haveCamPresetsBeenPressed, updateCamera]);

  const turn = useCallback(({ delta, turnDirection } : {
    delta: number;
    turnDirection: TurnDirection;
  }) => {
    const turnAngle = turnStrength * delta * turnDirection;
    const rollTarget = rollAmount * turnDirection;
    direction.current.applyAxisAngle(axes.y, turnAngle);
    xWingGroupRef.current.rotation.y += turnAngle;
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
    const velocity = isPaused ? new THREE.Vector3(0, 0, 0) : copyOfDirection.multiplyScalar(speedScalar);
    xWingGroupRef.current.position.add(velocity);
    if (isOutOfBounds(xWingGroupRef.current.position.x)) {
      xWingGroupRef.current.position.x = Math.sign(xWingGroupRef.current.position.x) * -boundaryDistance;
    }
    if (isOutOfBounds(xWingGroupRef.current.position.z)) {
      xWingGroupRef.current.position.z = Math.sign(xWingGroupRef.current.position.z) * -boundaryDistance;
    }

    updatePresence({
      velocity: velocity.toArray(),
      position: xWingGroupRef.current.position.toArray(),
      quaternion: xWingGroupRef.current.quaternion.toArray(),
      pitchAndRollBoxQuaternion: pitchAndRollBoxRef.current.quaternion.toArray(),
      areWingsOpen,
    });
  }, [updatePresence, isPaused, areWingsOpen]);

  const pitch = useCallback(({ delta, pitchDirection } : {
    delta: number;
    pitchDirection: PitchDirection;
  }) => {
    const isGoingDown = pitchDirection === PITCH_DIRECTION.DOWN;
    const isAtBottom = xWingGroupRef.current.position.y <= lowestPosition;
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
    moveXWing({ delta });

    sway({ elapsedTime: state.clock.elapsedTime });
    updateWings({ wingRefs, areWingsOpen, delta });

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
    <group ref={xWingGroupRef}>
      <XWing
        pitchAndRollBoxRef={pitchAndRollBoxRef}
        swayBoxRef={swayBoxRef}
        yawBoxRef={yawBoxRef}
        wingRefs={wingRefs}
      />
      <PerspectiveCamera ref={cameraRef} makeDefault fov={50} />
    </group>
  );
}
