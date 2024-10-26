import * as THREE from 'three';

/** 17deg is the angle according to the x-wing blueprints */
const openWingsAngleDeg = 17;
const openWingsAngleRad = openWingsAngleDeg * (Math.PI / 180);
const wingToggleSpeed = 8;

type GroupRef = React.MutableRefObject<THREE.Group>;

export type WingRefs = {
  topLeft: GroupRef;
  bottomLeft: GroupRef;
  topRight: GroupRef;
  bottomRight: GroupRef;
};

function updateWing({ wingRef, rotationTargetAngle, delta } : {
  wingRef: React.MutableRefObject<THREE.Group>;
  rotationTargetAngle: number;
  delta: number;
}) {
  wingRef.current.rotation.x = THREE.MathUtils.damp(
    wingRef.current.rotation.x, rotationTargetAngle, wingToggleSpeed, delta
  );
}

export function updateWings({ wingRefs, areWingsOpen, delta } : {
  wingRefs: WingRefs;
  areWingsOpen: boolean;
  delta: number;
}) {
  const wingRotation = areWingsOpen ? openWingsAngleRad : 0;
  updateWing({ wingRef: wingRefs.topLeft, rotationTargetAngle: -wingRotation, delta });
  updateWing({ wingRef: wingRefs.bottomLeft, rotationTargetAngle: wingRotation, delta });
  updateWing({ wingRef: wingRefs.topRight, rotationTargetAngle: wingRotation, delta });
  updateWing({ wingRef: wingRefs.bottomRight, rotationTargetAngle: -wingRotation, delta });
}
