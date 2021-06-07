import React from 'react';
import './ConfigModal.scss';

function ConfigModalComponenet(props: {dataChange: any, x: number, y: number}) {

  /**Sends the data changes to the parent trough the dataChange prop function */
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
      <span>x: </span>
      <input type="text" value={props.x} onChange={ (event) => { onChange('x', parseInt(event.target.value))} }/>
      <span>y: </span>
      <input type="text" value={props.y} onChange={ (event) => { onChange('y', parseInt(event.target.value))} }/>
      <button className="toggle-btn"></button>
    </div>
  );
}

export default ConfigModalComponenet;