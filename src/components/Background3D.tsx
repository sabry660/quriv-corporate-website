import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { SectionId, CameraKeyframe } from '../types';

interface Background3DProps {
  activeSection: SectionId;
  scrollProgress: number; // 0 to 1 overall scroll ratio
  reducedMotion?: boolean;
}

// Camera keyframes for each section inside the digital museum
export const CAMERA_KEYFRAMES: Record<SectionId, CameraKeyframe> = {
  hero: {
    position: [0, 0, 8],
    target: [0, 0, 0],
    rotationSpeed: 0.005,
    objectScale: 1.0,
  },
  about: {
    position: [3.5, 1.8, 5.2],
    target: [-0.5, 0, 0],
    rotationSpeed: 0.008,
    objectScale: 1.15,
  },
  technologies: {
    position: [-4.2, -1.2, 6.0],
    target: [0.8, 0.2, 0],
    rotationSpeed: 0.012,
    objectScale: 1.3,
  },
  process: {
    position: [2.2, 2.8, 5.5],
    target: [-0.4, -0.2, 0],
    rotationSpeed: 0.008,
    objectScale: 1.2,
  },
  industries: {
    position: [0, 4.5, 4.8],
    target: [0, -0.5, 0],
    rotationSpeed: 0.006,
    objectScale: 1.1,
  },
  gallery: {
    position: [5.0, -2.0, 4.2],
    target: [-1.0, 0.5, 0],
    rotationSpeed: 0.01,
    objectScale: 1.25,
  },
  partners: {
    position: [-3.8, 2.5, 5.5],
    target: [0.5, -0.2, 0],
    rotationSpeed: 0.007,
    objectScale: 1.05,
  },
  team: {
    position: [2.8, -3.2, 5.0],
    target: [0, 0, 0],
    rotationSpeed: 0.009,
    objectScale: 1.2,
  },
  locations: {
    position: [-5.0, 0, 4.5],
    target: [1.0, 0, 0],
    rotationSpeed: 0.008,
    objectScale: 1.1,
  },
  faq: {
    position: [0, -4.0, 6.5],
    target: [0, 0.5, 0],
    rotationSpeed: 0.005,
    objectScale: 1.0,
  },
  contact: {
    position: [0, 0, 3.8],
    target: [0, 0, 0],
    rotationSpeed: 0.015,
    objectScale: 1.4,
  },
};

