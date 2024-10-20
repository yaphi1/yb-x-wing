import { KeyboardControls } from '@react-three/drei';
import { PropsWithChildren } from 'react';

const map = [
  { name: 'forward', keys: ['ArrowUp'] },
  { name: 'backward', keys: ['ArrowDown'] },
  { name: 'left', keys: ['ArrowLeft'] },
  { name: 'right', keys: ['ArrowRight'] },
  { name: 'accelerate', keys: ['t'] },
  { name: 'decelerate', keys: ['g'] },
  { name: 'raiseCamera', keys: ['e'] },
  { name: 'lowerCamera', keys: ['q'] },
  { name: 'zoomIn', keys: ['w'] },
  { name: 'zoomOut', keys: ['s'] },
  { name: 'rotateCounterclockwise', keys: ['a'] },
  { name: 'rotateClockwise', keys: ['d'] },
  { name: 'reset', keys: ['r'] },
  { name: 'pause', keys: ['p'] },
];

/**
 * A wrapper that gives you access to keyboard controls.
 * This was separated out mainly to reduce clutter.
 */
export function Keyboard({ children } : PropsWithChildren) {
  return (
    <KeyboardControls map={map}>
      {children}
    </KeyboardControls>
  );
}
