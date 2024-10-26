import { KeyboardControls } from '@react-three/drei';
import { PropsWithChildren } from 'react';

const map = [
  { name: 'forward', keys: ['ArrowUp'] },
  { name: 'backward', keys: ['ArrowDown'] },
  { name: 'left', keys: ['ArrowLeft'] },
  { name: 'right', keys: ['ArrowRight'] },
  { name: 'accelerate', keys: ['r'] },
  { name: 'decelerate', keys: ['f'] },
  { name: 'raiseCamera', keys: ['e'] },
  { name: 'lowerCamera', keys: ['q'] },
  { name: 'zoomIn', keys: ['w'] },
  { name: 'zoomOut', keys: ['s'] },
  { name: 'rotateCounterclockwise', keys: ['a'] },
  { name: 'rotateClockwise', keys: ['d'] },
  { name: 'reset', keys: ['n'] },
  { name: 'pause', keys: ['p'] },
  { name: 'toggleWings', keys: ['t'] },
  { name: 'cam1', keys: ['1'] },
  { name: 'cam2', keys: ['2'] },
  { name: 'cam3', keys: ['3'] },
  { name: 'cam4', keys: ['4'] },
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
