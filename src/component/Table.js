import React, { Component } from 'react';
import temp from './temp.json';

export default class Table extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const th = Object.keys(temp[1]).map((d, i) => <th key={i}>{d}</th>);
    let test = temp.map((e)=> {
      console.log(e);
      return (
        <tr>
          {

          }
        </tr>
      )

    })
    return (
      <table>
      <tbody>
        <tr>
          {th}
        </tr>
          {test}
      </tbody>
    </table>
    )
  }
}
