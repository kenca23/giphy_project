import React from "react";
import "./App.css";
import Container from 'react-bootstrap/Container';

import Giphy from "./components/Giphy"

const App = ({ name }) => { 
  return (
    <Container className="mt-sm-2">
      <Giphy />
    </Container>
    
  )
}
  
  

export default App;
