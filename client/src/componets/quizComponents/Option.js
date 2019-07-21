import React from 'react';
import '../../App.css';

export default class App extends React.Component {

   constructor(props) {
    super(props);

    this.state = {
      isHovered: false
   }
  }


   handleHover = () => {
      this.setState(prevState => ({
          isHovered: !prevState.isHovered
         })
      )
   }
   render(){
      return (
         <div 
            // className="option"
            className={this.state.isHovered ? "alert alert-info option" : "alert alert-primary option"}
            onMouseEnter={this.handleHover} 
            onMouseLeave={this.handleHover}
            role="alert"
            style={this.props.style}
            onClick={() => this.props.handleChange(this.props.value)}>
            {this.props.name}: {this.props.value}
         </div>
      )
   }

}