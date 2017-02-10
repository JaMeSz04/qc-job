import React , {Component} from 'react';
import DragScreen from './DragScreen.jsx';
import {Row, Col, Button,Panel} from 'react-bootstrap';


export default class Game extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedColor : "red",
            minute : this.props.min,
            second : 0,
            isSubmitted : false
        }  
        console.log("DATA");
        console.log(this.props.data);
    }

    componentDidMount(){
        setInterval( () => {
            if (this.state.second == 0 && this.state.minute == 0){
                this.setState( { second : 0 });
                this.setState( { minute : 0 });
            }
            else if (this.state.second == 0){
                this.setState( {second : 59} );
                this.setState( {minute : this.state.minute - 1});
            } 
            else {
                this.setState( { second : this.state.second - 1});
            }
        }, 1000);
    }

    render(){
        var div = {
            background : this.state.selectedColor,
            width: "50%",
            margin: "0 auto"
        };
        var time = this.state.minute + " minutes " + this.state.second + " seconds ";
        return (
            <div class = "container">
                <Row style = {{marginLeft : "0.5vh", marginTop : "1vh"}}>
                    <Col md = {9}>
                        <DragScreen shape = "square" data = {this.props.data} isSubmitted = {this.state.isSubmitted}/>
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
                                <Button style = {{marginTop : "1vh"}} block bsSize="large" bsStyle = "primary"  onClick = {() => this.setState({isSubmitted : true})} >Submit</Button>
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
