import React, { Component } from 'react';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import './App.css'
import ParticlesBg from 'particles-bg'

class App extends Component {
  constructor() {
    super()
    this.state = {
      input:'',
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value);
  }

  onButtonSubmit = () => {
    console.log('click');
  }
  

  render() {
    return (
      <div className="App">
        <ParticlesBg color="#ffffff" num={10} type="lines" bg={true} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit = {this.onButtonSubmit}/>
{/*         <FaceRecognition /> */}
      </div>
    );
  }
}

export default App
