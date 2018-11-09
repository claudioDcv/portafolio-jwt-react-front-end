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
  Input,
  Table,
  CardBody
} from "reactstrap";
import Select from 'react-select';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Menu from "../../components/Menu";
import DatePicker from 'react-datepicker';
import moment from "moment";

import { hasProfile, profileList, getUser } from '../../common/utils';
import UserService from '../../http/service/UserService';
import InstalacionService from '../../http/service/InstalacionService';
import EmpresasService from '../../http/service/EmpresaService';
import InformeService from '../../http/service/InformeService';
import EmpresaCard from '../../components/EmpresaCard';

import ObservacionModal from './ObservacionModal';

class InformeNuevo extends Component {
  constructor(props) {
    super(props);

    this.state = {

      id: null,
      nombre: '',

      informe: null,
      instalaciones: [],
      supervisores: [],
      empresa: {},

      supervisorSeleccionado: null,
      instalacionSeleccionado: null,

      fechaRealizacion: moment(),

      observaciones: [],

      detalle: null,

    };

    this.handleChange = this.handleChange.bind(this);
    this.handlerSubmit = this.handlerSubmit.bind(this);
    this.handlerSave = this.handlerSave.bind(this);

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

          this.setState({
            empresa,
            supervisores: supervisores.map(e => ({ value: e.id, label: e.name })),
            instalaciones: instalaciones.map(e => ({ value: e.id, label: `${e.nombre}` })),
          }, () => {
            if (informeId) {
              InformeService.informeInstalacionByID(informeId).then(informe => {
                InformeService.observacionByInformeId(informe.detalle).then(observaciones => {
                  this.setState({
                    detalle: informe.detalle,
                    observaciones,
                    id: informe.id,
                    nombre: informe.nombre,
                    supervisorSeleccionado: { value: informe.supervisor.id, label: informe.supervisor.name },
                    instalacionSeleccionado: { value: informe.instalacion.id, label: informe.instalacion.nombre },
                    fechaRealizacion: moment(informe.fechaRealizacion),
                  });
                });
              }).catch(e => this.props.history.push(`/home/empresas/${empresa.id}/tecnico/informe-instalacion`));
            }
          })
        });
      }

      );
    });
  }

  handlerSubmit(event) {
    event.preventDefault();
    const { fechaRealizacion, supervisorSeleccionado, instalacionSeleccionado, nombre, empresa } = this.state;
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
      this.props.history.push(`/home/empresas/${empresa.id}/tecnico/informe-instalacion/${data}`);
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

  handlerSave(nombre) {
    const { id, detalle } = this.state;
    InformeService.insertObservacion({
      nombre,
      informeId: detalle,
    }).then(data => {
      InformeService.observacionByInformeId(detalle).then(observaciones => {
        this.setState({
          observaciones,
        });
      });
    });
  }

  render() {
    const { observaciones, nombre, supervisores, instalaciones, instalacionSeleccionado, empresa, supervisorSeleccionado, fechaRealizacion, id } = this.state;
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
                  <CardTitle>Nuevo Informe | Instalación {id}</CardTitle>
                  <Form onSubmit={this.handlerSubmit}>
                    <Row>
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
                          <FontAwesomeIcon icon="plus" /> {id ? 'Guardar' : 'Crear'}
                        </Button>{' '}
                        {id && (<Button color="info" className="button-form" block disabled={this.disabled()}>
                          Solicitar Revisión
                        </Button>)}
                      </Col>
                    </Row>
                  </Form>
                </CardHeader>
              </Card>
            </Col>

            <Col md="12">
              <Card className="mt-4">
                <CardHeader>Observaciones</CardHeader>
                <CardBody>
                  {/*id && (<Button color="primary" className="button-form">
                      <FontAwesomeIcon icon="plus" /> Nueva Observación
                  </Button>)*/}

                  {id && (<ObservacionModal buttonLabel="Nueva Observacion" onSave={this.handlerSave} />)}

                  {observaciones.length > 0 && (<Table className="mt-4">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Descripción</th>
                        <th>Recomendación</th>
                        <th className="text-right">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {observaciones.map(e => (
                        <tr key={e.id}>
                          <td>{e.id}</td>
                          <td>{e.nombre}</td>
                          <td>{e.recomendacion} {hasProfile(
                            [profileList.PREVENCIONISTA]) && (<Button color="info">Editar</Button>
                          )}</td>
                          <td className="text-right"><Button color="danger">Eliminar</Button></td>
                        </tr>
                          ))}
                    </tbody>
                  </Table>)}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
            );
          }
        }
        
        export default InformeNuevo;
