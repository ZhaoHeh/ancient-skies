import React, { useRef } from 'react';
import { Vector3, Mesh } from 'three';
import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

interface ObservatoryProps {
  earthRadius: number;
  longitude?: number; // 经度，单位：度
  latitude?: number;  // 纬度，单位：度
  size?: number;      // 观星台标记的大小
  color?: string;     // 观星台标记的颜色
  opacity?: number;   // 观星台标记的透明度
  showLabel?: boolean; // 是否显示标签
}

const Observatory: React.FC<ObservatoryProps> = ({
  earthRadius,
  // 默认坐标：东经113.08306°，北纬34.24169°
  longitude = 113.08306,
  latitude = 34.24169,
  size = 0.08,
  color = '#00bfff',
  opacity = 0.5,
  showLabel = false
}) => {
//   const observatoryRef = useRef<Mesh>(null);
  const glowRef = useRef<Mesh>(null);
//   const coreRef = useRef<Mesh>(null);
  
  // 将经纬度转换为弧度
  const lonRad = (longitude * Math.PI) / 180;
  const latRad = (latitude * Math.PI) / 180;

  // 计算观星台在地球表面上的位置
  // 球面坐标转笛卡尔坐标
  // x = r * cos(lat) * cos(lon)
  // y = r * sin(lat)
  // z = r * cos(lat) * sin(lon)
  // 注意：这里的y轴是上下方向，所以纬度对应的是y轴
  const x = earthRadius * Math.cos(latRad) * Math.cos(lonRad);
  const y = earthRadius * Math.sin(latRad);
  const z = - earthRadius * Math.cos(latRad) * Math.sin(lonRad);

  const position = new Vector3(x, y, z);

  // 计算标签的位置，稍微偏离地球表面
  const labelOffset = 0.01;
  const labelPosition = position.clone().normalize().multiplyScalar(earthRadius + labelOffset);

  // 添加脉动效果
  useFrame(({ clock }) => {
    if (glowRef.current) {
      // 使用正弦函数创建脉动效果
      const pulse = Math.sin(clock.getElapsedTime() * 2) * 0.05 + 0.95; // 0.9 到 1.0 之间脉动
      glowRef.current.scale.set(pulse, pulse, pulse);

      // 也可以调整透明度
      if (glowRef.current.material) {
        (glowRef.current.material as any).opacity = opacity + Math.sin(clock.getElapsedTime() * 2) * 0.1;
      }
    }
    
    // 让球心点也有微小的脉动效果
    // if (coreRef.current) {
    //   const corePulse = Math.sin(clock.getElapsedTime() * 3) * 0.05 + 1; // 0.95 到 1.05 之间脉动
    //   coreRef.current.scale.set(corePulse, corePulse, corePulse);
    // }
  });

  return (
    <group>
      {/* 观星台标记 - 球心点（暗红色） */}
      {/* <mesh ref={coreRef} position={position}> */}
      <mesh position={position}>
        <sphereGeometry args={[size * 0.05, 16, 16]} />
        <meshBasicMaterial 
          color="#c40234" 
          transparent={false}
        />
      </mesh>

      {/* 观星台标记 - 外部发光效果 */}
      <mesh ref={glowRef} position={position}>
        <sphereGeometry args={[size * 1.1, 16, 16]} />
        <meshBasicMaterial 
          color={color} 
          transparent={true} 
          opacity={0.2}
        />
      </mesh>

      {/* 观星台标签 */}
      {showLabel && (
        <Html position={labelPosition}>
          <div className="observatory-label">
            观星台<br />
            {`${latitude.toFixed(5)}°N`}<br />
            {`${longitude.toFixed(5)}°E`}
          </div>
        </Html>
      )}
    </group>
  );
};

export default Observatory; 