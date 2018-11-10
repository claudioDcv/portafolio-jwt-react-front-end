import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {
    Row,
    Col,
    Breadcrumb,
    BreadcrumbItem, 
    Container,
    Button,
    CardBody,
    CardHeader,
    Card,
    CardTitle,
} from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-table/react-table.css";

import Menu from '../../components/Menu';

import Loading from '../../components/Loading';

import EmpresasService from '../../http/service/EmpresaService';
import CapacitacionService from '../../http/service/CapacitacionServiceSupervisor';

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
                <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Informe</CardTitle>
                  <Row>
                    <Col>
                      <Link to={`/home/empresas/${empresa.id}/tecnico/informe-persona`} className="mr-2">
                        <Button color="primary">
                          <FontAwesomeIcon icon="plus" /> Crear Charlas
                        </Button>
                      </Link>
                      <Link to={`/home/empresas/${empresa.id}/tecnico/informe-instalacion`} id="TooltipInstall">
                        <Button color="primary">
                          <FontAwesomeIcon icon="plus" /> Asignar Charlas
                        </Button>
                      </Link>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col md="12">
                            <TablaCapacitaciones capacitaciones={capacitaciones} empresaId={empresa.id} />
                        </Col>
                    </Row>
                    </CardBody>
              </Card>
                </Container>
            </div>
        ) : (<Loading />);
    }
}

export default MisVisitasMedicas;