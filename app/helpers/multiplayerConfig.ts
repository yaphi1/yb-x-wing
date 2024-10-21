export type Presence = {
  position: [number, number, number];
  quaternion: [number, number, number, number];
};

export const initialPresence: Presence = {
  position: [0, 0, 0],
  quaternion: [0, 0, 0, 1],
};
