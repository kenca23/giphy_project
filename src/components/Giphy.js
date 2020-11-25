import React, { useState } from 'react'
import axios from "axios"
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal'

const Giphy = () => {
    const [search, setSearch] = useState("") // Handles the search input
    const [data, setData] = useState([]) // Handles the data from Giphy
    const [isLoading, setIsLoading] = useState(false) // Handles when the page is looking for data
    const [isError, setIsError] = useState(false) // Handles error from fetching data
    const [show, setShow] = useState(false); // Handles modal show
    const [clickedIndex, setClickedIndex] = useState(-1) // Handles the gif to show in the modal

    
    const handleSearchChange = event => { 
        setSearch(event.target.value)
    }

    
    const handleSubmit = async event => { 
        event.preventDefault()
        setIsError(false)
        setIsLoading(true)

        try {
            const results = await axios("https://api.giphy.com/v1/gifs/search", { // Request data from giphy
                params: {
                    api_key: "LiT4XaeBUDCDtVpLNuTcc8fzKv84AmW6",
                    q: search
                }
            })

            setData(results.data.data) // set Data to data hook
            
        } catch (err) {
            setIsError(true)
            setTimeout(() => setIsError(false), 5000)
        }

        setIsLoading(false)
    }

    // Logic for render serchead Gifs
    const renderGifs = () => { 
        if (isLoading) { 
            return (
                <div className="loading-wrapper">
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            )
        }
        if (data.length === 0) { 
            return (
                <div>
                    <h4>Please type something in the search bar and click Go to look for gifs.</h4>
                </div>
            )
        }
        return data.map((gif, index) => { 
            return (
                <div key={gif.id} className="gif" onClick={() => handleShow(index)}>
                    <img src={gif.images.fixed_height.url} alt={gif.title}/>
                </div> 
            )
        })
    }
    const renderError = () => { 
        if (isError) { 
            return (
                <Alert variant="danger">
                    Unable to get Gifs, please try again in a few minutes
                </Alert>
            )
        }
    }

    //Handlers for modal.
    const handleClose = () => setShow(false);
    const handleShow = (index) => { 
        setClickedIndex(index)
        setShow(true);
    }

    const renderModal = () => { 
        if (clickedIndex>=0) { 
            return (
                <Modal size="lg" show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{ data[clickedIndex].title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img src={data[clickedIndex].images.original.url} alt={data[clickedIndex].title}/>
                    </Modal.Body>
                </Modal>
            )
        }
        
    }

    return (

        <div>
            <Container className="mt-sm-2 search-box-wrapper">
                <Form>
                    <Form.Row>
                    <Col xs={{ span: 8, offset: 1 }}>
                            <FormControl onChange={handleSearchChange} value={search} type="text" placeholder="Search..." className="mr-sm-2" />
                    </Col>
                    <Col>
                            <Button onClick={ handleSubmit } variant="outline-success" type="submit">
                        Go
                        </Button>
                    </Col>
                    </Form.Row>
                </Form>
            </Container>
            <Container className="mt-sm-4 gifs-wrapper">
                { renderError() }
                { renderGifs() }
            </Container>
            {renderModal()}
            
            
        </div>
    )
}

export default Giphy
