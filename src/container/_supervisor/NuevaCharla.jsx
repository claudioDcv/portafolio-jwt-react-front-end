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
import EmpresaService from '../../http/service/EmpresaService';
import EmpresasService from '../../http/service/EmpresaService';
import InformeService from '../../http/service/InformeService';
import CapacitacionService from '../../http/service/CapacitacionService';
import EmpresaCard from '../../components/EmpresaCard';


class CharlaNuevo extends Component {
  constructor(props) {
    super(props);

    this.state = {

      id: null,
      nombre: '',

      informe: null,
      instalaciones: [],
      trabajadores: [],
      supervisores: [],
      empresa: [],

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

      UserService.findAllByProfileId(profileList.EXAMINADOR_ID).then(supervisores => {

        this.setState({
          tipo,
          empresa,
          supervisores: supervisores.map(e => ({ value: e.id, label: e.name })),
        }, () => {
            EmpresaService.findAll().then(trabajadores => {
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
        });
      }

      );
    });
  }

  handlerSubmit(event) {
    event.preventDefault();
    const {
      descripcion,
      fechaRealizacion,
      supervisorSeleccionado,
      trabajadorSeleccionado,
      asistentesMinimos,
      nombre,
      empresa,
    } = this.state;
   
      const informePersona = {
        id: null,
        asistentesMinimos,
        nombre,
        descripcion,
        examinador: supervisorSeleccionado.value,
        fechaRealizacion: fechaRealizacion.toJSON(),
        empresa: trabajadorSeleccionado.value,
      };
      CapacitacionService.nuevacharlaSave(informePersona).then((data) => {
        this.props.history.push(`/home/empresas/${empresa.id}/supervisor/capacitacion/${data}`);
      }).catch(e => console.log(e));
    
  }

  disabled() {
    const { solicitarRevision, nombre, instalacionSeleccionado, supervisorSeleccionado, tipo, trabajadorSeleccionado } = this.state;
    if (
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

  handlerSolicitarRevision() {
    const { detalle } = this.state;
    InformeService.solicitudRevisionInforme(detalle).then(solicitarRevision => this.setState({ solicitarRevision }));
  }

  render() {
    const { asistentesMinimos, tipo, trabajadorSeleccionado, trabajadores, description, nombre, supervisores, instalaciones, instalacionSeleccionado, empresa, supervisorSeleccionado, fechaRealizacion, id } = this.state;
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
                 <Link to={`/home/empresas/${empresa.id}/supervisor/capacitacion`}>Capacitaciones</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>Nueva-charla</BreadcrumbItem>
             </Breadcrumb>
              <EmpresaCard empresa={empresa} />
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Nueva | Charla {id}</CardTitle>
                  <Form onSubmit={this.handlerSubmit}>
                    <Row>
                      <Col md={3}>
                        <FormGroup>
                          <Label for="exampleSelect">asistentesMinimos</Label>
                          <Input type="number" placeholder="Ingrese titulo de informe" name="asistentesMinimos" value={asistentesMinimos} onChange={this.handleChange} />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="exampleSelect">nombre</Label>
                          <Input maxLength={100} placeholder="Ingrese titulo de informe" name="nombre" value={nombre} onChange={this.handleChange} />
                        </FormGroup>
                      </Col>
                      <Col md={12}>
                        <FormGroup>
                          <Label for="exampleSelect">descripcion</Label>
                          <Input maxLength={2000} placeholder="Ingrese titulo de informe" type="textarea" name="descripcion" value={description} onChange={this.handleChange} />
                        </FormGroup>
                      </Col>
                      <Col md={3}>
                        {
                          tipo === 'informe-instalacion' ? (<FormGroup>
                            <Label for="exampleSelect">Empresas</Label>
                            <Select
                              value={instalacionSeleccionado}
                              onChange={(value) => this.handleChange({ target: { value, name: 'instalacionSeleccionado' } })}
                              options={instalaciones}
                            />
                          </FormGroup>) : (
                              <FormGroup>
                                <Label for="exampleSelect">Empresas</Label>
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
                          <Label for="exampleSelect">Examinador</Label>
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
                        {id && (<Button onClick={this.handlerSolicitarRevision} color="info" className="button-form" block disabled={this.disabled()}>
                          Solicitar Revisión
                        </Button>)}
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

export default CharlaNuevo;
