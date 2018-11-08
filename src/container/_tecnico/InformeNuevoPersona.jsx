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
import TrabajadorService from '../../http/service/TrabajadorService';
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

      trabajadores: [],
      supervisores: [],
      empresa: {},

      supervisorSeleccionado: null,
      trabajadorSeleccionado: null,

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
    const { id } = this.props.match.params;
    EmpresasService.findById(id).then(empresa => {
      UserService.findAllByProfileId(profileList.SUPERVISOR_ID).then(supervisores => {
        TrabajadorService.findAllByEmpresaId(empresa.id).then(trabajadores => {
          this.setState({
            empresa,
            supervisores: supervisores.map(e => ({ value: e.id, label: e.name })),
            trabajadores: trabajadores.map(e => ({ value: e.id, label: `${e.nombre} ${e.apellidoPaterno} ${e.apellidoMaterno}` })),
          })
        });
      }
      );
    });
  }

  handlerSubmit(event) {
    event.preventDefault();
    const { fechaRealizacion, supervisorSeleccionado, trabajadorSeleccionado, nombre } = this.state;
    const informePersona = {
      id: null,
      prevencionista: null,
      trabajador: trabajadorSeleccionado.value,
      supervisor: supervisorSeleccionado.value,
      tecnico: getUser().id,
      nombre,
      fechaRealizacion: fechaRealizacion.toJSON(),
      fechaConfirmacion: null,
      confirmacionPrevencionista: 0,
    };
    InformeService.informeTrabajadorSave(informePersona).then((data) => {
      console.log(data);
    }).catch(e => console.log(e));
  }

  disabled() {
    const { nombre, trabajadorSeleccionado, supervisorSeleccionado } = this.state;
    if (
      nombre === '' ||
      trabajadorSeleccionado === null ||
      supervisorSeleccionado === null) return true;
    return false;
  }

  render() {
    const { nombre, supervisores, trabajadores, trabajadorSeleccionado, empresa, supervisorSeleccionado, fechaRealizacion } = this.state;
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
                          <Label for="exampleSelect">Trabajador</Label>
                          <Select
                            value={trabajadorSeleccionado}
                            onChange={(value) => this.handleChange({ target: { value, name: 'trabajadorSeleccionado' } })}
                            options={trabajadores}
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
