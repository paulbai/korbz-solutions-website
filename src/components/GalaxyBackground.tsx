import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function StarField({ count, size, color, speed, depth }: {
  count: number;
  size: number;
  color: string;
  speed: number;
  depth: number;
}) {
  const ref = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 2] = (Math.random() - 0.5) * depth;
    }
    return pos;
  }, [count, depth]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * speed * 0.02;
      ref.current.rotation.x = state.clock.elapsedTime * speed * 0.01;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Nebula({ position, color, scale }: {
  position: [number, number, number];
  color: string;
  scale: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[3, 32, 32]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.04}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function ParallaxLayer() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(({ mouse }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouse.x * 0.1,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -mouse.y * 0.1,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef}>
      <StarField count={400} size={0.05} color="#ffffff" speed={0.3} depth={30} />
      <StarField count={250} size={0.08} color="#C9A96E" speed={0.5} depth={25} />
      <StarField count={150} size={0.12} color="#E8553A" speed={0.7} depth={20} />
      <StarField count={80} size={0.18} color="#F4D4A8" speed={1.0} depth={15} />

      <Nebula position={[-8, 4, -10]} color="#E8553A" scale={4} />
      <Nebula position={[10, -6, -12]} color="#C9A96E" scale={5} />
      <Nebula position={[0, 0, -15]} color="#8B4A2B" scale={6} />
      <Nebula position={[-5, -8, -8]} color="#E8553A" scale={3} />
    </group>
  );
}

export default function GalaxyBackground() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <ParallaxLayer />
      </Canvas>
    </div>
  );
}
