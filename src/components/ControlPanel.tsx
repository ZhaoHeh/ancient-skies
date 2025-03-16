import React, { useState, useEffect } from 'react';

interface ControlPanelProps {
  rotationSpeed: number;
  setRotationSpeed: (speed: number) => void;
  resetView: () => void;
  showAxesOutter: boolean;
  showGridOutter: boolean;
  showRotationHelperOutter: boolean;
  showObservatoryOutter: boolean;
  onToggleAxis: (checked: boolean) => void;
  onToggleGrid: (checked: boolean) => void;
  onToggleRotationHelper: (checked: boolean) => void;
  onToggleObservatory: (checked: boolean) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  rotationSpeed,
  setRotationSpeed,
  resetView,
  showAxesOutter,
  showGridOutter,
  showRotationHelperOutter,
  showObservatoryOutter,
  onToggleAxis,
  onToggleGrid,
  onToggleRotationHelper,
  onToggleObservatory,
}) => {
  // 将0.1-10的速度范围转换为0-100的滑块值
  const [sliderValue, setSliderValue] = useState(
    Math.round(((rotationSpeed - 0.1) / 9.9) * 100)
  );

  // 当滑块值变化时，更新旋转速度
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSliderValue = parseInt(e.target.value);
    setSliderValue(newSliderValue);
    
    // 将0-100的滑块值转换回0.1-10的速度范围
    const newSpeed = 0.1 + (newSliderValue / 100) * 9.9;
    setRotationSpeed(newSpeed);
  };

  // 当rotationSpeed从外部变化时，更新滑块值
  useEffect(() => {
    setSliderValue(Math.round(((rotationSpeed - 0.1) / 9.9) * 100));
  }, [rotationSpeed]);

  return (
    <div className="control-panel">      
      <div className="control-group">
        <label>
          地球旋转速度: {rotationSpeed.toFixed(1)}
          <div className="slider-container">
            <span className="slider-min">0.1</span>
            <input
              type="range"
              min="0"
              max="100"
              value={sliderValue}
              onChange={handleSliderChange}
              className="slider"
            />
            <span className="slider-max">10</span>
          </div>
        </label>
      </div>
      <div className="control-checkbox">
        <input type="checkbox" className="axis-toggle" checked={showAxesOutter} onChange={(e) => onToggleAxis(e.target.checked) } />
        <label>显示坐标轴（A）</label>
      </div>
      <div className="control-checkbox">
        <input type="checkbox" className="axis-toggle" checked={showGridOutter} onChange={(e) => onToggleGrid(e.target.checked) } />
        <label>显示经纬度网格（G）</label>
      </div>
      <div className="control-checkbox">
        <input type="checkbox" className="axis-toggle" checked={showRotationHelperOutter} onChange={(e) => onToggleRotationHelper(e.target.checked) } />
        <label>显示自转辅助线（F）</label>
      </div>
      <div className="control-checkbox">
        <input type="checkbox" className="axis-toggle" checked={showObservatoryOutter} onChange={(e) => onToggleObservatory(e.target.checked) } />
        <label>显示观星台和天球（O）</label>
      </div>
      <div className="control-group">
        <button 
          className="reset-button"
          onClick={resetView}
        >
          重置视图
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;