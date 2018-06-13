import React, { Component } from 'react';
import DropArea from './component/DropArea.js';
import logo from './images/logo_blanc.png';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      files : []
    }
    this.handleJsonFile = this.handleJsonFile.bind(this)
  }

  handleJsonFile(loadFiles) {
    this.setState({files: loadFiles});
    console.log('$$$$$$$$$*');
    console.log(this.state.files);
    console.log('$$$$$$$$$*');
  }

  render() {
    return (
      <div>
        <div className="header">
          <img className="logo" src={logo} alt={"logo"}/>
          <div className='title'>
            <span> Test upload CSV / XLS </span>
          </div>
        </div>
        <div className='upload-area'>
          <DropArea handleJsonFile={this.handleJsonFile}/>
        </div>
      </div>
    );
  }
}

export default App;
