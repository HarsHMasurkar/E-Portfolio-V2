/**
 * FloatingObject Component
 * A clickable, hoverable 3D object that opens a section overlay
 */

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float, MeshTransmissionMaterial, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { usePortfolioStore } from '../../store/portfolioStore';

const SECTION_CONFIGS = {
  about: {
    position: [-3.5, 0.5, 0],
    geometry: 'sphere',
    color: '#00ffff',
    emissive: '#00aaaa',
    label: 'ABOUT ME',
    icon: '◎',
    floatSpeed: 1.2,
    floatIntensity: 0.4,
  },
  skills: {
    position: [3.5, 0.5, 0],
    geometry: 'octahedron',
    color: '#7b00ff',
    emissive: '#4400aa',
    label: 'SKILLS',
    icon: '⬡',
    floatSpeed: 1.5,
    floatIntensity: 0.5,
  },
  projects: {
    position: [0, 2, -1],
    geometry: 'torus',
    color: '#ff007a',
    emissive: '#aa0055',
    label: 'PROJECTS',
    icon: '◈',
    floatSpeed: 1.0,
    floatIntensity: 0.3,
  },
  experience: {
    position: [-2, -1.5, 1],
    geometry: 'box',
    color: '#00ff9f',
    emissive: '#00aa66',
    label: 'EXPERIENCE',
    icon: '▣',
    floatSpeed: 0.8,
    floatIntensity: 0.35,
  },
  contact: {
    position: [2.5, -1.5, 1],
    geometry: 'icosahedron',
    color: '#ffaa00',
    emissive: '#aa7700',
    label: 'CONTACT',
    icon: '✦',
    floatSpeed: 1.3,
    floatIntensity: 0.45,
  },
};

const ObjectGeometry = ({ type, hovered }) => {
  const args = {
    sphere: [0.6, 32, 32],
    octahedron: [0.7],
    torus: [0.5, 0.2, 16, 100],
    box: [0.9, 0.9, 0.9],
    icosahedron: [0.65, 1],
  };

  const geomProps = args[type] || args.sphere;

  const sharedMaterial = (
    <meshStandardMaterial
      color={hovered ? '#ffffff' : '#888888'}
      metalness={0.8}
      roughness={0.1}
    />
  );

  switch (type) {
    case 'sphere':    return <sphereGeometry args={geomProps} />;
    case 'octahedron': return <octahedronGeometry args={geomProps} />;
    case 'torus':     return <torusGeometry args={geomProps} />;
    case 'box':       return <boxGeometry args={geomProps} />;
    case 'icosahedron': return <icosahedronGeometry args={geomProps} />;
    default:          return <sphereGeometry args={[0.6, 32, 32]} />;
  }
};

const FloatingObject = ({ sectionKey }) => {
  const config = SECTION_CONFIGS[sectionKey];
  const meshRef = useRef();
  const glowRef = useRef();
  const ringRef = useRef();
  const [hovered, setHovered] = useState(false);
  const { setActiveSection, activeSection, playSound } = usePortfolioStore();

  const isActive = activeSection === sectionKey;

  // Continuous rotation + response to hover/active state
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;

    meshRef.current.rotation.y += hovered ? 0.03 : 0.008;
    meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.1;

    // Scale pulse when hovered or active
    const targetScale = isActive ? 1.3 : hovered ? 1.15 : 1.0;
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.08
    );

    // Glow ring rotation
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.02;
      ringRef.current.rotation.x = Math.sin(t * 0.5) * 0.3;
    }
  });

  const handleClick = () => {
    setActiveSection(sectionKey);
    playSound('click');
  };

  const handlePointerEnter = () => {
    setHovered(true);
    document.body.style.cursor = 'pointer';
    playSound('hover');
  };

  const handlePointerLeave = () => {
    setHovered(false);
    document.body.style.cursor = 'auto';
  };

  return (
    <Float
      speed={config.floatSpeed}
      rotationIntensity={0.2}
      floatIntensity={config.floatIntensity}
      position={config.position}
    >
      {/* Main clickable mesh */}
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        castShadow
      >
        <ObjectGeometry type={config.geometry} hovered={hovered} />
        <meshStandardMaterial
          color={hovered || isActive ? config.color : '#1a1a3e'}
          emissive={config.emissive}
          emissiveIntensity={hovered || isActive ? 1.5 : 0.3}
          metalness={0.8}
          roughness={0.1}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Glow ring around active objects */}
      {(hovered || isActive) && (
        <mesh ref={ringRef}>
          <torusGeometry args={[1.0, 0.02, 8, 64]} />
          <meshBasicMaterial color={config.color} transparent opacity={0.6} />
        </mesh>
      )}

      {/* Point light emanating from object */}
      <pointLight
        color={config.color}
        intensity={hovered || isActive ? 3 : 0.8}
        distance={4}
        decay={2}
      />

      {/* Section label below object */}
      <Text
        position={[0, -1.1, 0]}
        fontSize={0.14}
        color={hovered || isActive ? config.color : '#8892b0'}
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/spacegrotesk/v16/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gowFXNvNA.woff2"
        letterSpacing={0.1}
      >
        {config.label}
      </Text>

      {/* Icon in center */}
      <Text
        position={[0, 0, 0.75]}
        fontSize={0.25}
        color={config.color}
        anchorX="center"
        anchorY="middle"
      >
        {config.icon}
      </Text>
    </Float>
  );
};

export { SECTION_CONFIGS };
export default FloatingObject;
