import React , {Component} from 'react';
import DragScreen from './DragScreen.jsx';
import {Row, Col, Button,Panel} from 'react-bootstrap';


export default class Game extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedColor : "red"
        }
    }
    render(){
        var div = {
            background : this.state.selectedColor,
            width: "50%",
            margin: "0 auto"
        };
        return (
            <div class = "container">
                <Row style = {{marginLeft : "0.5vh", marginTop : "1vh"}}>
                    <Col md = {9}>
                        <DragScreen shape = "square"/>
                    </Col>
                    <Col md = {3} >
                        <Row style = {{ marginLeft : "1vh" ,marginRight : "3vh"}}>
                            <Row >
                                <Panel header = "Time Remaining">
                                    <h3 style = {{ textAlign : "center" }}> 2 Minutes 50 Seconds</h3>
                                </Panel>
                            </Row>
                            <Row>
                                <Panel  header = "Selected Color">
                                    <div style = {div} className = "square"> </div>
                                </Panel>
                            </Row>
                            <Row>
                                <Button  block bsSize="large" bsStyle = "warning">Cancel</Button>
                            </Row>
                            <Row> 
                                <Button style = {{marginTop : "1vh"}} block bsSize="large" bsStyle = "primary">Submit</Button>
                            </Row>
                        </Row>
                    </Col>

                </Row>
                <Row>
                    <Col md = {9}>
                    </Col>
                    <Col md = {3}>
                        
                    </Col>
                </Row>
            </div>
        );
    }
}