export const Background3D: React.FC<Background3DProps> = ({
  activeSection,
  scrollProgress,
  reducedMotion = false,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const activeSectionRef = useRef<SectionId>(activeSection);
  const scrollProgressRef = useRef<number>(scrollProgress);

  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  useEffect(() => {
    scrollProgressRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- THREE.JS SCENE SETUP ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#050505');
    scene.fog = new THREE.FogExp2('#050505', 0.08);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(...CAMERA_KEYFRAMES.hero.position);
    camera.lookAt(new THREE.Vector3(...CAMERA_KEYFRAMES.hero.target));

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    container.appendChild(renderer.domElement);

    // --- LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Gold Key Light
    const goldLight1 = new THREE.PointLight(0xD4AF37, 8, 20);
    goldLight1.position.set(5, 5, 5);
    scene.add(goldLight1);

    // Secondary Warm Gold Rim Light
    const goldLight2 = new THREE.PointLight(0xE6C766, 6, 20);
    goldLight2.position.set(-5, -3, -2);
    scene.add(goldLight2);

    // Subtle Cool Fill Light
    const fillLight = new THREE.DirectionalLight(0x1a1a2e, 1.5);
    fillLight.position.set(0, -5, 5);
    scene.add(fillLight);

    // --- CENTRAL PREMIUM ANIMATED METALLIC OBJECT ---
    const objectGroup = new THREE.Group();

    // 1. Core Polyhedron (Black Metallic PBR)
    const coreGeo = new THREE.IcosahedronGeometry(1.8, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x080808,
      metalness: 0.98,
      roughness: 0.12,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    objectGroup.add(coreMesh);

    // 2. Gold Beveled Facet Accent Ring Nodes (NO wireframe)
    const nodeGeo = new THREE.SphereGeometry(0.04, 16, 16);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0xE6C766,
      emissive: 0xD4AF37,
      emissiveIntensity: 0.8,
      metalness: 0.9,
    });

    const posAttr = coreGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i += 3) {
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.set(posAttr.getX(i), posAttr.getY(i), posAttr.getZ(i));
      objectGroup.add(nodeMesh);
    }

    // 3. Inner Glowing Golden Octahedron Core
    const innerGeo = new THREE.OctahedronGeometry(0.95, 1);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0xE6C766,
      emissive: 0xD4AF37,
      emissiveIntensity: 0.7,
      metalness: 0.85,
      roughness: 0.15,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    objectGroup.add(innerMesh);

    // 4. Orbiting Thin Golden Rings
    const ringGeo1 = new THREE.TorusGeometry(2.6, 0.015, 16, 100);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xD4AF37,
      emissive: 0xD4AF37,
      emissiveIntensity: 0.5,
      metalness: 0.95,
      roughness: 0.08,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat);
    ring1.rotation.x = Math.PI / 3;
    objectGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(3.2, 0.01, 16, 100);
    const ring2 = new THREE.Mesh(ringGeo2, ringMat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    objectGroup.add(ring2);

    scene.add(objectGroup);

    // --- GOLDEN PARTICLES SYSTEM ---
    const particleCount = 1200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 3 + Math.random() * 14;

      particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = r * Math.cos(phi);
      particleScales[i] = Math.random() * 0.025 + 0.005;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xE6C766,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // --- LERP TARGETS & ANIMATION LOOP ---
    const currentCamPos = new THREE.Vector3(...CAMERA_KEYFRAMES.hero.position);
    const currentCamTarget = new THREE.Vector3(...CAMERA_KEYFRAMES.hero.target);
    let targetScale = 1.0;
    let clock = new THREE.Clock();

    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const currentSection = activeSectionRef.current;
      const keyframe = CAMERA_KEYFRAMES[currentSection] || CAMERA_KEYFRAMES.hero;

      // Smooth camera interpolation (lerp)
      const lerpFactor = reducedMotion ? 0.02 : 0.045;

      const destPos = new THREE.Vector3(...keyframe.position);
      const destTarget = new THREE.Vector3(...keyframe.target);

      // Subtle scroll influence
      const scrollOffset = (scrollProgressRef.current - 0.5) * 1.2;
      destPos.y += Math.sin(scrollOffset) * 0.8;
      destPos.x += Math.cos(scrollOffset) * 0.5;

      currentCamPos.lerp(destPos, lerpFactor);
      currentCamTarget.lerp(destTarget, lerpFactor);

      camera.position.copy(currentCamPos);
      camera.lookAt(currentCamTarget);

      // Rotate Object
      const rotSpeed = reducedMotion ? keyframe.rotationSpeed * 0.3 : keyframe.rotationSpeed;
      objectGroup.rotation.y += rotSpeed;
      objectGroup.rotation.x = Math.sin(elapsedTime * 0.5) * 0.15;
      objectGroup.rotation.z = Math.cos(elapsedTime * 0.3) * 0.1;

      // Inner octahedron reverse spin
      innerMesh.rotation.y -= rotSpeed * 2.2;
      innerMesh.rotation.z += rotSpeed * 1.5;

      // Rings spin
      ring1.rotation.z += 0.003;
      ring2.rotation.z -= 0.004;

      // Particle subtle rotation
      particleSystem.rotation.y += 0.0008;

      // Scale Lerp
      targetScale = keyframe.objectScale;
      objectGroup.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), lerpFactor);

      // Dynamic light orbit
      goldLight1.position.x = Math.sin(elapsedTime * 0.8) * 6;
      goldLight1.position.z = Math.cos(elapsedTime * 0.8) * 6;

      renderer.render(scene, camera);
    };

    animate();

    // --- RESIZE HANDLER ---
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ringGeo1.dispose();
      ringGeo2.dispose();
      ringMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, [reducedMotion]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};
