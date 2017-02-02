import React, {Component} from 'react';
import {ReactSVGPanZoom} from 'react-svg-pan-zoom';
import Plate from './Plate.jsx';

export default class DragScreen extends Component {
  constructor(props, context) {
    super(props, context);
    this.Viewer = null;
    this.handleOnClick = this.handleOnClick.bind(this);
    this.onCellClickedhandler = this.onCellClickedhandler.bind(this);
  }

  componentDidMount() {
    this.Viewer.fitToViewer();
  }

  handleOnClick(event){
    console.log(" kuy clicked");
    
  }

  onCellClickedhandler(){
    alert("it worked");
  }
  
  render() {
    
    return (
        <ReactSVGPanZoom 
          background = {"#FFF"}
          style={{outline: "1px solid black"}}
          width={screen.width - 20} height={screen.height - 300} ref={Viewer => this.Viewer = Viewer}
          onClick={(event) => this.handleOnClick(event)}
          SVGBackground = {"#FFF"}
          tool = {"auto"}>
            <svg width={900} height={800}>
                <Cell x = {40} y = {40} color = "gray" hehe = { this.onCellClickedhandler }/>
            </svg>

        </ReactSVGPanZoom>
        
    );
  }
}


class Cell extends Component {

  render(){
    var color = {
      background : this.props.color
    };

    return(
      <foreignObject x= {this.props.x} y= {this.props.y} width= {100} height= {100} >
          <div style = {color} className = "square" onClick={ (event) => { this.props.hehe }}>I'm a div in an svg</div>
      </foreignObject>
    );
  }
}