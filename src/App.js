import React, { Component } from 'react';
import DropArea from './component/DropArea';
import Table from './component/Table';
import logo from './images/logo_blanc.png';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      files : {},
      filesIsLoad : false
    }
    this.handleJsonFile = this.handleJsonFile.bind(this)
  }

  handleJsonFile(loadFiles) {
    this.setState({
      files: loadFiles,
      filesIsLoad : true
    });
    console.log('$$$$$$$$$*');
    console.log(this.state.files);
    console.log('$$$$$$$$$*');
  }

  render() {

    return (
      <div>
        <div className="header">
          <img className="logo" src={logo} alt={'logo'}/>
          <div className='title'>
            <span> Test upload CSV / XLS </span>
          </div>
        </div>
        <div className='upload-area'>
          <DropArea handleJsonFile={this.handleJsonFile}/>
        </div>
        {
          this.state.filesIsLoad ? <Table jsonFile={this.state.files}/> : null
        }
      </div>
    );
  }
}

export default App;
