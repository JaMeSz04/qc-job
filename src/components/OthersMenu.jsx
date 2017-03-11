import React, {Component} from 'react';
import {Col, Row, Table, Button, DropdownButton ,MenuItem} from 'react-bootstrap';
import axios from 'axios';
import {ReactSVGPanZoom} from 'react-svg-pan-zoom';
import Cell from './Cell.jsx';
import PlatePumper from './PlatePumper.jsx';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';


export default class OthersMenu extends Component {
    constructor(props,context){
        super(props,context);
        this.state = {
            data : [],
            isHistory : false,
            selectedData : null,
            shape : "square",
            isShowAdd : false,
            selectedPattern : ""
        }
        this.Viewer = null;
        this.setNewData = this.setNewData.bind(this);
        this.removePattern = this.removePattern.bind(this);
  
    }
    
    setNewData(data){
        var temp = data.data;
        temp.reverse();
        
        const temp2 = temp.map( (val) => {
            console.dir(val.time_spend);
            val.time_spend = (Math.floor(parseInt(val.time_spend) / 60 )) +  " min " + (parseInt(val.time_spend) % 60) + " second";
            console.log("val : " + val.time_spend);
            return val;
        } );
        this.setState( { data : temp2 } );
        
        console.log("data : " + temp2);
        console.dir(temp);
        this.forceUpdate();
    }

    removePattern(){
        axios.post('http://localhost:3616/deletePattern', {
            name : this.state.selectedPattern
        }).catch( function(error) {
            console.log("error : " + error);
        })
        for (var i = 0 ; i < this.props.data.length; i++){
            if (this.props.data[i].pattern_name == this.state.selectedPattern){
                this.props.data.splice(this.props.data[i], 1);
            }
        }
        this.props.resetData();
        this.setState({selectedData : null});
        this.forceUpdate();
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

        const renderData = 
             (
                <BootstrapTable height='500px' data={this.state.data} striped={true}  exportCSV csvFileName='qc-test-data.csv' options={ { noDataText: 'No data' } }>
                    <TableHeaderColumn dataField="name" isKey = {true} dataAlign="center">Name</TableHeaderColumn>
                    <TableHeaderColumn dataField="score" dataAlign="center">Score</TableHeaderColumn>
                    <TableHeaderColumn dataField="time_spend" dataAlign="center">Time Spend</TableHeaderColumn>
                    <TableHeaderColumn dataField="tested_date" dataAlign="center">Tested Date</TableHeaderColumn>
                    <TableHeaderColumn dataField="shape" dataAlign="center">Shape</TableHeaderColumn>
                    <TableHeaderColumn dataField="shade" dataAlign="center">Shade</TableHeaderColumn>
                </BootstrapTable>
            );
        
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
                    this.setState({selectedPattern : val})
                    temp.push( {id : this.props.data[i].id ,xPos : this.props.data[i].xPos, yPos : this.props.data[i].yPos, color : "gray", shape : this.state.shape } )
                }
            }
            this.setState({selectedData : temp})
            
        }}> {val}</MenuItem>) )

        var renderCell = null;

        if (this.state.selectedData != null){
            renderCell = this.state.selectedData.map( (obj,index) => {
                console.log( obj.xPos + " : " + obj.yPos );
                return <Cell num = {obj.id} x = {obj.xPos} y = {obj.yPos} color = {obj.color} shape = {this.state.shape} />
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
                    {renderData}  
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
                    <div> </div>
                    }
                    </Col>
                    <Col md = {2}>
                    </Col>
                    <Col md = {2}>
                        <DropdownButton title="Shape" id="bg-nested-dropdown" bsSize = "large" onSelect={(event) => {this.setState({shape: event}); this.forceUpdate()}}>
                            <MenuItem eventKey="square"> Square </MenuItem> 
                            <MenuItem eventKey="circle"> Circle </MenuItem>
                        </DropdownButton>
                    </Col>
                    <Col md = {2}>
                        {!this.state.isHistory? <Button block bsSize = "large" bsStyle = "danger" onClick = { () => { this.removePattern() } } > Remove </Button> : <div></div>}
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
                
                <PlatePumper resetData = { () =>  {this.setState({ isShowAdd : false } ) ; this.props.resetData(); this.forceUpdate() }} onHide = { () => this.setState({isShowAdd : false} )}/>
            </div>)
        }
        return(
            <div>
                {val}
            </div>
        );
    }
}