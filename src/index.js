import React from "react";
import ReactDOM from "react-dom";
import Demo from "./demo";
import List from "./list";




const test = false ;




if(test){

ReactDOM.render(<Demo />, document.querySelector("#root"));
}
else{

ReactDOM.render(<List />, document.querySelector("#_list"));
}
