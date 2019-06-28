import React from "react";
import "./App.css";

function App() {
  return (
    <video id='videoPlayer' controls>
      <source src='http://localhost:5000/video' type='video/mp4' />
    </video>
  );
}

export default App;
