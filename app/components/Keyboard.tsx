import { KeyboardControls } from '@react-three/drei';
import { PropsWithChildren } from 'react';

const map = [
  { name: 'forward', keys: ['w', 'ArrowUp'] },
  { name: 'backward', keys: ['s', 'ArrowDown'] },
  { name: 'left', keys: ['a', 'ArrowLeft'] },
  { name: 'right', keys: ['d', 'ArrowRight'] },
  { name: 'reset', keys: ['r', ' '] },
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
