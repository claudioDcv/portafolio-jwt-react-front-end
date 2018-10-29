import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button, ButtonGroup, Row, Col, Breadcrumb, BreadcrumbItem,
    Container, TabContent, TabPane, Nav, NavItem, NavLink,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
                            <div>
                                <Nav tabs>
                                    <NavItem>
                                        <NavLink className={[
                                                this.state.activeTab === '0' ? 'active' : '',
                                                'text-primary',
                                        ]} onClick={() => { this.toggle('0'); }}>
                                            Asignadas
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className={[
                                            this.state.activeTab === '1' ? 'active' : '',
                                            'text-success',
                                        ]} onClick={() => { this.toggle('1'); }}>
                                            Aceptadas
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className={[
                                            this.state.activeTab === '-1' ? 'active' : '',
                                            'text-danger',
                                        ]} onClick={() => { this.toggle('-1'); }}>
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
                                                <TablaVisitasMedicas visitasMedicas={visitasMedicas} />
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
                </Container>
            </div>
        ) : (<Loading />);
    }
}

export default MisVisitasMedicas;
