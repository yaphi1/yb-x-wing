import * as THREE from 'three';

export type Presence = {
  position: [number, number, number];
  // quaternion: [number, number, number, number];
  // yawBoxQuaternion: [number, number, number, number];
  // pitchAndRollBoxQuaternion: [number, number, number, number];
  
  rotation: THREE.EulerTuple;
  yawBoxRotation: THREE.EulerTuple;
  pitchAndRollBoxRotation: THREE.EulerTuple;
};

export const initialPresence: Presence = {
  position: [0, 0, 0],
  // quaternion: [0, 0, 0, 1],
  // yawBoxQuaternion: [0, 0, 0, 1],
  // pitchAndRollBoxQuaternion: [0, 0, 0, 1],

  rotation: [0, 0, 0],
  yawBoxRotation: [0, 0, 0],
  pitchAndRollBoxRotation: [0, 0, 0],
};
