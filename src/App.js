import './App.css';
import React from 'react';
import SatisfiedBox from './components/SatisfiedBox';
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      first: 0,
      second: 0,
      third: 0
    };

    this.sendValues = this.sendValues.bind(this);
    this.onInputchange = this.onInputchange.bind(this);
  }

  async componentDidMount() {
    axios.get('http://localhost:3001/load')
    .then((response) => {
      this.setState({first: response.data.data.first});
      this.setState({second: response.data.data.second});
      this.setState({third: response.data.data.third});
    })
   .catch((error)=>{
      console.log(error);
   });
  }

  async sendValues() {
    const res = await axios.post(
      'http://localhost:3001/save', 
      this.state);
  }

  onInputchange(value, order) {
    this.setState({
      [order]: value
    });
  }

  render() {
    return (
      <div className="App">
        <div className="satisfyWrapper">
          <h3 className="satisfyTitle">How satisfied are you?</h3>
          <SatisfiedBox 
            onValueChange={this.onInputchange} 
            order="first"
            val={this.state.first}/>
          <SatisfiedBox
            onValueChange={this.onInputchange} 
            order="second"
            val={this.state.second}/>
          <SatisfiedBox
            onValueChange={this.onInputchange} 
            order="third"
            val={this.state.third}/>
          <button onClick={this.sendValues} className="sendButton">
            Send</button>
        </div>
      </div>
    );
  }
}

export default App;
