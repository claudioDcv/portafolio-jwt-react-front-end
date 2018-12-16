import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  CardBody,
  CardHeader,
  BreadcrumbItem,
  Container,
  Breadcrumb,
  Badge,
  Card,
  Button,
  CardTitle,
  Row,
  Col
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Menu from "../../components/Menu";

import EmpresasService from '../../http/service/EmpresaService';
import InformeService from '../../http/service/InformeService';

import EmpresaCard from '../../components/EmpresaCard';

class List extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      estado: 0,
      informes: [],
      empresa: {},
      tipoInforme: 'trabajador',
    };
    this.callInformes = this.callInformes.bind(this);
  }

  componentDidMount() {
    const { estado, tipoInforme } = this.state;
    const { id } = this.props.match.params;
    EmpresasService.findById(id).then(empresa => {
      if (tipoInforme === 'trabajador') {
        InformeService.informesTrabajadorByEstado(empresa.id, estado).then(informes => {
          this.setState({
            empresa,
            informes,
          });
        })
      } else {
        //InformeService.informesTrabajadorByEstado(empresa.id, estado).then(informes => {
        this.setState({
          empresa,
          informes: [],
        });
        //})
      }

    });
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  callInformes(estado, tipoInforme) {
    const { empresa } = this.state;
    if (tipoInforme === 'trabajador') {
      InformeService.informesTrabajadorByEstado(empresa.id, estado).then(informes => {
        this.setState({
          empresa,
          informes,
          estado,
          tipoInforme,
        });
      })
    } else {
      InformeService.informesInstalacionByEstado(empresa.id, estado).then(informes => {
        this.setState({
          empresa,
          informes,
          estado,
          tipoInforme,
        });
      })
    }

  }

  render() {
    const { informes, empresa, estado, tipoInforme } = this.state;
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
                <BreadcrumbItem active>Informes</BreadcrumbItem>
              </Breadcrumb>
              <EmpresaCard empresa={empresa} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Informe</CardTitle>
                  <Row>
                    <Col>
                      <Link to={`/home/empresas/${empresa.id}/tecnico/informe-persona`} className="mr-2">
                        <Button color="primary">
                          <FontAwesomeIcon icon="plus" /> Informe Personas
                        </Button>
                      </Link>
                      <Link to={`/home/empresas/${empresa.id}/tecnico/informe-instalacion`} id="TooltipInstall">
                        <Button color="primary">
                          <FontAwesomeIcon icon="plus" /> Informe instalación
                        </Button>
                      </Link>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col md="12" className="botones-seleccion-de-listado-informes">
                      <Button
                        className="mr-1"
                        color={estado === 0 && tipoInforme === 'trabajador' ? 'info' : 'default'}
                        disabled={(estado === 0 && tipoInforme === 'trabajador')}
                        onClick={() => this.callInformes(0, 'trabajador')}
                      >Trabajadores Pendientes</Button>
                      <Button
                        className="mr-1"
                        color={estado === 1 && tipoInforme === 'trabajador' ? 'success' : 'default'}
                        disabled={(estado === 1 && tipoInforme === 'trabajador')}
                        onClick={() => this.callInformes(1, 'trabajador')}
                      >Trabajadores Aprobados</Button>
                      <Button
                        color={estado === -1 && tipoInforme === 'trabajador' ? 'danger' : 'default'}
                        disabled={(estado === -1 && tipoInforme === 'trabajador')}
                        onClick={() => this.callInformes(-1, 'trabajador')}
                      >Trabajadores Rechazados</Button>
                    </Col>
                    <Col className="mt-2 botones-seleccion-de-listado-informes" md="12">
                      <Button
                        className="mr-1"
                        color={estado === 0 && tipoInforme === 'instalacion' ? 'info' : 'default'}
                        disabled={(estado === 0 && tipoInforme === 'instalacion')}
                        onClick={() => this.callInformes(0, 'instalacion')}
                      >Instalaciones Pendientes</Button>
                      <Button
                        className="mr-1"
                        color={estado === 1 && tipoInforme === 'instalacion' ? 'success' : 'default'}
                        disabled={(estado === 1 && tipoInforme === 'instalacion')}
                        onClick={() => this.callInformes(1, 'instalacion')}
                      >Instalaciones Aprobadas</Button>
                      <Button
                        color={estado === -1 && tipoInforme === 'instalacion' ? 'danger' : 'default'}
                        disabled={(estado === -1 && tipoInforme === 'instalacion')}
                        onClick={() => this.callInformes(-1, 'instalacion')}
                      >Instalaciones Rechazadas</Button>
                    </Col>
                  </Row>
                  <Table className="mt-4">
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Solicitud de Revisión</th>
                        <th>Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {informes.map(e => (
                        <tr key={e.id}>
                          <td>{e.id}</td>
                          <td>{e.nombre}</td>
                          <td>{e.solicitarRevision && (<Badge color="success">Solicitud Enviada</Badge>)}</td>
                          <td><Link to={`/home/empresas/${empresa.id}/tecnico/${tipoInforme === 'trabajador' ? 'informe-persona' : 'informe-instalacion'}/${e.id}`}>Ver</Link></td>
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
