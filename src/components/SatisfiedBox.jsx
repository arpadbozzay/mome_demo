import React from 'react';

class SatisfiedBox extends React.Component {
  constructor() {
    super();
    this.state = {
    };
    this.onInputchange = this.onInputchange.bind(this);
    this.clearValue = this.clearValue.bind(this);
  }

  componentDidUpdate() {
    this.repaintSlider(this.props.val);
  }

  onInputchange(event) {
    this.repaintSlider(event.target.value);
    this.props.onValueChange(event.target.value, this.props.order);
  }

  repaintSlider(inputValue) {
    const className = this.props.order;
    const slider = document.getElementsByClassName(`${className}`)[0];
    const mainColor = this.calculateMainColor(inputValue);
    slider.style.setProperty("background",`${this.calculateColorGradient(inputValue, mainColor)}`);
    slider.style.setProperty("--sliderColor", `${mainColor}`);
    slider.style.setProperty("--sliderSize", `${this.calculateThumbSize(inputValue)}px`);
  }

  calculateThumbSize(sliderValue) {
    return 18 + Math.abs((sliderValue / 100) * 7)
  }

  calculateMainColor(sliderValue) {
    let mainColor = 'rgba(255, 255, 255)';
    if(sliderValue > 0) {
      mainColor = 'rgba(0,246,255,1)';
    } else if (sliderValue < 0) {
      mainColor = 'rgba(255,0,0,1)';
    }
    return mainColor;
  }


  calculateColorGradient(sliderValue, mainColor) {
    let sliderPosition = 50 + (sliderValue/2);
    let leftSliderEnd = 50;
    let rightSliderEnd = 50;
    if(sliderValue > 0) {
      rightSliderEnd = sliderPosition;
    } else if (sliderValue < 0) {
      leftSliderEnd = sliderPosition;
    }
    return `linear-gradient(90deg,
      rgba(30,30,30,1) ${leftSliderEnd}%, 
      ${mainColor} ${sliderPosition}%, 
      rgba(30,30,30,1) ${rightSliderEnd}%)`;
  }

  clearValue() {
    this.props.onValueChange(0, this.props.order);
  }

  render() {
    return (
      <div className="satisfiedBox">
          <p className={`p${this.props.order}`}>Not satisfied</p>
          <input
            type="range"
            min="-100"
            step="1"
            max="100"
            className={`${this.props.order} slider`}
            value={this.props.val}
            onChange={this.onInputchange}
            />
          <p className={`p${this.props.order}`}>Very satisfied</p>
          <p className="clearBtn" onClick={this.clearValue}>Clear</p>
      </div>
    );
  }
}

export default SatisfiedBox;