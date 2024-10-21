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

      // if (otherPlayerPresence !== previousTransmission.current) {
      //   const { elapsedTime } = state.clock;
      //   // first get our data
      //   secondsBetweenTransmissions.current = state.clock.elapsedTime - previousTransmissionTimestamp.current;

      //   // then make the current into the previous
      //   previousTransmissionTimestamp.current = state.clock.elapsedTime;
      //   previousTransmission.current = otherPlayerPresence;

      //   previousPosition.current = otherPlayerXWing.position.clone();
      // }

      // window.secondsBetweenTransmissions = secondsBetweenTransmissions.current;
      // window.previousPosition = previousPosition.current;

      // /** What fraction of the whole lerp is completed per frame */
      // const fractionOfLerpCompletedPerFrame = delta / secondsBetweenTransmissions.current;

      // otherPlayerXWing.position.lerpVectors(
      //   previousPosition.current,
      //   new THREE.Vector3(...otherPlayerPresence.position),
      //   fractionOfLerpCompletedPerFrame
      // );
      // // otherPlayerXWing.position.set(...otherPlayerPresence.position);
      // otherPlayerXWing.quaternion.slerp(new THREE.Quaternion(...otherPlayerPresence.quaternion), fractionOfLerpCompletedPerFrame);

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



    /* 
    // player 2 only

    const player2 = otherPlayers[0];
    if (player2) {
      const player2Presence = player2.presence as Presence;
      const player2XWing = player2Ref.current;

      if (window.positionFromPresence?.[2] !== player2Presence.position?.[2]) {
        window.timeSinceLastUpdate = performance.now() - (window.timeSinceLastUpdate ?? 0);
      }

      window.position = player2XWing.position;
      window.positionFromPresence = player2Presence.position;
      window.otherXWings = otherXWings;


      window.frameCount = ++frameCount.current;

      if (previousTransmission.current !== player2Presence.position[2]) {
        previousTransmission.current = player2Presence.position[2] ?? 0;
        window.previousTransmission = previousTransmission.current;
        framesBetweenSocketTransmissions.current = frameCount.current - frameCountAtTransmission.current;
        frameCountAtTransmission.current = frameCount.current;

        window.framesBetweenSocketTransmissions = framesBetweenSocketTransmissions.current;
        window.timeBetweenSocketTransmissions = delta * framesBetweenSocketTransmissions.current;
      }

      
      player2XWing.position.lerp(new THREE.Vector3(...player2Presence.position), fractionOfLerpCompletedPerFrame);
      player2XWing.quaternion.slerp(new THREE.Quaternion(...player2Presence.quaternion), fractionOfLerpCompletedPerFrame);
      
      // player2XWing.position.lerp(new THREE.Vector3(...player2Presence.position), 0.05);
      // player2XWing.quaternion.slerp(new THREE.Quaternion(...player2Presence.quaternion), 0.05);

      // player2XWing.position.set(...player2Presence.position);
      // player2XWing.quaternion.set(...player2Presence.quaternion);

      // player2XWing.position.set(player2XWing.position.x, 40, player2XWing.position.z - 0.1);
      // player2XWing.position.set(player2XWing.position.x, 40, player2XWing.position.z - (10 * delta));
    } */
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
