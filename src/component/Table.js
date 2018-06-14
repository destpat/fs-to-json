import React, { Component } from 'react';

export default class Table extends Component {
  formatData () {
    let keyList = [];
    this.props.jsonFile.forEach((e)=>{
      Object.keys(e).forEach((key)=>{
        if (!keyList.includes(key)) {
          keyList.push(key);
        }
      })
    })

    this.props.jsonFile.forEach((command) => {
      keyList.forEach((key) => {
        if (typeof command[key] === 'undefined') {
          command[key] = null;
        }
      })
    })
  }

  render() {
    this.formatData()
    const header = Object.keys(this.props.jsonFile[1]).map((column, index) => <th key={index}>{column}</th>);
    return (
      <table className="test">
      <tbody>
        <tr>
          {header}
        </tr>
          {
            this.props.jsonFile.map((row, index) => {
              return (
                <tr key={index}>
                  {
                    Object.keys(row).map((data, index) => {
                      return <td key={index}> {row[data]}</td>
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
