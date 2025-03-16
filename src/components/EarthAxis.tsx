import React from 'react';
import { Vector3 } from 'three';
import { Line } from '@react-three/drei';
import { EARTH_TILT } from './Earth';

interface EarthAxisProps {
  length?: number;
  earthRadius?: number;
  color?: string;
}

const EarthAxis: React.FC<EarthAxisProps> = ({
  length = 7, 
  earthRadius = 2.5,
  color = '#ffffff' 
}) => {
  // 计算轴的起点和终点 - 沿着y轴
  const startPoint = new Vector3(0, -length/2, 0);
  const endPoint = new Vector3(0, length/2, 0);

  // 创建点数组
  const points = [startPoint, endPoint];
  
  const segments = 64; // 所有圆环使用相同的分段数

  // 计算赤道点 - 用于标记赤道平面 (0°)
  const equatorPoints = [];
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    const x = earthRadius * Math.cos(angle);
    const z = earthRadius * Math.sin(angle);
    equatorPoints.push(new Vector3(x, 0, z));
  }
  
  // 计算北回归线 - 北纬23.5度
  const tropicOfCancerPoints = [];
  // 北回归线的纬度角度 (90° - 23.5°) = 66.5°
  const tropicLatitude = (Math.PI / 2) - EARTH_TILT;
  
  for (let i = 0; i <= segments; i++) {
    const longitude = (i / segments) * Math.PI * 2;
    const x = earthRadius * Math.sin(tropicLatitude) * Math.cos(longitude);
    const y = earthRadius * Math.cos(tropicLatitude);
    const z = earthRadius * Math.sin(tropicLatitude) * Math.sin(longitude);
    tropicOfCancerPoints.push(new Vector3(x, y, z));
  }
  
  // 计算南回归线 - 南纬23.5度
  const tropicOfCapricornPoints = [];
  // 南回归线的纬度角度 (90° + 23.5°) = 113.5°
  const capricornLatitude = (Math.PI / 2) + EARTH_TILT;
  
  for (let i = 0; i <= segments; i++) {
    const longitude = (i / segments) * Math.PI * 2;
    const x = earthRadius * Math.sin(capricornLatitude) * Math.cos(longitude);
    const y = earthRadius * Math.cos(capricornLatitude);
    const z = earthRadius * Math.sin(capricornLatitude) * Math.sin(longitude);
    tropicOfCapricornPoints.push(new Vector3(x, y, z));
  }
  
  // 计算北极圈 - 北纬66.5度 (90° - 23.5° = 66.5°)
  const arcticCirclePoints = [];
  // 北极圈的纬度角度 (90° - 66.5°) = 23.5°
  const arcticLatitude = EARTH_TILT;
  
  for (let i = 0; i <= segments; i++) {
    const longitude = (i / segments) * Math.PI * 2;
    const x = earthRadius * Math.sin(arcticLatitude) * Math.cos(longitude);
    const y = earthRadius * Math.cos(arcticLatitude);
    const z = earthRadius * Math.sin(arcticLatitude) * Math.sin(longitude);
    arcticCirclePoints.push(new Vector3(x, y, z));
  }
  
  // 计算南极圈 - 南纬66.5度
  const antarcticCirclePoints = [];
  // 南极圈的纬度角度 (90° + 66.5°) = 156.5°
  const antarcticLatitude = Math.PI - EARTH_TILT;
  
  for (let i = 0; i <= segments; i++) {
    const longitude = (i / segments) * Math.PI * 2;
    const x = earthRadius * Math.sin(antarcticLatitude) * Math.cos(longitude);
    const y = earthRadius * Math.cos(antarcticLatitude);
    const z = earthRadius * Math.sin(antarcticLatitude) * Math.sin(longitude);
    antarcticCirclePoints.push(new Vector3(x, y, z));
  }

  return (
    <group>
      {/* 地轴线 */}
      <Line 
        points={points}
        color={color}
        lineWidth={2}
      />

      {/* 北极圈 */}
      <Line 
        points={arcticCirclePoints}
        color="#33ccff"
        lineWidth={1.5}
        transparent
        opacity={0.5}
      />

      {/* 北回归线 */}
      <Line 
        points={tropicOfCancerPoints}
        color="#ff9933"
        lineWidth={1.5}
        transparent
        opacity={0.5}
      />

      {/* 赤道线 */}
      <Line 
        points={equatorPoints}
        color="#3399ff"
        lineWidth={1.5}
        transparent
        opacity={0.5}
      />

      {/* 南回归线 */}
      <Line 
        points={tropicOfCapricornPoints}
        color="#ff9933"
        lineWidth={1.5}
        transparent
        opacity={0.5}
      />

      {/* 南极圈 */}
      <Line 
        points={antarcticCirclePoints}
        color="#33ccff"
        lineWidth={1.5}
        transparent
        opacity={0.5}
      />

      <mesh position={endPoint}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshBasicMaterial color="#444444" />
      </mesh>

      <mesh position={startPoint}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshBasicMaterial color="#990000" />
      </mesh>
    </group>
  );
};

export default EarthAxis; 