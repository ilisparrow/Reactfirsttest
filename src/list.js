import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import SendIcon from "@material-ui/icons/Send";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";

const rows = [
  { name: "First item", cont: "B" },
  { name: "Second item", cont: "D" },
  { name: "Third item", cont: "F" }
];
/*
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));
*/



//const classes = useStyles();



export default class NestedList extends React.Component{
state = {
    loading: true,
    statedata: null,
    rendered: false,
    openBtn1 : true
  };

async fetch(){
    //const url =
    //  "https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=USD,JPY,EUR";
    const url ="http://localhost:8080/api/core/ibo.base.categories"

    const res = await fetch(url);
    const data = await res.json();

    //console.log(data)
    //console.log(data.categories[0].Code);

    for(var i =0;i<data.categories.length;i++){
      rows[i] = {desc:data.categories[i].Description}


    }
    this.setState({ statedata: rows, loading: false, rendered: true });

    return(rows)

    /*
    for(var i =0;i<data.attributes.length;i++){
      rows[i] = {"id":String(i),
                "key":data.attributes[i].Key,
                "no":data.attributes[i].No,
                "an":data.attributes[i].AttributeName,
                "av":data.attributes[i].AttributeValue,
                "unit":data.attributes[i].UnitOfMeasure}

    }*/
    //const rows = [createData("USD", 0), createData("EUR", 0), createData("JPY", 0)];
    //console.log(data.attributes.length)
    //onsole.log(rows[0])
    //console.log(data.attributes[0].Key);
  }




  render(){


  const handleClick = () => {
    this.setState({openBtn1:!this.state.openBtn1});
  };

  this.fetch() 

  return (
  <div>{this.state.loading ? (<div>No data availible</div>):
      (<div>
  <div>{console.log(this.state.statedata)}</div>
<List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
        </ListSubheader>
      }
    >
      <ListItem button>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Sent mail" />
      </ListItem>
      {this.state.statedata.map(row => (
        <ListItem button>
          <ListItemText primary={row.desc}  />
        </ListItem>
      ))}
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Inbox" />
        {this.state.openBtn1 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={this.state.openBtn1} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button > 
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItem>
        </List>
      </Collapse>
    </List>

      </div>)}


    

    </div>
  );}
}

