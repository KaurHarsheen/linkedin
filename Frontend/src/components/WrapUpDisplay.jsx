// src/components/WrapUpDisplay.js
import React, { useState, useEffect } from 'react';
import TitleScene from './scenes/TitleScene';
import StatsScene from './scenes/StatsScene';
import ProjectsScene from './scenes/ProjectsScene';
import OutroScene from './scenes/OutroScene';

const WrapUpDisplay = ({ data, onBack }) => {
  const [currentScene, setCurrentScene] = useState(0);

  // Define the sequence of your scenes
  const scenes = [
    (props) => <TitleScene {...props} />,
    (props) => <StatsScene {...props} />,
    (props) => <ProjectsScene {...props} />,
    (props) => <OutroScene {...props} />,
  ];

  const handleNext = () => {
    setCurrentScene(prev => Math.min(prev + 1, scenes.length - 1));
  };
  
  const handlePrev = () => {
    setCurrentScene(prev => Math.max(prev - 1, 0));
  };

  const CurrentSceneComponent = scenes[currentScene];

  return (
    <div className="wrap-up-container">
        <button onClick={onBack} className="back-to-form-btn">← Edit Data</button>
        
        <div className="scene-viewer">
          <CurrentSceneComponent data={data} sceneIndex={currentScene} />
        </div>
      
        <div className="navigation-controls">
            <button onClick={handlePrev} disabled={currentScene === 0}>Previous</button>
            <span>Scene {currentScene + 1} / {scenes.length}</span>
            <button onClick={handleNext} disabled={currentScene === scenes.length - 1}>Next</button>
        </div>
    </div>
  );
};

export default WrapUpDisplay;