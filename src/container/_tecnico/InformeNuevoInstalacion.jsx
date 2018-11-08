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
  Button,
  Input
} from "reactstrap";
import Select from 'react-select';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Menu from "../../components/Menu";
import DatePicker from 'react-datepicker';
import moment from "moment";

import { profileList, getUser } from '../../common/utils';
import UserService from '../../http/service/UserService';
import InstalacionService from '../../http/service/InstalacionService';
import EmpresasService from '../../http/service/EmpresaService';
import InformeService from '../../http/service/InformeService';
import EmpresaCard from '../../components/EmpresaCard';

class InformeNuevo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      value: "",

      nombre: '',

      informe: null,
      instalaciones: [],
      supervisores: [],
      empresa: {},

      supervisorSeleccionado: null,
      instalacionSeleccionado: null,

      fechaRealizacion: moment(),

    };

    this.nextItemId = 0;
    this.handleChange = this.handleChange.bind(this);
    this.handlerSubmit = this.handlerSubmit.bind(this);

  }
  handleChange(event) {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }

  componentDidMount() {
    const { id, informeId } = this.props.match.params;

    EmpresasService.findById(id).then(empresa => {
      UserService.findAllByProfileId(profileList.SUPERVISOR_ID).then(supervisores => {
        InstalacionService.findAllByEmpresaId(empresa.id).then(instalaciones => {

          if(informeId) {
            InformeService.informeInstalacionByID(informeId).then(informe => {
              console.log(informe);
            });
          } 
          this.setState({
            empresa,
            supervisores: supervisores.map(e => ({ value: e.id, label: e.name })),
            instalaciones: instalaciones.map(e => ({ value: e.id, label: `${e.nombre}` })),
          })
        });
      }

      );
    });
  }

  handlerSubmit(event) {
    event.preventDefault();
    const { fechaRealizacion, supervisorSeleccionado, instalacionSeleccionado, nombre } = this.state;
    const informePersona = {
      id: null,
      prevencionista: null,
      instalacion: instalacionSeleccionado.value,
      supervisor: supervisorSeleccionado.value,
      tecnico: getUser().id,
      nombre,
      fechaRealizacion: fechaRealizacion.toJSON(),
      fechaConfirmacion: null,
      confirmacionPrevencionista: 0,
    };
    InformeService.informeInstalacionSave(informePersona).then((data) => {
      console.log(data);
    }).catch(e => console.log(e));
  }

  disabled() {
    const { nombre, instalacionSeleccionado, supervisorSeleccionado } = this.state;
    if (
      nombre === '' ||
      instalacionSeleccionado === null ||
      supervisorSeleccionado === null) return true;
    return false;
  }

  render() {
    const { nombre, supervisores, instalaciones, instalacionSeleccionado, empresa, supervisorSeleccionado, fechaRealizacion } = this.state;
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
                  <Form onSubmit={this.handlerSubmit}>
                    <Row form>
                    <Col md={12}>
                        <FormGroup>
                          <Label for="exampleSelect">Titulo</Label>
                          <Input placeholder="Ingrese titulo de informe" name="nombre" value={nombre} onChange={this.handleChange} />
                        </FormGroup>
                      </Col>
                      <Col md={3}>
                        <FormGroup>
                          <Label for="exampleSelect">Instalaciones</Label>
                          <Select
                            value={instalacionSeleccionado}
                            onChange={(value) => this.handleChange({ target: { value, name: 'instalacionSeleccionado' } })}
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

                      <Col md={3}>
                        <FormGroup>
                          <Label for="exampleSelect">Fecha Realización</Label>
                          <DatePicker
                            selected={fechaRealizacion}
                            onChange={(value) => this.handleChange({ target: { value, name: 'fechaRealizacion' } })}
                            locale="es"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <Button color="primary" className="button-form" block disabled={this.disabled()}>
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
