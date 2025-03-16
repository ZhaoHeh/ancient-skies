import React from 'react';
import { Line } from '@react-three/drei';
import { Vector3 } from 'three';

interface EarthGridProps {
  radius: number;
  latitudeCount?: number;
  longitudeCount?: number;
  color?: string;
}

const EarthGrid: React.FC<EarthGridProps> = ({
  radius,
  latitudeCount = 12,
  longitudeCount = 24,
  color = 'rgba(255, 255, 255, 0.3)'
}) => {
  // 生成纬线
  const latitudeLines = [];
  const latitudeStep = Math.PI / latitudeCount;
  
  for (let i = 1; i < latitudeCount; i++) {
    const phi = latitudeStep * i;
    const points = [];
    
    // 每条纬线由多个点组成
    for (let j = 0; j <= longitudeCount; j++) {
      const theta = (2 * Math.PI / longitudeCount) * j;
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);
      points.push(new Vector3(x, y, z));
    }
    
    latitudeLines.push(points);
  }
  
  // 生成经线
  const longitudeLines = [];
  const longitudeStep = (2 * Math.PI) / longitudeCount;
  
  for (let i = 0; i < longitudeCount; i++) {
    const theta = longitudeStep * i;
    const points = [];
    
    // 每条经线由多个点组成
    for (let j = 0; j <= latitudeCount; j++) {
      const phi = (Math.PI / latitudeCount) * j;
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);
      points.push(new Vector3(x, y, z));
    }
    
    longitudeLines.push(points);
  }
  
  return (
    <group>
      {/* 渲染纬线 */}
      {latitudeLines.map((points, index) => (
        <Line
          key={`latitude-${index}`}
          points={points}
          color={color}
          lineWidth={1}
          transparent
          opacity={0.5}
        />
      ))}
      
      {/* 渲染经线 */}
      {longitudeLines.map((points, index) => (
        <Line
          key={`longitude-${index}`}
          points={points}
          color={color}
          lineWidth={1}
          transparent
          opacity={0.5}
        />
      ))}
    </group>
  );
};

export default EarthGrid; 