import React from 'react';
import './ConfigModal.scss';

function ConfigModalComponenet(props: {dataChange: any, x: number, y: number}) {

  function onChange(axis: string, value: number) {
    if (props.dataChange) {
      props.dataChange({
        axis: axis,
        value: value
      });
    }
  }

  return (
    <div className="ConfigModalComponent">
      x: 
      <input type="text" value={props.x} onChange={ (event) => { onChange('x', parseInt(event.target.value))} }/>
      y: 
      <input type="text" value={props.y} onChange={ (event) => { onChange('y', parseInt(event.target.value))} }/>
    </div>
  );
}

export default ConfigModalComponenet;