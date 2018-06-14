import React, { Component } from 'react';
import Dropzone from 'react-dropzone'
import csvToJson from '../utilis/converter/csvToJson';
import xlsxToJson from '../utilis/converter/xlsxToJson';
import postJsonFile from '../utilis/postJsonFile';

export default class DropArea extends Component {
  constructor(props) {
    super(props)
    this.state = {
      files: [],
      displayError: false
    }
    this.sendInJson = this.sendInJson.bind(this)
  }
  /** @function handleJsonFile
   *  @param {Object[]} rowObject
   *  @description
   *  Appelle la methode "handleJsonFile" du props
   *  pour mettre à jour les données dans le state
   *  du composant parent App.js
   */
  handleJsonFile(rowObject){
    this.props.handleJsonFile(rowObject);
  }
  /** @function sendInJson
   *  @description
   * Appelle la méthode permettant de convertir les fichiers
   * en JSON selon leur type , et envoie le JSON au serveur
   */
  sendInJson(){
    this.state.files.forEach((file) => {
      switch (file.type) {
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
          xlsxToJson(file).then((xlsxJson) => {
            this.handleJsonFile(xlsxJson.XL_row_object);
            postJsonFile(xlsxJson.commands);
          });
          break;
        case 'text/csv':
          csvToJson(file).then((csvJson) => {
            this.handleJsonFile(csvJson);
            // @TODO Ajouter le code pour la gestion des fichiers CSV
          })
          break;
        default:
        console.log('The file type is invalid');
      }
    })
  }
  /** @function onDrop
   *  @param {Array} acceptedFile
   *  @param {Array} rejectedFile
   *  @description
   * Function utiliser lors du drag and drop
   * du fichier
   */
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
    const errorMessage = <div style={{marginTop: '20px', color: '#e74c3c'}}> Invalid file type </div>;
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
        { message }
        <ul>
          {
            this.state.files.map((file, index) => <li key={index}>{file.name}</li>)
          }
        </ul>
        <button onClick={this.sendInJson}>Post your file(s) in JSON format</button>
      </div>
    );
  }
}
