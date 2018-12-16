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
import TrabajadorService from '../../http/service/TrabajadorService';
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
      trabajadores: [],
      supervisores: [],
      empresa: {},

      supervisorSeleccionado: null,
      instalacionSeleccionado: null,
      trabajadorSeleccionado: null,

      fechaRealizacion: moment(),

      observaciones: [],

      detalle: null,

      informeId: 0,

      solicitarRevision: false,

      tipo: 'informe-default',

      informeData: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handlerSubmit = this.handlerSubmit.bind(this);
    this.handlerSave = this.handlerSave.bind(this);
    this.handlerSolicitarRevision = this.handlerSolicitarRevision.bind(this);

  }

  handleChange(event) {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }

  componentDidMount() {
    const { id, informeId } = this.props.match.params;
    let tipo = this.props.match.path.split('/').reverse()[1];
    if (tipo === 'tecnico') {
      tipo = this.props.match.path.split('/').reverse()[0];
    }
    EmpresasService.findById(id).then(empresa => {

      UserService.findAllByProfileId(profileList.SUPERVISOR_ID).then(supervisores => {

        this.setState({
          tipo,
          empresa,
          supervisores: supervisores.map(e => ({ value: e.id, label: e.name })),
        }, () => {
          // TODO LO DEMAS
          if (tipo === 'informe-instalacion') {
            InstalacionService.findAllByEmpresaId(empresa.id).then(instalaciones => {

              this.setState({
                instalaciones: instalaciones.map(e => ({ value: e.id, label: `${e.nombre}` })),
              }, () => {
                if (informeId) {
                  InformeService.informeInstalacionByID(informeId).then(informe => {
                    InformeService.observacionByInformeId(informe.detalle).then(observaciones => {
                      this.setState({
                        informeData: informe,
                        detalle: informe.detalle,
                        observaciones,
                        informeId,
                        id: informe.id,
                        solicitarRevision: informe.solicitarRevision,
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
          } else {
            TrabajadorService.findAllByEmpresaId(empresa.id).then(trabajadores => {
              this.setState({
                trabajadores: trabajadores.map(e => ({ value: e.id, label: `${e.nombre}` })),
              }, () => {
                if (informeId) {
                  InformeService.informeTrabajadorByID(informeId).then(informe => {
                    InformeService.observacionByInformeId(informe.detalle).then(observaciones => {
                      this.setState({
                        detalle: informe.detalle,
                        informeData: informe,
                        observaciones,
                        informeId,
                        id: informe.id,
                        solicitarRevision: informe.solicitarRevision,
                        nombre: informe.nombre,
                        supervisorSeleccionado: { value: informe.supervisor.id, label: informe.supervisor.name },
                        trabajadorSeleccionado: { value: informe.trabajador.id, label: informe.trabajador.nombre },
                        fechaRealizacion: moment(informe.fechaRealizacion),
                      });
                    });
                  }).catch(e => this.props.history.push(`/home/empresas/${empresa.id}/tecnico/informe-persona`));

                }
              })
            });


          }
          // FIN A TODO LO DEMAS
        });
      }

      );
    });
  }

  handlerSubmit(event) {
    event.preventDefault();
    const {
      tipo,
      fechaRealizacion,
      supervisorSeleccionado,
      instalacionSeleccionado,
      trabajadorSeleccionado,
      nombre,
      empresa,
    } = this.state;
    if (tipo === 'informe-instalacion') {
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
    } else {
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
        this.props.history.push(`/home/empresas/${empresa.id}/tecnico/informe-persona/${data}`);
      }).catch(e => console.log(e));
    }
  }

  disabled() {
    const { informeData, solicitarRevision, nombre, instalacionSeleccionado, supervisorSeleccionado, tipo, trabajadorSeleccionado } = this.state;
    if (
      (informeData && informeData.confirmacionPrevencionista === 1) ||
      solicitarRevision ||
      nombre === '' ||
      (
        (tipo === 'informe-instalacion' && instalacionSeleccionado === null) ||
        (tipo === 'informe-trabajador' && trabajadorSeleccionado === null)
      ) ||
      supervisorSeleccionado === null) return true;
    return false;
  }

  handlerSave(nombre) {
    const { detalle } = this.state;
    InformeService.insertObservacion({
      nombre,
      informeId: detalle,
    }).then(() => {
      InformeService.observacionByInformeId(detalle).then(observaciones => {
        this.setState({
          observaciones,
        });
      });
    });
  }

  handlerSolicitarRevision() {
    const { detalle } = this.state;
    InformeService.solicitudRevisionInforme(detalle).then(solicitarRevision => this.setState({ solicitarRevision }));
  }

  render() {
    const { tipo, trabajadorSeleccionado, trabajadores, observaciones, nombre, supervisores, instalaciones, instalacionSeleccionado, empresa, supervisorSeleccionado, fechaRealizacion, id } = this.state;
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
                        {
                          tipo === 'informe-instalacion' ? (<FormGroup>
                            <Label for="exampleSelect">Instalaciones</Label>
                            <Select
                              value={instalacionSeleccionado}
                              onChange={(value) => this.handleChange({ target: { value, name: 'instalacionSeleccionado' } })}
                              options={instalaciones}
                            />
                          </FormGroup>) : (
                              <FormGroup>
                                <Label for="exampleSelect">Trabajador</Label>
                                <Select
                                  value={trabajadorSeleccionado}
                                  onChange={(value) => this.handleChange({ target: { value, name: 'trabajadorSeleccionado' } })}
                                  options={trabajadores}
                                />
                              </FormGroup>
                            )
                        }
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
                        {!id && (<Button color="primary" className="button-form" block disabled={this.disabled()}>
                          <FontAwesomeIcon icon="plus" /> {id ? 'Guardar' : 'Crear'}
                        </Button>)}{' '}
                        {id && (
                          <Button onClick={this.handlerSolicitarRevision} color="info" className="button-form" block disabled={this.disabled()}>
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
