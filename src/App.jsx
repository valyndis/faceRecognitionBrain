import React, { Component } from 'react';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/signIn';
import Register from './components/Register/Register';
import './App.css'
import ParticlesBg from 'particles-bg'

const initialState = {
  input:'',
  imageUrl:'',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = initialState;
  }
  

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }


  calculateFaceLocation = (data) => {
    const clarifaiFace = data.data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)

    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onPictureSubmit = () => {
    this.setState({imageUrl: this.state.input})
    fetch('http://localhost:3000/imageurl', {
        method: 'post',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
    .then(response => response.json())
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .then(
      fetch('http://localhost:3000/image', {
        method: 'put',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
          id: this.state.user.id
        })
      })
      .then(response => response.json())
      .then(count => {
        this.setState(Object.assign(this.state.user, {entries: count}))
      })
      .catch(error => console.log('error', error))
    )
    .catch(error => console.log('error', error))}

  onRouteChange = (route) => {
    if(route === 'signin'){
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const {isSignedIn, route, box, imageUrl} = this.state;
    return (
      <div className="App">
        <ParticlesBg color="#ffffff" num={10} type="lines" bg={true} />
        <Navigation onRouteChange = {this.onRouteChange} isSignedIn = {isSignedIn}/>
        { route === 'home' 
          ? <div>
            <Logo />
            <Rank name = {this.state.user.name} entries = {this.state.user.entries}/>
            <ImageLinkForm
              onInputChange = {this.onInputChange}
              onPictureSubmit = {this.onPictureSubmit}/>
            <FaceRecognition box={box} imageUrl={imageUrl}/>
          </div>
          : (
            route === 'signin'
          ? 
            <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          :
            <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
        }
      </div>
    );
  }
}

export default App
