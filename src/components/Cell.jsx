import React , {Component} from 'react';


export default class Cell extends Component {
  render(){
    var color = {
      background : this.props.color
    };
    var text = {
      color : "black",
      textAlign : "center", 
      verticalAlign: "middle",
      padding : "0px 0"
    }
    var id = this.props.num;
    if (id % 5 == 0 && this.props.isSubmitted){
      text.color = "white";
      text.padding = "20px 0";
      
    }
    return(
      <foreignObject x= {this.props.x} y= {this.props.y} width= {100} height= {100} >
          <div style = {color} className = {this.props.shape} onClick= { (event) => { this.props.onClickCell(event) }}> <h3 style = {text}> {this.props.text} </h3> </div>
      </foreignObject>
    );
  }
}