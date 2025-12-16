import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Noise } from "noisejs";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function ThreeBackground({
  fov = 35,
  camStartPos = { x: -10, y: 0, z: 20 },
  camRadius = 35,
  camSpeed = 0.0003,
  camHeightAmplitude = 24,
  camHeightFrequency = 2.5,
}) {
  const mountRef = useRef(null);

  useEffect(() => {
    const sizes = { width: window.innerWidth, height: window.innerHeight };
    const maxDis = 75;

    const scene = new THREE.Scene();
    const noise = new Noise(Math.random());

    // --- Камера с настраиваемыми параметрами ---
    const camera = new THREE.PerspectiveCamera(
      fov,
      sizes.width / sizes.height,
      0.1,
      1000,
    );
    camera.position.set(camStartPos.x, camStartPos.y, camStartPos.z);

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(sizes.width, sizes.height);
    mountRef.current.appendChild(renderer.domElement);

    const handleResize = () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(window.devicePixelRatio);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    const pointLight = new THREE.PointLight(0xffffff, 1000);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // --- Создание частиц как Points ---
    const particleCount = (maxDis * 2) ** 2;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    let index = 0;
    for (let x = -maxDis; x < maxDis; x++) {
      for (let z = -maxDis; z < maxDis; z++) {
        positions[index * 3] = x;
        positions[index * 3 + 1] = 0;
        positions[index * 3 + 2] = z;

        colors[index * 3] = 1;
        colors[index * 3 + 1] = 1;
        colors[index * 3 + 2] = 1;

        index++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      vertexColors: true,
      size: 0.2,
      sizeAttenuation: true,
      map: new THREE.TextureLoader().load(
        "https://threejs.org/examples/textures/sprites/circle.png",
      ),
      alphaTest: 0.5,
      transparent: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // --- Анимация камеры ---
    let camAngle = 0;
    function animateCameraCircular() {
      camAngle += camSpeed;
      camera.position.x = Math.cos(camAngle) * camRadius;
      camera.position.z = Math.sin(camAngle) * camRadius;
      camera.position.y =
        camStartPos.y +
        Math.sin(camAngle * camHeightFrequency) * camHeightAmplitude;
      camera.lookAt(0, 0, 0);
    }

    let animationFrameId;
    let frame = 0;

    function animate() {
      animationFrameId = requestAnimationFrame(animate);

      controls.update();
      animateCameraCircular();

      const posAttr = geometry.attributes.position;
      const colorAttr = geometry.attributes.color;

      for (let i = 0; i < particleCount; i++) {
        const x = posAttr.getX(i);
        const z = posAttr.getZ(i);
        const y =
          Math.sin(
            Math.sqrt((x + maxDis) ** 2 + (z + maxDis) ** 2) / 3.5 + frame,
          ) * 2;
        posAttr.setY(i, y);

        const tHeight = (y + 2) / 4;
        const radiusDistance = Math.sqrt(x * x + z * z);
        const tRadius = Math.min(radiusDistance / maxDis, 1);

        const startColor = new THREE.Color(0xffffff);
        const midColor = new THREE.Color(0x0077ff);
        const endColor = new THREE.Color(0xff00ff);

        let color = startColor.clone().lerp(midColor, tHeight);
        color.lerp(endColor, tRadius * 0.5);

        colorAttr.setXYZ(i, color.r, color.g, color.b);
      }

      posAttr.needsUpdate = true;
      colorAttr.needsUpdate = true;

      frame += 0.0055;
      renderer.render(scene, camera);
    }
    animate();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      controls.dispose();
      renderer.dispose();
      if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
    };
  }, [
    fov,
    camStartPos,
    camRadius,
    camSpeed,
    camHeightAmplitude,
    camHeightFrequency,
  ]);

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
      }}
    />
  );
}
