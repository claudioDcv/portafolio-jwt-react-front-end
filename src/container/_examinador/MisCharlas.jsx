import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button, ButtonGroup, Row, Col,
    Breadcrumb, BreadcrumbItem, Container,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
                                <BreadcrumbItem active>Charlas</BreadcrumbItem>
                            </Breadcrumb>
                            <EmpresaCard empresa={empresa} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12 mt-4 mb-4">
                            <ButtonGroup>
                                <Link to={`/home/empresas/${empresa.id}`}>
                                    <Button><FontAwesomeIcon icon="arrow-left" /> Volver</Button>
                                </Link>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row>
                        <Col md="12">
                            <TablaCapacitaciones capacitaciones={capacitaciones} onEnter={this.handlerEnter} />
                        </Col>
                    </Row>
                </Container>
            </div>
        ) : (<Loading />);
    }
}

export default MisVisitasMedicas;
