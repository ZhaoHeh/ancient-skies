import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture, Html } from '@react-three/drei';
import { Mesh, Group, Vector3, Quaternion } from 'three';
import EarthAxis from './EarthAxis';
import EarthGrid from './EarthGrid';
import Observatory from './Observatory';

// 地球倾斜角度约为23.5度
export const EARTH_TILT = 23.5 * Math.PI / 180;

interface EarthProps {
  rotationSpeed: number;
  showGrid: boolean;
  showAxis: boolean;
  showObservatory: boolean;
}

const Earth: React.FC<EarthProps> = ({ 
  rotationSpeed = 1,
  showGrid,
  showAxis,
  showObservatory
}) => {
  const earthGroupRef = useRef<Group>(null);
  const earthRef = useRef<Mesh>(null);
  const [isTextureLoaded, setIsTextureLoaded] = useState(false);

  // 地球半径
  const earthRadius = 1.5;
  
  // 加载地球纹理
  const earthTexture = useTexture({
    map: '/textures/earth_daymap.jpg',
    // 可选的其他纹理
    // bumpMap: '/textures/earth_bumpmap.jpg',
    // specularMap: '/textures/earth_specularmap.jpg',
    // normalMap: '/textures/earth_normalmap.jpg',
    // @ts-ignore
  }, (textures) => {
    // 纹理加载完成的回调
    setIsTextureLoaded(true);
  });

  // 创建一个旋转轴向量（与地轴方向一致）
  const rotationAxis = new Vector3(0, 1, 0).applyAxisAngle(new Vector3(0, 0, 1), EARTH_TILT);

  // 设置初始旋转，使初始化时观星台正对用户
  useEffect(() => {
    if (earthGroupRef.current && isTextureLoaded) {

      const rotationLongitude = 157 * Math.PI / 180; // 157为经验值

      // 创建一个四元数表示围绕y轴的旋转
      const rotationQuaternion = new Quaternion().setFromAxisAngle(
        new Vector3(0, 1, 0) // 表示y轴
          .applyAxisAngle(new Vector3(0, 0, 1), EARTH_TILT), // 将地轴的倾斜角度应用到y轴上
          rotationLongitude);
      
      // 应用旋转
      earthGroupRef.current.quaternion.copy(rotationQuaternion);
    }
  }, [isTextureLoaded]); // 当纹理加载完成时执行

  // 地球自转动画 - 围绕倾斜的地轴旋转
  useFrame(() => {
    if (earthGroupRef.current) {
      // 创建一个四元数表示围绕倾斜轴的旋转
      const baseSpeed = 0.005; // 基础旋转速度
      const adjustedSpeed = baseSpeed * rotationSpeed; // 应用速度倍率
      const quaternion = new Quaternion().setFromAxisAngle(rotationAxis, adjustedSpeed);
      
      // 应用旋转
      earthGroupRef.current.quaternion.premultiply(quaternion);
    }
  });

  return (
    <group>
      {!isTextureLoaded && (
        <Html center>
          <div className="loading">加载中...</div>
        </Html>
      )}

      {/* 地球组，包含地球和地轴 */}
      <group ref={earthGroupRef} visible={isTextureLoaded}>
        {/* 应用地球倾斜角度，使南北极点与地轴对齐 */}
        <group rotation={[0, 0, EARTH_TILT]}>
          {/* 地球模型 */}
          <mesh ref={earthRef}>
            <sphereGeometry args={[earthRadius, 64, 32]} />
            <meshStandardMaterial
              {...earthTexture}
              metalness={0.1}
              roughness={0.7}
            />
          </mesh>

          {/* 地轴和辅助线 - 只在showAxis为true时显示 */}
          {showAxis && <EarthAxis earthRadius={earthRadius} length={earthRadius * 3} color="#ffffff" />}

          {/* 经纬线网格 - 只在showGrid为true时显示 */}
          {showGrid && <EarthGrid radius={earthRadius * 1.001} />}
          
          {/* 观星台 - 只在showObservatory为true时显示 */}
          {showObservatory && <Observatory earthRadius={earthRadius} />}
        </group>
      </group>

      {/* 提示信息 */}
      {/* {isTextureLoaded && (
        <Html position={[0, -2.7, 0]} center>
          <div className="grid-hint">
            - 按 G 键切换经纬线显示<br />
            - 按 F 键切换地轴和辅助线显示<br />
            - 按 O 键切换观星台显示<br />
            - 按 A 键切换坐标轴显示<br />
            - 使用鼠标拖动可旋转地球，滚轮可缩放视图
          </div>
        </Html>
      )} */}
    </group>
  );
};

export default Earth;