import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Table, CardBody, CardHeader, Row, Label,
    Col, Breadcrumb, BreadcrumbItem, Container,
    TabContent, TabPane, Nav, Card, Button } from 'reactstrap';
import Menu from '../../components/Menu';
import CapacitacionService from '../../http/service/CapacitacionService';

import EmpresaCard from '../../components/EmpresaCard';
import TabTitle from '../../components/TabTitle';

import { apiHost } from '../../config/const';

class DetalleCapacitacion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            empresa: {},
            capacitacion: {},
            activeTab: '0',
            asistentes: [],
            asistentesActuales: 0,

            file: null,
        };
        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.registrarAsistencia = this.registrarAsistencia.bind(this);
        this.handlerCerrarCapacitacion = this.handlerCerrarCapacitacion.bind(this);

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
                });
            });
        });
    }

    refrescarLista() {
        const { idCapacitacion } = this.props.match.params;
        CapacitacionService.asistentesByIdCapacication(idCapacitacion).then((asistentes) => {
            this.setState({ asistentes });
        });
    }

    toggle(tab) {
        const { activeTab } = this.state;
        if (activeTab !== tab) {
            this.setState({ activeTab: tab })
        }
    }

    handleChange(event) {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    }

    setFile = (event, id, firmaOriginal) => {
        const s = this;
        var data = new FormData();
        data.append("file", event.target.files[0]);
        data.append("id", id);
        data.append("firmaOriginal", firmaOriginal);

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        
        xhr.addEventListener("readystatechange", function () {
          if (this.readyState === 4) {
            var b = this.responseText.replace('"','').replace('"','')
            var selectImage = b.split('/').reverse()[0];
            const asistencia = { id, firmar: selectImage };
            CapacitacionService.registroAsistencia(asistencia).then(() => s.refrescarLista());

          }
        });

        xhr.open("POST", apiHost + "/api/asistencias/uploadFile");
        xhr.setRequestHeader("Authorization", `Bearer ${window.localStorage.getItem('token')}`);
        xhr.send(data);
    }
    
    registrarAsistencia(id) {
        
        return () => {
            const firmar = prompt("Ingrese Firma");
            const asistencia = { id, firmar };
            if (!firmar) {
                alert('firma es requerida');
            } else {
                CapacitacionService.registroAsistencia(asistencia).then(() => this.refrescarLista());
            }
        };
    }

    handlerCerrarCapacitacion() {
        const { idCapacitacion } = this.props.match.params;
        CapacitacionService.cerrarCapacitacion(idCapacitacion).then(() => {
            this.refrescarVista();
        }).catch(e => {
            alert(e);
        });
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
                                                            <td>{e.firma ? (
                                                                <span className="text-success">
                                                                    <img src={e.firma} height="40" width="40" alt="img"/>
                                                                    <input id="image-file" type="file" onChange={(event) => this.setFile(event, e.asistenciaId, e.firmaOriginal)} />
                                                                </span>
                                                            ) : (capacitacion.asistentesMinimos > asistentesActuales
                                                                ? 'No se puede realizar'
                                                                : (<input id="image-file" type="file" onChange={(event) => this.setFile(event, e.asistenciaId, e.firmaOriginal)} />)
                                                                )
                                                            }</td>
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
                                                                <Col md="3">
                                                                    <Label for="exampleEmail">Minimo Asistencia</Label>
                                                                    <div className="display-data">{capacitacion.asistentesMinimos}</div>
                                                                </Col>
                                                                <Col md="3">
                                                                    <Label for="exampleEmail">Inscritos</Label>
                                                                    <div className="display-data">{asistentesActuales}</div>
                                                                </Col>
                                                                <Col md="3">
                                                                    <Label for="exampleEmail">Estado</Label>
                                                                    <div className="display-data">{capacitacion.asistentesMinimos > asistentesActuales
                                                                        ? 'No se puede realizar'
                                                                        : 'Correcto'
                                                                    }</div>
                                                                </Col>
                                                                <Col md="3">
                                                                    {capacitacion.estado === 1 ? (
                                                                        <span>
                                                                            <Label for="exampleEmail">Estado</Label>
                                                                            <div className="display-data">Capacitacion Cerrada</div>
                                                                        </span>
                                                                    ) : (
                                                                            <Button color="danger" block className="button-form" onClick={this.handlerCerrarCapacitacion}>
                                                                                Cerrar Charla
                                                                        </Button>
                                                                        )}
                                                                </Col>
                                                            </Row>
                                                            <Row className="mt-4">
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