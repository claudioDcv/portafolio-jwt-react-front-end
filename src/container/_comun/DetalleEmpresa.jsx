import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button, ButtonGroup, Row, Col, Breadcrumb, BreadcrumbItem, Container } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ReactTable from "react-table";
import "react-table/react-table.css";

import Menu from '../../components/Menu';

import Loading from '../../components/Loading';

import EmpresasService from '../../http/service/EmpresaService';
import TrabajadorService from '../../http/service/TrabajadorService';

import { hasProfile, profileList } from '../../common/utils';
import EmpresaCard from '../../components/EmpresaCard';

class DetalleEmpresa extends Component {

    constructor(props) {
        super(props);
        this.state = {
            empresa: {},
            trabajadores: [],
        };
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        EmpresasService.findById(id).then(data => {
            TrabajadorService.findAllByEmpresaId(data.id).then(trabajadores => {
                this.setState({
                    empresa: data,
                    trabajadores,
                })
            })
        });
    }

    render() {
        const translations = { noDataText: 'No existen resultados', pageText: 'Página', ofText: 'de', rowsText: 'Filas', previousText: 'Anterior', nextText: 'Siguiente', loadingText: 'Cargando...' };
        const { empresa, trabajadores } = this.state;
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
                                <BreadcrumbItem active>{empresa.nombre}</BreadcrumbItem>
                            </Breadcrumb>

                            <EmpresaCard empresa={empresa} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12 mt-4 mb-4">
                            <ButtonGroup>
                                {hasProfile([profileList.TECNICO, profileList.SUPERVISOR, profileList.PREVENCIONISTA]) && (<Link to={`/home/empresas/${empresa.id}/tecnico`}><Button><FontAwesomeIcon icon="file-alt" /> Informes</Button></Link>)}
                                {hasProfile([profileList.SUPERVISOR, profileList.EXAMINADOR]) && (<Link to={`/home/empresas/${empresa.id}/supervisor`}><Button><FontAwesomeIcon icon="graduation-cap" /> Charlas</Button></Link>)}
                                {hasProfile([profileList.EXAMINADOR]) && (<Link to={`/home/empresas/${empresa.id}/examinador`}><Button><FontAwesomeIcon icon="graduation-cap" /> Charlas</Button></Link>)}
                                
                                {hasProfile([profileList.MEDICO, profileList.SUPERVISOR]) && (<Link to={`/home/empresas/${empresa.id}/medico`}><Button><FontAwesomeIcon icon="notes-medical" /> Visitas Medicas</Button></Link>)}
                            </ButtonGroup>
                        </Col>
                        <Col md="12">
                            <h2 className="h2">Trabajadores</h2>
                        </Col>
                        <Col md="12">
                            <ReactTable
                                {...translations}
                                filterable
                                data={trabajadores}
                                columns={[
                                    {
                                        Header: "Nombre",
                                        accessor: "nombre",
                                        filterMethod: (filter, row) => {
                                            return row[filter.id].includes(filter.value);
                                        }
                                    },
                                    {
                                        Header: "Apellido Paterno",
                                        accessor: "apellidoPaterno",
                                        filterMethod: (filter, row) => {
                                            return row[filter.id].includes(filter.value);
                                        }
                                    },
                                    {
                                        Header: "Apellido Materno",
                                        id: "apellidoMaterno",
                                        accessor: d => d.apellidoMaterno,
                                        filterMethod: (filter, row) => {
                                            return row[filter.id].includes(filter.value);
                                        }
                                    },
                                ]}
                                defaultPageSize={10}
                                className="-striped -highlight"
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        ) : (<Loading />);
    }
}

export default DetalleEmpresa;
