import React from 'react';
import './Canvas.scss';

function CanvasComponent(props: {x: number, y: number}) {



  return (
    <div className="CanvasComponent">
        Hello from canva
        {props.x}
        {props.y}
    </div>
  );
}

export default CanvasComponent;