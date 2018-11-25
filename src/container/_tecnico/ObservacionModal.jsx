
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, FormGroup, Label, Input } from 'reactstrap';

class ObservacionModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            nombre: '',
        };

        this.save = this.save.bind(this);
        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    save() {
        const nombre = this.state.nombre;
        this.setState({
            modal: false,
            nombre: '',
        }, () => {
            this.props.onSave(nombre);
        });
    }

    handleChange(event) {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    }

    disabled() {
        return this.state.nombre === '';
    }

    render() {
        const { nombre } = this.state;
        return (
            <div>
                <Button color="info" onClick={this.toggle}>{this.props.buttonLabel}</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Nueva Observacion</ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col md={12}>
                                <FormGroup>
                                    <Label for="nombre">Titulo</Label>
                                    <Input placeholder="Ingrese titulo de informe" name="nombre" value={nombre} onChange={this.handleChange} />
                                </FormGroup>
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.save} disabled={this.disabled()}>Crear</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancelar</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ObservacionModal;