import React from 'react'
import { Modal, Button } from 'react-bootstrap'

const Help = ({show, onClose}) => {
  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton><Modal.Title>How to play?</Modal.Title></Modal.Header>
      <Modal.Body>
        <p className="lead text-muted">
          This is a card game by React.<br/>
          Please select a pair of cards with same number. Then it will disappear.<br/>
          It will be over if you can not find a pair of cards any more.<br/>
          <strong className="text-info">Please Sign-in to share your scores with community!</strong>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Help
