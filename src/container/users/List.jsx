import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table, Card, CardBody, Breadcrumb, BreadcrumbItem, Container, Col, Row, CardHeader, CardTitle } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Menu from '../../components/Menu';

import UserService from '../../http/service/UserService';
import { email } from '../../config/const';

class List extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };
    }

    componentDidMount() {
        UserService.findAll().then(data => this.setState({
            users: data.filter(e => e.email !== email()),
        }));
    }

    handlerOnDelete(id) {
        return () => {
            // eslint-disable-next-line
            const result = confirm('¿Esta seguro que desea eliminar este elemento?');
            if (result) {
                UserService.delete(id).then(data => {
                    alert(`Eliminado con exito: ${data}`);
                    UserService.findAll().then(data => this.setState({
                        users: data.filter(e => e.email !== email()),
                    }));
                });
            }
        }
    }

    render() {
        const { users } = this.state;
        return (
            <div>
                <Menu />
                <Container>
                    <Row>
                        <Col>
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                                <BreadcrumbItem active>Usuarios</BreadcrumbItem>
                            </Breadcrumb>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Listado de Usuarios</CardTitle>
                                    <Link to="/usuarios/registrar">
                                        <Button color="primary">
                                            Registrar Usuario
                                        </Button>
                                    </Link>
                                </CardHeader>
                                <CardBody>
                                    <Table size="sm" striped hover responsive>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Nombre</th>
                                                <th>Email</th>
                                                <th>Acción</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map(e => (
                                                <tr key={e.id}>
                                                    <th scope="row">
                                                        <Link to={`/usuarios/detalle/${e.id}`}>
                                                            <Button color="link" size="sm">{e.id}</Button>
                                                        </Link></th>
                                                    <td>{e.name}</td>
                                                    <td>{e.email}</td>
                                                    <td>
                                                        <Link to={`/usuarios/detalle/${e.id}`}>
                                                            <Button color="primary" size="sm" outline>
                                                                <FontAwesomeIcon icon="eye" />
                                                            </Button>
                                                        </Link>{' '}
                                                        <Button
                                                            onClick={this.handlerOnDelete(e.id)}
                                                            color="danger"
                                                            size="sm"
                                                            outline 
                                                        >
                                                            <FontAwesomeIcon icon="trash" />
                                                        </Button>
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

export default List;
