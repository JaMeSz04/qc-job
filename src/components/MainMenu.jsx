import React, {Component} from 'react';
import {Row, Col, Button, Modal, DropdownButton, MenuItem, Form, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

export default class MainMenu extends Component{
    constructor(props){
        super(props);
        this.state = {
            lgShow: false,
            otherShow : false
        }
    }
    render(){
        let lgClose = () => this.setState({ lgShow: false });
        let lgOpen = () => this.setState({ lgShow : true });
        let otherOpen = () => this.setState( { otherShow : true });
        let otherClose = () => this.setState( { otherShow : false});

        return(
            <div className = "container">
                <Row>
                    <h1 style = {{textAlign:"center"}}> QC-Testing Appllication</h1>
                </Row>
                <div style = {{ margin: "auto", maxWidth: "300px"}}>
                    <Row style = {{alignContent : "center"}}>
                        <Button bsSize = "large" bsStyle = "primary" onClick = {lgOpen}>Test</Button>
                        <Button bsSize = "large" bsStyle = "primary" onClick = {otherOpen} >Others</Button>
                    </Row>
                </div>
                <SelectModal colorSelect = {['red','blue','green','brown']} show={this.state.lgShow} onHide={lgClose} />
                <LoginModal show = {this.state.otherShow} onHide = {otherClose}/>
            </div>
        );
    }
}


class LoginModal extends Component {
    constructor(props){
        super(props);
        
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
                            <FormControl type="text" placeholder="Email" />
                        </Col>
                        </FormGroup>

                        <FormGroup controlId="formHorizontalPassword">
                        <Col componentClass={ControlLabel} sm={2}>
                            Password
                        </Col>
                        <Col sm={10}>
                            <FormControl type="password" placeholder="Password" />
                        </Col>
                        </FormGroup>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                    <Button bsStyle = "primary" type="submit">Sign in</Button>
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
            selectedPattern : ""
        }
    }
    render(){ 
        const colorList = this.props.colorSelect.map( (value) => { 
            var style = {
                background : value
            }
            return ( <Col md = {1}> <div style = {style} className = "square" onClick = { () => this.setState( {selectedColor : value} ) } > </div> </Col>);
        })
        console.log(colorList);
        
        if (this.state.selectedColor != ""){
            var selectStyle = {
                background : this.state.selectedColor,
                marginTop : "2vh",
                marginRight : "10%"
            }
        }
        console.log(this.state.selectedColor);
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
                <DropdownButton title="Pattern List" id="bg-nested-dropdown">
                    <MenuItem eventKey="1">Dropdown link</MenuItem>
                    <MenuItem eventKey="2">Dropdown link</MenuItem>
                </DropdownButton>

                </Modal.Body>
                <Modal.Footer>
                <Button onClick={this.props.onHide}>Close</Button>
                <Button bsStyle = "primary" > Start </Button>
                </Modal.Footer>
            </Modal>
            );
    }
}