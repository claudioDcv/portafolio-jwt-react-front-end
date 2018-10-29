import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table, Card, CardBody, Breadcrumb, BreadcrumbItem, Container, Col, Row, CardHeader, CardTitle } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Menu from '../../components/Menu';

import EmpresasService from '../../http/service/EmpresaService';
import { hasProfile, profileList } from '../../common/utils';

class ListadoEmpresa extends Component {

    constructor(props) {
        super(props);
        this.state = {
            empresas: [],
        };
    }

    componentDidMount() {
        EmpresasService.findAll().then(e => this.setState({ empresas: e }));
    }

    render() {
        const { empresas } = this.state;
        return (
            <div>
                <Menu />
                <Container>
                    <Row>
                        <Col>
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                                <BreadcrumbItem active>Empresas</BreadcrumbItem>
                            </Breadcrumb>
                            <Card>
                                <CardHeader>
                                    <CardTitle><FontAwesomeIcon icon="building" /> Listado de Usuarios</CardTitle>
                                    {hasProfile([profileList.ADMIN_SAFE]) && (
                                        <Link to="/usuarios/registrar">
                                            <Button color="primary">
                                                Registrar Empresa
                                            </Button>
                                        </Link>)
                                    }
                                </CardHeader>
                                <CardBody>
                                    <Table size="sm" striped hover responsive>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Nombre</th>
                                                <th>Email</th>
                                                <th>Teléfono</th>
                                                <th>Dirección</th>
                                                <th>Acción</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {empresas.map(e => (
                                                <tr key={e.id}>
                                                    <th scope="row">
                                                        <Link to={`/home/empresas/${e.id}`}>
                                                            <Button color="link" size="sm">{e.id}</Button>
                                                        </Link></th>
                                                    <td>{e.nombre}</td>
                                                    <td>{e.email}</td>
                                                    <td>{e.telefono}</td>
                                                    <td>{e.direccion}</td>
                                                    <td>
                                                        <Link to={`/home/empresas/${e.id}`}>
                                                            <Button color="primary" size="sm" outline>
                                                                <FontAwesomeIcon icon="eye" />
                                                            </Button>
                                                        </Link>
                                                    </td>
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
        );
    }
}


export default ListadoEmpresa;