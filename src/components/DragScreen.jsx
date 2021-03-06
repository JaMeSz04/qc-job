import React, {Component} from 'react';
import {ReactSVGPanZoom} from 'react-svg-pan-zoom';
import Plate from './Plate.jsx';
import Cell from './Cell.jsx';
import Colors from '../colors.js';
import {Modal,FormControl, Button} from 'react-bootstrap';


export default class DragScreen extends Component {
  
  constructor(props, context) {
    super(props, context);
    this.state = {
      cellList : [ ],
      selectedColor : this.props.selectedColor,
      defaultColor : "gray",
      score : 0,
      showResult : false,
      showModal : this.props.isSubmitted,
      isSendData : false,
      colorList: []
      
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

  componentWillReceiveProps(nextProps){
      if (nextProps.isSubmitted && !this.state.isSendData){
        this.setState({isSendData : true});
        
        
        var score = 0;
        for (var i = 0 ;  i < this.state.cellList.length ; i++){
          if ( this.props.color[i].value == this.state.cellList[i].color ){
            score++;
          }
        }
       
        this.props.submit(this.state.cellList, score, this.state.cellList.length);
    }
  }


  handleOnClick(event){
    console.log("plate clicked");
    
  }
  
  createCell(obj,index){
    var word = "";
    var xPos = obj.xPos;
    var yPos = obj.yPos;

    var temp = [];
    
    for (var i = 0 ; i < this.props.color.length; i++){
      temp.push( { id : i, value : this.props.color[i].value});
    }

    
   
    if (this.props.isSubmitted){
      
      if (temp[index].value != obj.color){
        
          for (var i = 0 ; i < temp.length ; i++ ){
              if (temp[i].value == obj.color){
                word = temp[i].id;
                word++;
              }
          }
      } else {
        word = "";
      }
      

      
      return <Cell num = {obj.id} x = {xPos} y = {yPos} color = {obj.color} shape = {obj.shape} text = {word} isSubmitted = {this.props.isSubmitted} onClickCell = {
        () => { } } />;
    } else {
      return <Cell num = {obj.id} x = {xPos} y = {yPos} color = {obj.color} shape = {obj.shape} isSubmitted = {this.props.isSubmitted}  onClickCell = {
        () => {
                 
                  var temp = this.state.cellList;
                  for (var i = 0 ; i < temp.length ; i++){
                      if (temp[i].id == obj.id){
                        if (temp[i].color != this.state.defaultColor){
                            this.props.onAdd(temp[i]);
                            temp[i].color = this.state.defaultColor;
                        } else {
                            if (this.props.selectedColor != "gray"){
                              temp[i].color = this.props.selectedColor;
                              this.props.clickCell();
                             
                              this.props.onRemove(temp[i]);
                            }
                        }
                        
                      }
                  }
                  this.forceUpdate();
              }
      }  />;
    }
  }
  
  
 
  render() {

    var height = screen.height - 400;
    if (this.props.isSubmitted){
      height = screen.height - 200;
    }
    var toRender = null;
    var temp = this.state.cellList;
    for (var i = 0 ; i < temp.length ; i++){
      temp[i].id = i;
    }
    
    
      const renderCell = this.state.cellList.map( (obj,index) => this.createCell(obj,index) );
      toRender = 
        <ReactSVGPanZoom 
            className = "dragScreen"
           
            background = {"#D3D3D3"}
            style={{outline: "1px solid black"}}
            width={screen.width - 380} height={height} ref={Viewer => this.Viewer = Viewer}
            onClick={(event) => this.handleOnClick(event)}
            SVGBackground = {"#D3D3D3"}
            tool = {"auto"}>
              <svg width={screen.width - 380} height={height}>
                  {renderCell}
              </svg>
        </ReactSVGPanZoom>

    let setCloseModal = () => { this.setState( { isOpenModal : false }) };

    return(
      <div>
        {toRender}
        <ResultModal show = {this.state.isOpenModal} onHide = {setCloseModal}/>
      </div>
    );
  }
}



class ResultModal extends Component{
  render(){
    return(
        <Modal {...this.props} bsSize = "small" aria-labelledby = "contained-modal-title-sm" >
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-sm">Set Pattern Name</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormControl
                        type="text"
                        placeholder="Pattern name"
                        onChange={(event) => {  this.setState( { name : event.target.value});}}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                    <Button onClick={()=>this.props.handleSave(this.state.name)} bsStyle = "primary"> Save </Button>
                </Modal.Footer>
          </Modal>
    );
  }
}

