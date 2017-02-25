import React , {Component} from 'react';
import DragScreen from './DragScreen.jsx';
import {Row, Col, Button,Panel, FormControl, Modal} from 'react-bootstrap';
import colors from '../colors.js';
import ResultScreen from './ResultScreen.jsx';
import axios from 'axios';

export default class Game extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedColor : "gray",
            minute : this.props.min,
            second : 0,
            isSubmitted : false,
            colorList : [],
            defaultColorList : colors.getColor(this.props.color),
            finalResult : [],
            score : 0,
            fullScore : 0,
            name : "",
            allDone : false,
            showConfirm : false,
            showSuccess : false,
            timeSpend : 0
        }  
       
        this.shuffle = this.shuffle.bind(this);
        this.saveHandler = this.saveHandler.bind(this);
        //this.state.colorList = this.shuffle(this.state.defaultColorList);
        this.state.colorList = this.state.defaultColorList;
        this.showSuccess = this.showSuccess.bind(this);
        
    }

    componentDidMount(){
        
        setInterval( () => {
            if (!this.state.isSubmitted){
                if (this.state.second == 0 && this.state.minute == 0){
                    this.setState( { second : 0 });
                    this.setState( { minute : 0 });
                    this.setState( { isSubmitted : true });
                }
                else if (this.state.second == 0){
                    this.setState( {second : 59} );
                    this.setState( {minute : this.state.minute - 1});
                } 
                else {
                    this.setState( { second : this.state.second - 1});
                }
                this.setState( { timeSpend : this.state.timeSpend + 1})
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

    showSuccess(){
       
    }


    saveHandler(){
        var d = new Date();
        var word = d.getUTCDate() + "/" + (d.getUTCMonth() + 1) + "/" + d.getUTCFullYear();
        this.setState({showSuccess : true});
        console.log("hehe");
        axios.post('http://localhost:3616/saveGame', {
            name : this.state.name,
            score : this.state.score,
            fullscore : this.state.fullScore,
            cellList : this.state.cellList,
            timeSpend : this.state.timeSpend,
            date : word,
            shade : this.props.color,
            shape : this.props.shape
        })
        .then( () => {} )
        .catch(function (error) {
            console.log("error with :  " + error);
        })

        
    }

    render(){
        let closeSubmit = () => this.setState({ showConfirm : false , isSubmitted : true});
        let closeSuccess = () => {this.setState({ showSuccess : false })};
        let hideSubmit = () => this.setState({ showConfirm : false });
        let hideSuccess = () => this.setState({ showSuccess : false });
        let reloadPage = () => {location.reload()};

        var div = {
            background : this.state.selectedColor,
            width: "50%",
            margin: "0 auto"
        };
        var time = this.state.minute + " minutes " + this.state.second + " seconds ";
        
        
        const colorRender = this.state.colorList.map( (val,index) => {
            
                return (<div onClick = { () => { this.setState( {selectedColor : val.value} )}} style = {{background : val.value , display: "inline-block",whiteSpace: "nowrap"}} className = "square2"/>) ;
        });
        return (
            <div class = "container">
                <Row style = {{marginLeft : "0.5vh", marginTop : "1vh"}}>
                    <Col md = {9}> 
                         <DragScreen color = {this.state.defaultColorList} shape = {this.props.shape} data = {this.props.data} isSubmitted = {this.state.isSubmitted} 
                         submit = { (cellList, score, fullscore) => {
                        
                             this.setState({score : score, fullScore : fullscore, finalResult : cellList});
                         }}
                         onRemove = {(index) =>{var colorList = this.state.colorList; 
                                                var temp = [];
                                                for ( var i = 0 ; i < colorList.length ; i++){
                                                    if (colorList[i].value != index.color){
                                                        temp.push(colorList[i]);
                                                    }
                                                }
                                                this.setState( { colorList : temp } );
                         }}
                         onAdd = { (color) => {var temp = this.state.colorList;
                                                
                                                temp.push({id : color.id , value : color.color})}}
                         clickCell = { () => this.setState( {selectedColor : "gray"} ) }
                         selectedColor = {this.state.selectedColor} submitHandler = {(val) => {this.setState({finalResult : val, isSubmitted : true})}}/>
                    </Col>
                    <Col md = {3} >
                        <Row style = {{ marginLeft : "1vh" ,marginRight : "3vh"}}>
                            <Row >
                                <Panel header = "Time Remaining">
                                    <h3 style = {{ textAlign : "center" }}> {time} </h3>
                                </Panel>
                            </Row>
                            <Row>
                                {this.state.isSubmitted? 
                                <Panel header = "score">
                                    <h2 style = {{textAlign : "center"}}> { this.state.score +  " / " + this.state.fullScore} </h2>
                                </Panel> :
                                <Panel  header = "Selected Color">
                                    <div style = {div} className = "square3"> </div>
                                </Panel>}
                            </Row>
                            {this.state.isSubmitted?
                            <div>
                                <Row>
                                    <div style = {{marginLeft : "2vh" , marginRight : "2vh"}}>
                                        <Row>
                                            <FormControl 
                                                type="text"
                                                placeholder="Full name"
                                                onChange={(event) => { this.setState( { name : event.target.value } );}}
                                            />
                                        </Row>
                                    </div>
                                </Row>
                                <Row>
                                    <Button style = {{marginTop : "1vh"}} block bsSize="large" bsStyle = "primary"  onClick = {this.saveHandler} > Save </Button>
                                </Row>  
                            </div>
                            
                             : <div>
                                 <Row style = {{marginTop : "2vh"}}>
                                    <Button  block bsSize="large" bsStyle = "warning" onClick = {() => {location.reload()}}>Cancel</Button>
                                </Row>
                                <Row>
                                    <Button style = {{marginTop : "1vh"}} block bsSize="large" bsStyle = "primary"  onClick = {() => { this.setState({showConfirm : true})}} >Submit</Button>
                                </Row>
                            </div>}
                            
                        </Row>
                    </Col>

                </Row>
                {this.state.isSubmitted? <div> </div> : 
                <Row>
                    <Panel header = "Color Picker" style = {{marginLeft : "5vh" , marginRight : " 3vh", marginTop : "1vh"}}>
                        {colorRender}
                    </Panel>
                </Row>}
                
                <ExtraModal text = {"Are you sure you want to submit the test?"} show = {this.state.showConfirm} onHide = {hideSubmit} submitText = {"Submit"} onSubmit = {closeSubmit}/>
                <ExtraModal text = {"Your test result has been saved"} show = {this.state.showSuccess}  onHide = {hideSuccess} onReset = {reloadPage} submitText = {null}/>
            </div>
        );
    }
}


class ExtraModal extends Component{
    render(){
        return(
            <Modal {...this.props} bsSize="small" aria-labelledby="contained-modal-title-sm">
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-sm">Submit Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.text}
                </Modal.Body>
                <Modal.Footer>
                { this.props.submitText? 
                <Button onClick={this.props.onHide}>Close</Button> : 
                <Button bsStyle = "primary" onClick = {this.props.onReset}> Close </Button>
                }
                
                { this.props.submitText? 
                <Button bsStyle = "primary" onClick={this.props.onSubmit}> {this.props.submitText} </Button>
                : <div></div> }
                </Modal.Footer> 
            </Modal>
        );
    }
}
