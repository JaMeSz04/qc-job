import React, {Component} from 'react';
import {ReactSVGPanZoom} from 'react-svg-pan-zoom';
import Cell from './Cell.jsx';
import {Row, Col, Button,Panel,Modal, form, FormGroup, FormControl, Checkbox, DropdownButton, MenuItem} from 'react-bootstrap';
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
      saveClose : false,
      toggleActive : true,
      allowAdd : true,
      shape : "square"
    };
    this.Viewer = null;
    this.handleOnClick = this.handleOnClick.bind(this);
    this.createCell = this.createCell.bind(this);
    this.save = this.save.bind(this);
    this.onToggle = this.onToggle.bind(this);

  }

  componentDidMount() {
    this.Viewer.fitToViewer();
  }
  onToggle() {
    console.log("toggled");
    this.setState({ toggleActive: !this.state.toggleActive });
  }

  handleOnClick(event){
    console.log("plate clicked");
    var temp = this.state.cellList;
    
    var newX = (event.x - (event.x % 60)) + 1;
    var newY = (event.y - (event.y % 60)) + 1;

    var x2 = (event.x - 30);
    var y2 = (event.y - 30);
    
    var contained = false;
    for (var i = 0 ; i < temp.length; i++){
       
        if (temp[i].xPos == newX && temp[i].yPos == newY){
            contained = true;
            temp.splice(i, 1);
        } else if (temp[i].xPos == x2  && temp[i].yPos == y2 ){
            contained = true;
            temp.splice(i,1);
        }
        
    }
    
    
    if (!contained) {
        if (this.state.allowAdd){

        
            if (this.state.toggleActive){
                temp.push( {id : this.state.size , color : "gray", xPos :  newX, yPos : newY, shape : "square" ,type : "g"});
            } else {
                temp.push( {id : this.state.size , color : "gray", xPos :  x2, yPos : y2, shape : "square" , type : "ng"});

            }
            
            this.setState( { size : this.state.size + 1 } );
        } else {
            this.setState({allowAdd : true});
        }
        
    }
    this.forceUpdate();
    
  }
  
  createCell(obj){
    return <Cell num = {obj.id} x = {obj.xPos} y = {obj.yPos} color = {obj.color} shape = {this.state.shape} onClickCell = {
      (event) => {
                var temp = this.state.cellList;
                for (var i = 0 ; i < temp.length ; i++){
                    if (temp[i].id == obj.id){
                        temp.splice(i,1);
                        this.setState({allowAdd : false});
                    }
                }
                
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
        this.props.resetData();
  }
 
  render() {

    const renderCell = this.state.cellList.map( (obj) => this.createCell(obj));
    let saveClose = () => { this.setState({ saveShow: false }) }
    let cancelClose = () => { this.setState({ cancelShow: false }) }


    return (
            <Row>
                <Row style = {{marginLeft: "3vh"}}>
                    <ReactSVGPanZoom
                    background = {"gray"}
                    style={{outline: "1px solid black", marginTop : "1vh"}}
                    width={screen.width - 300} height={screen.height - 400} ref={Viewer => this.Viewer = Viewer}
                    onClick={(event) => this.handleOnClick(event)}
                    SVGBackground = {"#D3D3D3"}
                    tool = {"auto"}>
                        <svg width={screen.width + 500} height={screen.height + 500}>
                            {renderCell}  
                        </svg>
                    </ReactSVGPanZoom> 
                </Row>
                <Row style = {{marginLeft : "3vh", marginTop : "3vh", marginRight : "1vh"}}>
                    <Col md = {2}>
                        
                    </Col>
                    <Col md = {2}>
                        <DropdownButton title="Shape" id="bg-nested-dropdown" bsSize = "large" onSelect={(event) => {this.setState({shape: event}); this.forceUpdate()}}>
                            <MenuItem eventKey="square"> Square </MenuItem> 
                            <MenuItem eventKey="circle"> Circle </MenuItem>
                        </DropdownButton>
                    </Col>
                    <Col style = {{height: "20px"}}  md = {2}>
                        <FormGroup>
                            <Button block bsSize = "large" onClick = {() => this.onToggle()} checked = {this.state.toggleActive}>
                            { "Grid " + (this.state.toggleActive? "on" : "off")}
                            </Button>
                        </FormGroup>
                    </Col>
                    <Col md = {3}>
                        <Button block bsStyle = "warning" bsSize = "large" onClick = {() =>this.props.onHide()} > Cancel </Button>
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