import './App.scss';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { CanvasComponent, ICanvasCallables } from './components/canvas-component/CanvasComponent';
import ConfigModalComponent from './components/config-modal-component/ConfigModalComponent';
import { BsFillGearFill, BsPlayFill, BsPauseFill } from 'react-icons/bs';
import { FiGithub } from 'react-icons/fi';
import { IoIosArrowForward } from 'react-icons/io';

function App() {
  const [showConfig, setShowConfig] = useState(false);
  const config = useSelector((state: any) => state.config);
  let canvasCallables: ICanvasCallables;

  // This feels ilegal but it works tho
  function setCallables(service) {
    canvasCallables = service;
  }

  return (
    <div className="App">

      <div className={showConfig ? 'panel-show' : 'panel-hide'}>
        <ConfigModalComponent></ConfigModalComponent>
      </div>
      <smart-hover query-selector=".primary-btn" class="app-header" override-styles="true">
        <button className="primary-btn icon-btn" onClick={() => { setShowConfig(!showConfig) }}>
          <BsFillGearFill />
        </button>
        <button className="primary-btn icon-btn" onClick={() => { canvasCallables.toggle() }}> {config.running ? <BsPauseFill /> : <BsPlayFill /> } </button>
        <button className="primary-btn icon-btn" onClick={() => { canvasCallables.next() }}> <IoIosArrowForward /> </button>
        <button className="primary-btn text-btn" onClick={() => { canvasCallables.clear() }}> Clear </button>
        <button className="primary-btn text-btn" onClick={() => { canvasCallables.randomize(0.3) }}> Random </button>
        <select defaultValue="init" placeholder="examples" className="primary-btn" onChange={(event) => { canvasCallables.example(event.target.value) }}>
          <option value="init" disabled>Cool examples</option>
          <option value="glider">Simple glider</option>
          <option value="g-glider">Gosper's glider gun</option>
          <option value="cloverleaf">Cloverleaf</option>
          <option value="pulsar">Pulsar</option>

        </select>

        <button onClick={ ()=> {window.open('https://github.com/DavidMunozMartinez/react-conways-game-of-life')} } className="primary-btn" style={{float: 'right', borderRadius: 5}}> <FiGithub></FiGithub></button>
      </smart-hover>
      <CanvasComponent callablesSetter={setCallables}></CanvasComponent>
    </div>
  );
}

export default App;
