// src/components/Scene.jsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const Scene = () => {
  return (
    <Canvas>
      {/* 添加光源 */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 0, 5]} intensity={1} />
      {/* 添加一个简单的立方体 */}
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      {/* 轨道控制器 */}
      <OrbitControls />
    </Canvas>
  );
};

export default Scene;
