import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilm, faGripLines } from '@fortawesome/free-solid-svg-icons';

export default function ShowHint(props) {
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" id="showHintModal" style={{display:'none'}} onClick={setShow}>
              Launch demo modal
            </Button>
      
            <Modal style={{witdh:'100%'}} show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title><h5> <FontAwesomeIcon icon={faSearch}/> </h5> Hint Says</Modal.Title> 
              </Modal.Header>
              <Modal.Body><h5> {props.hint} </h5></Modal.Body>
              <Modal.Footer>
                <Button variant="danger" block> Hello </Button>
              </Modal.Footer>
            </Modal>
        </>
    )
}
