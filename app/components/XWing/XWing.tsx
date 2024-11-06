/*
".glb" file auto-converted to jsx by: https://github.com/pmndrs/gltfjsx
Modified manually afterwards to add functionality.
*/

import * as THREE from 'three';
import React, { useMemo, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { type WingRefs } from '../../helpers/wingHelpers';
import { useFrame } from '@react-three/fiber';
import { JetFlame, JetPlacement } from './JetFlame';

const STARTING_DIRECTION_CORRECTION = new THREE.Euler(0, -0.5 * Math.PI, 0);

type GLTFResult = GLTF & {
  nodes: {
    Cube044: THREE.Mesh
    Cube044_1: THREE.Mesh
    Cube044_2: THREE.Mesh
    engine_front_inner003: THREE.Mesh
    Cylinder059: THREE.Mesh
    Cylinder059_1: THREE.Mesh
    Cylinder059_2: THREE.Mesh
    Cube045: THREE.Mesh
    Cube045_1: THREE.Mesh
    engine_stand_details_back003: THREE.Mesh
    engine_stand_details_front003: THREE.Mesh
    laser_c_thingy003: THREE.Mesh
    laser_stand003: THREE.Mesh
    lasers003: THREE.Mesh
    prop_cross_horiz003: THREE.Mesh
    prop_cross_vert003: THREE.Mesh
    propeller003: THREE.Mesh
    propeller_cap003: THREE.Mesh
    Cylinder055: THREE.Mesh
    Cylinder055_1: THREE.Mesh
    Cylinder055_2: THREE.Mesh
    circuit_pattern003: THREE.Mesh
    wing_back_greeblies003: THREE.Mesh
    wing_saber003: THREE.Mesh
    Cube059: THREE.Mesh
    Cube059_1: THREE.Mesh
    Cube059_2: THREE.Mesh
    engine_front_inner004: THREE.Mesh
    Cylinder086: THREE.Mesh
    Cylinder086_1: THREE.Mesh
    Cylinder086_2: THREE.Mesh
    Cube060: THREE.Mesh
    Cube060_1: THREE.Mesh
    engine_stand_details_back004: THREE.Mesh
    engine_stand_details_front004: THREE.Mesh
    laser_c_thingy004: THREE.Mesh
    laser_stand004: THREE.Mesh
    lasers004: THREE.Mesh
    prop_cross_horiz004: THREE.Mesh
    prop_cross_vert004: THREE.Mesh
    propeller004: THREE.Mesh
    propeller_cap004: THREE.Mesh
    Cylinder082: THREE.Mesh
    Cylinder082_1: THREE.Mesh
    Cylinder082_2: THREE.Mesh
    circuit_pattern004: THREE.Mesh
    wing_back_greeblies004: THREE.Mesh
    wing_saber004: THREE.Mesh
    Cube064: THREE.Mesh
    Cube064_1: THREE.Mesh
    Cube064_2: THREE.Mesh
    engine_front_inner005: THREE.Mesh
    Cylinder095: THREE.Mesh
    Cylinder095_1: THREE.Mesh
    Cylinder095_2: THREE.Mesh
    Cube065: THREE.Mesh
    Cube065_1: THREE.Mesh
    engine_stand_details_back005: THREE.Mesh
    engine_stand_details_front005: THREE.Mesh
    laser_c_thingy005: THREE.Mesh
    laser_stand005: THREE.Mesh
    lasers005: THREE.Mesh
    prop_cross_horiz005: THREE.Mesh
    prop_cross_vert005: THREE.Mesh
    propeller005: THREE.Mesh
    propeller_cap005: THREE.Mesh
    Cylinder091: THREE.Mesh
    Cylinder091_1: THREE.Mesh
    Cylinder091_2: THREE.Mesh
    circuit_pattern005: THREE.Mesh
    wing_back_greeblies005: THREE.Mesh
    wing_saber005: THREE.Mesh
    Cube069: THREE.Mesh
    Cube069_1: THREE.Mesh
    Cube069_2: THREE.Mesh
    engine_front_inner006: THREE.Mesh
    Cylinder104: THREE.Mesh
    Cylinder104_1: THREE.Mesh
    Cylinder104_2: THREE.Mesh
    Cube070: THREE.Mesh
    Cube070_1: THREE.Mesh
    engine_stand_details_back006: THREE.Mesh
    engine_stand_details_front006: THREE.Mesh
    laser_c_thingy006: THREE.Mesh
    laser_stand006: THREE.Mesh
    lasers006: THREE.Mesh
    prop_cross_horiz006: THREE.Mesh
    prop_cross_vert006: THREE.Mesh
    propeller006: THREE.Mesh
    propeller_cap006: THREE.Mesh
    Cylinder100: THREE.Mesh
    Cylinder100_1: THREE.Mesh
    Cylinder100_2: THREE.Mesh
    circuit_pattern006: THREE.Mesh
    wing_back_greeblies006: THREE.Mesh
    wing_saber006: THREE.Mesh
    Cube010: THREE.Mesh
    Cube010_1: THREE.Mesh
    Cube008: THREE.Mesh
    Cube008_1: THREE.Mesh
    Cube008_2: THREE.Mesh
    Cube008_3: THREE.Mesh
    nozzle: THREE.Mesh
    wing_axle: THREE.Mesh
    grate_lengthwise: THREE.Mesh
    grate_widthwise: THREE.Mesh
    side_clamps: THREE.Mesh
    mil_falcon_thingy: THREE.Mesh
    piping: THREE.Mesh
    panel: THREE.Mesh
    panel_cover: THREE.Mesh
    mil_falcon_inner: THREE.Mesh
    x_manhole: THREE.Mesh
    mil_falcon_front: THREE.Mesh
    circular_support: THREE.Mesh
    pipe_clamps: THREE.Mesh
    piping001: THREE.Mesh
    pipe_clamps001: THREE.Mesh
    droid_back_support: THREE.Mesh
    droid_front_support: THREE.Mesh
    pipe_clamps002: THREE.Mesh
    piping003: THREE.Mesh
    thick_piping: THREE.Mesh
    detail_cube: THREE.Mesh
    detail_cube001: THREE.Mesh
    detail_cube002: THREE.Mesh
    detail_cube003: THREE.Mesh
    detail_cube004: THREE.Mesh
    detail_cube005: THREE.Mesh
    detail_cube006: THREE.Mesh
    detail_cube007: THREE.Mesh
    detail_cube008: THREE.Mesh
    detail_cube009: THREE.Mesh
    detail_cube010: THREE.Mesh
    detail_cube011: THREE.Mesh
    back_port_panel: THREE.Mesh
    back_port: THREE.Mesh
    back_detail_cube001: THREE.Mesh
    back_detail_cube002: THREE.Mesh
    back_detail_cylinder001: THREE.Mesh
    back_detail_cylinder002: THREE.Mesh
    back_detail_cube003: THREE.Mesh
    back_detail_cylinder003: THREE.Mesh
    back_detail_cylinder004: THREE.Mesh
    back_detail_cylinder005: THREE.Mesh
    back_detail_cylinder006: THREE.Mesh
    back_detail_cube004: THREE.Mesh
    back_detail_cylinder007: THREE.Mesh
    back_detail_cube005: THREE.Mesh
    back_detail_cylinder008: THREE.Mesh
    back_detail_cube006: THREE.Mesh
    back_detail_cylinder009: THREE.Mesh
    back_detail_cube007: THREE.Mesh
    back_detail_cylinder010: THREE.Mesh
    Sphere001: THREE.Mesh
    Sphere001_1: THREE.Mesh
    Sphere001_2: THREE.Mesh
    Sphere001_3: THREE.Mesh
    Cylinder007: THREE.Mesh
    Cylinder007_1: THREE.Mesh
    droid_lens_large: THREE.Mesh
    droid_lens_small: THREE.Mesh
  }
  materials: {
    body_material: THREE.MeshStandardMaterial
    stripes: THREE.MeshStandardMaterial
    body_accent: THREE.MeshStandardMaterial
    accent: THREE.MeshStandardMaterial
    dark_accent: THREE.MeshStandardMaterial
    thruster_glow: THREE.MeshStandardMaterial
    glass: THREE.MeshPhysicalMaterial
    droid_body: THREE.MeshStandardMaterial
    droid_head: THREE.MeshStandardMaterial
    droid_accent: THREE.MeshStandardMaterial
    droid_light: THREE.MeshStandardMaterial
    Material: THREE.MeshPhysicalMaterial
  }
}

type GroupRef = React.MutableRefObject<THREE.Group>;

export function XWing({
  xWingRef,
  pitchAndRollBoxRef,
  swayBoxRef,
  yawBoxRef,
  wingRefs,
  ...groupProps
} : {
  xWingRef?: GroupRef;
  pitchAndRollBoxRef?: GroupRef;
  swayBoxRef?: GroupRef;
  yawBoxRef?: GroupRef;
  wingRefs?: WingRefs;
} & JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/models/x-wing-openable.glb') as GLTFResult;

  const jetRefs = [
    React.useRef<THREE.Mesh>(null!),
    React.useRef<THREE.Mesh>(null!),
    React.useRef<THREE.Mesh>(null!),
    React.useRef<THREE.Mesh>(null!),
  ];

  return (
    <group name="x_wing" {...groupProps} ref={xWingRef} dispose={null}>
      <group name="Scene" rotation={STARTING_DIRECTION_CORRECTION}>
        <group name="yaw_box" ref={yawBoxRef}>
          <group name="pitch_and_roll_box" ref={pitchAndRollBoxRef}>
            <group name="sway_box" ref={swayBoxRef}>
              <group name="new_model">
                <group name="wing_top_right" ref={wingRefs?.topRight} position={[3.414, 0, 0]}>
                  <JetFlame flameRef={jetRefs[0]} jetPlacement={JetPlacement.topRight}/>
                  <mesh
                    name="Cube044"
                    geometry={nodes.Cube044.geometry}
                    material={materials.body_material}
                  />
                  <mesh
                    name="Cube044_1"
                    geometry={nodes.Cube044_1.geometry}
                    material={materials.stripes}
                  />
                  <mesh
                    name="Cube044_2"
                    geometry={nodes.Cube044_2.geometry}
                    material={materials.body_accent}
                  />
                  <mesh
                    name="engine_front_inner003"
                    geometry={nodes.engine_front_inner003.geometry}
                    material={materials.accent}
                    position={[-0.503, 0.526, 1.514]}
                    rotation={[0, 0, -Math.PI / 2]}
                  />
                  <group
                    name="engine_front_outer003"
                    position={[-0.488, 0.525, 1.513]}
                    rotation={[0, 0, -Math.PI / 2]}>
                    <mesh
                      name="Cylinder059"
                      geometry={nodes.Cylinder059.geometry}
                      material={materials.body_material}
                    />
                    <mesh
                      name="Cylinder059_1"
                      geometry={nodes.Cylinder059_1.geometry}
                      material={materials.stripes}
                    />
                    <mesh
                      name="Cylinder059_2"
                      geometry={nodes.Cylinder059_2.geometry}
                      material={materials.body_accent}
                    />
                  </group>
                  <group name="engine_stand003" position={[-0.695, 0.045, -2.654]}>
                    <mesh
                      name="Cube045"
                      geometry={nodes.Cube045.geometry}
                      material={materials.body_material}
                    />
                    <mesh
                      name="Cube045_1"
                      geometry={nodes.Cube045_1.geometry}
                      material={materials.body_accent}
                    />
                    <mesh
                      name="engine_stand_details_back003"
                      geometry={nodes.engine_stand_details_back003.geometry}
                      material={materials.body_accent}
                      position={[1.853, 0.311, 4.21]}
                      rotation={[0, 0, -Math.PI / 2]}
                      scale={[0.099, 0.198, 0.53]}
                    />
                    <mesh
                      name="engine_stand_details_front003"
                      geometry={nodes.engine_stand_details_front003.geometry}
                      material={materials.body_accent}
                      position={[-0.33, 0.146, 4.59]}
                      rotation={[0, 0, -Math.PI / 2]}
                      scale={0.175}
                    />
                  </group>
                  <mesh
                    name="laser_c_thingy003"
                    geometry={nodes.laser_c_thingy003.geometry}
                    material={materials.body_material}
                    position={[-5.571, 0.508, 5.289]}
                  />
                  <mesh
                    name="laser_stand003"
                    geometry={nodes.laser_stand003.geometry}
                    material={materials.body_material}
                    position={[-0.695, 0, 0]}
                  />
                  <mesh
                    name="lasers003"
                    geometry={nodes.lasers003.geometry}
                    material={materials.body_material}
                    position={[-0.768, 0, 0]}
                  />
                  <mesh
                    name="prop_cross_horiz003"
                    geometry={nodes.prop_cross_horiz003.geometry}
                    material={materials.accent}
                    position={[-1.374, 0.526, 1.513]}
                    scale={[0.133, 0.014, 0.425]}
                  />
                  <mesh
                    name="prop_cross_vert003"
                    geometry={nodes.prop_cross_vert003.geometry}
                    material={materials.accent}
                    position={[-1.486, 0.741, 1.513]}
                    rotation={[Math.PI / 2, 0, 0]}
                    scale={[0.02, 0.01, 0.213]}
                  />
                  <mesh
                    name="propeller003"
                    geometry={nodes.propeller003.geometry}
                    material={materials.accent}
                    position={[-1.1, 0.528, 1.514]}
                    rotation={[0, 0, -Math.PI / 2]}
                    scale={[0.424, 0.052, 0.424]}
                  />
                  <mesh
                    name="propeller_cap003"
                    geometry={nodes.propeller_cap003.geometry}
                    material={materials.accent}
                    position={[-1.245, 0.528, 1.514]}
                    rotation={[0, 0, -Math.PI / 2]}
                    scale={[0.263, 0.014, 0.263]}
                  />
                  <group
                    name="thruster003"
                    position={[1.666, 0.89, 1.587]}
                    rotation={[0, 0, -Math.PI / 2]}
                    scale={[0.308, 1, 0.308]}>
                    <mesh
                      name="Cylinder055"
                      geometry={nodes.Cylinder055.geometry}
                      material={materials.body_material}
                    />
                    <mesh
                      name="Cylinder055_1"
                      geometry={nodes.Cylinder055_1.geometry}
                      material={materials.dark_accent}
                    />
                    <mesh
                      name="Cylinder055_2"
                      geometry={nodes.Cylinder055_2.geometry}
                      material={materials.thruster_glow}
                    />
                    <mesh
                      name="circuit_pattern003"
                      geometry={nodes.circuit_pattern003.geometry}
                      material={materials.body_accent}
                      position={[-0.043, -0.668, 1.34]}
                      rotation={[Math.PI, 0, Math.PI / 2]}
                      scale={[4.268, 4.277, 4.277]}
                    />
                  </group>
                  <mesh
                    name="wing_back_greeblies003"
                    geometry={nodes.wing_back_greeblies003.geometry}
                    material={materials.body_accent}
                    position={[1.243, 0.103, 1.503]}
                  />
                  <mesh
                    name="wing_saber003"
                    geometry={nodes.wing_saber003.geometry}
                    material={materials.body_accent}
                    position={[1.34, 0.095, 2.007]}
                    rotation={[Math.PI / 2, 0, 0.254]}
                    scale={[0.037, 0.023, 0.032]}
                  />
                </group>
                <group name="wing_bottom_right" ref={wingRefs?.bottomRight} position={[3.414, 0, 0]}>
                  <JetFlame flameRef={jetRefs[1]} jetPlacement={JetPlacement.bottomRight}/>
                  <mesh
                    name="Cube059"
                    geometry={nodes.Cube059.geometry}
                    material={materials.body_material}
                  />
                  <mesh
                    name="Cube059_1"
                    geometry={nodes.Cube059_1.geometry}
                    material={materials.stripes}
                  />
                  <mesh
                    name="Cube059_2"
                    geometry={nodes.Cube059_2.geometry}
                    material={materials.body_accent}
                  />
                  <mesh
                    name="engine_front_inner004"
                    geometry={nodes.engine_front_inner004.geometry}
                    material={materials.accent}
                    position={[-0.503, 0.526, 1.514]}
                    rotation={[0, 0, -Math.PI / 2]}
                  />
                  <group
                    name="engine_front_outer004"
                    position={[-0.488, 0.525, 1.513]}
                    rotation={[0, 0, -Math.PI / 2]}>
                    <mesh
                      name="Cylinder086"
                      geometry={nodes.Cylinder086.geometry}
                      material={materials.body_material}
                    />
                    <mesh
                      name="Cylinder086_1"
                      geometry={nodes.Cylinder086_1.geometry}
                      material={materials.stripes}
                    />
                    <mesh
                      name="Cylinder086_2"
                      geometry={nodes.Cylinder086_2.geometry}
                      material={materials.body_accent}
                    />
                  </group>
                  <group name="engine_stand004" position={[-0.695, 0.045, -2.654]}>
                    <mesh
                      name="Cube060"
                      geometry={nodes.Cube060.geometry}
                      material={materials.body_material}
                    />
                    <mesh
                      name="Cube060_1"
                      geometry={nodes.Cube060_1.geometry}
                      material={materials.body_accent}
                    />
                    <mesh
                      name="engine_stand_details_back004"
                      geometry={nodes.engine_stand_details_back004.geometry}
                      material={materials.body_accent}
                      position={[1.853, 0.311, 4.21]}
                      rotation={[0, 0, -Math.PI / 2]}
                      scale={[0.099, 0.198, 0.53]}
                    />
                    <mesh
                      name="engine_stand_details_front004"
                      geometry={nodes.engine_stand_details_front004.geometry}
                      material={materials.body_accent}
                      position={[-0.33, 0.146, 4.59]}
                      rotation={[0, 0, -Math.PI / 2]}
                      scale={0.175}
                    />
                  </group>
                  <mesh
                    name="laser_c_thingy004"
                    geometry={nodes.laser_c_thingy004.geometry}
                    material={materials.body_material}
                    position={[-5.571, 0.508, 5.289]}
                  />
                  <mesh
                    name="laser_stand004"
                    geometry={nodes.laser_stand004.geometry}
                    material={materials.body_material}
                    position={[-0.695, 0, 0]}
                  />
                  <mesh
                    name="lasers004"
                    geometry={nodes.lasers004.geometry}
                    material={materials.body_material}
                    position={[-0.768, 0, 0]}
                  />
                  <mesh
                    name="prop_cross_horiz004"
                    geometry={nodes.prop_cross_horiz004.geometry}
                    material={materials.accent}
                    position={[-1.374, 0.526, 1.513]}
                    scale={[0.133, 0.014, 0.425]}
                  />
                  <mesh
                    name="prop_cross_vert004"
                    geometry={nodes.prop_cross_vert004.geometry}
                    material={materials.accent}
                    position={[-1.486, 0.741, 1.513]}
                    rotation={[Math.PI / 2, 0, 0]}
                    scale={[0.02, 0.01, 0.213]}
                  />
                  <mesh
                    name="propeller004"
                    geometry={nodes.propeller004.geometry}
                    material={materials.accent}
                    position={[-1.1, 0.528, 1.514]}
                    rotation={[0, 0, -Math.PI / 2]}
                    scale={[0.424, 0.052, 0.424]}
                  />
                  <mesh
                    name="propeller_cap004"
                    geometry={nodes.propeller_cap004.geometry}
                    material={materials.accent}
                    position={[-1.245, 0.528, 1.514]}
                    rotation={[0, 0, -Math.PI / 2]}
                    scale={[0.263, 0.014, 0.263]}
                  />
                  <group
                    name="thruster004"
                    position={[1.666, 0.89, 1.587]}
                    rotation={[0, 0, -Math.PI / 2]}
                    scale={[0.308, 1, 0.308]}>
                    <mesh
                      name="Cylinder082"
                      geometry={nodes.Cylinder082.geometry}
                      material={materials.body_material}
                    />
                    <mesh
                      name="Cylinder082_1"
                      geometry={nodes.Cylinder082_1.geometry}
                      material={materials.dark_accent}
                    />
                    <mesh
                      name="Cylinder082_2"
                      geometry={nodes.Cylinder082_2.geometry}
                      material={materials.thruster_glow}
                    />
                    <mesh
                      name="circuit_pattern004"
                      geometry={nodes.circuit_pattern004.geometry}
                      material={materials.body_accent}
                      position={[-0.043, -0.668, 1.34]}
                      rotation={[Math.PI, 0, Math.PI / 2]}
                      scale={[4.268, 4.277, 4.277]}
                    />
                  </group>
                  <mesh
                    name="wing_back_greeblies004"
                    geometry={nodes.wing_back_greeblies004.geometry}
                    material={materials.body_accent}
                    position={[1.243, 0.103, 1.503]}
                  />
                  <mesh
                    name="wing_saber004"
                    geometry={nodes.wing_saber004.geometry}
                    material={materials.body_accent}
                    position={[1.34, 0.095, 2.007]}
                    rotation={[Math.PI / 2, 0, 0.254]}
                    scale={[0.037, 0.023, 0.032]}
                  />
                </group>
                <group name="wing_top_left" ref={wingRefs?.topLeft} position={[3.414, 0, 0]}>
                  <JetFlame flameRef={jetRefs[2]} jetPlacement={JetPlacement.topLeft}/>
                  <mesh
                    name="Cube064"
                    geometry={nodes.Cube064.geometry}
                    material={materials.body_material}
                  />
                  <mesh
                    name="Cube064_1"
                    geometry={nodes.Cube064_1.geometry}
                    material={materials.stripes}
                  />
                  <mesh
                    name="Cube064_2"
                    geometry={nodes.Cube064_2.geometry}
                    material={materials.body_accent}
                  />
                  <mesh
                    name="engine_front_inner005"
                    geometry={nodes.engine_front_inner005.geometry}
                    material={materials.accent}
                    position={[-0.503, 0.526, 1.514]}
                    rotation={[0, 0, -Math.PI / 2]}
                  />
                  <group
                    name="engine_front_outer005"
                    position={[-0.488, 0.525, 1.513]}
                    rotation={[0, 0, -Math.PI / 2]}>
                    <mesh
                      name="Cylinder095"
                      geometry={nodes.Cylinder095.geometry}
                      material={materials.body_material}
                    />
                    <mesh
                      name="Cylinder095_1"
                      geometry={nodes.Cylinder095_1.geometry}
                      material={materials.stripes}
                    />
                    <mesh
                      name="Cylinder095_2"
                      geometry={nodes.Cylinder095_2.geometry}
                      material={materials.body_accent}
                    />
                  </group>
                  <group name="engine_stand005" position={[-0.695, 0.045, -2.654]}>
                    <mesh
                      name="Cube065"
                      geometry={nodes.Cube065.geometry}
                      material={materials.body_material}
                    />
                    <mesh
                      name="Cube065_1"
                      geometry={nodes.Cube065_1.geometry}
                      material={materials.body_accent}
                    />
                    <mesh
                      name="engine_stand_details_back005"
                      geometry={nodes.engine_stand_details_back005.geometry}
                      material={materials.body_accent}
                      position={[1.853, 0.311, 4.21]}
                      rotation={[0, 0, -Math.PI / 2]}
                      scale={[0.099, 0.198, 0.53]}
                    />
                    <mesh
                      name="engine_stand_details_front005"
                      geometry={nodes.engine_stand_details_front005.geometry}
                      material={materials.body_accent}
                      position={[-0.33, 0.146, 4.59]}
                      rotation={[0, 0, -Math.PI / 2]}
                      scale={0.175}
                    />
                  </group>
                  <mesh
                    name="laser_c_thingy005"
                    geometry={nodes.laser_c_thingy005.geometry}
                    material={materials.body_material}
                    position={[-5.571, 0.508, 5.289]}
                  />
                  <mesh
                    name="laser_stand005"
                    geometry={nodes.laser_stand005.geometry}
                    material={materials.body_material}
                    position={[-0.695, 0, 0]}
                  />
                  <mesh
                    name="lasers005"
                    geometry={nodes.lasers005.geometry}
                    material={materials.body_material}
                    position={[-0.768, 0, 0]}
                  />
                  <mesh
                    name="prop_cross_horiz005"
                    geometry={nodes.prop_cross_horiz005.geometry}
                    material={materials.accent}
                    position={[-1.374, 0.526, 1.513]}
                    scale={[0.133, 0.014, 0.425]}
                  />
                  <mesh
                    name="prop_cross_vert005"
                    geometry={nodes.prop_cross_vert005.geometry}
                    material={materials.accent}
                    position={[-1.486, 0.741, 1.513]}
                    rotation={[Math.PI / 2, 0, 0]}
                    scale={[0.02, 0.01, 0.213]}
                  />
                  <mesh
                    name="propeller005"
                    geometry={nodes.propeller005.geometry}
                    material={materials.accent}
                    position={[-1.1, 0.528, 1.514]}
                    rotation={[0, 0, -Math.PI / 2]}
                    scale={[0.424, 0.052, 0.424]}
                  />
                  <mesh
                    name="propeller_cap005"
                    geometry={nodes.propeller_cap005.geometry}
                    material={materials.accent}
                    position={[-1.245, 0.528, 1.514]}
                    rotation={[0, 0, -Math.PI / 2]}
                    scale={[0.263, 0.014, 0.263]}
                  />
                  <group
                    name="thruster005"
                    position={[1.666, 0.89, 1.587]}
                    rotation={[0, 0, -Math.PI / 2]}
                    scale={[0.308, 1, 0.308]}>
                    <mesh
                      name="Cylinder091"
                      geometry={nodes.Cylinder091.geometry}
                      material={materials.body_material}
                    />
                    <mesh
                      name="Cylinder091_1"
                      geometry={nodes.Cylinder091_1.geometry}
                      material={materials.dark_accent}
                    />
                    <mesh
                      name="Cylinder091_2"
                      geometry={nodes.Cylinder091_2.geometry}
                      material={materials.thruster_glow}
                    />
                    <mesh
                      name="circuit_pattern005"
                      geometry={nodes.circuit_pattern005.geometry}
                      material={materials.body_accent}
                      position={[-0.043, -0.668, 1.34]}
                      rotation={[Math.PI, 0, Math.PI / 2]}
                      scale={[4.268, 4.277, 4.277]}
                    />
                  </group>
                  <mesh
                    name="wing_back_greeblies005"
                    geometry={nodes.wing_back_greeblies005.geometry}
                    material={materials.body_accent}
                    position={[1.243, 0.103, 1.503]}
                  />
                  <mesh
                    name="wing_saber005"
                    geometry={nodes.wing_saber005.geometry}
                    material={materials.body_accent}
                    position={[1.34, 0.095, 2.007]}
                    rotation={[Math.PI / 2, 0, 0.254]}
                    scale={[0.037, 0.023, 0.032]}
                  />
                </group>
                <group name="wing_bottom_left" ref={wingRefs?.bottomLeft} position={[3.414, 0, 0]}>
                  <JetFlame flameRef={jetRefs[3]} jetPlacement={JetPlacement.bottomLeft}/>
                  <mesh
                    name="Cube069"
                    geometry={nodes.Cube069.geometry}
                    material={materials.body_material}
                  />
                  <mesh
                    name="Cube069_1"
                    geometry={nodes.Cube069_1.geometry}
                    material={materials.stripes}
                  />
                  <mesh
                    name="Cube069_2"
                    geometry={nodes.Cube069_2.geometry}
                    material={materials.body_accent}
                  />
                  <mesh
                    name="engine_front_inner006"
                    geometry={nodes.engine_front_inner006.geometry}
                    material={materials.accent}
                    position={[-0.503, 0.526, 1.514]}
                    rotation={[0, 0, -Math.PI / 2]}
                  />
                  <group
                    name="engine_front_outer006"
                    position={[-0.488, 0.525, 1.513]}
                    rotation={[0, 0, -Math.PI / 2]}>
                    <mesh
                      name="Cylinder104"
                      geometry={nodes.Cylinder104.geometry}
                      material={materials.body_material}
                    />
                    <mesh
                      name="Cylinder104_1"
                      geometry={nodes.Cylinder104_1.geometry}
                      material={materials.stripes}
                    />
                    <mesh
                      name="Cylinder104_2"
                      geometry={nodes.Cylinder104_2.geometry}
                      material={materials.body_accent}
                    />
                  </group>
                  <group name="engine_stand006" position={[-0.695, 0.045, -2.654]}>
                    <mesh
                      name="Cube070"
                      geometry={nodes.Cube070.geometry}
                      material={materials.body_material}
                    />
                    <mesh
                      name="Cube070_1"
                      geometry={nodes.Cube070_1.geometry}
                      material={materials.body_accent}
                    />
                    <mesh
                      name="engine_stand_details_back006"
                      geometry={nodes.engine_stand_details_back006.geometry}
                      material={materials.body_accent}
                      position={[1.853, 0.311, 4.21]}
                      rotation={[0, 0, -Math.PI / 2]}
                      scale={[0.099, 0.198, 0.53]}
                    />
                    <mesh
                      name="engine_stand_details_front006"
                      geometry={nodes.engine_stand_details_front006.geometry}
                      material={materials.body_accent}
                      position={[-0.33, 0.146, 4.59]}
                      rotation={[0, 0, -Math.PI / 2]}
                      scale={0.175}
                    />
                  </group>
                  <mesh
                    name="laser_c_thingy006"
                    geometry={nodes.laser_c_thingy006.geometry}
                    material={materials.body_material}
                    position={[-5.571, 0.508, 5.289]}
                  />
                  <mesh
                    name="laser_stand006"
                    geometry={nodes.laser_stand006.geometry}
                    material={materials.body_material}
                    position={[-0.695, 0, 0]}
                  />
                  <mesh
                    name="lasers006"
                    geometry={nodes.lasers006.geometry}
                    material={materials.body_material}
                    position={[-0.768, 0, 0]}
                  />
                  <mesh
                    name="prop_cross_horiz006"
                    geometry={nodes.prop_cross_horiz006.geometry}
                    material={materials.accent}
                    position={[-1.374, 0.526, 1.513]}
                    scale={[0.133, 0.014, 0.425]}
                  />
                  <mesh
                    name="prop_cross_vert006"
                    geometry={nodes.prop_cross_vert006.geometry}
                    material={materials.accent}
                    position={[-1.486, 0.741, 1.513]}
                    rotation={[Math.PI / 2, 0, 0]}
                    scale={[0.02, 0.01, 0.213]}
                  />
                  <mesh
                    name="propeller006"
                    geometry={nodes.propeller006.geometry}
                    material={materials.accent}
                    position={[-1.1, 0.528, 1.514]}
                    rotation={[0, 0, -Math.PI / 2]}
                    scale={[0.424, 0.052, 0.424]}
                  />
                  <mesh
                    name="propeller_cap006"
                    geometry={nodes.propeller_cap006.geometry}
                    material={materials.accent}
                    position={[-1.245, 0.528, 1.514]}
                    rotation={[0, 0, -Math.PI / 2]}
                    scale={[0.263, 0.014, 0.263]}
                  />
                  <group
                    name="thruster006"
                    position={[1.666, 0.89, 1.587]}
                    rotation={[0, 0, -Math.PI / 2]}
                    scale={[0.308, 1, 0.308]}>
                    <mesh
                      name="Cylinder100"
                      geometry={nodes.Cylinder100.geometry}
                      material={materials.body_material}
                    />
                    <mesh
                      name="Cylinder100_1"
                      geometry={nodes.Cylinder100_1.geometry}
                      material={materials.dark_accent}
                    />
                    <mesh
                      name="Cylinder100_2"
                      geometry={nodes.Cylinder100_2.geometry}
                      material={materials.thruster_glow}
                    />
                    <mesh
                      name="circuit_pattern006"
                      geometry={nodes.circuit_pattern006.geometry}
                      material={materials.body_accent}
                      position={[-0.043, -0.668, 1.34]}
                      rotation={[Math.PI, 0, Math.PI / 2]}
                      scale={[4.268, 4.277, 4.277]}
                    />
                  </group>
                  <mesh
                    name="wing_back_greeblies006"
                    geometry={nodes.wing_back_greeblies006.geometry}
                    material={materials.body_accent}
                    position={[1.243, 0.103, 1.503]}
                  />
                  <mesh
                    name="wing_saber006"
                    geometry={nodes.wing_saber006.geometry}
                    material={materials.body_accent}
                    position={[1.34, 0.095, 2.007]}
                    rotation={[Math.PI / 2, 0, 0.254]}
                    scale={[0.037, 0.023, 0.032]}
                  />
                </group>
                <group name="cockpit_cover">
                  <mesh
                    name="Cube010"
                    geometry={nodes.Cube010.geometry}
                    material={materials.accent}
                  />
                  <mesh
                    name="Cube010_1"
                    geometry={nodes.Cube010_1.geometry}
                    material={materials.glass}
                  />
                </group>
                <group name="fuselage">
                  <mesh
                    name="Cube008"
                    geometry={nodes.Cube008.geometry}
                    material={materials.body_material}
                  />
                  <mesh
                    name="Cube008_1"
                    geometry={nodes.Cube008_1.geometry}
                    material={materials.stripes}
                  />
                  <mesh
                    name="Cube008_2"
                    geometry={nodes.Cube008_2.geometry}
                    material={materials.body_accent}
                  />
                  <mesh
                    name="Cube008_3"
                    geometry={nodes.Cube008_3.geometry}
                    material={materials.dark_accent}
                  />
                </group>
                <mesh
                  name="nozzle"
                  geometry={nodes.nozzle.geometry}
                  material={materials.body_material}
                  position={[-5.625, 0, 0]}
                  scale={0.848}
                />
                <mesh
                  name="wing_axle"
                  geometry={nodes.wing_axle.geometry}
                  material={materials.body_material}
                  position={[3.527, 0, 0]}
                />
                <mesh
                  name="grate_lengthwise"
                  geometry={nodes.grate_lengthwise.geometry}
                  material={materials.accent}
                  position={[4.769, 0.927, -0.268]}
                  rotation={[-Math.PI, 0, -Math.PI / 2]}
                  scale={[0.014, 0.216, 0.014]}
                />
                <mesh
                  name="grate_widthwise"
                  geometry={nodes.grate_widthwise.geometry}
                  material={materials.accent}
                  position={[4.951, 0.901, 0]}
                  rotation={[Math.PI / 2, Math.PI / 2, 0]}
                  scale={[0.011, 0.33, 0.011]}
                />
                <mesh
                  name="side_clamps"
                  geometry={nodes.side_clamps.geometry}
                  material={materials.accent}
                  position={[3.763, 0.904, 0.323]}
                  scale={[0.098, 0.014, 0.098]}
                />
                <mesh
                  name="mil_falcon_thingy"
                  geometry={nodes.mil_falcon_thingy.geometry}
                  material={materials.accent}
                  position={[3.361, 0.89, 0]}
                  scale={0.225}
                />
                <mesh
                  name="piping"
                  geometry={nodes.piping.geometry}
                  material={materials.accent}
                  position={[4.185, 0.9, 0.242]}
                  rotation={[-Math.PI, 0, -Math.PI / 2]}
                  scale={[0.016, 0.25, 0.016]}
                />
                <mesh
                  name="panel"
                  geometry={nodes.panel.geometry}
                  material={materials.accent}
                  position={[4.185, 0.894, 0]}
                  scale={[0.23, 0.012, 0.207]}
                />
                <mesh
                  name="panel_cover"
                  geometry={nodes.panel_cover.geometry}
                  material={materials.accent}
                  position={[4.23, 0.934, 0]}
                  rotation={[-Math.PI, 0, -Math.PI]}
                  scale={[-0.077, -0.01, -0.077]}
                />
                <mesh
                  name="mil_falcon_inner"
                  geometry={nodes.mil_falcon_inner.geometry}
                  material={materials.accent}
                  position={[3.361, 0.883, 0]}
                  scale={[0.199, 0.225, 0.199]}
                />
                <mesh
                  name="x_manhole"
                  geometry={nodes.x_manhole.geometry}
                  material={materials.accent}
                  position={[3.365, 0.926, 0]}
                  scale={[0.104, 0.023, 0.104]}
                />
                <mesh
                  name="mil_falcon_front"
                  geometry={nodes.mil_falcon_front.geometry}
                  material={materials.accent}
                  position={[3.138, 0.915, 0]}
                  scale={[0.051, 0.009, 0.051]}
                />
                <mesh
                  name="circular_support"
                  geometry={nodes.circular_support.geometry}
                  material={materials.accent}
                  position={[2.641, 0.909, 0]}
                  scale={[0.224, 0.023, 0.224]}
                />
                <mesh
                  name="pipe_clamps"
                  geometry={nodes.pipe_clamps.geometry}
                  material={materials.accent}
                  position={[3.76, 0.901, 0.158]}
                  rotation={[0, 0, -Math.PI / 2]}
                  scale={[0.025, 0.021, 0.025]}
                />
                <mesh
                  name="piping001"
                  geometry={nodes.piping001.geometry}
                  material={materials.accent}
                  position={[4.185, 0.978, 0.05]}
                  rotation={[Math.PI / 2, 0, -Math.PI / 2]}
                  scale={[0.016, 0.25, 0.016]}
                />
                <mesh
                  name="pipe_clamps001"
                  geometry={nodes.pipe_clamps001.geometry}
                  material={materials.accent}
                  position={[3.76, 0.898, 0.05]}
                  rotation={[0, 0, -Math.PI / 2]}
                  scale={[0.035, 0.051, 0.035]}
                />
                <mesh
                  name="droid_back_support"
                  geometry={nodes.droid_back_support.geometry}
                  material={materials.accent}
                  position={[2.209, 0.921, 0]}
                  scale={[0.162, 0.068, 0.326]}
                />
                <mesh
                  name="droid_front_support"
                  geometry={nodes.droid_front_support.geometry}
                  material={materials.accent}
                  position={[1.788, 0.947, 0]}
                  scale={[0.275, 0.043, 0.275]}
                />
                <mesh
                  name="pipe_clamps002"
                  geometry={nodes.pipe_clamps002.geometry}
                  material={materials.accent}
                  position={[2.56, 0.948, 0.12]}
                  rotation={[0, 0, -Math.PI / 2]}
                  scale={[0.046, 0.01, 0.046]}
                />
                <mesh
                  name="piping003"
                  geometry={nodes.piping003.geometry}
                  material={materials.accent}
                  position={[2.641, 0.934, 0]}
                  rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                  scale={[0.016, 0.102, 0.016]}
                />
                <mesh
                  name="thick_piping"
                  geometry={nodes.thick_piping.geometry}
                  material={materials.accent}
                  position={[2.641, 0.95, 0]}
                  scale={0.121}
                />
                <mesh
                  name="detail_cube"
                  geometry={nodes.detail_cube.geometry}
                  material={materials.accent}
                  position={[4.339, 0.909, 0.159]}
                  scale={[-0.015, -0.005, -0.033]}
                />
                <mesh
                  name="detail_cube001"
                  geometry={nodes.detail_cube001.geometry}
                  material={materials.accent}
                  position={[4.231, 0.909, 0.171]}
                  rotation={[0, -Math.PI / 2, 0]}
                  scale={[-0.02, -0.005, -0.045]}
                />
                <mesh
                  name="detail_cube002"
                  geometry={nodes.detail_cube002.geometry}
                  material={materials.accent}
                  position={[4.231, 0.909, 0.135]}
                  rotation={[0, -Math.PI / 2, 0]}
                  scale={[-0.008, -0.005, -0.045]}
                />
                <mesh
                  name="detail_cube003"
                  geometry={nodes.detail_cube003.geometry}
                  material={materials.accent}
                  position={[4.172, 0.909, 0.159]}
                  scale={[-0.006, -0.005, -0.033]}
                />
                <mesh
                  name="detail_cube004"
                  geometry={nodes.detail_cube004.geometry}
                  material={materials.accent}
                  position={[4.288, 0.924, 0.108]}
                  rotation={[-Math.PI, 0, -Math.PI]}
                  scale={[0.006, 0.01, 0.012]}
                />
                <mesh
                  name="detail_cube005"
                  geometry={nodes.detail_cube005.geometry}
                  material={materials.accent}
                  position={[4.06, 0.907, 0.131]}
                  rotation={[-Math.PI, 0, -Math.PI]}
                  scale={[0.006, 0.007, 0.032]}
                />
                <mesh
                  name="detail_cube006"
                  geometry={nodes.detail_cube006.geometry}
                  material={materials.accent}
                  position={[3.202, 0.907, 0.295]}
                  rotation={[-Math.PI, 0, -Math.PI]}
                  scale={[0.018, 0.021, 0.048]}
                />
                <mesh
                  name="detail_cube007"
                  geometry={nodes.detail_cube007.geometry}
                  material={materials.accent}
                  position={[2.921, 0.897, 0.092]}
                  rotation={[0, Math.PI / 2, 0]}
                  scale={[-0.006, -0.005, -0.033]}
                />
                <mesh
                  name="detail_cube008"
                  geometry={nodes.detail_cube008.geometry}
                  material={materials.accent}
                  position={[2.435, 0.896, 0.25]}
                  rotation={[0, Math.PI / 2, 0]}
                  scale={[-0.006, -0.005, -0.033]}
                />
                <mesh
                  name="detail_cube009"
                  geometry={nodes.detail_cube009.geometry}
                  material={materials.accent}
                  position={[2.522, 0.896, 0.29]}
                  rotation={[0, -Math.PI / 2, 0]}
                  scale={[-0.02, -0.005, -0.045]}
                />
                <mesh
                  name="detail_cube010"
                  geometry={nodes.detail_cube010.geometry}
                  material={materials.accent}
                  position={[2.522, 0.896, 0.253]}
                  rotation={[0, -Math.PI / 2, 0]}
                  scale={[-0.008, -0.005, -0.045]}
                />
                <mesh
                  name="detail_cube011"
                  geometry={nodes.detail_cube011.geometry}
                  material={materials.accent}
                  position={[2.94, 0.897, 0.04]}
                  scale={[-0.015, -0.005, -0.033]}
                />
                <mesh
                  name="back_port_panel"
                  geometry={nodes.back_port_panel.geometry}
                  material={materials.accent}
                  position={[5.271, 0.01, 0]}
                  rotation={[-Math.PI, 0, -Math.PI / 2]}
                  scale={[0.516, 0.05, 0.45]}
                />
                <mesh
                  name="back_port"
                  geometry={nodes.back_port.geometry}
                  material={materials.accent}
                  position={[5.344, -0.016, 0]}
                  rotation={[0, 0, -Math.PI / 2]}
                  scale={[0.357, 0.04, 0.357]}
                />
                <mesh
                  name="back_detail_cube001"
                  geometry={nodes.back_detail_cube001.geometry}
                  material={materials.accent}
                  position={[5.276, 0.16, 0.622]}
                  rotation={[0.337, 0, -Math.PI / 2]}
                  scale={[-0.019, -0.02, -0.204]}
                />
                <mesh
                  name="back_detail_cube002"
                  geometry={nodes.back_detail_cube002.geometry}
                  material={materials.accent}
                  position={[5.229, -0.712, 0.336]}
                  rotation={[0, 0, -Math.PI / 2]}
                  scale={[-0.008, -0.02, -0.107]}
                />
                <mesh
                  name="back_detail_cylinder001"
                  geometry={nodes.back_detail_cylinder001.geometry}
                  material={materials.accent}
                  position={[5.24, -0.585, 0.513]}
                  rotation={[0, 0, -Math.PI / 2]}
                  scale={[0.088, 0.059, 0.088]}
                />
                <mesh
                  name="back_detail_cylinder002"
                  geometry={nodes.back_detail_cylinder002.geometry}
                  material={materials.accent}
                  position={[5.145, -0.585, 0.513]}
                  rotation={[0, 0, -Math.PI / 2]}
                  scale={[0.049, 0.186, 0.049]}
                />
                <mesh
                  name="back_detail_cube003"
                  geometry={nodes.back_detail_cube003.geometry}
                  material={materials.accent}
                  position={[5.236, -0.801, 0.453]}
                  scale={[-0.02, -0.02, -0.107]}
                />
                <mesh
                  name="back_detail_cylinder003"
                  geometry={nodes.back_detail_cylinder003.geometry}
                  material={materials.body_accent}
                  position={[5.454, -0.016, 0.195]}
                  rotation={[0, 0, -Math.PI / 2]}
                  scale={[0.011, 0.007, 0.011]}
                />
                <mesh
                  name="back_detail_cylinder004"
                  geometry={nodes.back_detail_cylinder004.geometry}
                  material={materials.accent}
                  position={[5.322, 0.238, 0.391]}
                  rotation={[1.075, 0, -Math.PI / 2]}
                  scale={[0.018, 0.069, 0.018]}
                />
                <mesh
                  name="back_detail_cylinder005"
                  geometry={nodes.back_detail_cylinder005.geometry}
                  material={materials.accent}
                  position={[5.277, 0.432, 0.387]}
                  rotation={[0, 0, -Math.PI / 2]}
                  scale={[0.026, 0.101, 0.026]}
                />
                <mesh
                  name="back_detail_cylinder006"
                  geometry={nodes.back_detail_cylinder006.geometry}
                  material={materials.accent}
                  position={[5.21, 0.106, 0.551]}
                  rotation={[0, 0, -Math.PI / 2]}
                  scale={[0.009, 0.034, 0.009]}
                />
                <mesh
                  name="back_detail_cube004"
                  geometry={nodes.back_detail_cube004.geometry}
                  material={materials.accent}
                  position={[5.325, -0.379, 0.397]}
                  rotation={[Math.PI / 2, 0, -Math.PI / 2]}
                  scale={[-0.005, -0.013, -0.071]}
                />
                <mesh
                  name="back_detail_cylinder007"
                  geometry={nodes.back_detail_cylinder007.geometry}
                  material={materials.accent}
                  position={[5.244, -0.422, 0.552]}
                  rotation={[0, 0, -Math.PI / 2]}
                  scale={[0.025, 0.018, 0.025]}
                />
                <mesh
                  name="back_detail_cube005"
                  geometry={nodes.back_detail_cube005.geometry}
                  material={materials.accent}
                  position={[5.248, 0.379, 0.558]}
                  rotation={[0, 0, -Math.PI / 2]}
                  scale={[-0.061, -0.02, -0.061]}
                />
                <mesh
                  name="back_detail_cylinder008"
                  geometry={nodes.back_detail_cylinder008.geometry}
                  material={materials.accent}
                  position={[5.277, 0.355, 0.534]}
                  rotation={[0, 0, -Math.PI / 2]}
                  scale={[0.025, 0.018, 0.025]}
                />
                <mesh
                  name="back_detail_cube006"
                  geometry={nodes.back_detail_cube006.geometry}
                  material={materials.accent}
                  position={[5.234, 0.402, -0.477]}
                  rotation={[Math.PI / 2, 0, -Math.PI / 2]}
                  scale={[-0.007, -0.013, -0.184]}
                />
                <mesh
                  name="back_detail_cylinder009"
                  geometry={nodes.back_detail_cylinder009.geometry}
                  material={materials.accent}
                  position={[5.244, 0.255, -0.669]}
                  rotation={[0, 0, -Math.PI / 2]}
                  scale={[0.025, 0.018, 0.025]}
                />
                <mesh
                  name="back_detail_cube007"
                  geometry={nodes.back_detail_cube007.geometry}
                  material={materials.accent}
                  position={[5.234, -0.22, 0.674]}
                  rotation={[Math.PI / 2, 0, -Math.PI / 2]}
                  scale={[-0.007, -0.013, -0.12]}
                />
                <mesh
                  name="back_detail_cylinder010"
                  geometry={nodes.back_detail_cylinder010.geometry}
                  material={materials.accent}
                  position={[5.244, -0.115, -0.501]}
                  rotation={[0, 0, -Math.PI / 2]}
                  scale={[0.025, 0.018, 0.025]}
                />
                <group name="droid_body" position={[1.79, 1.074, 0]} scale={0.234}>
                  <mesh
                    name="Sphere001"
                    geometry={nodes.Sphere001.geometry}
                    material={materials.droid_body}
                  />
                  <mesh
                    name="Sphere001_1"
                    geometry={nodes.Sphere001_1.geometry}
                    material={materials.droid_head}
                  />
                  <mesh
                    name="Sphere001_2"
                    geometry={nodes.Sphere001_2.geometry}
                    material={materials.droid_accent}
                  />
                  <mesh
                    name="Sphere001_3"
                    geometry={nodes.Sphere001_3.geometry}
                    material={materials.droid_light}
                  />
                </group>
                <group
                  name="droid_legs"
                  position={[1.787, 1.257, 0]}
                  rotation={[-Math.PI / 2, 0, -Math.PI]}
                  scale={[-0.201, -0.016, -0.201]}>
                  <mesh
                    name="Cylinder007"
                    geometry={nodes.Cylinder007.geometry}
                    material={materials.droid_body}
                  />
                  <mesh
                    name="Cylinder007_1"
                    geometry={nodes.Cylinder007_1.geometry}
                    material={materials.droid_head}
                  />
                </group>
                <mesh
                  name="droid_lens_large"
                  geometry={nodes.droid_lens_large.geometry}
                  material={materials.Material}
                  position={[1.617, 1.171, -0.021]}
                  scale={-0.057}
                />
                <mesh
                  name="droid_lens_small"
                  geometry={nodes.droid_lens_small.geometry}
                  material={materials.Material}
                  position={[1.603, 1.11, 0.068]}
                  scale={-0.046}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/models/x-wing-openable.glb');
