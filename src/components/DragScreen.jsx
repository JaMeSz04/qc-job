import React, {Component} from 'react';
import {ReactSVGPanZoom} from 'react-svg-pan-zoom';
import Plate from './Plate.jsx';

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
    this.onCellClickedhandler = this.onCellClickedhandler.bind(this);
    this.createCell = this.createCell.bind(this);

    var dummy = this.state.cellList;
    var counter = 0;
    for (var i = 0; i < (screen.height - 300); i += 101){
      for (var j = 0 ; j < (screen.width - 20) ; j+= 101){
        dummy.push( { id : counter , shape : this.props.shape, xPos : j, yPos : i, color : "gray"} );
        counter++;
      }
    }
  }

  componentDidMount() {
    this.Viewer.fitToViewer();
  }

  handleOnClick(event){
    console.log("plate clicked");
    
  }

  onCellClickedhandler(event, id){
   
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
    console.log(renderCell);
    return (
        <ReactSVGPanZoom
          background = {"#D3D3D3"}
          style={{outline: "1px solid black"}}
          width={screen.width - 15} height={screen.height - 300} ref={Viewer => this.Viewer = Viewer}
          onClick={(event) => this.handleOnClick(event)}
          SVGBackground = {"#D3D3D3"}
          tool = {"auto"}>
            <svg width={900} height={800}>
                {renderCell}    
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
    var id = this.props.num;
    return(
      <foreignObject x= {this.props.x} y= {this.props.y} width= {100} height= {100} >
          <div style = {color} className = {this.props.shape} onClick= { (event) => { this.props.onClickCell() }}> </div>
                                                              
      </foreignObject>
    );
  }
}