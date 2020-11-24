import React, { useState } from 'react'
import axios from "axios"
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert';

const Giphy = () => {
    const [search, setSearch] = useState("")
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)


    const handleSearchChange = event => { 
        setSearch(event.target.value)
    }

    const handleSubmit = async event => { 
        event.preventDefault()
        setIsError(false)
        setIsLoading(true)

        try {
            const results = await axios("https://api.giphy.com/v1/gifs/search", {
                params: {
                    api_key: "LiT4XaeBUDCDtVpLNuTcc8fzKv84AmW6",
                    q: search
                }
            })

            setData(results.data.data)
            
        } catch (err) {
            setIsError(true)
            setTimeout(() => setIsError(false), 5000)
        }

        setIsLoading(false)
    }

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
        return data.map(gif => { 
            return (
                <div key={gif.id} className="gif">
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
            
        </div>
    )
}

export default Giphy
