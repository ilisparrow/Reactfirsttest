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
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";
import { isConstructorDeclaration } from "typescript";


const bopen =[]
const _items = []
const rows = [
  { name: "First item", cont: "B" },
  { name: "Second item", cont: "D" },
  { name: "Third item", cont: "F" }
];





export default class NestedList extends React.Component{
state = {
    loading: true,
    statedata: null,
    rendered: false,
    openBtn : true,
    loadingItems : true,
    items : null,
    noItem:"M025084",
    pdflink:'',
    cadlink:'',
    Index : true
  };

async fetch(){

    const url ="https://product.ibo-tec.de/api/core/ibo.base.categories"

    const res = await fetch(url);
    const data = await res.json();


    if (this.state.loading){
      for(var i =0;i<data.categories.length;i++){
        rows[i] = {key : i, desc:data.categories[i].Description}
        _items[i] = {items:data.categories[i].items}
        bopen[i] = {open:false}
      }

    }
    this.setState({ statedata: rows, loading: false, rendered: true,open:bopen,items:_items });
    
    return

 
  }
  


  async fetchItem(){
    const url ="https://product.ibo-tec.de/api/core/ibo.base.item.attributes?id="+this.state.noItem
    const res = await fetch(url);
    const data = await res.json();
    

    //console.log(data);
    for(var i =0;i<data.data.length;i++){
      rows[i] = {"key":data.data[i].Key,
                "no":data.data[i].No,
                "an":data.data[i].AttributeName,
                "av":data.data[i].AttributeValue,
                "unit":data.data[i].UnitOfMeasure}

    }

     try
    {
    //const urlpdf ="https://product.ibo-tec.de/api/core/ibo.base.item.document?id="+this.state.noItem+"&type=2"//Api Call for pdfs, or CAD models, type 2 for PDF and 1 for CAD
      const urlpdf ="https://product.ibo-tec.de/api/core/ibo.base.item.document?id=M026218&type=2"//Api Call for pdfs, or CAD models, type 2 for PDF and 1 for CAD
      const resultfile = await fetch(urlpdf);
      this.setState({ pdflink : resultfile.url});
    }
    catch(err) 
    {
      console.log("Error Getting the pdf file") 
    }


    try
    {
    //const urlcad ="https://product.ibo-tec.de/api/core/ibo.base.item.document?id="+this.state.noItem+"&type=1"//Api Call for pdfs, or CAD models, type 2 for PDF and 1 for CAD
      const urlcad ="https://product.ibo-tec.de/api/core/ibo.base.item.document?id=M026218&type=1"//Api Call for pdfs, or CAD models, type 2 for PDF and 1 for CAD
      const resultcad = await fetch(urlcad);
      this.setState({ cadlink : resultcad.url});
    }
    
    catch(err) 
    {
      console.log("Error Getting the CAD file") 
    }

    this.setState({ statedata: rows, loadingItems: false});

    
    return

 
  }

  render(){

  if(this.state.Index){

    if(this.state.loading)
    {
      this.fetch() 
    }
  const subItemClick = param => {
    this.setState({Index:false});
    //this.setState({:false});
      console.log("clicked")
       //return( <Router><Redirect to="/items"></Redirect>  </Router>)
  console.log("subButtonClicled")
  };

  return (
  <div>
    
    
    {this.state.loading ? (<div>Loading...</div>):
      (<div>
<List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
        </ListSubheader>
      }
    >

      {this.state.statedata.map(row => (
        <List>
        <ListItem button onClick={() => {this.state.open[row.key]={open:!this.state.open[row.key].open};this.forceUpdate();}}>

          <ListItemText primary={row.desc}  />
        {this.state.open[row.key].open? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={this.state.open[row.key].open} timeout="auto" unmountOnExit>
        {/*console.log(this.state.open[row.key])*/}
          <List component="div" disablePadding>
              {this.state.items[row.key].items.map(__item => (
                <ListItem button onClick={() => {this.setState({Index:false});this.setState({noItem:__item.ID})}}> 
                  <ListItemText primary={__item.ID} />
                </ListItem>
              ))}
          </List>
        </Collapse>
        </List>
      ))}
      

    </List>
    

      </div>)}


    

    </div>
  );
              }//If bracket

    else{
      if(this.state.loadingItems){
        this.fetchItem();
      }
/*
Key	""
No	"M025084"
AttributeName	"Aussendurchmesser"
AttributeValue	"125"
UnitOfMeasure	"mm"
*/
    return(<div>
      <button onClick={() => {this.setState({Index:true});this.setState({loading:true});}}>Index</button>  
      {!this.state.loadingItems?(<div><h2>{this.state.noItem}</h2><p>Download pdf if availible :   <a target="_blank" rel="noopener noreferrer" href={this.state.pdflink} download>Click to download</a></p><p>Download cad if availible :   <a target="_blank" rel="noopener noreferrer" href={this.state.cadlink} download>Click to download</a></p>{this.state.statedata.map(row => (<li><h4>{row.an} :</h4><div>Attribute Value : {row.av}<div>Unit : {row.unit}</div></div></li>))}</div>):(<div>Loading...</div>)} </div>)

  }

}
}

