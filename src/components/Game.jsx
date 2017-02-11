import React , {Component} from 'react';
import DragScreen from './DragScreen.jsx';
import {Row, Col, Button,Panel} from 'react-bootstrap';
import colors from '../colors.js';


export default class Game extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedColor : "red",
            minute : this.props.min,
            second : 0,
            isSubmitted : false,
            colorList : []
            
        }  
        console.log("DATA");
        console.log(this.props.data);
        this.shuffle = this.shuffle.bind(this);
       
        this.state.colorList = this.shuffle(colors.getColor(this.props.color));
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

    shuffle(data) {
        var a = data;
        for (let i = a.length; i; i--) {
            let j = Math.floor(Math.random() * i);
            [a[i - 1], a[j]] = [a[j], a[i - 1]];
        }
        return a;
    }

    render(){
        var div = {
            background : this.state.selectedColor,
            width: "50%",
            margin: "0 auto"
        };
        var time = this.state.minute + " minutes " + this.state.second + " seconds ";
       
        
        const colorRender = this.state.colorList.map( (val,index) => {
            return (<div onClick = { () => { console.log("CLICKED"); this.setState( {selectedColor : val.value} )}} style = {{background : val.value , display: "inline-block",whiteSpace: "nowrap"}} className = "square2"/>) ;
        });
        return (
            <div class = "container">
                <Row style = {{marginLeft : "0.5vh", marginTop : "1vh"}}>
                    <Col md = {9}>
                        <DragScreen shape = "square" data = {this.props.data} isSubmitted = {this.state.isSubmitted} selectedColor = {this.state.selectedColor}/>
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
                                    <div style = {div} className = "square3"> </div>
                                </Panel>
                            </Row>
                            <Row>
                                <Button  block bsSize="large" bsStyle = "warning">Cancel</Button>
                            </Row>
                            <Row> 
                                <Button style = {{marginTop : "1vh"}} block bsSize="large" bsStyle = "primary"  onClick = {() => {console.log("clicked") ; this.setState({isSubmitted : true})}} >Submit</Button>
                            </Row>
                        </Row>
                    </Col>

                </Row>
                <Row>
                    <Panel header = "Color Picker" style = {{marginLeft : "5vh" , marginRight : " 3vh", marginTop : "1vh"}}>
                        {colorRender}
                    </Panel>
                </Row>
            </div>
        );
    }
}
