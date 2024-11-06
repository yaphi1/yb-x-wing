import * as THREE from 'three';
import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const glsl = (x: TemplateStringsArray) => x.join(' ');

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

const radiusTop = 0.3;
const radiusBottom = 0.1;
const height = 2.5;
const radialSegments = 32;
const heightSegments = 1;
const isOpenEnded = true;

const vertexShader = glsl`
  varying vec2 vUv;

  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    
    vUv = uv;
  }
`;

const fragmentShader = glsl`
  uniform float uTime;

  varying vec2 vUv;

  //	Classic Perlin 2D Noise 
  //	by Stefan Gustavson
  vec4 permute(vec4 x) {
      return mod(((x*34.0)+1.0)*x, 289.0);
  }
  vec2 fade(vec2 t) {
      return t*t*t*(t*(t*6.0-15.0)+10.0);
  }
  float cnoise(vec2 P) {
    vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
    vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
    Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
    vec4 ix = Pi.xzxz;
    vec4 iy = Pi.yyww;
    vec4 fx = Pf.xzxz;
    vec4 fy = Pf.yyww;
    vec4 i = permute(permute(ix) + iy);
    vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
    vec4 gy = abs(gx) - 0.5;
    vec4 tx = floor(gx + 0.5);
    gx = gx - tx;
    vec2 g00 = vec2(gx.x,gy.x);
    vec2 g10 = vec2(gx.y,gy.y);
    vec2 g01 = vec2(gx.z,gy.z);
    vec2 g11 = vec2(gx.w,gy.w);
    vec4 norm = 1.79284291400159 - 0.85373472095314 * vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
    g00 *= norm.x;
    g01 *= norm.y;
    g10 *= norm.z;
    g11 *= norm.w;
    float n00 = dot(g00, vec2(fx.x, fy.x));
    float n10 = dot(g10, vec2(fx.y, fy.y));
    float n01 = dot(g01, vec2(fx.z, fy.z));
    float n11 = dot(g11, vec2(fx.w, fy.w));
    vec2 fade_xy = fade(Pf.xy);
    vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
    float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
    return 2.3 * n_xy;
  }

  void main() {
    float sinusoid = sin(20.0 * uTime);
    float r = vUv.y;
    float g = vUv.y * 0.5 + 0.5;
    float b = 1.0;
    float a = vUv.y;

    // original flickering gradient
    gl_FragColor = vec4(r, g, b, a + sin(vUv.y * sinusoid * 0.2));


    float strength = cnoise(vec2(
        vUv.x * 2.0,
        vUv.y * 0.2 + uTime * 0.5
    ) * 30.0);

    // noise version
    // gl_FragColor = vec4(
    //     strength * r, 
    //     strength * g,
    //     strength * b,
    //     strength * (a + sin(vUv.y * sinusoid * 0.2))
    // );
  }
`;

export function JetFlame({ flameRef, jetPlacement } : {
  flameRef: MeshRef;
  jetPlacement: JetPlacementCoefficients;
}) {
  const shaderRef = useRef<THREE.ShaderMaterial>(null!);
  const uniforms = useMemo(() => ({
    uTime: { value: 0.0 },
  }), []);

  useFrame((state) => {
    shaderRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
  });

  return (
    <mesh
      ref={flameRef}
      position={[
        3.6,
        jetPlacement.y * 0.9,
        jetPlacement.z * 1.6,
      ]}
      rotation-z={0.5 * Math.PI}
    >
      <cylinderGeometry args={[
        radiusTop,
        radiusBottom,
        height,
        radialSegments,
        heightSegments,
        isOpenEnded,
      ]} />
      <shaderMaterial
        ref={shaderRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        side={THREE.FrontSide}
        transparent={true}
        uniforms={uniforms}
      />
    </mesh>
  );
}