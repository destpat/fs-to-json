import React, { Component } from 'react';
import Dropzone from 'react-dropzone'
import csvToJson from '../utilis/converter/csvToJson';
import xlsxToJson from '../utilis/converter/xlsxToJson';
import axios from 'axios';

export default class DropArea extends Component {
  constructor(props) {
    super(props)
    this.state = {
      files: [],
      displayError: false
    }
    this.sendInJson = this.sendInJson.bind(this)
  }

  handleJsonFile(json){
    this.props.handleJsonFile(json);
  }

  postFile(xlsxJson) {
    axios.post('https://test.sympl.fr/test.php', xlsxJson)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  sendInJson(){
    this.state.files.forEach((file) => {
      switch (file.type) {
        case 'application/vnd.ms-excel':
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
          xlsxToJson(file).then((xlsxJson) => {
            console.log(xlsxJson.commands);
            this.handleJsonFile(xlsxJson.XL_row_object);
            this.postFile(xlsxJson.commands);
          });
          break;
        case 'text/csv':
          csvToJson(file).then((csvJson) => {
            this.handleJsonFile(csvJson);
            // @TODO Adding code for CSV FILE
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
      acceptedFile.forEach((file) => {
        this.setState(prevState => ({
            files: [...prevState.files, file]
        }))
      })
    }
    if (rejectedFile.length) {
      this.setState({displayError : true})
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
          accept="text/csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          onDrop={this.onDrop.bind(this)}>
          <p style={{textAlign: 'center'}}>
            Drop your file here we accept only csv, xlsx
          </p>
        </Dropzone>
        {message}
        <ul>
          {
            this.state.files.map((file, index) => {
              return <li key={index}>{file.name}</li>;
            })
          }
        </ul>
        <button onClick={this.sendInJson}>Post your file(s) in JSON format</button>
      </div>
    );
  }
}
