
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalRiesgos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        const { riesgos } = this.props.trabajador;
        return (
            <div>
                <Button color="info" onClick={this.toggle}>{this.props.buttonLabel}</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Riesgos del Trabajador</ModalHeader>
                    <ModalBody>
                        <ul>
                            {riesgos.map(e => (
                                <li key={e.id}>{e.id} ) {e.nombre}</li>
                            ))}
                        </ul>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>Cerrar</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ModalRiesgos;