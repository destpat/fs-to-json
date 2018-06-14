import React, { Component } from 'react';
/**
 *  Composant d'affichage du tableau
 */
export default class Table extends Component {

  /** @function formatData
   *  @return {Array} keyList
   *  @description
   *  Renvoie la liste de toutes les clès présentent dans
   *  le tableau d'objet "this.props.rowObject"
   */
  getKeyList(){
    let keyList = [];
    this.props.rowObject.forEach((e) => {
      Object.keys(e).forEach((key) => {
        if (!keyList.includes(key)) {
          keyList.push(key);
        }
      })
    })
    return keyList;
  }

  /** @function formatData
   *  @description
   * Prends l'objet tableau d'objet " this.props.rowObject "
   * et ajoute les mêmes propriétés à tous les objets
   * si une proprité est manquante sur un objet
   * elle sera initialisé à null
   */
  formatData () {
    let keyList = this.getKeyList();
    this.props.rowObject.forEach((command) => {
      keyList.forEach((key) => {
        if (typeof command[key] === 'undefined') {
          command[key] = null;
        }
      })
    })
  }

  render() {
    this.formatData()
    const header = this.getKeyList().map((columnName, index) => <th key={index}>{columnName}</th>);
    return (
      <table className="test">
      <tbody>
        <tr>
          {header}
        </tr>
          {
            this.props.rowObject.map((row, index) => {
              return (
                <tr key={index}>
                  {
                    Object.keys(row).map((data, index) => {
                      return <td key={index}>{row[data]}</td>
                    })
                  }
                </tr>
              )
            })
          }
      </tbody>
    </table>
    )
  }
}
