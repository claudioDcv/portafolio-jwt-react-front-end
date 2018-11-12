
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Label } from 'reactstrap';
import Select from 'react-select';

import VisitaMedicaService from '../http/service/VisitaMedicaService';

class ModalExamenEnConsulta extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            examenSeleccionado: null,
            examenesAsignados: [],
        };

        this.toggle = this.toggle.bind(this);
        this.asignar = this.asignar.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    toggle() {
        const { consultaMedicaId } = this.props;
        this.setState({
            modal: !this.state.modal
        }, () => {
            if (this.state.modal) {
                VisitaMedicaService.getAllExamenesByConsultaId(consultaMedicaId).then(examenesAsignados => {
                    this.setState({ examenesAsignados });
                });
            }

        });
    }

    handleChange(event) {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    }


    asignar() {
        const val = this.state.examenSeleccionado.value;
        const { consultaMedicaId } = this.props;
        VisitaMedicaService.asignarExamenConsultaMedica({
            consultaMedicaId,
            examenId: val,
        }).then(e => {
            VisitaMedicaService.getAllExamenesByConsultaId(consultaMedicaId).then(examenesAsignados => {
                this.setState({ examenesAsignados });
            });
        });
    }

    render() {
        const { examenesAsignados } = this.state;
        const { examenes, examenSeleccionado } = this.props;
        return (
            <div>
                <Button color="info" onClick={this.toggle}>{this.props.buttonLabel}</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Administrar Examenes</ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col md={6}>
                                <Label>Trabajador</Label>
                                <Select
                                    value={examenSeleccionado}
                                    onChange={(value) => this.handleChange({ target: { value, name: 'examenSeleccionado' } })}
                                    options={examenes}
                                />
                            </Col>
                            <Col md={6}>
                                <Button block className="button-form" onClick={this.asignar}>Asignar</Button>
                            </Col>
                            <Col md="12">
                                <ul>
                                    {examenesAsignados.map(e => (
                                        <li key={e.id}>{e.nombre}</li>
                                    ))}
                                </ul>
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>Cerrar</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ModalExamenEnConsulta;