import React, { Component } from 'react'      
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
export class HeaderPart extends Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>
                  <h1>Guess The Movie</h1>
                </Navbar.Brand>
            </Navbar>
        )
    }
}

export default HeaderPart
