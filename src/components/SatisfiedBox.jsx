import React from 'react';

class SatisfiedBox extends React.Component {
  constructor() {
    super();
    this.state = {
    };
    this.onInputchange = this.onInputchange.bind(this);
    this.clearValue = this.clearValue.bind(this);
  }

  onInputchange(event) {
    this.props.onValueChange(event.target.value, this.props.order);
  }

  clearValue() {
    this.props.onValueChange(50, this.props.order);
  }

  render() {
    return (
      <div className="satisfiedBox">
          <p className={`p${this.props.mode}`}>Not satisfied</p>
          <input 
            type="range" 
            min="1"  
            step="1" 
            max="100" 
            className={`${this.props.mode}`}
            value={this.props.val}
            onChange={this.onInputchange}
            />
          <p className={`p${this.props.mode}`}>Very satisfied</p>
          <p className="clearBtn" onClick={this.clearValue}>Clear</p>
      </div>
    );
  }
}

export default SatisfiedBox;