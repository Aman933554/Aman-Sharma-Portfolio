"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
// @ts-expect-error - no types available for maath random esm path
import * as random from "maath/random/dist/maath-random.esm";
import * as THREE from "three";

function NeuralParticles(props: any) {
  const ref = useRef<THREE.Points>(null);
  
  // Generate 5000 random points inside a sphere
  const sphere = useMemo(() => {
    return random.inSphere(new Float32Array(5000 * 3), { radius: 1.5 });
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere as Float32Array} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#00E5FF" // Neon Blue
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 z-0 w-full h-full pointer-events-none bg-[#0A0A0A]">
      {/* Fallback gradient if WebGL fails */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/90 to-[#050505] z-0" />
      
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-10 opacity-60">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <NeuralParticles />
        </Canvas>
      </div>

      {/* Decorative Glow Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-neon-purple/20 rounded-full blur-[100px] z-0 animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-neon-blue/20 rounded-full blur-[100px] z-0 animate-pulse" style={{ animationDelay: '2s' }} />
    </div>
  );
}
