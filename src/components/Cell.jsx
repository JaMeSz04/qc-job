import React , {Component} from 'react';


export default class Cell extends Component {
  render(){
    var color = {
      background : this.props.color
    };
    var id = this.props.num;
    return(
      <foreignObject x= {this.props.x} y= {this.props.y} width= {100} height= {100} >
          <div style = {color} className = {this.props.shape} onClick= { (event) => { this.props.onClickCell() }}> </div>
                                                              
      </foreignObject>
    );
  }
}