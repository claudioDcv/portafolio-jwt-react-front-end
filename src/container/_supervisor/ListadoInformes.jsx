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
  ButtonGroup,
  Card,
  Button,
  CardTitle,
  Row,
  Col
} from "reactstrap";

import Menu from "../../components/Menu";

import { profileList } from '../../common/utils';
import UserService from '../../http/service/UserService';
import EmpresasService from '../../http/service/EmpresaService';
import InformeService from '../../http/service/InformeService';

import EmpresaCard from '../../components/EmpresaCard';

import ModalAsignarPrevencionistaInformeDetalle from '../../components/ModalAsignarPrevencionistaInformeDetalle';

class List extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      estado: 0,
      informes: [],
      empresa: {},
      tipoInforme: 'trabajador',
      prevencionistas: [],
    };
    this.callInformes = this.callInformes.bind(this);
    this.handlerAsignarPrevencionistaAInforme = this.handlerAsignarPrevencionistaAInforme.bind(this);
  }

  componentDidMount() {
    this.regargarVista();
  }

  regargarVista() {
    const { estado, tipoInforme } = this.state;
    const { id } = this.props.match.params;
    EmpresasService.findById(id).then(empresa => {
      UserService.findAllByProfileId(profileList.PREVENCIONISTA_ID).then(prevencionistas => {
        if (tipoInforme === 'trabajador') {
          InformeService.informesTrabajadorBySupervisor(empresa.id, estado).then(informes => {
            this.setState({
              empresa,
              informes,
              prevencionistas: prevencionistas.map(e => ({ value: e.id, label: `${e.name}` })),
            });
          })
        } else {
          InformeService.informesInstalacionBySupervisor(empresa.id, estado).then(informes => {
            this.setState({
              empresa,
              informes,
              estado,
              tipoInforme,
              prevencionistas: prevencionistas.map(e => ({ value: e.id, label: `${e.name}` })),
            });
          })
        }
      });
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
      InformeService.informesTrabajadorBySupervisor(empresa.id, estado).then(informes => {
        this.setState({
          empresa,
          informes,
          estado,
          tipoInforme,
        });
      })
    } else {
      InformeService.informesInstalacionBySupervisor(empresa.id, estado).then(informes => {
        this.setState({
          empresa,
          informes,
          estado,
          tipoInforme,
        });
      })
    }

  }

  handlerAsignarPrevencionistaAInforme(data) {
    // /asignar-prevencionista/{idDetalle}/{idPrevencionista} asignarPrevencionista
    InformeService.asignarPrevencionista(data).then(() => {
      this.regargarVista();
    })
  };

  render() {
    const { informes, empresa, estado, tipoInforme, prevencionistas } = this.state;
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
                </CardHeader>
                <CardBody>
                  <ButtonGroup className="botones-seleccion-de-listado-informes">
                    <Button
                      color={estado === 0 && tipoInforme === 'trabajador' ? 'success' : 'secondary'}
                      disabled={(estado === 0 && tipoInforme === 'trabajador')}
                      className="mr-1"
                      onClick={() => this.callInformes(0, 'trabajador')}
                    >Trabajadores Pendientes</Button>
                    <Button
                      color={estado === 0 && tipoInforme === 'instalacion' ? 'success' : 'secondary'}
                      disabled={(estado === 0 && tipoInforme === 'instalacion')}
                      className="mr-1"
                      onClick={() => this.callInformes(0, 'instalacion')}
                    >Instalaciones Pendientes</Button>
                  </ButtonGroup>
                  <Table className="mt-4">
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Prevencionista</th>
                      </tr>
                    </thead>
                    <tbody>
                      {informes.map(e => (
                        <tr key={e.id}>
                          <td>{e.id}</td>
                          <td>{e.nombre}</td>
                          <td>{e.prevencionista ? (
                            <Badge color="success">Prevencionista Asignado</Badge>
                          ) : (
                              <ModalAsignarPrevencionistaInformeDetalle
                                buttonLabel="Asignar"
                                prevencionistas={prevencionistas}
                                informe={e}
                                onAsignar={this.handlerAsignarPrevencionistaAInforme}
                              />
                            )}</td>
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
