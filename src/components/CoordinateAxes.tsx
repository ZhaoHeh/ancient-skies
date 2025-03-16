import React from 'react';
import { Line, Html } from '@react-three/drei';
import { Vector3 } from 'three';

interface CoordinateAxesProps {
  length?: number;
  showLabels?: boolean;
}

const CoordinateAxes: React.FC<CoordinateAxesProps> = ({
  length = 5,
  showLabels = true
}) => {
  // 创建坐标轴线
  const xAxisPoints = [new Vector3(0, 0, 0), new Vector3(length, 0, 0)];
  const yAxisPoints = [new Vector3(0, 0, 0), new Vector3(0, length, 0)];
  const zAxisPoints = [new Vector3(0, 0, 0), new Vector3(0, 0, length)];

  return (
    <group>
      {/* X轴 - 红色 */}
      <Line
        points={xAxisPoints}
        color="white"
        lineWidth={1}
      />
      
      {/* Y轴 - 绿色 */}
      <Line
        points={yAxisPoints}
        color="white"
        lineWidth={1}
      />
      
      {/* Z轴 - 蓝色 */}
      <Line
        points={zAxisPoints}
        color="white"
        lineWidth={1}
      />
      
      {/* 坐标轴标签 */}
      {showLabels && (
        <>
          {/* X轴标签 */}
          {/* <mesh position={[length + 0.3, 0, 0]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshBasicMaterial color="red" />
          </mesh> */}
          <Html position={[length + 0.1, 0, 0]}>
            <div className="axis-label" style={{ color: 'white' }}>X</div>
          </Html>
          
          {/* Y轴标签 */}
          {/* <mesh position={[0, length + 0.3, 0]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshBasicMaterial color="green" />
          </mesh> */}
          <Html position={[0, length + 0.1, 0]}>
            <div className="axis-label" style={{ color: 'white' }}>Y</div>
          </Html>
          
          {/* Z轴标签 */}
          {/* <mesh position={[0, 0, length + 0.3]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshBasicMaterial color="blue" />
          </mesh> */}
          <Html position={[0, 0, length + 0.1]}>
            <div className="axis-label" style={{ color: 'white' }}>Z</div>
          </Html>
        </>
      )}
      
      {/* 原点 */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color="white" />
      </mesh>
      {/* <Html position={[0.2, 0.2, 0.2]}>
        <div className="axis-label" style={{ color: 'white' }}>.</div>
      </Html> */}
    </group>
  );
};

export default CoordinateAxes; 