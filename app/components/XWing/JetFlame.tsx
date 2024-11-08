import * as THREE from 'three';
import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { glsl } from './shaderHelpers';

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
const height = 2.2;
const radialSegments = 32;
const heightSegments = 1;
const isOpenEnded = true;

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

const fragmentShader = glsl`
  uniform float uTime;
  uniform float uRandomSeed;

  varying vec2 vUv;

  void main() {
    float sinusoid = sin(30.0 * (uTime + uRandomSeed));
    float r = vUv.y;
    float g = vUv.y * 0.5 + 0.5;
    float b = 1.0;
    float a = vUv.y;

    gl_FragColor = vec4(r, g, b, a + sin(vUv.y * sinusoid * 0.2));
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

export function JetFlame({ flameRef, jetPlacement } : {
  flameRef: MeshRef;
  jetPlacement: JetPlacementCoefficients;
}) {
  const shaderRef = useRef<THREE.ShaderMaterial>(null!);
  const shaderRefInner = useRef<THREE.ShaderMaterial>(null!);
  const flameRefInner = useRef<THREE.Mesh>(null!);
  const uniforms = useMemo(() => ({
    uTime: { value: 0.0 },
    uRandomSeed: { value: Math.random() * 10 },
  }), []);

  useFrame((state) => {
    shaderRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    shaderRefInner.current.uniforms.uTime.value = state.clock.getElapsedTime();
    flameRefInner.current.scale.y = 9 + 0.1 * Math.sin(40 * state.clock.getElapsedTime());
  });

  return (
    <>
      <mesh
        ref={flameRef}
        position={[
          4.1,
          jetPlacement.y * 0.9,
          jetPlacement.z * 1.6,
        ]}
        rotation-z={0.5 * Math.PI}
      >
        <cylinderGeometry
          args={[
            radiusTop,
            radiusBottom,
            height,
            radialSegments,
            heightSegments,
            isOpenEnded,
          ]}
        />
        <shaderMaterial
          ref={shaderRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          side={THREE.FrontSide}
          transparent={true}
          uniforms={uniforms}
        />
      </mesh>
      <mesh
        ref={flameRefInner}
        position={[
          3.1,
          jetPlacement.y * 0.9,
          jetPlacement.z * 1.6,
        ]}
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
    </>
  );
}