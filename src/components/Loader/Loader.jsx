import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { vertexShader, fragmentShader } from "./shaders";
import "./loader.css";

const Loader = () => {
  const canvasRef = useRef(null);
  const loaderRef = useRef(null);
  const promptRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const loader = loaderRef.current;
    const clickPrompt = promptRef.current;

    if (!canvas || !loader) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const uniforms = {
      uTransition: { value: 0.0 },
      uResolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      uTime: { value: 0.0 },
      uBorderColor: { value: new THREE.Color("#001eff") },
    };

    const geometry = new THREE.PlaneGeometry(2, 2);

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthWrite: false,
      depthTest: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      uniforms.uResolution.value.set(width, height);
    };

    window.addEventListener("resize", handleResize);

    let isRevealed = false;

    const revealSite = () => {
      if (isRevealed) return;
      isRevealed = true;

      if (clickPrompt) {
        gsap.to(clickPrompt, {
          opacity: 0,
          y: -25,
          duration: 0.5,
          ease: "power2.inOut",
        });
      }

      gsap.to(uniforms.uTransition, {
        value: 1.0,
        duration: 3.0,
        ease: "power2.inOut",
        onComplete: () => {
          if (loader) {
            loader.style.pointerEvents = "none";
            loader.style.display = "none";
          }
        },
      });
    };

    loader.addEventListener("click", revealSite);

    const clock = new THREE.Clock();
    let animationFrameId;

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();
      uniforms.uTime.value = elapsedTime;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      window.removeEventListener("resize", handleResize);
      loader.removeEventListener("click", revealSite);

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={loaderRef} className="loader">
      <canvas ref={canvasRef} className="loader-canvas" />
      <p ref={promptRef} className="click-prompt">
        CLICK TO REVEAL
      </p>
    </div>
  );
};

export default Loader;