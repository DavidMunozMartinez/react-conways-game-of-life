import './ConfigModal.scss';
import { useSelector, useDispatch } from 'react-redux';

function ConfigModalComponenet() {

  const config = useSelector((state: any) => state.config);
  const dispatch = useDispatch();

  function updateConfig(prop: any, value: any) {
    dispatch({ 
      type: 'update',
      data: {
        prop: prop,
        value: value
      }
    });
  }

  return (
    <div className="ConfigModalComponent">
      <span>x: </span>
      <input type="number" max={60} value={config.x} onChange={(event) => { updateConfig('x', event.target.value) }} />
      <span>y: </span>
      <input type="number" max={60} value={config.y} onChange={(event) => { updateConfig('y', event.target.value) }} />
      <span> Speed:</span>
      <input type="number" min={100} value={config.speed} onChange={(event) => {updateConfig('speed', event.target.value) }}/>
    </div>
  );
}

export default ConfigModalComponenet;