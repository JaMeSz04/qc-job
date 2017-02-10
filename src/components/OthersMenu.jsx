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
        this.setState( { data : data } );
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
        const wrapData = this.state.data.map( (val, index) => (<tr onClick = {() => {console.log("clicked on +" + index)}}>
                                                        <td>val.test_name</td>
                                                        <td>val.score</td>
                                                        <td>val.test_date</td>
                                                        <td>val.shape</td>
                                                        <td>val.shade</td>
                                                    </tr>) );
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
                            <tr onClick = {() => {alert("clicked")}}>
                            
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                            
                                <td colSpan="2">Larry the Bird</td>
                                <td>@twitter</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
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