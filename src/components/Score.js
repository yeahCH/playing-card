import React from 'react'
import { Modal, Button } from 'react-bootstrap'

const ScoreModal = ({show, onClose, score}) => {
  return (
    <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton><Modal.Title>60K Points</Modal.Title></Modal.Header>
        <Modal.Body>
            <h4 className="text-center">Game Over!</h4>
            <h2 className="text-center text-danger">{score}</h2>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={onClose}>Close</Button>
        </Modal.Footer>
      </Modal>
  )
}

export default ScoreModal
