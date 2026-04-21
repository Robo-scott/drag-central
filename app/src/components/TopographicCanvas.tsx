import { useRef, useEffect, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import fluidVert from '@/shaders/fluid.vert.glsl';
import fluidFrag from '@/shaders/fluid.frag.glsl';
import displayVert from '@/shaders/display.vert.glsl';
import displayFrag from '@/shaders/display.frag.glsl';

const FB0_SIZE = 512;

function TopographicMesh() {
  const { viewport, size } = useThree();
  const meshRef = useRef<THREE.Mesh>(null!);
  const fluidMatRef = useRef<THREE.ShaderMaterial>(null!);
  const displayMatRef = useRef<THREE.ShaderMaterial>(null!);

  const fluidA = useRef<THREE.WebGLRenderTarget>(null!);
  const fluidB = useRef<THREE.WebGLRenderTarget>(null!);
  const pointer = useRef({ x: 0, y: 0 });
  const pointerPrev = useRef({ x: 0, y: 0 });
  const pointerDown = useRef(false);
  const scrollRef = useRef({ x: 0, y: 0 });
  const sceneRef = useRef<THREE.Scene>(null!);
  const cameraRef = useRef<THREE.OrthographicCamera>(null!);
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fluidMeshRef = useRef<THREE.Mesh>(null!);

  // Initialize render targets and scene
  useEffect(() => {
    const rtOptions: THREE.RenderTargetOptions = {
      type: THREE.HalfFloatType,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      depthBuffer: false,
      stencilBuffer: false,
    };
    fluidA.current = new THREE.WebGLRenderTarget(FB0_SIZE, FB0_SIZE, rtOptions);
    fluidB.current = new THREE.WebGLRenderTarget(FB0_SIZE, FB0_SIZE, rtOptions);
    sceneRef.current = new THREE.Scene();
    cameraRef.current = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    return () => {
      fluidA.current?.dispose();
      fluidB.current?.dispose();
    };
  }, []);

  const handlePointerMove = useCallback((e: PointerEvent) => {
    pointer.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handlePointerDown = useCallback((e: PointerEvent) => {
    pointerDown.current = true;
    pointer.current = { x: e.clientX, y: e.clientY };
    pointerPrev.current = { x: e.clientX, y: e.clientY };
    if (fluidMatRef.current) {
      fluidMatRef.current.uniforms.iMouse.value.set(e.clientX, e.clientY, e.clientX, e.clientY);
    }
  }, []);

  const handlePointerUp = useCallback(() => {
    pointerDown.current = false;
    if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
    resetTimeoutRef.current = setTimeout(() => {
      if (fluidMatRef.current) {
        fluidMatRef.current.uniforms.iMouse.value.set(0, 0, 0, 0);
      }
    }, 200);
  }, []);

  const handleWheel = useCallback((e: WheelEvent) => {
    scrollRef.current.x += e.deltaX * 0.002;
    scrollRef.current.y += e.deltaY * 0.002;
  }, []);

  useEffect(() => {
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [handlePointerMove, handlePointerDown, handlePointerUp, handleWheel]);

  useFrame(({ gl, clock }) => {
    if (!fluidA.current || !fluidB.current || !fluidMatRef.current || !displayMatRef.current || !sceneRef.current || !cameraRef.current) return;

    const elapsed = clock.getElapsedTime();

    // Update display uniforms
    displayMatRef.current.uniforms.uTime.value = elapsed;
    displayMatRef.current.uniforms.uResolution.value.set(size.width, size.height);
    displayMatRef.current.uniforms.uScrollX.value = scrollRef.current.x;
    displayMatRef.current.uniforms.uScrollY.value = scrollRef.current.y;
    displayMatRef.current.uniforms.uFluidTex.value = fluidA.current.texture;

    // Update fluid uniforms
    fluidMatRef.current.uniforms.uFluidTex.value = fluidB.current.texture;
    fluidMatRef.current.uniforms.uResolution.value.set(FB0_SIZE, FB0_SIZE);

    if (pointerDown.current) {
      fluidMatRef.current.uniforms.iMouse.value.set(
        pointer.current.x,
        pointer.current.y,
        pointerPrev.current.x,
        pointerPrev.current.y
      );
    }

    // Render fluid simulation to fluidB
    const oldTarget = gl.getRenderTarget();
    gl.setRenderTarget(fluidB.current);
    gl.setClearColor(new THREE.Color(0.5, 0.5, 0.5), 1);
    gl.clear();

    if (!fluidMeshRef.current) {
      fluidMeshRef.current = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), fluidMatRef.current);
    }
    sceneRef.current.add(fluidMeshRef.current);
    gl.render(sceneRef.current, cameraRef.current);
    sceneRef.current.remove(fluidMeshRef.current);

    gl.setRenderTarget(oldTarget);

    // Swap
    const temp = fluidA.current;
    fluidA.current = fluidB.current;
    fluidB.current = temp;

    // Copy pointer to prev
    pointerPrev.current = { ...pointer.current };
  }, 1);

  return (
    <>
      <mesh ref={meshRef}>
        <planeGeometry args={[viewport.width, viewport.height]} />
        <shaderMaterial
          ref={displayMatRef}
          vertexShader={displayVert}
          fragmentShader={displayFrag}
          uniforms={{
            uTime: { value: 0 },
            uResolution: { value: new THREE.Vector2(size.width, size.height) },
            uDistortionAmount: { value: 0.28 },
            uLineThickness: { value: 0.12 },
            uLineScale: { value: 22.0 },
            uScrollX: { value: 0 },
            uScrollY: { value: 0 },
            uFluidTex: { value: null },
          }}
        />
      </mesh>
      {/* Hidden fluid material for FBO rendering */}
      <shaderMaterial
        ref={fluidMatRef}
        vertexShader={fluidVert}
        fragmentShader={fluidFrag}
        uniforms={{
          uFluidTex: { value: null },
          iMouse: { value: new THREE.Vector4(0, 0, 0, 0) },
          uResolution: { value: new THREE.Vector2(FB0_SIZE, FB0_SIZE) },
          uBrushSize: { value: 18.0 },
          uBrushStrength: { value: 0.52 },
          uFluidDecay: { value: 0.986 },
          uTrailLength: { value: 0.95 },
          uStopDecay: { value: 0.84 },
        }}
      />
    </>
  );
}

export default function TopographicCanvas() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
      role="presentation"
      aria-hidden="true"
    >
      <Canvas
        orthographic
        camera={{ position: [0, 0, 1], near: 0, far: 1 }}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        style={{ width: '100%', height: '100%' }}
        dpr={[1, 1.5]}
      >
        <TopographicMesh />
      </Canvas>
    </div>
  );
}
