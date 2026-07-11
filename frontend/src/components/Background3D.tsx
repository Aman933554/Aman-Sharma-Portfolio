"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Float, Line, Sphere, Icosahedron, Box, Octahedron } from "@react-three/drei";
import * as THREE from "three";

// Floating geometric shapes representing software modules/architecture
function FloatingGeometries() {
  const isReducedMotion = useRef(false);

  useEffect(() => {
    isReducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  if (isReducedMotion.current) return null;

  return (
    <>
      <Float speed={1.5} rotationIntensity={2} floatIntensity={2} position={[-3, 2, -5]}>
        <Icosahedron args={[0.5, 0]}>
          <meshBasicMaterial color="#3B82F6" wireframe transparent opacity={0.3} />
        </Icosahedron>
      </Float>
      
      <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5} position={[4, -1, -4]}>
        <Octahedron args={[0.6, 0]}>
          <meshBasicMaterial color="#8B5CF6" wireframe transparent opacity={0.3} />
        </Octahedron>
      </Float>
      
      <Float speed={1} rotationIntensity={2.5} floatIntensity={1} position={[-4, -2, -6]}>
        <Box args={[0.7, 0.7, 0.7]}>
          <meshBasicMaterial color="#3B82F6" wireframe transparent opacity={0.2} />
        </Box>
      </Float>

      <Float speed={2.5} rotationIntensity={1} floatIntensity={2} position={[3, 3, -7]}>
        <Icosahedron args={[0.4, 0]}>
          <meshBasicMaterial color="#8B5CF6" wireframe transparent opacity={0.2} />
        </Icosahedron>
      </Float>
    </>
  );
}

// Data Stream Wave representing data flow and connectivity
function DataWave() {
  const count = 100;
  const sep = 0.3;
  
  const positions = useMemo(() => {
    const positions = [];
    for (let xi = 0; xi < count; xi++) {
      for (let zi = 0; zi < count; zi++) {
        const x = sep * (xi - count / 2);
        const z = sep * (zi - count / 2);
        const y = 0;
        positions.push(x, y, z);
      }
    }
    return new Float32Array(positions);
  }, [count, sep]);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    let i = 0;
    for (let xi = 0; xi < count; xi++) {
      for (let zi = 0; zi < count; zi++) {
        const x = sep * (xi - count / 2);
        const z = sep * (zi - count / 2);
        
        // Complex wave function to look like flowing data
        const y = 
          Math.sin(x * 0.3 + time * 0.5) * 0.5 + 
          Math.sin(z * 0.2 + time * 0.3) * 0.5 +
          Math.cos((x + z) * 0.2 + time * 0.5) * 0.25;
        
        positions[i + 1] = y;
        i += 3;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Slow rotation of the entire sea
    pointsRef.current.rotation.y = time * 0.05;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false} position={[0, -3, -10]} rotation={[0.2, 0, 0]}>
      <PointMaterial
        transparent
        color="#3B82F6"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.6}
      />
    </Points>
  );
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 z-0 w-full h-full pointer-events-none bg-background">
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-10 opacity-70">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <fog attach="fog" args={["#09090B", 5, 25]} />
          <DataWave />
          <FloatingGeometries />
        </Canvas>
      </div>

      {/* Subtle Aurora Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-[#3B82F6]/7 rounded-full blur-[150px] z-0 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#8B5CF6]/7 rounded-full blur-[150px] z-0 animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
      <div className="absolute top-[30%] left-[30%] w-[40vw] h-[40vw] bg-[#22C55E]/3 rounded-full blur-[150px] z-0 animate-pulse" style={{ animationDuration: '12s', animationDelay: '4s' }} />
    </div>
  );
}
