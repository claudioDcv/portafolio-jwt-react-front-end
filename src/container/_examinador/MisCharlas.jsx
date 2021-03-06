import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {
    Row, Col,
    Breadcrumb, BreadcrumbItem, Container,
} from 'reactstrap';

import "react-table/react-table.css";

import Menu from '../../components/Menu';

import Loading from '../../components/Loading';

import EmpresasService from '../../http/service/EmpresaService';
import CapacitacionService from '../../http/service/CapacitacionService';

import EmpresaCard from '../../components/EmpresaCard';
import TablaCapacitaciones from '../../components/TablaCapacitaciones';

class MisVisitasMedicas extends Component {

    constructor(props) {
        super(props);
        this.state = {
            empresa: {},
            capacitaciones: [],
        };
        this.handlerEnter = this.handlerEnter.bind(this);
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        EmpresasService.findById(id).then(empresa => {
            CapacitacionService.findByEmpresaId(empresa.id).then(capacitaciones => {
                this.setState({
                    empresa,
                    capacitaciones,
                });
            });

        });
    }

    handlerEnter(id) {
        alert(id);
    }

    render() {
        const { empresa, capacitaciones } = this.state;
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
                                <BreadcrumbItem active>Capacitaciones</BreadcrumbItem>
                            </Breadcrumb>
                            <EmpresaCard empresa={empresa} link={`/home/empresas/${empresa.id}`} />
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row>
                        <Col md="12">
                            <TablaCapacitaciones capacitaciones={capacitaciones} empresaId={empresa.id} />
                        </Col>
                    </Row>
                </Container>
            </div>
        ) : (<Loading />);
    }
}

export default MisVisitasMedicas;
