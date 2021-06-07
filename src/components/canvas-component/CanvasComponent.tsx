import './Canvas.scss';
import { times } from 'lodash';
import CellComponent from '../cell-component/CellComponent';

function CanvasComponent(props: {x: number, y: number}) {

  return (
    <div className="CanvasComponent"
    onContextMenu={ (e) => {e.preventDefault();} }>
      {times(props.x, (i: number) => {
        return (<div className="row" key={i}>
          {times(props.y, (j: number) => {
            return (<CellComponent x={i} y={j} key={j}/>)
          })}
        </div>)
      })}

    </div>
  );
}

export default CanvasComponent;