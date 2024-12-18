import * as THREE from 'three';
import { useOthers } from '@liveblocks/react/suspense';
import { useFrame } from '@react-three/fiber';
import { XWing } from './XWing/XWing';
import { useRef } from 'react';
import { type Presence } from '../helpers/multiplayerConfig';
import { updateWings, WingRefs } from '../helpers/wingHelpers';

type NestedRef = React.MutableRefObject<THREE.Group>;
const emptyRef = { current: null! };
const secondsBetweenPositionSyncs = 5;
const lerpIncrement = 0.5;

/**
 * Just the 3D version of the Pythagorean theorem
 */
function getSpeedFromVelocity(velocity: [number, number, number]) {
  return Math.sqrt(velocity[0]**2 + velocity[1]**2 + velocity[2]**2);
}

export function OtherPlayers() {
  const otherPlayers = useOthers();
  const otherXWings = useRef<Record<string, NestedRef>>({});
  const otherPitchAndRollBoxes = useRef<Record<string, NestedRef>>({});
  const otherWingRefs = useRef<Record<string, WingRefs>>({});
  const otherSpeedRefs = useRef<Record<string, React.MutableRefObject<number>>>({});

  const frameCount = useRef(0);

  useFrame((state, delta) => {
    otherPlayers.forEach((otherPlayer) => {
      const otherPlayerPresence = otherPlayer.presence as Presence;
      const otherPlayerXWing = otherXWings.current[otherPlayer.connectionId].current;
      const otherPitchAndRollBox = otherPitchAndRollBoxes.current[otherPlayer.connectionId].current;
      const otherPlayerWingRefs = otherWingRefs.current[otherPlayer.connectionId];
      const otherPlayerSpeedRef = otherSpeedRefs.current[otherPlayer.connectionId];
      const { areWingsOpen } = otherPlayerPresence;

      // re-sync position at a given time interval
      if (frameCount.current % (secondsBetweenPositionSyncs * 60) === 0) {
        otherPlayerXWing.position.set(...otherPlayerPresence.position);
      }
      otherPlayerXWing.position.add(new THREE.Vector3(...otherPlayerPresence.velocity));
      otherPlayerSpeedRef.current = getSpeedFromVelocity(otherPlayerPresence.velocity);

      otherPlayerXWing.quaternion.slerp(new THREE.Quaternion(...otherPlayerPresence.quaternion), lerpIncrement);
      otherPitchAndRollBox.quaternion.slerp(new THREE.Quaternion(...otherPlayerPresence.pitchAndRollBoxQuaternion), lerpIncrement);

      updateWings({ wingRefs: otherPlayerWingRefs, areWingsOpen, delta });
    });

    frameCount.current++;
  });

  return (
    <>
      {otherPlayers.map(otherPlayer => (
        <group
          key={otherPlayer.connectionId}
          ref={otherXWings.current[otherPlayer.connectionId] ??= {...emptyRef}}
        >
          <XWing
            pitchAndRollBoxRef={otherPitchAndRollBoxes.current[otherPlayer.connectionId] ??= {...emptyRef}}
            wingRefs={otherWingRefs.current[otherPlayer.connectionId] ??= {
              topLeft: {...emptyRef},
              bottomLeft: {...emptyRef},
              topRight: {...emptyRef},
              bottomRight: {...emptyRef},
            }}
            speedRef={otherSpeedRefs.current[otherPlayer.connectionId]}
          />
        </group>
      ))}
    </>
  );
}
