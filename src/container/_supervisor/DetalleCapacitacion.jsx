import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Select from 'react-select';
import { Table, CardBody, CardHeader, Row, Label, Col, Breadcrumb, BreadcrumbItem, Container, TabContent, TabPane, Nav, Card, Button, Form } from 'reactstrap';
import Menu from '../../components/Menu';
import CapacitacionService from '../../http/service/CapacitacionService';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import EmpresaCard from '../../components/EmpresaCard';
import TabTitle from '../../components/TabTitle';
import TrabajadorService from '../../http/service/TrabajadorService';
import EmpresasService from '../../http/service/EmpresaService';
import InformeService from '../../http/service/InformeService';
import { profileList } from '../../common/utils';
import UserService from '../../http/service/UserService';




class DetalleCapacitacion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            capacitacion: [],
            trabajadorSeleccionado: [],
            empresa: {},
            asistentes: [],
            activeTab: "1",
            trabajadores: [],
        };
        this.toggle = this.toggle.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.handlerSubmit = this.handlerSubmit.bind(this);
    }

    componentDidMount() {
        this.refrescarVista();
    }

    refrescarVista() {
        const { idCapacitacion } = this.props.match.params;
        CapacitacionService.findById(idCapacitacion).then(capacitacion => {
            CapacitacionService.asistentesByIdCapacication(idCapacitacion).then((asistentes) => {
                this.setState({
                    empresa: capacitacion.empresa,
                    capacitacion,
                    asistentes,
                    asistentesActuales: asistentes.length,
                    trabajadorSeleccionado:{},
                });
            });
        });

        const { id } = this.props.match.params;
        EmpresasService.findById(id).then(empresa => {
            UserService.findAllByProfileId(profileList.SUPERVISOR_ID).then(supervisores => {
                TrabajadorService.findAllByEmpresaId(empresa.id).then(trabajadores => {
                    this.setState({
                        empresa,
                        supervisores: supervisores.map(e => ({ value: e.id, label: e.name })),
                        trabajadores: trabajadores.map(e => ({ value: e.id, label: `${e.nombre} ${e.apellidoPaterno} ${e.apellidoMaterno}` })),
                    })
                });
            }
            );
        });
    }

    handleChange(event) {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    }

    handlerSave(id) {
        const { detalle } = this.state;
        InformeService.insertObservacion({
            id,
            informeId: detalle,
            idperson: id,
        }).then(data => {
            InformeService.observacionByInformeId(detalle).then(observaciones => {
                this.setState({
                    observaciones,
                });
            });
        });
    }

    toggle(tab) {
        const { activeTab } = this.state;
        if (activeTab !== tab) {
            this.setState({ activeTab: tab })
        }
    }

    handlerSubmit(event) {
        event.preventDefault();
        const { idCapacitacion } = this.props.match.params;
        const {
            trabajadorSeleccionado,
        } = this.state;

        const informePersona = {
            capacitacion: idCapacitacion,
            trabajadorId: trabajadorSeleccionado.value,
        };
        CapacitacionService.registroParticipantes(informePersona).then((data) => {

            this.refrescarVista();

        }).catch(e => console.log(e));

    }

    disabled() {
        const { nombre, trabajadorSeleccionado, supervisorSeleccionado } = this.state;
        if (
            nombre === '' ||
            trabajadorSeleccionado === null ||
            supervisorSeleccionado === null) return true;
        return false;
    }

    render() {
        const { empresa, capacitacion, activeTab, asistentes, asistentesActuales, trabajadores, trabajadorSeleccionado } = this.state;
        return (
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
                                    <Link to={`/home/empresas/${empresa.id}/supervisor/capacitacion`}>Capacitaciones</Link>
                                </BreadcrumbItem>
                                <BreadcrumbItem active>Capacitación {capacitacion.id}</BreadcrumbItem>
                            </Breadcrumb>
                            <EmpresaCard empresa={empresa} link={`/home/empresas/${empresa.id}`} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                            <Card className="mt-4">
                                <CardHeader>Participantes</CardHeader>
                                <CardBody>

                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="12 my-4">
                            <Nav tabs>
                                <TabTitle title="Participantes" activeTab={activeTab} onClick={this.toggle} n="0" />
                                <TabTitle title="Detalle Capacitación" activeTab={activeTab} onClick={this.toggle} n="1" />
                            </Nav>
                            <TabContent activeTab={activeTab}>
                                <TabPane tabId="0">
                                    <Row>
                                        <Col sm="12">
                                            <Card>
                                                <CardBody>
                                                    <Form onSubmit={this.handlerSubmit}>
                                                        <Row>
                                                            <Col sm="8">
                                                                <Select
                                                                    value={trabajadorSeleccionado}
                                                                    onChange={(value) => this.handleChange({ target: { value, name: 'trabajadorSeleccionado' } })}
                                                                    options={trabajadores.filter(e => !asistentes.some(a => a.trabajadorId === e.value))}
                                                                />
                                                            </Col>
                                                            <Col sm="4">
                                                                <Button color="primary" disabled={!trabajadorSeleccionado.value}>
                                                                    <FontAwesomeIcon icon="plus" /> Incribir
                                                                </Button>
                                                            </Col>
                                                        </Row>
                                                    </Form>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col sm="12">
                                            <Table>
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Nombre</th>
                                                        <th>Apellido Paterno</th>
                                                        <th>Apellido Materno</th>
                                                        <th>Asistencia</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {asistentes.map(e => (
                                                        <tr key={e.asistenciaId}>
                                                            <td>{e.trabajadorId}</td>
                                                            <td>{e.nombre}</td>
                                                            <td>{e.apellidoPaterno}</td>
                                                            <td>{e.apellidoMaterno}</td>
                                                            <td>{e.firma ? 'Disponible' : 'No disponible'}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tabId="1">
                                    <Row>
                                        <Col sm="12">
                                            <Row>
                                                <Col md="12 mt-4 mb-4">
                                                    <Card>
                                                        <CardHeader>{capacitacion.id}) {capacitacion.nombre}</CardHeader>
                                                        <CardBody>
                                                            <Row>
                                                                <Col md="4">
                                                                    <Label for="exampleEmail">Minimo Asistencia</Label>
                                                                    <div className="display-data">{capacitacion.asistentesMinimos}</div>
                                                                </Col>
                                                                <Col md="4">
                                                                    <Label for="exampleEmail">Inscritos</Label>
                                                                    <div className="display-data">{asistentesActuales}</div>
                                                                </Col>
                                                                <Col md="4">
                                                                    <Label for="exampleEmail">Estado</Label>
                                                                    <div className="display-data">{capacitacion.asistentesMinimos > asistentesActuales
                                                                        ? 'No se puede realizar'
                                                                        : 'Correcto'
                                                                    }</div>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col md="12">
                                                                    <Label for="descripcion">Descripción</Label>
                                                                    <div dangerouslySetInnerHTML={{ __html: capacitacion.descripcion }} />
                                                                </Col>
                                                            </Row>
                                                        </CardBody>
                                                    </Card>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </TabPane>
                            </TabContent>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default DetalleCapacitacion;