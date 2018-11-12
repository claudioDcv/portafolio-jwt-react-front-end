import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {
    Button, ButtonGroup, Row, Col,
    Breadcrumb, BreadcrumbItem, Container,
    Card, CardBody, CardHeader, Label, Table
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ReactTable from "react-table";
import "react-table/react-table.css";

import Select from 'react-select';


import TrabajadorService from '../../http/service/TrabajadorService';
import EmpresasService from '../../http/service/EmpresaService';
import VisitaMedicaService from '../../http/service/VisitaMedicaService';

import ModalRiesgos from '../../components/ModalRiesgos';
import ModalExamenEnConsulta from '../../components/ModalExamenEnConsulta';

import { fechaFormateada } from '../../common/utils';

import Menu from '../../components/Menu';
import EmpresaCard from '../../components/EmpresaCard';


class VisitaMedica extends Component {
    constructor(props) {
        super(props);
        this.state = {
            empresa: {},
            visitaMedica: {},
            trabajadorSeleccionado: null,
            trabajadores: [],
            consultasMedicas: [],
            examenes: [],
        };

        this.handlerCrearConsulta = this.handlerCrearConsulta.bind(this);
    }

    componentDidMount() {
        const { id, visitaMedicaId } = this.props.match.params;
        EmpresasService.findById(id).then(empresa => {
        VisitaMedicaService.getVisitaMedicaById(empresa.id, visitaMedicaId).then(visitaMedica => {
        TrabajadorService.findAllTrabajadoresRiesgoByEmpresaId(empresa.id).then(trabajadores => {
        VisitaMedicaService.getAllConsultasMedicasByVisitaMedica(visitaMedicaId).then(consultasMedicas => {
        VisitaMedicaService.getAllExamenes().then(examenes => {
            this.setState({
                examenes: examenes.map(e => ({ value: e.id, label: e.nombre })),
                consultasMedicas,
                trabajadores: trabajadores.map(e => ({ value: e.id, label: `${e.nombre} ${e.apellidoPaterno} ${e.apellidoMaterno}` })),
                empresa,
                visitaMedica,
            });
        });
        });
        });
        });
        });
    }

    handleChange(event) {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    }

    handlerCrearConsulta() {
        const { trabajadorSeleccionado } = this.state;
        const { visitaMedicaId } = this.props.match.params;
        const data = {
            trabajadorId: trabajadorSeleccionado.value,
            visitaMedicaId,
        };
        VisitaMedicaService.crearConsultaMedica(data).then(e => {

        });
    }

    render() {
        const { empresa, visitaMedica, trabajadorSeleccionado, trabajadores, consultasMedicas, examenes } = this.state;
        return empresa && visitaMedica.id ? (
            <div>
                <Menu />
                <Container>
                    <Row>
                        <Col>
                            <Breadcrumb>
                                <BreadcrumbItem>
                                    <Link to="/home">Home</Link>
                                </BreadcrumbItem>
                                <BreadcrumbItem>
                                    <Link to="/home/empresas">Empresas</Link>
                                </BreadcrumbItem>
                                <BreadcrumbItem>
                                    <Link to={`/home/empresas/${empresa.id}`}>{empresa.nombre}</Link>
                                </BreadcrumbItem>
                                <BreadcrumbItem>
                                    <Link to={`/home/empresas/${empresa.id}/medico`}>Visitas Medicas</Link>
                                </BreadcrumbItem>
                                <BreadcrumbItem active>Visita</BreadcrumbItem>
                            </Breadcrumb>
                            <EmpresaCard empresa={empresa} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12 mt-4">
                            <Card>
                                <CardHeader>Visita Medica</CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col md="2">
                                            <Label>Id</Label>
                                            <div className="display-data">
                                                {visitaMedica.id}
                                            </div>
                                        </Col>
                                        <Col md="3">
                                            <Label>Supervisor</Label>
                                            <div className="display-data">
                                                {visitaMedica.supervisor.name} {visitaMedica.supervisor.surname}
                                            </div>
                                        </Col>
                                        <Col md="3">
                                            <Label>Fecha a Realizar</Label>
                                            <div className="display-data">
                                                {fechaFormateada(new Date(visitaMedica.fechaRealizacion))}
                                            </div>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                            <Card className="mt-4">
                                <CardHeader>Trabajador</CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col md={6}>
                                            <Label>Trabajador</Label>
                                            <Select
                                                value={trabajadorSeleccionado}
                                                onChange={(value) => this.handleChange({ target: { value, name: 'trabajadorSeleccionado' } })}
                                                options={trabajadores}
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <Button
                                                onClick={this.handlerCrearConsulta}
                                                block
                                                className="button-form"
                                            >Crear consulta</Button>
                                        </Col>
                                        <Col md="12 mt-4">
                                            <label>Consultas Medicas</label>
                                            <Table>
                                                <thead>
                                                    <tr>
                                                        <th>Id</th>
                                                        <th>Trabajador</th>
                                                        <th>Riesgos</th>
                                                        <th>Examenes</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {consultasMedicas.map(e => (
                                                        <tr key={e.id}>
                                                            <td>{e.id}</td>
                                                            <td>{e.trabajador.nombre} {e.trabajador.apellidoPaterno} {e.trabajador.apellidoMaterno}</td>
                                                            <td><ModalRiesgos trabajador={e.trabajador} buttonLabel="Ver" /></td>
                                                            <td><ModalExamenEnConsulta consultaMedicaId={e.id} examenes={examenes} buttonLabel="Administrar" /></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        ) : (<div />);
    }
}

export default VisitaMedica;