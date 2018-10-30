import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {
    Row, Col,
    Breadcrumb, BreadcrumbItem, Container,
    Card, CardBody, CardHeader,
} from 'reactstrap';
import Menu from '../../components/Menu';
import CapacitacionService from '../../http/service/CapacitacionService';

import EmpresaCard from '../../components/EmpresaCard';

class DetalleCapacitacion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            empresa: {},
            capacitacion: {},
        };
    }

    componentDidMount() {
        const { idCapacitacion } = this.props.match.params;
        CapacitacionService.findById(idCapacitacion).then(capacitacion => {
            this.setState({
                empresa: capacitacion.empresa,
                capacitacion,
            });
        });
    }

    render() {
        const { empresa, capacitacion } = this.state;
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
                        <Col md="12 mt-4 mb-4">
                            <Card>
                                <CardHeader>{capacitacion.nombre}</CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col>
                                            <div dangerouslySetInnerHTML={{__html:capacitacion.descripcion}} />
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default DetalleCapacitacion;