import React, {Component} from 'react';
import {Row, Col, Button, Modal, DropdownButton, MenuItem, Form, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import axios from 'axios';
import Game from './Game.jsx';
import OthersMenu from './OthersMenu.jsx';

export default class MainMenu extends Component{
    constructor(props){
        super(props);
        this.state = {
            lgShow: false,
            otherShow : false,
            selectedPattern : "snake",
            selectedColor : "gray",
            selectedTime : -1,
            data : [],
            showGame : false,
            showOther : false,
           
        }
        
        this.setState({ saveShow: false });
        this.setNewData = this.setNewData.bind(this);
        this.onStartHandler = this.onStartHandler.bind(this);

    }
    setNewData(nData){
        console.log("set new data");
        this.setState({ data : nData.data });
    }
    componentDidMount(){
        var word = this.state.data;
        axios.post('http://localhost:3616/getPattern', {
            
        })
        .then(this.setNewData)
        .catch(function (error) {
            console.log("error with :  " + error);
        })
        
    }

    onStartHandler(patternName, selectedColor , time){
        this.setState( { selectedPattern : patternName , selectedColor : selectedColor, selectedTime : time , showGame : true, showOther : false});

    }
    render(){
        let lgClose = () => this.setState({ lgShow: false });
        let lgOpen = () => this.setState({ lgShow : true });
        let otherOpen = () => this.setState( { otherShow : true });
        let otherClose = () => this.setState( { otherShow : false});    

        let renderElement = (
            <div className = "container">
                <Row>
                    <h1 style = {{textAlign:"center"}}> QC-Testing Appllication</h1>
                </Row>
                <div style = {{ margin: "auto", maxWidth: "300px"}}>
                    <Row style = {{alignContent : "center"}}>
                        <Button bsSize = "large" bsStyle = "primary" onClick = {lgOpen}>Test</Button>
                        <Button bsSize = "large" bsStyle = "primary" onClick = {otherOpen} >Others</Button>
                    </Row>
                
                    <SelectModal colorSelect = {['red','blue','green','brown']} show={this.state.lgShow} patternList = {this.state.data} onHide={lgClose} onStart = {this.onStartHandler} />
                    <LoginModal show = {this.state.otherShow} onHide = {otherClose} login  = { () => this.setState( { showOther : true} ) }/>
                </div>
            </div>);
            
        if (this.state.showGame){
            var temp = []
            for (var i = 0 ; i < this.state.data.length ; i++){
                if (this.state.data[i].pattern_name == this.state.selectedPattern)
                    temp.push( { x : this.state.data[i].xPos, y : this.state.data[i].yPos});
            }
            var time = parseInt(this.state.selectedTime);
            renderElement = (<Game shape = "square" data = {temp} min = {time} color  = {this.state.selectedColor}/>)
        } else if (this.state.showOther) {
            renderElement = (<OthersMenu data = {this.state.data}/>);
        } 

        return(
            <div>
            {renderElement}
            </div>
        );
    }
}


class LoginModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            username : "",
            password : "",
            userValid : null,
            passwordValid : null
        }
    }

    render(){
        return(
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>System Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form horizontal>
                        <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} sm={2}>
                            Username
                        </Col>
                        <Col sm={10}>
                            <FormControl type="text" placeholder="Username" onChange = {(e) => this.setState({username : e.target.value})} validationState = { this.state.userValid } />
                        </Col>
                        </FormGroup>

                        <FormGroup controlId="formHorizontalPassword">
                        <Col componentClass={ControlLabel} sm={2}>
                            Password
                        </Col>
                        <Col sm={10}>
                            <FormControl type="password" placeholder="Password" onChange = {(e) => this.setState({password : e.target.value})} validationState = { this.state.passwordValid } />
                        </Col>
                        </FormGroup>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                    <Button bsStyle = "primary" type="submit" onClick = { ()=> {
                            if (this.state.username == "ShubU"){
                                if (this.state.password == "Beareater05"){
                                    this.setState( { isSignin : true , passwordValid : null, userValid : null} );
                                    this.props.login();
                                } else {
                                    this.setState( { passwordValid : "error"} );
                                }
                            } else {
                                this.setState( { userValid : true });
                            }
                        }
                        } >Sign in</Button>
                </Modal.Footer>
            </Modal>
        );  
    }
}

class SelectModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedColor : "",
            selectedPattern : "",
            pickerName : "Pattern List",
            timeText : ""
        }
        this.changeDropDown = this.changeDropDown.bind(this);
    }

    changeDropDown(val){
        this.setState({pickerName : val});
        console.log('check');
        console.dir(val);
    }

    render(){ 
        const colorList = this.props.colorSelect.map( (value) => { 
            var style = {
                background : value
            }
            return ( <Col md = {1}> <div style = {style} className = "square" onClick = { () => this.setState( {selectedColor : value} ) } > </div> </Col>);
        })
      
        
        if (this.state.selectedColor != ""){
            var selectStyle = {
                background : this.state.selectedColor,
                marginTop : "2vh",
                marginRight : "10%"
            }
        }
     
        console.log("data : " + this.props.patternList);
        var exist = [];
        for (var i = 0 ; i < this.props.patternList.length; i++){

            if (exist.indexOf(this.props.patternList[i].pattern_name) >= 0){
                continue;
            }
            else{
                exist.push(this.props.patternList[i].pattern_name);
            }
        }
        console.log("exist : ");
        
        var pat = exist.map( (val,index) => ( <MenuItem onClick = { () => { this.changeDropDown(val) }}eventKey= {index} >{val}</MenuItem>) )
        
        return (
            <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-lg">QC Test</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Row>
                    <Col md = {2}>
                    <h4>Select Color</h4> 
                    </Col>
                    <Col md = {4}>
                    { this.state.selectedColor != ""? <div style = {selectStyle} className = "mini-square"/>  : <div></div> }
                    </Col>
                </Row>
                <div className = "container">
                    <Row>
                       {colorList}
                    </Row>
                </div>
                

                <h4>Select Pattern</h4>
                <DropdownButton title= {this.state.pickerName} id="bg-nested-dropdown">
                    {pat}
                </DropdownButton>
                <br/>
                <Row>
                    <div className = "container">    
                        <h4> Time </h4>
                    </div>
                </Row>
                <Row>    
                    <div className = "container">
                        <FormControl style = {{width : "10vh"}}type="text" placeholder="Time" onChange = { (e) => this.setState({timeText : e.target.value}) }/>
                    </div> 
                </Row>
                
                </Modal.Body>
                <Modal.Footer>
                <Button onClick={this.props.onHide}>Close</Button>
                <Button bsStyle = "primary" onClick = {() => this.props.onStart(this.state.pickerName, this.state.selectedColor, this.state.timeText)} > Start </Button>
                </Modal.Footer>
            </Modal>
            );
    }
}