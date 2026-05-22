import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// --- [v3.50] 360° パノラマビューアーコンポーネント ---
// Canvas 2D でequirectangular画像をインタラクティブに表示
// マウスドラッグで水平・垂直パン、ホイールでズームイン/アウト
// タッチ操作対応（モバイル用）
// ※DPRスケーリング無し（CSS pixel = Canvas pixel で統一）
const Panorama360Viewer = ({ imageSrc, height = 200 }) => {
  const containerRef = useRef(null);
  const [webglFailed, setWebglFailed] = React.useState(false);

  useEffect(() => {
    if (!containerRef.current || !imageSrc || webglFailed) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    
    // カメラ（FOV75、中心に配置）
    const fov = 75;
    const aspect = container.clientWidth / container.clientHeight;
    const camera = new THREE.PerspectiveCamera(fov, aspect, 0.1, 1100);
    camera.position.set(0, 0, 0.1); 

    // レンダラー
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true });
    } catch (e) {
      console.error("WebGL Context creation failed:", e);
      setWebglFailed(true);
      return;
    }
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.rotateSpeed = -0.3;
    controls.enableZoom = false; // ホイールでの標準ズームは無効化
    controls.enablePan = false;
    controls.autoRotate = false; // 必要に応じてtrueに

    // テクスチャロード（PanoForgeと同様）
    const loader = new THREE.TextureLoader();
    let sphere = null;
    loader.load(imageSrc, (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      texture.colorSpace = THREE.SRGBColorSpace;

      const geometry = new THREE.SphereGeometry(500, 60, 40);
      geometry.scale(-1, 1, 1); // 内側から見るため反転

      const material = new THREE.MeshBasicMaterial({ map: texture });
      sphere = new THREE.Mesh(geometry, material);
      scene.add(sphere);
    });

    // FOVベースのズーム（PanoForge互換）
    let currentFov = fov;
    const onWheel = (e) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 5 : -5;
      currentFov = Math.max(30, Math.min(120, currentFov + delta));
      camera.fov = currentFov;
      camera.updateProjectionMatrix();
    };
    container.addEventListener('wheel', onWheel, { passive: false });

    // リサイズハンドラ
    const observer = new ResizeObserver(() => {
      if (container.clientWidth === 0 || container.clientHeight === 0) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    });
    observer.observe(container);

    // アニメーションループ
    let animationId = null;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // クリーンアップ
    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
      container.removeEventListener('wheel', onWheel);
      if (sphere) {
        sphere.geometry.dispose();
        sphere.material.dispose();
      }
      if (renderer) {
        renderer.dispose();
        renderer.forceContextLoss(); // WebGLコンテキストの枯渇を防ぐために即時解放
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
    };
  }, [imageSrc]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: height + 'px',
        cursor: 'grab',
        borderRadius: '8px',
        overflow: 'hidden',
        position: 'relative'
      }}
      onMouseDown={(e) => e.currentTarget.style.cursor = 'grabbing'}
      onMouseUp={(e) => e.currentTarget.style.cursor = 'grab'}
      onMouseLeave={(e) => e.currentTarget.style.cursor = 'grab'}
    >
      {webglFailed && (
        <img 
          src={imageSrc} 
          alt="360 Panorama Fallback" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
      )}
    </div>
  );
};

export default Panorama360Viewer;
