import React, { Component } from 'react';
import Dropzone from 'react-dropzone'
import csvToJson from '../utilis/csvToJson';
import xlsToJson from '../utilis/xlsToJson';

export default class DropArea extends Component {
  constructor(props) {
    super(props)
    this.state = {
      files: [],
      displayError: false
    }
    this.convertToJson = this.convertToJson.bind(this)
  }

  convertToJson(){
    this.state.files.map((file) => {
      switch (file.type) {
        case 'application/vnd.ms-excel':
          console.log(xlsToJson(file));
          xlsToJson(file);
          break;
        case 'text/csv':
          csvToJson(file).then((csvJson) => {
            console.log(csvJson);
          })
          break;
        default:
        console.log('The file type is invalid');
      }
    })
  }

  onDrop(acceptedFile, rejectedFile) {
    this.setState({displayError : false})
    if (acceptedFile.length) {
      acceptedFile.map((file) => {
        this.setState(prevState => ({
            files: [...prevState.files, file]
        }))
      })
    }
    if (rejectedFile.length) {
      this.setState({displayError : true})
      console.log(`this file is rejected ${rejectedFile}`);
    }
  }

  render() {
    const errorMessage = <div> Invalid </div>;
    let message;
    if (this.state.displayError) {
      message = errorMessage;
    } else {
      message = null;
    }
    return (
      <div>
        <Dropzone
          accept="application/vnd.ms-excel, text/csv"
          onDrop={this.onDrop.bind(this)}>
          <p>Drop your file here we accept only csv and xls</p>
        </Dropzone>
        {message}
        <ul>
          {
            this.state.files.map((file, index) => {
              return <li key={index}>{file.name}</li>;
            })
          }
        </ul>
        <button onClick={this.convertToJson}>Convert your file(s) to JSON</button>
      </div>
    );
  }
}
