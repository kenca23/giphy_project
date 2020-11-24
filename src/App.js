import React from "react";
import "./App.css";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

const App = ({ name }) => { 
  return (
    <Container className="mt-sm-2">
      <Form>
        <Form.Row>
          <Col xs={{ span: 8, offset: 1 }}>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          </Col>
          <Col>
            <Button variant="outline-success" type="submit">
              Submit
            </Button>
          </Col>
        </Form.Row>
      </Form>
    </Container>
    
  )
}
  
  

export default App;
