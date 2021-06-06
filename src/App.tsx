import './App.scss';
import React, { useState } from 'react';
import CanvasComponent from './components/canvas-component/CanvasComponent';
import ConfigModalComponent from './components/config-modal-component/ConfigModalComponent';
import { BsFillGearFill } from 'react-icons/bs';
import { createStore } from 'redux';

function App() {

  const [xValue, setXValue] = useState(50);
  const [yValue, setYValue] = useState(50);

  const [showConfig, setShowConfig] = useState(false);
  let configDataChange = function (data: any) {
    console.log(data);
    if (data.axis == 'x') {
      setXValue(data.value);
    }
    if (data.axis == 'y') {
      setYValue(data.value)
    }
  }
  
  return (
    <div className="App">
        <div className={ showConfig ? 'panel-show' : 'panel-hide' }>
          <ConfigModalComponent dataChange={configDataChange} x={xValue} y={yValue}></ConfigModalComponent>
        </div>

        <div className="app-header">
            <button className="config-modal-btn" onClick={ () => { setShowConfig(!showConfig) }}>
                <BsFillGearFill/>
            </button>
        </div>

        <CanvasComponent x={xValue} y={yValue}></CanvasComponent>
    </div>
  );
}

export default App;
