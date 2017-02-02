import React, {Component} from 'react';
import {ReactSVGPanZoom} from 'react-svg-pan-zoom';

export default class DragScreen extends Component {
  constructor(props, context) {
    super(props, context);
    this.Viewer = null;
  }
  componentDidMount() {
    this.Viewer.fitToViewer();
  }
  render() {
    return (
      <div>
        <button onClick={event => this.Viewer.zoomOnViewerCenter(1.1)}>Zoom in</button>
        <button onClick={event => this.Viewer.fitSelection(40, 40, 200, 200)}>Zoom area</button>
        <button onClick={event => this.Viewer.fitToViewer()}>Fit</button>

        <hr/>

        <ReactSVGPanZoom
          style={{outline: "1px solid black"}}
          width={window.innerWidth} height={window.innerHeight} ref={Viewer => this.Viewer = Viewer}
          onClick={event => console.log('click', event.x, event.y, event.originalEvent)}
          onMouseMove={event => console.log('move', event.x, event.y)} >

          <svg width={900} height={800}>
                <div>Hello world</div>
          </svg>
        </ReactSVGPanZoom>
      </div>
    );
  }
}