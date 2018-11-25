import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button, ButtonGroup, Row, Col, Breadcrumb, BreadcrumbItem, Container, Card, CardHeader, CardTitle, CardBody, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ReactTable from "react-table";
import "react-table/react-table.css";

import ModalPrevencionistaInformes from '../../components/ModalPrevencionistaInformes';

import EmpresasService from '../../http/service/EmpresaService';
import InformeService from '../../http/service/InformeService';

import Menu from '../../components/Menu';
import EmpresaCard from '../../components/EmpresaCard';


class ListadoInformesAsignado extends Component {
    constructor(props) {
        super(props);
        this.state = {
            empresa: {},
            // 0 neutral -1 rechazado 1 aprobado
            confirmacionPreve: 0,
            tipoInforme: 'trabajador',
            informes: [],
        };

        this.listar = this.listar.bind(this);
    }

    componentDidMount() {
        const { tipoInforme } = this.state;
        const { id } = this.props.match.params;
        EmpresasService.findById(id).then(empresa => {
            if (tipoInforme === 'trabajador') {
                InformeService.getAllInformeTrabajadorByEstadoPrevencionistaId(empresa.id, this.state.confirmacionPreve).then(informes => {
                    this.setState({
                        informes,
                        empresa,
                    })
                });

            } else {
                InformeService.getAllInformeInstalacionyByEstadoPrevencionistaId(empresa.id, this.state.confirmacionPreve).then(informes => {
                    this.setState({
                        informes,
                        empresa,
                    })
                });

            }

        });
    }

    listar(tipoInforme, confirmacionPreve) {
        return () => {
            if (tipoInforme === 'trabajador') {
                InformeService.getAllInformeTrabajadorByEstadoPrevencionistaId(this.state.empresa.id, confirmacionPreve).then(informes => {
                    this.setState({
                        informes,
                        tipoInforme: 'trabajador',
                        confirmacionPreve,
                    })
                });

            } else {
                InformeService.getAllInformeInstalacionyByEstadoPrevencionistaId(this.state.empresa.id, confirmacionPreve).then(informes => {
                    this.setState({
                        informes,
                        tipoInforme: 'instalacion',
                        confirmacionPreve,
                    })
                });

            }
        }
    }

    render() {
        const { empresa, informes, tipoInforme, confirmacionPreve } = this.state;
        return empresa ? (
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
                                <BreadcrumbItem active>Listado Informes a Revisar</BreadcrumbItem>
                            </Breadcrumb>
                            <EmpresaCard empresa={empresa} />
                        </Col>
                        <Col md="12">
                            <Card className="my-4">
                                <CardHeader>
                                    <CardTitle>Informe</CardTitle>
                                    <div>
                                        <Button className="mr-1 mb-1" color={confirmacionPreve === 0 && tipoInforme === 'trabajador' ? 'info' : ''} onClick={this.listar('trabajador', 0)}>Trabajadores Pendientes</Button>
                                        <Button className="mr-1 mb-1" color={confirmacionPreve === -1 && tipoInforme === 'trabajador' ? 'danger' : ''} onClick={this.listar('trabajador', -1)}>Trabajadores Rechazados</Button>
                                        <Button color={confirmacionPreve === 1 && tipoInforme === 'trabajador' ? 'success' : ''} onClick={this.listar('trabajador', 1)}>Trabajadores Aprobados</Button>

                                    </div>

                                    <div className="mt-2">
                                        <Button className="mr-1 mb-1" color={confirmacionPreve === 0 && tipoInforme === 'instalacion' ? 'info' : ''} onClick={this.listar('instalacion', 0)}>Instalaciones Pendientes</Button>
                                        <Button className="mr-1 mb-1" color={confirmacionPreve === -1 && tipoInforme === 'instalacion' ? 'danger' : ''} onClick={this.listar('instalacion', -1)}>Instalaciones  Rechazados</Button>
                                        <Button color={confirmacionPreve === 1 && tipoInforme === 'instalacion' ? 'success' : ''} onClick={this.listar('instalacion', 1)}>Instalaciones Aprobados</Button>
                                    </div>

                                </CardHeader>
                                <CardBody>
                                    <Table className="mt-4">
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Nombre</th>
                                                <th>Acción</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {informes.map(e => (
                                                <tr key={e.id}>
                                                    <td>{e.id}</td>
                                                    <td>{e.nombre}</td>
                                                    <th>
                                                        <ModalPrevencionistaInformes
                                                            informe={e} buttonLabel="Ver"
                                                        />
                                                    </th>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                </Container>
            </div>
        ) : (<div />);
    }
}

export default ListadoInformesAsignado;