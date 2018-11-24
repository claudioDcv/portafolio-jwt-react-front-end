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
import VisitaMedicaService from '../../http/service/VisitaMedicaService';
import EmpresaService from '../../http/service/EmpresaService';
import EmpresasService from '../../http/service/EmpresaService';
import InformeService from '../../http/service/InformeService';
import CapacitacionService from '../../http/service/CapacitacionService';
import EmpresaCard from '../../components/EmpresaCard';

/*
query.setParameter("p_medico_fk", visitaMedicaRequestDto.getMedicoId());
query.setParameter("p_supervisor_fk", visitaMedicaRequestDto.getSupervisorId());
query.setParameter("p_empresa_fk", visitaMedicaRequestDto.getEmpresaId());
query.setParameter("p_fecha_realizacion", visitaMedicaRequestDto.getFechaRealizacion());
*/
class CharlaNuevo extends Component {
  constructor(props) {
    super(props);
    this.state = {

      empresa: {},
      medicos: [],

      fechaRealizacion: moment(),
      medicoSeleccionado: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handlerSave = this.handlerSave.bind(this);
  }

  handleChange(event) {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }

  recargarVista() {
    const { id } = this.props.match.params;
    EmpresasService.findById(id).then(empresa => {
      UserService.findAllByProfileId(profileList.MEDICO_ID).then(medicos => {
        this.setState({
          empresa,
          medicos: medicos.map(e => ({ value: e.id, label: e.name })),
        });
      });
    });
  }

  componentDidMount() {
    this.recargarVista();
  }

  disabled() {

  }

  handlerSave() {
    const push = this.props.history.push;
    const user = getUser();
    const { empresa, medicoSeleccionado, fechaRealizacion } = this.state;
    const data = {
      supervisorId: user.id,
      medicoId: medicoSeleccionado.value,
      empresaId: empresa.id,
      fechaRealizacion: fechaRealizacion.toJSON(),
    };
    VisitaMedicaService.crearVisitaMedica(data).then(() => {
      alert('Creación correcta');
      push(`/home/empresas/${empresa.id}/supervisor/visitas-medicas`);
    });
  }

  render() {
    const { empresa, medicoSeleccionado, medicos, fechaRealizacion } = this.state;
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
                  <Link to={`/home/empresas/${empresa.id}/supervisor/visitas-medicas`}>Visitas Medicas</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>Nueva Visita Medica</BreadcrumbItem>
              </Breadcrumb>
              <EmpresaCard empresa={empresa} />
              <Card className="mt-4">
                <CardBody>
                  <Row>
                    <Col md={4}>
                      <FormGroup>
                        <Label>Medico</Label>
                        <Select
                          value={medicoSeleccionado}
                          onChange={(value) => this.handleChange({ target: { value, name: 'medicoSeleccionado' } })}
                          options={medicos}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label>Fecha Realización</Label>
                        <DatePicker
                          selected={fechaRealizacion}
                          onChange={(value) => this.handleChange({ target: { value, name: 'fechaRealizacion' } })}
                          locale="es"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <Button onClick={this.handlerSave} color="info" className="button-form" block disabled={this.disabled()}>
                        Crear
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default CharlaNuevo;
