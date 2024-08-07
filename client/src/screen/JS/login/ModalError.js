import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import '../../css/ModalError.css';

const ModalError = ({ isOpen, toggle, errorMessage }) => {
    return (
        <Modal isOpen={isOpen} toggle={toggle} className="modal-dialog-centered">
            <ModalHeader toggle={toggle}>Erreur</ModalHeader>
            <ModalBody>
                {errorMessage}
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={toggle}>Fermer</Button>
            </ModalFooter>
        </Modal>
    );
};

export default ModalError;