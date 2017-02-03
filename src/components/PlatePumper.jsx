import React, {Component} from 'react';
import {ReactSVGPanZoom} from 'react-svg-pan-zoom';
import Cell from './Cell.jsx';

export default class PlatePumper extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      cellList : [ ],
      selectedColor : "red",
      defaultColor : "gray",
      size : 0
    };
    this.Viewer = null;
    this.handleOnClick = this.handleOnClick.bind(this);
    this.createCell = this.createCell.bind(this);
  }

  componentDidMount() {
    this.Viewer.fitToViewer();
  }

  handleOnClick(event){
    console.log("plate clicked");
    var temp = this.state.cellList;
    var newX = (event.x - (event.x % 100)) + 1;
    var newY = (event.y - (event.y % 100)) + 1;
    var contained = false;
    for (var i = 0 ; i < temp.length; i++){
        if (temp[i].xPos == newX && temp[i].yPos == newY){
            contained = true;
            temp.splice(i, 1);
        }
    }
    
    if (!contained) {
        temp.push( {id : this.state.size , color : "gray", xPos :  newX, yPos : newY, shape : "square" });
        this.setState( { size : this.state.size + 1 } );
        
    }
    this.forceUpdate();
    
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

    const renderCell = this.state.cellList.map( (obj) => this.createCell(obj));
    return (
        <ReactSVGPanZoom
          background = {"#D3D3D3"}
          style={{outline: "1px solid black"}}
          width={screen.width - 15} height={screen.height - 400} ref={Viewer => this.Viewer = Viewer}
          onClick={(event) => this.handleOnClick(event)}
          SVGBackground = {"#D3D3D3"}
          tool = {"auto"}>
            <svg width={screen.width - 15} height={screen.height - 400}>
                {renderCell}    
            </svg>
        </ReactSVGPanZoom>      
    );
  }
}
