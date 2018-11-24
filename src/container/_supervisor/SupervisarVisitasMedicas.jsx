import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {
    Row, Col, Breadcrumb, BreadcrumbItem,
    Container,
    CardBody,
    CardHeader,
    Card,
    CardTitle,
    Button,
} from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-table/react-table.css";

import { fechaFormateada } from '../../common/utils';

import Menu from '../../components/Menu';

import Loading from '../../components/Loading';

import EmpresasService from '../../http/service/EmpresaService';
import VisitaMedicaService from '../../http/service/VisitaMedicaService';

import EmpresaCard from '../../components/EmpresaCard';
import TablaVisitasMedicasSupervisor from '../../components/TablaVisitasMedicasSupervisor';

class MisVisitasMedicas extends Component {

    constructor(props) {
        super(props);
        this.state = {
            empresa: {},
            visitasMedicas: [],
            activeTab: '0'
        };
        this.handlerConfirm = this.handlerConfirm.bind(this);
        this.handlerRefuse = this.handlerRefuse.bind(this);
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        EmpresasService.findById(id).then(empresa => {
            VisitaMedicaService.misVisitasMedicasSupervisor(empresa.id).then(visitasMedicas => {
                this.setState({
                    empresa,
                    visitasMedicas: visitasMedicas.map(e => ({
                        ...e,
                        fechaRealizacionFormateada: fechaFormateada(new Date(e.fechaRealizacion)),
                    })),
                });
            });

        });
    }

    handlerConfirm(id) {
        alert(id);
    }

    handlerRefuse(id) {
        alert(id);
    }

    render() {
        const { empresa, visitasMedicas } = this.state;
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
                                <BreadcrumbItem active>Visitas Medicas</BreadcrumbItem>
                            </Breadcrumb>
                            <EmpresaCard empresa={empresa} link={`/home/empresas/${empresa.id}`} />
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Card className="mt-4">
                        <CardHeader>
                            <CardTitle>Visitas Medicas</CardTitle>
                            <Row>
                                <Col>
                                    <Link to={`/home/empresas/${empresa.id}/supervisor/visitas-medicas/nueva-visita`} className="mr-2">
                                        <Button color="primary">
                                            <FontAwesomeIcon icon="plus" /> Crear Visita
                        </Button>
                                    </Link>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col md="12">
                                    <div>
                                        <TablaVisitasMedicasSupervisor visitasMedicas={visitasMedicas} />
                                    </div></Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        ) : (<Loading />);
    }
}

export default MisVisitasMedicas;
