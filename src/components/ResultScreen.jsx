import React, {Component} from 'react';
import {ReactSVGPanZoom} from 'react-svg-pan-zoom';
import {Modal} from 'react-bootstrap';
import Cell from './Cell.jsx';

export default class ResultScreen extends Component {

    constructor(props,context){
        super(props,context);
        this.Viewer = null;
    }
    componentDidMount(){
        this.Viewer.fitToViewer();
    }

    createCell(obj){
    var text = "";
    for (var i = 0 ; i < this.props.color.length ; i++){
      if (this.props.color[i].value != obj.color){
        return <Cell num = {obj.id} text = {this.props.color[i].id} x = {obj.xPos} y = {obj.yPos} color = {obj.color} shape = {obj.shape} />
      } else {
        return <Cell num = {obj.id} text = {""} x = {obj.xPos} y = {obj.yPos} color = {obj.color} shape = {obj.shape} /> 
      }
    }
    
  }

    render(){
        const renderCell = this.props.data.map( (obj) => this.createCell(obj) );
        return(
            
            <ReactSVGPanZoom
          style={{outline: "1px solid black"}}
          width={screen.width} height={screen.height} ref={Viewer => this.Viewer = Viewer}
          onClick={event => console.log('click', event.x, event.y, event.originalEvent)}
          onMouseMove={event => console.log('move', event.x, event.y)} >

          <svg width={screen.width} height={screen.height}>
              {renderCell}
          </svg>
        </ReactSVGPanZoom>
        );
    }
}