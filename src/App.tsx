import './App.scss';
import { useState } from 'react';
import CanvasComponent from './components/canvas-component/CanvasComponent';
import ConfigModalComponent from './components/config-modal-component/ConfigModalComponent';
import { BsFillGearFill, BsPlay } from 'react-icons/bs';
import { IoIosArrowForward } from 'react-icons/io';
import { useDispatch } from 'react-redux';

function App() {
  const [showConfig, setShowConfig] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="App">

      <div className={showConfig ? 'panel-show' : 'panel-hide'}>
        <ConfigModalComponent></ConfigModalComponent>
      </div>
      <smart-hover query-selector=".primary-btn" class="app-header" override-styles="true">
        <button className="primary-btn icon-btn" onClick={() => { setShowConfig(!showConfig) }}>
          <BsFillGearFill />
        </button>
        {/* <button className="primary-btn icon-btn" onClick={ (event) => { dispatch({type: 'event', value: 'toggle'}) } }> <BsPlay /> </button>
        <button className="primary-btn icon-btn" onClick={ (event) => { dispatch({type: 'event', value: 'next'}) } }> <IoIosArrowForward /> </button>
        <button className="primary-btn text-btn" onClick={ (event) => { dispatch({type: 'event', value: 'clear'}) } }> Clear </button>
        <button className="primary-btn text-btn" onClick={ (event) => { dispatch({type: 'event', value: 'random'}) } }> Random </button> */}
      </smart-hover>
      <CanvasComponent></CanvasComponent>
    </div>
  );
}

export default App;
