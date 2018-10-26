import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Card, CardBody, Breadcrumb, BreadcrumbItem, Container, Col, Row, CardHeader, CardTitle } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Menu from '../../components/Menu';

import ProfileService from '../../http/service/ProfileService';

class List extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profiles: [],
        };
    }

    componentDidMount() {
        ProfileService.findAll().then(data => this.setState({
            profiles: data,
        }));
    }

    render() {
        const { profiles } = this.state;
        return (
            <div>
                <Menu />
                <Container>
                    <Row>
                        <Col>
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                                <BreadcrumbItem active>Perfiles</BreadcrumbItem>
                            </Breadcrumb>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Listado de Perfiles</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <Table size="sm" striped hover responsive>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Nombre</th>
                                                <th>Llave</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {profiles.map(e => (
                                                <tr key={e.id}>
                                                    <th scope="row">
                                                        {e.id}
                                                    </th>
                                                    <td>{e.displayName}</td>
                                                    <td>{e.naturalKey}</td>
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
