import React, {Component} from 'react';
import {Col, Row, Table, Button, DropdownButton ,MenuItem} from 'react-bootstrap';
import axios from 'axios';
import {ReactSVGPanZoom} from 'react-svg-pan-zoom';
import Cell from './Cell.jsx';
import PlatePumper from './PlatePumper.jsx';


export default class OthersMenu extends Component {
    constructor(props,context){
        super(props,context);
        this.state = {
            data : [],
            isHistory : false,
            selectedData : null,
            shape : "square",
            isShowAdd : false
        }
        this.Viewer = null;
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
        this.Viewer.fitToViewer();
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

        const patternList = exist.map( (val, index) => (<MenuItem eventKey={index + 1} onClick = {() => {
            var temp = [];
            for (var i = 0 ; i < this.props.data.length ; i++){
                if (this.props.data[i].pattern_name == val){
                    temp.push( {id : this.props.data[i].id ,xPos : this.props.data[i].xPos, yPos : this.props.data[i].yPos, color : "gray", shape : this.state.shape } )
                }
            }
            this.setState({selectedData : temp})
            
        }}> {val}</MenuItem>) )

        var renderCell = null;

        if (this.state.selectedData != null){
            renderCell = this.state.selectedData.map( (obj,index) => {
                console.log( obj.xPos + " : " + obj.yPos );
                return <Cell num = {obj.id} x = {obj.xPos} y = {obj.yPos} color = {obj.color} shape = {obj.shape} />
            } )
        }
        

        

        const svgComp = 
                (<ReactSVGPanZoom
                    background = {"#D3D3D3"}
                    style={{outline: "1px solid black"}}
                    width={screen.width - 300} height={screen.height - 400} ref={Viewer => this.Viewer = Viewer}
                    SVGBackground = {"#D3D3D3"}
                    tool ="auto">
                    <svg width={screen.width - 300} height={screen.height - 400}>
                        {renderCell}
                    </svg>
                </ReactSVGPanZoom>);

        
        var val = (<div className = "container">
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
                </Row> : 
                <div>
                    {svgComp}
                </div>
                }
                
                <Row style = {{marginTop : "2vh"}}>
                    <Col md = {2}>
                    {!this.state.isHistory? 
                    <DropdownButton title="Pattern List" id="bg-nested-dropdown" bsSize = "large">
                        {patternList}
                    </DropdownButton> :
                    <div></div>
                    }
                    </Col>
                    <Col md = {4}>
                    </Col>
                    <Col md = {2}>
                        {!this.state.isHistory? <Button block bsSize = "large" bsStyle = "danger" onClick = { () => {} } > Remove </Button> : <div></div>}
                    </Col>
                    <Col md = {2}>
                        {!this.state.isHistory? <Button block bsSize = "large" bsStyle = "success" onClick = { () => { this.setState({isShowAdd : true})} } > Add </Button> : <div></div>}
                        
                    </Col>
                    <Col md = {2}>
                        <Button block bsSize = "large" bsStyle = "primary" onClick = {() => this.setState({isHistory : !this.state.isHistory})}>{this.state.isHistory? ("Pattern List") : ("TableList")}</Button>
                    </Col>
                </Row>

            </div>)

        if (this.state.isShowAdd){
            val = (<div className = "container">
                <Row>
                    <h1 style = {{textAlign:"center"}}> QC-Testing Appllication</h1>
                </Row>
                
                <PlatePumper onHide = { () => this.setState({isShowAdd : false} )}/>
            </div>)
        }
        return(
            <div>
                {val}
            </div>
        );
    }
}