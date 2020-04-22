import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Select from "react-select";

function createData(name, price) {
  return { name, price };
}

const rows=[]

const currencies = [
  { label: "Bitcoin", value: "BTC" },
  { label: "Etherum", value: "ETH" },
  { label: "Zcash", value: "ZEC" }
];

///*

function SimpleTable() {
  const a = (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>name</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
  return a;
}

export default class getData extends React.Component {
  state = {
    loading: true,
    statedata: null,
    rendered: false,
    choosenCurrency: "BTC"
  };

  handleChange = selectedOption => {
    if (selectedOption !== false) {
      this.setState({ choosenCurrency: selectedOption.value });
      //console.log(this.state.choosenCurrency);
    }
  };
  //  "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,JPY,EUR";

  async fetch() {
    /*const url =
      "https://min-api.cryptocompare.com/data/price?fsym=" +
      this.state.choosenCurrency +
      "&tsyms=USD,JPY,EUR";*/
    const url ="http://localhost:8080/api/core/ibo.base.item.attributes?id=M000002"

    const res = await fetch(url);
    const data = await res.json();
    this.setState({ statedata: data, loading: false, rendered: true });


    //console.log(data.USD);
    for(var i =0;i<data.attributes.length;i++){
      rows[i] = {"id":String(i),
                "key":data.attributes[i].Key,
                "no":data.attributes[i].No,
                "an":data.attributes[i].AttributeName,
                "av":data.attributes[i].AttributeValue,
                "unit":data.attributes[i].UnitOfMeasure}

    }
    //const rows = [createData("USD", 0), createData("EUR", 0), createData("JPY", 0)];
    //console.log(data.attributes.length)
    //onsole.log(rows[0])
    //console.log(data.attributes[0].Key);
  }
  aa = SimpleTable();
  render() {
    //if (!this.state.rendered) {
    //console.log(this.state.rendered);
    this.fetch();
    //} else {
    //if (this.state.statedata) {
      //rows[0].price = this.state.statedata.USD;
      //rows[1].price = this.state.statedata.EUR;
      //rows[2].price = this.state.statedata.JPY;
    //}
    //}

    return (
      <div>
        {this.state.loading || !this.state.statedata ? (
          <div>no data availible</div>
        ) : (
          <div>
            <Select
              options={currencies}
              placeholder="Currency (Default BTC)"
              onChange={this.handleChange}
            />

            <div>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell >Key</TableCell>
                      <TableCell >No</TableCell>
                      <TableCell >Attribute Name</TableCell>
                      <TableCell >Attribute Value</TableCell>
                      <TableCell align="right">Unit</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map(row => (
                      <TableRow key={row.id}>
                        <TableCell component="th" scope="row">{row.id}</TableCell>
                        <TableCell component="th" scope="row">{row.key} </TableCell>
                        <TableCell component="th" scope="row">{row.no} </TableCell>
                        <TableCell component="th" scope="row">{row.an}</TableCell>
                        <TableCell component="th" scope="row">{row.av}</TableCell>
                        <TableCell align="right">{row.unit}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        )}
      </div>
    );
  }
}

//*/
