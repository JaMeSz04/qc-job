import React, {Component} from 'react';
import {ReactSVGPanZoom} from 'react-svg-pan-zoom';
import Cell from './Cell.jsx';
import {Row, Col, Button,Panel,Modal, form, FormGroup, FormControl} from 'react-bootstrap';
import axios from 'axios';


export default class PlatePumper extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      cellList : [ ],
      selectedColor : "red",
      defaultColor : "gray",
      size : 0,
      saveShow : false,
      saveClose : false
    };
    this.Viewer = null;
    this.handleOnClick = this.handleOnClick.bind(this);
    this.createCell = this.createCell.bind(this);
    this.save = this.save.bind(this);

  }

  componentDidMount() {
    this.Viewer.fitToViewer();
  }

  handleOnClick(event){
    console.log("plate clicked");
    var temp = this.state.cellList;
    var newX = (event.x - (event.x % 60)) + 1;
    var newY = (event.y - (event.y % 60)) + 1;
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

  save(name){
      console.log("save");
      console.log(name);
      
      axios.post('http://localhost:3616/savePattern', {
            "name" : name,
            "options" : this.state.cellList
        })
        .then(function (response) {
            console.log("response with : "  + response);
        })
        .catch(function (error) {
            console.log("error with :  " + error);
        });
        this.setState({ saveShow: false });
  }
 
  render() {

    const renderCell = this.state.cellList.map( (obj) => this.createCell(obj));
    let saveClose = () => { this.setState({ saveShow: false }) }
    let cancelClose = () => { this.setState({ cancelShow: false }) }


    return (
            <Row>
                <Row style = {{marginLeft: "3vh"}}>
                    <ReactSVGPanZoom
                    background = {"#D3D3D3"}
                    style={{outline: "1px solid black", marginTop : "1vh"}}
                    width={screen.width - 15} height={screen.height - 400} ref={Viewer => this.Viewer = Viewer}
                    onClick={(event) => this.handleOnClick(event)}
                    SVGBackground = {"#D3D3D3"}
                    tool = {"auto"}>
                        <svg width={screen.width - 15} height={screen.height - 400}>
                            {renderCell}  
                        </svg>
                    </ReactSVGPanZoom> 
                </Row>
                <Row style = {{marginLeft : "3vh", marginTop : "3vh", marginRight : "1vh"}}>
                    <Col md = {6}>
                        
                    </Col>
                    <Col md = {3}>
                        <Button block bsStyle = "warning" bsSize = "large" > Cancel </Button>
                    </Col>
                    <Col md ={3}>
                        <Button block bsStyle = "primary" bsSize = "large" onClick={ () => this.setState({ saveShow: true })}> Save </Button>
                    </Col>
                </Row>
                <SaveModal show={this.state.saveShow} onHide={saveClose} handleSave = { (name) => this.save(name) }/>
            </Row>
    );
  }
}

class SaveModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            name : ""
        }
        this.changeText = this.changeText.bind(this);
    }
    changeText(text){   
        this.setState ( { name : text });
    }
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
                        onChange={(event) => { console.log (event.target.value); this.setState( { name : event.target.value});}}
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