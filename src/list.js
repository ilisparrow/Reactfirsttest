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





class Test extends React.Component  {
 state = {
    loading: true,
    statedata: null,
    rendered: false,
    choosenCurrency: "BTC"
  }



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
    this.state.loading=false
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

}



function useForceUpdate(){
    
}


export default function NestedList() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const forceUpdate = useForceUpdate();

  const handleClick = () => {
    setOpen(!open);
  };
  var a = new Test()
  const [statedata,setStatedata]=useState(a.fetch())
  
  console.log(a.state.loading)
  return (
  <div>{a.state.loading ? (<div>No data availible</div>):
      (<div>

<List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Nested List Items
        </ListSubheader>
      }
      className={classes.root}
    >
      <ListItem button>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Sent mail" />
      </ListItem>
      {statedata.map(row => (
        <ListItem button>
          <ListItemText primary={row.name} />
        </ListItem>
      ))}
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Inbox" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
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
  );
}

