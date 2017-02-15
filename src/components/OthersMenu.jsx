import React, {Component} from 'react';
import {Col, Row, Table, Button} from 'react-bootstrap';
import axios from 'axios';


export default class OthersMenu extends Component {
    constructor(props){
        super(props);
        this.state = {
            data : [],
            isHistory : true
        }
        this.setNewData = this.setNewData.bind(this);
    }
    
    setNewData(data){
        var temp = data.data;
        temp.reverse();
        this.setState( { data : temp } );

        console.log("data : " + temp);
        console.dir(temp);
    }

    componentDidMount(){
        axios.post('http://localhost:3616/getHistory', {
        })
        .then(this.setNewData)
        .catch(function (error) {
            console.log("error with :  " + error);
        })
    }
    render(){
        const renderData = this.state.data.map( (val) => {
            return (
                <tr>
                    <td>{val.name}</td>
                    <th>{val.score}</th>
                    <th>{val.tested_date}</th>
                    <th>{val.shape}</th>
                    <th>{val.shade}</th>
                </tr>
            )
        });
        var exist = [];
        for (var i = 0 ; i < this.props.data.length ; i++){
            if (exist.indexOf(this.props.data[i].pattern_name) == -1){
                exist.push(this.props.data[i].pattern_name);
            }
        }
        return(
            <div className = "container">
                <Row>
                    <h1 style = {{textAlign:"center"}}> QC-Testing Appllication</h1>
                </Row>
                {this.state.isHistory?
                 <Row>
                    <div style = {{marginTop : "3vh"}} className = "container" id = "table">
                        <Table  striped bordered condensed hover >
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Score</th>
                                <th>Tested Date</th>
                                <th>Shape</th>
                                <th>Shade</th>
                            </tr>
                            </thead>
                            <tbody>
                                {renderData}
                            </tbody>
                        </Table>
                    </div>
                </Row> : <div> </div> } 
                
                <Row>
                    <Col md = {8}>
                    </Col>
                    <Col md = {2}>

                    </Col>
                    <Col md = {2}>
                        <Button block bsSize = "large" onClick = {() => this.setState({isHistory : !this.state.isHistory})}>{this.state.isHistory? ("Pattern List") : ("TableList")}</Button>
                    </Col>
                </Row>

            </div>
        );
    }
}