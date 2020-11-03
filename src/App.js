import React, { useEffect, useState} from "react";

// import './App.css';
import { getImages } from "./dataAction";
function App() {

useEffect(() => {
  callAction()
}, [])

const callAction =async (params) => {
  getImages(2)
}


	return <div className="App">div ajzhnbujis jhsiu cuahf kiuw</div>;
}

export default App;
