import React, { Component } from 'react';
import {Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

export class RegSuccessModal extends Component {
    constructor (props) {
        super(props);

        this.state = { modal: false };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    render () {
        return (
            <div>
                <Button color="darkBlue" onClick={this.toggle}> Create Account </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalBody>
                        Register successful.
                    </ModalBody>
                    <ModalFooter>
                        <Button color="darkBlue" onClick={this.toggle}>Back to login</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default RegSuccessModal;