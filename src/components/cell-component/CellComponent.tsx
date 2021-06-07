// import React from 'react';
import './Cell.scss';
import { useState } from 'react';
import EventEmitter from 'events';

function CellComponent(props: { x: number, y: number }) {

  const [status, setStatus] = useState(false);

  function mouseEnter(event: any) {
    if (event.buttons === 1 && !status) {
      setStatus(true);
    }

    if (event.buttons === 2 && status) {
      setStatus(false);
    }
  }

  return (
    <div className={`CellComponent ${status ? "alive" : "dead"}`}
      onMouseEnter={mouseEnter}
      onContextMenu={ (e) => {e.preventDefault();} }
      onClick={() => { setStatus(!status); }}>

    </div>
  );
}

export default CellComponent;