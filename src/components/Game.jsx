import React , {Component} from 'react';
import DragScreen from './DragScreen.jsx';
import {Row, Col, Button,Panel} from 'react-bootstrap';


export default class Game extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedColor : "red",
            minute : this.props.min,
            second : 0
        }  
    }

    render(){
        var div = {
            background : this.state.selectedColor,
            width: "50%",
            margin: "0 auto"
        };
        var time = toString(this.state.minute) + " minutes " + toString(this.state.second) + " seconds ";
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
                                    <h3 style = {{ textAlign : "center" }}> {time} </h3>
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
                    <Panel header = "Color Picker" style = {{marginLeft : "5vh" , marginRight : " 3vh", marginTop : "1vh"}}>
                        <div className = "square" />
                    </Panel>
                </Row>
            </div>
        );
    }
}
