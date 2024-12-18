import * as THREE from 'three';
import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { glsl, hslToRgb } from './shaderHelpers';
import { topSpeed } from './vehicleAndCamConfig';

type MeshRef = React.MutableRefObject<THREE.Mesh>;

type JetPlacementCoefficients = {
  y: number;
  z: number;
};
export const JetPlacement: Record<string, JetPlacementCoefficients> = {
  topRight: { y: 1, z: -1 },
  topLeft: { y: 1, z: 1 },
  bottomRight: { y: -1, z: -1 },
  bottomLeft: { y: -1, z: 1 },
} as const;

const radiusTop = 0.26;
const radiusBottom = 0.1;
const cylinderLength = 2.2;
const radialSegments = 32;
const heightSegments = 1;
const isOpenEnded = true;

const isCustomJetColorEnabled = false;

const vertexShader = glsl`
  uniform float uTime;
  uniform float uRandomSeed;

  varying vec2 vUv;

  void main() {
    vec3 modifiedPosition = position;
    modifiedPosition.x *= 0.1 * (sin(uTime * 20.0 + uRandomSeed) + 1.0) + 0.8;
    modifiedPosition.z *= 0.1 * (sin(uTime * 20.0 + uRandomSeed + 2.0) + 1.0) + 0.8;
    modifiedPosition.y *= (1.0 - position.y) * 0.05 * (sin(uTime * 20.0 + uRandomSeed) + 1.0) + 1.0;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(modifiedPosition, 1.0);
    
    vUv = uv;
  }
`;

const vertexShaderInner = glsl`
  uniform float uTime;
  uniform float uRandomSeed;

  varying vec2 vUv;

  void main() {
    vec3 modifiedPosition = position;
    float timingOffsetFromOuterFlame = 2.0;
    modifiedPosition.x *= 0.1 * (sin(uTime * 60.0) + 1.0) + 0.8;
    modifiedPosition.y *= (1.0 - position.y)
      * 0.05
      * (sin(uTime * 20.0 + uRandomSeed + timingOffsetFromOuterFlame) + 1.0)
      + 1.0
    ;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(modifiedPosition, 1.0);
    
    vUv = uv;
  }
`;

const heatBasedFragmentShader = hslToRgb + glsl`
  uniform float uTime;
  uniform float uRandomSeed;
  uniform float uHeat;

  varying vec2 vUv;

  void main() {
    float sinusoid = sin(30.0 * (uTime + uRandomSeed));
    float r = vUv.y + (1.0 - uHeat);
    float g = vUv.y * 0.5 + 0.5;
    float b = vUv.y + uHeat;
    float a = vUv.y + sin(vUv.y * sinusoid * 0.2);

    gl_FragColor = vec4(r, g, b, a);
  }
`;

const colorBasedFragmentShader = hslToRgb + glsl`
  uniform float uTime;
  uniform float uRandomSeed;

  varying vec2 vUv;

  void main() {
    float sinusoid = sin(30.0 * (uTime + uRandomSeed));
    float maxLightness = 1.0;
    float minLightness = 0.4;
    float lightness = vUv.y * (maxLightness - minLightness) + minLightness;
    float hue = 150.0;
    vec3 rgb = hslToRgb(hue, 1.0, lightness);
    float a = vUv.y + sin(vUv.y * sinusoid * 0.2);

    gl_FragColor = vec4(rgb, a);
  }
`;

const fragmentShaderInner = glsl`
  uniform float uTime;
  uniform float uRandomSeed;

  varying vec2 vUv;

  void main() {
    float sinusoid = sin(20.0 * (uTime + uRandomSeed) + 5.0);
    float r = 1.0;
    float g = 1.0;
    float b = 1.0;
    float a = 0.6;

    gl_FragColor = vec4(r, g, b, a);
  }
`;

const jet = {
  strength: 0,
  heat: 1,
};

export function JetFlame({ flameRef, jetPlacement, speedRef } : {
  flameRef: MeshRef;
  jetPlacement: JetPlacementCoefficients;
  speedRef: React.MutableRefObject<number>;
}) {
  const jetContainerRef = useRef<THREE.Group>(null!);
  const shaderRef = useRef<THREE.ShaderMaterial>(null!);
  const shaderRefInner = useRef<THREE.ShaderMaterial>(null!);
  const flameRefInner = useRef<THREE.Mesh>(null!);
  const uniforms = useMemo(() => ({
    uTime: { value: 0.0 },
    uRandomSeed: { value: Math.random() * 10 },
    uHeat: { value: 1.0 },
  }), []);

  useFrame((state) => {
    jet.strength = 0.7 * (speedRef.current / topSpeed) + 0.3;
    jet.heat = Math.max(2 * ((speedRef.current / topSpeed) - 0.5), 0);

    shaderRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    shaderRef.current.uniforms.uHeat.value = jet.heat;
    shaderRefInner.current.uniforms.uTime.value = state.clock.getElapsedTime();
    flameRefInner.current.scale.y = 9 + 0.1 * Math.sin(40 * state.clock.getElapsedTime());

    jetContainerRef.current.scale.x = jet.strength;
  });

  return (
    <group
      ref={jetContainerRef}
      position={[
        1.9,
        jetPlacement.y * 0.9,
        jetPlacement.z * 1.6,
      ]}
    >
      <mesh
        ref={flameRef}
        position-x={cylinderLength}
        rotation-z={0.5 * Math.PI}
      >
        <cylinderGeometry
          args={[
            radiusTop,
            radiusBottom,
            cylinderLength,
            radialSegments,
            heightSegments,
            isOpenEnded,
          ]}
        />
        <shaderMaterial
          ref={shaderRef}
          vertexShader={vertexShader}
          fragmentShader={isCustomJetColorEnabled ? colorBasedFragmentShader : heatBasedFragmentShader}
          side={THREE.FrontSide}
          transparent={true}
          uniforms={uniforms}
        />
      </mesh>
      <mesh
        ref={flameRefInner}
        position-x={cylinderLength - 1}
        rotation-z={0.5 * Math.PI}
      >
        <sphereGeometry args={[
          radiusTop * 0.6
        ]}/>
        <shaderMaterial
          ref={shaderRefInner}
          vertexShader={vertexShaderInner}
          fragmentShader={fragmentShaderInner}
          side={THREE.FrontSide}
          transparent={true}
          uniforms={uniforms}
        />
      </mesh>
    </group>
  );
}