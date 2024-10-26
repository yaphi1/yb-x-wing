export type Presence = {
  velocity: [number, number, number];
  position: [number, number, number];
  quaternion: [number, number, number, number];
  pitchAndRollBoxQuaternion: [number, number, number, number];
  areWingsOpen: boolean;
};

export const initialPresence: Presence = {
  velocity: [0, 0, 0],
  position: [0, 0, 0],
  quaternion: [0, 0, 0, 1],
  pitchAndRollBoxQuaternion: [0, 0, 0, 1],
  areWingsOpen: false,
};
