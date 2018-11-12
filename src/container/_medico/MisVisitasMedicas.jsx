import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {
    Row, Col, Breadcrumb, BreadcrumbItem, Card, CardBody,
    Container, TabContent, TabPane, Nav, NavItem, NavLink,
} from 'reactstrap';

import "react-table/react-table.css";

import Menu from '../../components/Menu';

import Loading from '../../components/Loading';

import EmpresasService from '../../http/service/EmpresaService';
import VisitaMedicaService from '../../http/service/VisitaMedicaService';

import EmpresaCard from '../../components/EmpresaCard';
import TablaVisitasMedicas from '../../components/TablaVisitasMedicas';

class MisVisitasMedicas extends Component {

    constructor(props) {
        super(props);
        this.state = {
            empresa: {},
            visitasMedicas: [],
            activeTab: '0'
        };
        this.toggle = this.toggle.bind(this);
        this.handlerConfirm = this.handlerConfirm.bind(this);
        this.handlerRefuse = this.handlerRefuse.bind(this);
        this.handlerShow = this.handlerShow.bind(this);
    }

    componentDidMount() {
        const { activeTab } = this.state;
        const { id } = this.props.match.params;
        EmpresasService.findById(id).then(empresa => {
            VisitaMedicaService.findByEmpresaIdConfirmacion(empresa.id, parseInt(activeTab, 10)).then(visitasMedicas => {
                this.setState({
                    empresa,
                    visitasMedicas,
                });
            });

        });
    }
    toggle(tab) {
        const { activeTab, empresa } = this.state;
        if (activeTab !== tab) {
            VisitaMedicaService.findByEmpresaIdConfirmacion(empresa.id, parseInt(tab, 10)).then(visitasMedicas => {
                this.setState({ visitasMedicas, activeTab: tab })
            });
        }
    }

    handlerConfirm(id) {
        const { empresa } = this.state;
        VisitaMedicaService.aceptarVisitaMedica(id).then(e => {
            VisitaMedicaService.findByEmpresaIdConfirmacion(empresa.id, 1).then(visitasMedicas => {
                this.setState({ visitasMedicas: visitasMedicas.map(v => ({
                    ...v,
                    activo: v.id === e,
                })), activeTab: "1" })
            });
        });
    }

    handlerRefuse(id) {
        const { empresa } = this.state;
        VisitaMedicaService.rechazarVisitaMedica(id).then(e => {
            VisitaMedicaService.findByEmpresaIdConfirmacion(empresa.id, -1).then(visitasMedicas => {
                this.setState({ visitasMedicas: visitasMedicas.map(v => ({
                    ...v,
                    activo: v.id === e,
                })), activeTab: "-1" })
            });
        });
    }

    handlerShow(id) {
        const { empresa } = this.state;
        this.props.history.push(`/home/empresas/${empresa.id}/medico/${id}`);
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
                        <CardBody>
                            <Row>
                                <Col md="12">
                                    <div>
                                        <Nav tabs>
                                            <NavItem>
                                                <NavLink className={[
                                                    this.state.activeTab === '0' ? 'active' : '',
                                                    'text-primary',
                                                ].join(' ')} onClick={() => { this.toggle('0'); }}>
                                                    Asignadas
                                        </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink className={[
                                                    this.state.activeTab === '1' ? 'active' : '',
                                                    'text-success',
                                                ].join(' ')} onClick={() => { this.toggle('1'); }}>
                                                    Aceptadas
                                        </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink className={[
                                                    this.state.activeTab === '-1' ? 'active' : '',
                                                    'text-danger',
                                                ].join(' ')} onClick={() => { this.toggle('-1'); }}>
                                                    Rechazadas
                                        </NavLink>
                                            </NavItem>
                                        </Nav>
                                        <TabContent activeTab={this.state.activeTab}>
                                            <TabPane tabId="0">
                                                <Row>
                                                    <Col sm="12">
                                                        <TablaVisitasMedicas
                                                            visitasMedicas={visitasMedicas}
                                                            onConfirm={this.handlerConfirm}
                                                            onRefuse={this.handlerRefuse}
                                                        />
                                                    </Col>
                                                </Row>
                                            </TabPane>
                                            <TabPane tabId="1">
                                                <Row>
                                                    <Col sm="12">
                                                        <TablaVisitasMedicas
                                                            visitasMedicas={visitasMedicas}
                                                            onShow={this.handlerShow}
                                                        />
                                                    </Col>
                                                </Row>
                                            </TabPane>
                                            <TabPane tabId="-1">
                                                <Row>
                                                    <Col sm="12">
                                                        <TablaVisitasMedicas visitasMedicas={visitasMedicas} />
                                                    </Col>
                                                </Row>
                                            </TabPane>
                                        </TabContent>
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
