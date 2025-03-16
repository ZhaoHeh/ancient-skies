import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Earth from './components/Earth';
import CoordinateAxes from './components/CoordinateAxes';
import ControlPanel from './components/ControlPanel';
import './index.css';

// 导入OrbitControls的类型
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

const App = () => {
  const [showAxes, setShowAxes] = useState(true);
  const [showRotationHelper, setShowRotationHelper] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [showObservatory, setShowObservatory] = useState(true);

  const [rotationSpeed, setRotationSpeed] = useState(1); // 默认旋转速度为1
  const orbitControlsRef = useRef<OrbitControlsImpl>(null);

  // 添加键盘事件监听器
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'a':
        case 'A':
          setShowAxes(prev => !prev);
          break;
        case 'f':
        case 'F':
          setShowRotationHelper(prev => !prev);
          break;
        case 'g':
        case 'G':
          setShowGrid(prev => !prev);
          break;
        case 'o':
        case 'O':
          setShowObservatory(prev => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // 重置视图函数
  const resetView = () => {
    if (orbitControlsRef.current) {
      // 重置相机位置，使z轴垂直于屏幕，xy平面平行于屏幕
      orbitControlsRef.current.reset();

      setRotationSpeed(1);

      setShowAxes(true);
      setShowGrid(true);
      setShowRotationHelper(true);
      setShowObservatory(true);

      /*
      // 设置相机位置，使观星台朝向用户
      // 观星台位于经度113.08306°E，纬度34.24169°N
      // 将这些坐标转换为相机位置
      const longitude = 113.08306 * Math.PI / 180;
      const latitude = 34.24169 * Math.PI / 180;

      // 计算相机的目标位置（与观星台相反的方向）
      const phi = Math.PI/2 - latitude; // 将纬度转换为球坐标的phi角
      const theta = longitude + Math.PI; // 经度加上180度，使相机面向观星台

      // 设置相机位置
      orbitControlsRef.current.setAzimuthalAngle(theta);
      orbitControlsRef.current.setPolarAngle(phi);
      orbitControlsRef.current.update();
      */
    }
  };

  return (
    <>
      <div className="title">古代星空 - Ancient Skies</div>
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Earth
          rotationSpeed={rotationSpeed}
          showGrid={showGrid}
          showAxis={showRotationHelper}
          showObservatory={showObservatory}
        />
        {showAxes && <CoordinateAxes length={2} />}
        <OrbitControls ref={orbitControlsRef} enableDamping dampingFactor={0.05} />
      </Canvas>
      <ControlPanel 
        rotationSpeed={rotationSpeed} 
        setRotationSpeed={setRotationSpeed} 
        resetView={resetView}
        showAxesOutter={showAxes}
        showGridOutter={showGrid}
        showRotationHelperOutter={showRotationHelper}
        showObservatoryOutter={showObservatory}
        onToggleAxis={(show) => { setShowAxes(show); }} // 处理坐标轴显示
        onToggleGrid={(show) => { setShowGrid(show); }} // 处理经纬线网格显示
        onToggleRotationHelper={(show) => { setShowRotationHelper(show); }} // 处理自转辅助线显示
        onToggleObservatory={(show) => { setShowObservatory(show); }} // 处理观星台显示
      />
      <div className="footer">
        {/* <p>
          使用鼠标拖动可旋转地球，滚轮可缩放视图<br />
          按 G 键切换经纬线显示，按 F 键切换地轴显示，按 O 键切换观星台显示，按 A 键切换坐标轴显示
        </p> */}
      </div>
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
