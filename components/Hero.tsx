import React, { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Environment, shaderMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Custom Dither Shader
const DitherShaderMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uColorStart: { value: new THREE.Color('#050505') },
    uColorEnd: { value: new THREE.Color('#e5e5e5') },
    uLightPos: { value: new THREE.Vector3(10, 10, 10) },
    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPos;

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vPos = (modelMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec3 uColorStart;
    uniform vec3 uColorEnd;
    uniform vec3 uLightPos;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPos;

    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    void main() {
      // Light calculation
      vec3 lightDir = normalize(uLightPos - vPos);
      float diff = max(dot(vNormal, lightDir), 0.0);
      
      // Ambient
      diff += 0.15;

      // Screen space dithering
      vec2 grid = gl_FragCoord.xy / 2.0; // Scale of the grain
      float noise = random(grid);
      
      // The core dither logic: mixing light intensity with noise
      float threshold = diff;
      float dither = step(noise, threshold); // 0 or 1
      
      // Smooth out edges slightly or keep harsh for brutalism
      // For "High End Print", we want a bit of softness in the transition if possible, 
      // but 'step' gives the best "stochastic" look.
      
      vec3 finalColor = mix(uColorStart, uColorEnd, dither);
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
};

const FluidSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Memoize the shader material to avoid recreation on every render
  const shaderArgs = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uColorStart: { value: new THREE.Color('#050505') },
      uColorEnd: { value: new THREE.Color('#d4d4d4') },
      uLightPos: { value: new THREE.Vector3(5, 5, 5) },
      uResolution: { value: new THREE.Vector2(100, 100) }
    },
    vertexShader: DitherShaderMaterial.vertexShader,
    fragmentShader: DitherShaderMaterial.fragmentShader,
  }), []);

  useFrame((state) => {
    if (meshRef.current && materialRef.current) {

      meshRef.current.rotation.x = state.clock.getElapsedTime() * 10;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 7;


      const { x, y } = state.pointer;
      meshRef.current.rotation.x += y * 0.5;
      meshRef.current.rotation.y += x * 0.5;

      // Update uniforms
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();

      // Pulse the light position slightly
      materialRef.current.uniforms.uLightPos.value.x = 5 + Math.sin(state.clock.getElapsedTime()) * 10;
    }
  });

  return (
    <Sphere args={[1, 64, 64]} ref={meshRef} scale={1.2}>
      <shaderMaterial
        ref={materialRef}
        attach="material"
        args={[shaderArgs]}
      />
    </Sphere>
  );
};

const MagneticButton = () => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const x = (clientX - centerX) * 0.3; // Increased magnetic pull
    const y = (clientY - centerY) * 0.3;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      className="group relative mt-12 px-10 py-5 bg-[#F5F5F5] text-[#050505] font-bold tracking-tight text-sm overflow-hidden"
      data-interactive
    >
      <span className="relative z-10 group-hover:text-[#F5F5F5] transition-colors duration-300">INITIALIZE RELIA</span>
      <div className="absolute inset-0 bg-[#1a1a1a] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
    </motion.button>
  );
};

import { useState } from 'react';

export const Hero = () => {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050505]">

      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 35 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.2} />
            <FluidSphere />
          </Suspense>
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl flex flex-col items-center">
        <div className="overflow-hidden mb-2">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[12vw] md:text-[9rem] leading-none font-bold tracking-tighter text-[#F5F5F5] mix-blend-difference"
          >
            RELIA
          </motion.h1>
        </div>

        <div className="overflow-hidden">
          <motion.p
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ delay: 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-[#e8e6e6] font-light max-w-lg mx-auto tracking-widest"
          >
            THE INTELLIGENT FILTER
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <MagneticButton />
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-12 left-12 text-[10px] font-mono text-[#333] hidden md:block">
        SYSTEM STATUS: ONLINE<br />
        V.0.4.0 [STABLE]
      </div>
      <div className="absolute top-1/2 left-0 w-full h-px bg-[#111] -z-10" />
      <div className="absolute left-1/2 top-0 w-px h-full bg-[#111] -z-10" />
    </section>
  );
};
