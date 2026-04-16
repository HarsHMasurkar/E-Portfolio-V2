/**
 * Scene3D Component
 * Main Three.js scene with all 3D objects, lights, and environment
 */

import { Suspense, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Stars,
  Environment,
  Grid,
  ContactShadows,
  Text,
  PerspectiveCamera,
} from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';
import FloatingObject from './FloatingObject';
import { usePortfolioStore } from '../../store/portfolioStore';

// ─── Animated Camera that follows active section ──────────────────────────────
const DynamicCamera = () => {
  const { activeSection } = usePortfolioStore();
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 0, 7));

  useFrame(() => {
    // Subtle camera drift
    const t = Date.now() * 0.0005;
    targetPos.current.x = Math.sin(t * 0.3) * 0.5;
    targetPos.current.y = Math.cos(t * 0.2) * 0.3 + 0.5;

    // Smoothly interpolate camera
    camera.position.lerp(targetPos.current, 0.02);
    camera.lookAt(0, 0, 0);
  });

  return null;
};

// ─── Holographic Ground Grid ──────────────────────────────────────────────────
const HolographicGrid = () => {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.material.opacity = 0.2 + Math.sin(clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
      <planeGeometry args={[30, 30, 30, 30]} />
      <meshBasicMaterial
        color="#00ffff"
        wireframe
        transparent
        opacity={0.2}
      />
    </mesh>
  );
};

// ─── Floating ambient particles (3D) ─────────────────────────────────────────
const AmbientParticles = () => {
  const pointsRef = useRef();
  const count = 200;

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.elapsedTime * 0.05;
      pointsRef.current.rotation.x = clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#00ffff"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
};

// ─── Central Holographic Title ──────────────────────────────────────────────
const CentralTitle = () => {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y = 3.5 + Math.sin(clock.elapsedTime * 0.8) * 0.1;
    }
  });

  return (
    <group ref={ref}>
      <Text
        position={[0, 3.5, 0]}
        fontSize={0.5}
        color="#00ffff"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4TC1C4G-BgA.woff2"
        letterSpacing={0.15}
      >
        HARSH MASURKAR
      </Text>
      <Text
        position={[0, 2.9, 0]}
        fontSize={0.18}
        color="#8892b0"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.08}
      >
        Full Stack Developer • 3D Creative
      </Text>
    </group>
  );
};

// ─── Main Scene ───────────────────────────────────────────────────────────────
const Scene3D = ({ onLoaded }) => {
  const sections = ['about', 'skills', 'projects', 'experience', 'contact'];

  return (
    <Canvas
      shadows
      style={{ position: 'fixed', inset: 0, background: 'transparent' }}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
        powerPreference: 'high-performance',
      }}
      dpr={[1, 1.5]}  // Limit DPR for performance
    >
      <PerspectiveCamera makeDefault position={[0, 0.5, 7]} fov={60} />

      {/* Lighting */}
      <ambientLight intensity={0.1} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} castShadow />
      <pointLight position={[0, 0, 0]} color="#00ffff" intensity={0.5} distance={10} />
      <pointLight position={[-5, 3, -3]} color="#7b00ff" intensity={0.8} distance={8} />
      <pointLight position={[5, -2, 2]} color="#ff007a" intensity={0.6} distance={8} />

      {/* Dynamic Camera */}
      <DynamicCamera />

      {/* Stars Background */}
      <Stars
        radius={100}
        depth={50}
        count={3000}
        factor={3}
        saturation={0}
        fade
        speed={0.5}
      />

      {/* Ambient 3D particles */}
      <AmbientParticles />

      {/* Ground Grid */}
      <HolographicGrid />

      {/* Contact Shadows for objects */}
      <ContactShadows
        position={[0, -2.5, 0]}
        opacity={0.3}
        scale={15}
        blur={2}
        color="#00ffff"
      />

      {/* Central title text */}
      <CentralTitle />

      {/* Lazy-loaded floating section objects */}
      <Suspense fallback={null}>
        {sections.map((section) => (
          <FloatingObject key={section} sectionKey={section} />
        ))}
      </Suspense>

      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom
          intensity={1.5}
          luminanceThreshold={0.3}
          luminanceSmoothing={0.9}
          blendFunction={BlendFunction.ADD}
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.001, 0.001]}
        />
      </EffectComposer>
    </Canvas>
  );
};

export default Scene3D;
