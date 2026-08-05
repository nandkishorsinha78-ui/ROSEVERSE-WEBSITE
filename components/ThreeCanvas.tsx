'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animFrameId: number;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let rosePetalsGroup: THREE.Group;
    let embersGroup: THREE.Group;
    let emberGeom: THREE.BufferGeometry;
    let emberMat: THREE.PointsMaterial;
    let handleMouseMove: (e: MouseEvent) => void;
    let handleResize: () => void;

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    try {
      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x030305, 0.006);

      const aspect = window.innerWidth / window.innerHeight;
      camera = new THREE.PerspectiveCamera(55, aspect, 0.1, 1000);
      camera.position.set(0, 0, 18);

      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;

      const ambientLight = new THREE.AmbientLight(0x1a0d1a, 1.6);
      scene.add(ambientLight);

      const dirLightGold = new THREE.DirectionalLight(0xf4d38c, 2.8);
      dirLightGold.position.set(8, 12, 10);
      scene.add(dirLightGold);

      const pointLightCrimson = new THREE.PointLight(0xff1a40, 5.5, 45);
      pointLightCrimson.position.set(-6, 2, 8);
      scene.add(pointLightCrimson);

      const pointLightEmerald = new THREE.PointLight(0x00e5a3, 2.5, 35);
      pointLightEmerald.position.set(8, -5, 5);
      scene.add(pointLightEmerald);

      // 3D Rose Petals Group
      rosePetalsGroup = new THREE.Group();
      const petalCount = 42;

      for (let i = 0; i < petalCount; i++) {
        const geom = new THREE.SphereGeometry(
          0.4 + Math.random() * 0.5,
          16,
          16,
          0,
          Math.PI * 0.8,
          0,
          Math.PI * 0.5
        );

        const isGold = Math.random() > 0.75;
        const mat = new THREE.MeshPhysicalMaterial({
          color: isGold ? 0xf4d38c : Math.random() > 0.4 ? 0xaa0022 : 0xff1a40,
          roughness: 0.25,
          metalness: isGold ? 0.85 : 0.15,
          transmission: isGold ? 0.1 : 0.45,
          thickness: 0.8,
          clearcoat: 0.9,
          clearcoatRoughness: 0.1,
          side: THREE.DoubleSide,
        });

        const mesh = new THREE.Mesh(geom, mat);
        mesh.position.set(
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 24,
          (Math.random() - 0.5) * 20
        );
        mesh.rotation.set(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        );

        mesh.userData = {
          rotSpeedX: (Math.random() - 0.5) * 0.007,
          rotSpeedY: (Math.random() - 0.5) * 0.007,
          rotSpeedZ: (Math.random() - 0.5) * 0.007,
          floatOffsetY: Math.random() * Math.PI * 2,
        };

        rosePetalsGroup.add(mesh);
      }
      scene.add(rosePetalsGroup);

      // Z-Space Floating Particles
      embersGroup = new THREE.Group();
      emberGeom = new THREE.BufferGeometry();
      const emberCount = 180;
      const positions = new Float32Array(emberCount * 3);
      const colors = new Float32Array(emberCount * 3);

      const goldColor = new THREE.Color(0xf4d38c);
      const crimsonColor = new THREE.Color(0xff1a40);

      for (let i = 0; i < emberCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 38;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 38;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 28;

        const mixColor = Math.random() > 0.5 ? goldColor : crimsonColor;
        colors[i * 3] = mixColor.r;
        colors[i * 3 + 1] = mixColor.g;
        colors[i * 3 + 2] = mixColor.b;
      }

      emberGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      emberGeom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      emberMat = new THREE.PointsMaterial({
        size: 0.25,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
      });

      const embers = new THREE.Points(emberGeom, emberMat);
      embersGroup.add(embers);
      scene.add(embersGroup);

      const clock = new THREE.Clock();

      handleMouseMove = (e: MouseEvent) => {
        targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
        targetMouseY = (e.clientY / window.innerHeight) * 2 - 1;
      };

      handleResize = () => {
        if (!camera || !renderer) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('resize', handleResize);

      const render = () => {
        animFrameId = requestAnimationFrame(render);
        const elapsedTime = clock.getElapsedTime();

        mouseX += (targetMouseX - mouseX) * 0.04;
        mouseY += (targetMouseY - mouseY) * 0.04;

        camera.position.x = mouseX * 1.5;
        camera.position.y = -mouseY * 1.5;
        camera.lookAt(0, 0, 0);

        if (rosePetalsGroup) {
          rosePetalsGroup.children.forEach((child) => {
            const petal = child as THREE.Mesh;
            petal.rotation.x += petal.userData.rotSpeedX;
            petal.rotation.y += petal.userData.rotSpeedY;
            petal.rotation.z += petal.userData.rotSpeedZ;
            petal.position.y += Math.sin(elapsedTime * 0.8 + petal.userData.floatOffsetY) * 0.003;
          });
        }

        if (embersGroup) {
          embersGroup.rotation.y = elapsedTime * 0.03;
          embersGroup.rotation.x = Math.sin(elapsedTime * 0.02) * 0.05;
        }

        renderer.render(scene, camera);
      };

      render();
    } catch (e) {
      console.warn('Three.js setup fallback:', e);
    }

    return () => {
      if (handleMouseMove) window.removeEventListener('mousemove', handleMouseMove);
      if (handleResize) window.removeEventListener('resize', handleResize);
      if (animFrameId) cancelAnimationFrame(animFrameId);

      // Memory Cleanup
      rosePetalsGroup?.children.forEach((child) => {
        const mesh = child as THREE.Mesh;
        mesh.geometry?.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((m) => m.dispose());
        } else {
          mesh.material?.dispose();
        }
      });

      emberGeom?.dispose();
      emberMat?.dispose();
      renderer?.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="three-render-surface" />;
}
