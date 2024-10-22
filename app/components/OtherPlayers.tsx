import * as THREE from 'three';
import { useOthers } from '@liveblocks/react/suspense';
import { useFrame } from '@react-three/fiber';
import { XWing } from './XWing';
import { useRef } from 'react';
import { type Presence } from '../helpers/multiplayerConfig';

type NestedRef = React.MutableRefObject<THREE.Group>;
const emptyRef = { current: null! };

/** 
 * This exists because I temporarily gave up on making
 * the animations smooth with the variable latency
 * between socket signals
*/
const compromiseLerpIncrement = 0.5;

/**
 * Stuff needs to change before this becomes usable:
 * - Refs need to be on a per-player basis; right now, only players 1 and 2 are supported.
 * - Animation jitter needs to be fixed for other players (non-player-1)
 *  - Fixed by using velocity
 *  - Maybe only adjust position if velocity has changed? Nah syncing the position every so often is fine.
 * - Pitch and roll box axes need to be fixed for other players
 */
export function OtherPlayers() {
  const otherPlayers = useOthers();
  const otherXWings = useRef<Record<string, NestedRef>>({});
  const otherYawBoxes = useRef<Record<string, NestedRef>>({});
  const otherPitchAndRollBoxes = useRef<Record<string, NestedRef>>({});

  const previousTransmission = useRef<Presence>(null!);
  const latestTarget = useRef<Presence>(null!);

  const previousTransmissionTimestamp = useRef(0);
  const secondsBetweenTransmissions = useRef(0.1);
  const previousPosition = useRef<THREE.Vector3>(new THREE.Vector3());

  const frameCount = useRef(0);

  useFrame((state, delta) => {

    otherPlayers.forEach((otherPlayer) => {
      const otherPlayerPresence = otherPlayer.presence as Presence;
      const otherPlayerXWing = otherXWings.current[otherPlayer.connectionId].current;
      const otherYawBox = otherYawBoxes.current[otherPlayer.connectionId].current;
      const otherPitchAndRollBox = otherPitchAndRollBoxes.current[otherPlayer.connectionId].current;

      /**
        order of operations:
        - transmission A comes in
        - we have secondsBetweenTransmissions seconds to lerp to it
        - transmission B comes in
        - transmission A becomes previous
        - we lerp from A to B
      */
      const hasNewTransmission = otherPlayerPresence !== previousTransmission.current;

      if (hasNewTransmission) {
        latestTarget.current = otherPlayerPresence;
        previousPosition.current = otherPlayerXWing.position;

        const { elapsedTime } = state.clock;
        secondsBetweenTransmissions.current = (elapsedTime - previousTransmissionTimestamp.current) / 1000;
        previousTransmissionTimestamp.current = secondsBetweenTransmissions.current;
      }

      const fractionOfLerpCompletedPerFrame = delta / secondsBetweenTransmissions.current;

      // window.fractionOfLerpCompletedPerFrame = fractionOfLerpCompletedPerFrame;
      // window.delta = delta;
      // window.secondsBetweenTransmissions = secondsBetweenTransmissions.current;
      // window.rotation = otherPlayerPresence.rotation;
      // window.pitchAndRollBoxRotation = otherPlayerPresence.pitchAndRollBoxRotation;

      // otherPlayerXWing.position.lerpVectors(
      //   previousPosition.current,
      //   new THREE.Vector3(...latestTarget.current.position),
      //   // fractionOfLerpCompletedPerFrame
      //   // 0.016,
      //   // delta
      //   // 0.3,
      //   compromiseLerpIncrement,
      // );

      if (frameCount.current % (5 * 60) === 0) {
        otherPlayerXWing.position.set(...otherPlayerPresence.position);
      }
      otherPlayerXWing.position.add(new THREE.Vector3(...otherPlayerPresence.velocity));

      // otherPlayerXWing.quaternion.slerp(new THREE.Quaternion(...otherPlayerPresence.quaternion), fractionOfLerpCompletedPerFrame);
      
      // otherPlayerXWing.quaternion.slerp(new THREE.Quaternion(...otherPlayerPresence.quaternion), compromiseLerpIncrement);
      // otherYawBox.quaternion.slerp(new THREE.Quaternion(...otherPlayerPresence.yawBoxQuaternion), compromiseLerpIncrement);
      // otherPitchAndRollBox.quaternion.slerp(new THREE.Quaternion(...otherPlayerPresence.pitchAndRollBoxQuaternion), compromiseLerpIncrement);

      // otherPlayerXWing.rotation.set(...otherPlayerPresence.rotation);
      otherPlayerXWing.rotation.y = otherPlayerPresence.rotation[1];

      // not sure how these axes got so turned around
      // seems to be using global x and local z for some reason
      const hackyCoefficient = Math.sign(-Math.cos(otherPlayerXWing.rotation.y)); // I'd like to emphasize how bad of a temporary workaround this is
      otherPitchAndRollBox.rotation.x = hackyCoefficient * otherPlayerPresence.pitchAndRollBoxRotation[2];
      otherPitchAndRollBox.rotation.z = otherPlayerPresence.pitchAndRollBoxRotation[0];

      // otherPitchAndRollBox.rotation.x = otherPlayerPresence.pitchAndRollBoxRotation[0];
      // otherPitchAndRollBox.rotation.z = otherPlayerPresence.pitchAndRollBoxRotation[2];

      // otherPlayerXWing.position.set(...otherPlayerPresence.position);
    });

    frameCount.current++;
  });

  return (
    <>
      {otherPlayers.map(otherPlayer => (
        <group
          key={otherPlayer.connectionId}
          ref={otherXWings.current[otherPlayer.connectionId] ??= emptyRef}
        >
          <XWing
            yawBoxRef={otherYawBoxes.current[otherPlayer.connectionId] ??= emptyRef}
            pitchAndRollBoxRef={otherPitchAndRollBoxes.current[otherPlayer.connectionId] ??= emptyRef}
          />
        </group>
      ))}
    </>
  );
}
