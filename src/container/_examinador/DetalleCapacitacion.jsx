import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Table, CardBody, CardHeader, Row, Label, Col, Breadcrumb, BreadcrumbItem, Container, TabContent, TabPane, Nav, Card } from 'reactstrap';
import Menu from '../../components/Menu';
import CapacitacionService from '../../http/service/CapacitacionService';

import EmpresaCard from '../../components/EmpresaCard';
import TabTitle from '../../components/TabTitle';

class DetalleCapacitacion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            empresa: {},
            capacitacion: {},
            activeTab: '0',
            asistentes: [],
            asistentesActuales: 0,
        };
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        const { idCapacitacion } = this.props.match.params;
        CapacitacionService.findById(idCapacitacion).then(capacitacion => {
            CapacitacionService.asistentesByIdCapacication(idCapacitacion).then((asistentes) => {
                this.setState({
                    empresa: capacitacion.empresa,
                    capacitacion,
                    asistentes,
                    asistentesActuales: asistentes.length,
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

    render() {
        const { empresa, capacitacion, activeTab, asistentes, asistentesActuales } = this.state;
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
                                    <Link to={`/home/empresas/${empresa.id}/examinador`}>Capacitaciones</Link>
                                </BreadcrumbItem>
                                <BreadcrumbItem active>Capacitación {capacitacion.id}</BreadcrumbItem>
                            </Breadcrumb>
                            <EmpresaCard empresa={empresa} link={`/home/empresas/${empresa.id}/examinador`} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12 mt-4">
                            <Nav tabs>
                                <TabTitle title="Asignadas" activeTab={activeTab} onClick={this.toggle} n="0" />
                                <TabTitle title="Detalle Capacitación" activeTab={activeTab} onClick={this.toggle} n="1" />
                            </Nav>
                            <TabContent activeTab={activeTab}>
                                <TabPane tabId="0">
                                    <Row>
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
                                                        <CardHeader>{capacitacion.nombre}</CardHeader>
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