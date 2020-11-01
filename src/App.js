import React, { Component } from "react";
import "./App.css";
import Navbar from "./Component/Navbar/Navbar";
import Grid from "./Component/Grid/Grid";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Grid size={8} />
      </div>
    );
  }
}

export default App;
