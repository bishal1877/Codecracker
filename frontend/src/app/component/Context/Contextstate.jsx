"use client";
import { Context } from "./Context";
import { useState } from "react";

let Contextstate=(props)=>{
let [state,setstate]=useState({socket:null,name:"my"});

return (
    <Context.Provider value={{state , setstate}}>
        {props.children}
    </Context.Provider>
)
}

export default Contextstate;