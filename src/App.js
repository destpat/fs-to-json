import React, { Component } from 'react';
import DropArea from './component/DropArea.js';
import logo from './images/logo_blanc.png';
import './App.css';

class App extends Component {
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
          <DropArea />
        </div>
      </div>
    );
  }
}

export default App;
