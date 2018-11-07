import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  FormGroup,
  Form,
  CardHeader,
  BreadcrumbItem,
  Container,
  Breadcrumb,
  Card,
  CardTitle,
  Label,
  Row,
  Col,
  Button
} from "reactstrap";
import Select from 'react-select';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Menu from "../../components/Menu";

import { profileList } from '../../common/utils';
import UserService from '../../http/service/UserService';
import InstalacionService from '../../http/service/InstalacionService';
import EmpresasService from '../../http/service/EmpresaService';
import EmpresaCard from '../../components/EmpresaCard';

class InformeNuevo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      value: "",
      instalaciones: [],
      supervisores: [],
      empresa: {},

      supervisorSeleccionado: null,
      instalacionSeleccionada: null,
    };

    this.nextItemId = 0;
    this.handleChange = this.handleChange.bind(this);

  }
  handleChange(event) {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    EmpresasService.findById(id).then(empresa => {
      UserService.findAllByProfileId(profileList.SUPERVISOR_ID).then(supervisores => {
        InstalacionService.findAllByEmpresaId(empresa.id).then(instalaciones => {

          this.setState({
            empresa,
            supervisores: supervisores.map(e => ({ value: e.id, label: e.name })),
            instalaciones: instalaciones.map(e => ({ value: e.id, label: e.nombre })),
          })
        });
      }

      );
    });
  }

  render() {
    const { supervisores, instalaciones, instalacionSeleccionada, empresa, supervisorSeleccionado } = this.state;
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
                  <Link to={`/home/empresas/${empresa.id}/tecnico`}>Informes</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>Nuevo Informe</BreadcrumbItem>
              </Breadcrumb>
              <EmpresaCard empresa={empresa} />
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Nuevo Informe | Instalación</CardTitle>
                  <Form>
                    <Row form>
                      <Col md={3}>
                        <FormGroup>
                          <Label for="exampleSelect">Empresa</Label>
                          <div className="display-data">Nombre empresa</div>
                        </FormGroup>
                      </Col>
                      <Col md={3}>
                        <FormGroup>
                          <Label for="exampleSelect">Instalacion</Label>
                          <Select
                            value={instalacionSeleccionada}
                            onChange={(value) => this.handleChange({ target: { value, name: 'instalacionSeleccionada' } })}
                            options={instalaciones}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={3}>
                        <FormGroup>
                          <Label for="exampleSelect">Supervisor</Label>
                          <Select
                            value={supervisorSeleccionado}
                            onChange={(value) => this.handleChange({ target: { value, name: 'supervisorSeleccionado' } })}
                            options={supervisores}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <Button color="primary" className="button-form" block>
                          <FontAwesomeIcon icon="plus" /> Crear
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardHeader>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default InformeNuevo;
