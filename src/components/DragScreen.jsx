import React, {Component} from 'react';
import {ReactSVGPanZoom} from 'react-svg-pan-zoom';
import Plate from './Plate.jsx';

export default class DragScreen extends Component {
  constructor(props, context) {
    super(props, context);
    this.Viewer = null;
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  componentDidMount() {
    this.Viewer.fitToViewer();
  }

  handleOnClick(event){
    console.log("clicked");
    console.log(event.x);
    console.log(event.y);
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
                <Cell/>
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
      <foreignObject x= {this.props.x} y= {this.props.y} width= {100} height= {100}>
          <div style = {color} className = "square">I'm a div in an svg</div>
      </foreignObject>
    );
  }
}