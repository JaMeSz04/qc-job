import React, {Component} from 'react';
import {ReactSVGPanZoom} from 'react-svg-pan-zoom';
import Plate from './Plate.jsx';
import Cell from './Cell.jsx';


export default class DragScreen extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      cellList : [ ],
      selectedColor : "red",
      defaultColor : "gray"
    };
    this.Viewer = null;
    this.handleOnClick = this.handleOnClick.bind(this);
    this.createCell = this.createCell.bind(this);

    var dummy = this.state.cellList;
    var counter = 0;
    for (var i = 0; i < this.props.data.length; i += 1){
        dummy.push( { id : counter , shape : this.props.shape, xPos : this.props.data[i].x, yPos : this.props.data[i].y, color : "gray"} );
        counter++;
      
    }
  }

  componentDidMount() {
    this.Viewer.fitToViewer();
  }

  handleOnClick(event){
    console.log("plate clicked");
    
  }
  
  createCell(obj){
    return <Cell num = {obj.id} x = {obj.xPos} y = {obj.yPos} color = {obj.color} shape = {obj.shape} onClickCell = {
      () => {
                console.log("it work as id : " + obj.id);
                var temp = this.state.cellList;
                for (var i = 0 ; i < temp.length ; i++){
                    if (temp[i].id == obj.id){
                      if (temp[i].color != this.state.defaultColor){
                          temp[i].color = this.state.defaultColor;
                      } else {
                          temp[i].color = this.state.selectedColor;
                      }
                    }
                }
                this.forceUpdate();
            }
    }  />;
  }
 
  render() {
    
    const renderCell = this.state.cellList.map( (obj) => this.createCell(obj) );
    console.log(renderCell);
   
    
    return(
       <ReactSVGPanZoom
          background = {"#D3D3D3"}
          style={{outline: "1px solid black"}}
          width={screen.width - 380} height={screen.height - 400} ref={Viewer => this.Viewer = Viewer}
          onClick={(event) => this.handleOnClick(event)}
          SVGBackground = {"#D3D3D3"}
          tool = {"auto"}>
            <svg width={screen.width - 380} height={screen.height - 400}>
                {renderCell}
            </svg>
        </ReactSVGPanZoom> 
    );
  }
}



