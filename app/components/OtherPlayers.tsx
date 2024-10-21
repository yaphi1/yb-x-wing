import * as THREE from 'three';
import { useOthers } from '@liveblocks/react/suspense';
import { useFrame } from '@react-three/fiber';
import { XWing } from './XWing';
import { useEffect, useRef } from 'react';
import { type Presence } from '../helpers/multiplayerConfig';

type NestedRef = React.MutableRefObject<THREE.Group>;
const emptyRef = { current: null! };

/** Default value from LiveBlocks measured in seconds */
const secondsBetweenWebsocketTransmissions = 0.1;

export function OtherPlayers() {
  const otherPlayers = useOthers();
  const otherXWings = useRef<Record<string, NestedRef>>({});
  const player2Ref = useRef<THREE.Group>(null!);

  const frameCount = useRef(0);
  const frameCountAtTransmission = useRef(0);
  const previousTransmission = useRef<Presence>(null!);
  const latestTarget = useRef<Presence>(null!);
  const framesBetweenSocketTransmissions = useRef(0);

  const previousTransmissionTimestamp = useRef(0);
  const secondsBetweenTransmissions = useRef(0.1);
  const previousPosition = useRef<THREE.Vector3>(new THREE.Vector3());

  useFrame((state, delta) => {

    otherPlayers.forEach((otherPlayer) => {
      const otherPlayerPresence = otherPlayer.presence as Presence;
      const otherPlayerXWing = otherXWings.current[otherPlayer.connectionId].current;

      /*
      order of operations:
      - transmission A comes in
      - we have secondsBetweenTransmissions seconds to lerp to it
      - transmission B comes in
      - transmission A becomes previous
      - we lerp from A to B
      */

      const hasNewTransmission = otherPlayerPresence !== previousTransmission.current;

      if (hasNewTransmission) {
        // transmission has arrived
        latestTarget.current = otherPlayerPresence; // latest target
        previousPosition.current = otherPlayerXWing.position; // actual position

        const { elapsedTime } = state.clock;
        secondsBetweenTransmissions.current = (elapsedTime - previousTransmissionTimestamp.current) / 1000;
        previousTransmissionTimestamp.current = secondsBetweenTransmissions.current;
      }

      const fractionOfLerpCompletedPerFrame = delta / secondsBetweenTransmissions.current;

      window.fractionOfLerpCompletedPerFrame = fractionOfLerpCompletedPerFrame;
      window.delta = delta;
      window.secondsBetweenTransmissions = secondsBetweenTransmissions.current;

      otherPlayerXWing.position.lerpVectors(
        previousPosition.current,
        new THREE.Vector3(...latestTarget.current.position),
        // fractionOfLerpCompletedPerFrame
        // 0.016,
        // delta
        // 0.3,
        0.5,
      );
      // otherPlayerXWing.quaternion.slerp(new THREE.Quaternion(...otherPlayerPresence.quaternion), fractionOfLerpCompletedPerFrame);
      otherPlayerXWing.quaternion.slerp(new THREE.Quaternion(...otherPlayerPresence.quaternion), 0.5);

      // otherPlayerXWing.position.set(...otherPlayerPresence.position);

    });



    /* otherPlayers.forEach((otherPlayer) => {
      const otherPlayerPresence = otherPlayer.presence as Presence;
      const otherPlayerXWing = otherXWings.current[otherPlayer.connectionId].current;

      window.position = otherPlayerXWing.position;
      window.positionFromPresence = otherPlayerPresence.position;
      window.otherXWings = otherXWings;
  
      // otherPlayerXWing.position.lerp(new THREE.Vector3(...otherPlayerPresence.position), fractionOfLerpCompletedPerFrame);
      otherPlayerXWing.quaternion.slerp(new THREE.Quaternion(...otherPlayerPresence.quaternion), fractionOfLerpCompletedPerFrame);

      otherPlayerXWing.position.set(...otherPlayerPresence.position);
      // otherPlayerXWing.quaternion.set(...otherPlayerPresence.quaternion);
    }); */

  });

  return (
    <>
      {otherPlayers.map(otherPlayer => (
        <group
          key={otherPlayer.connectionId}
          ref={otherXWings.current[otherPlayer.connectionId] ??= emptyRef}
        >
          <XWing />
        </group>
      ))}

      {/* <group ref={player2Ref}>
        <XWing />
      </group> */}
    </>
  );
}
