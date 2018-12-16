import React, { Component } from 'react';
import moment from 'moment';
import ReactTable from "react-table";
import { Link } from "react-router-dom";
import { Col, Card, Badge, CardBody, FormGroup, Label, Input, Breadcrumb, BreadcrumbItem, Container, Row, CardHeader } from 'reactstrap';

import AdminEmpresaService from '../../http/service/AdminEmpresaService';
import Menu from '../../components/Menu';
import EmpresaCard from '../../components/EmpresaCard';
import EmpresasService from '../../http/service/EmpresaService';

class Capacitaciones extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNumber: 1,
            pageSize: 5,
            date: new Date(),
            data: [],
            totalPage: 0,
            empresa: {},
        };
    }

    componentDidMount() {
        this.getData();
        const { id } = this.props.match.params;
        EmpresasService.findById(id).then(empresa => {
            this.setState({ empresa })
        });
    }

    getData() {
        AdminEmpresaService.capacitacionesPaginado(this.getSendData()).then(data => {
            this.setState({
                data: data.list,
                totalPage: data.totalPage,
            });
        });
    }

    onChangeDate(valor, tipo) {
        const date = this.state.date;
        if (tipo === 'M') {
            date.setMonth(valor);
        }
        if (tipo === 'Y') {
            date.setFullYear(valor);
        }
        this.setState({
            date,
        }, () => {
            this.getData();
        });
    }

    getSendData = () => {
        const { pageNumber, pageSize, date } = this.state;
        const data = {
            pageNumber,
            pageSize,
            fromDate: moment(date).subtract(1, 'months').format('YYYY-MM-DD'),
            toDate: moment(date).add(1, 'months').format('YYYY-MM-DD'),
        };
        return data;
    }

    getYears = () => {
        return [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];
    }

    getMonths = () => {
        return ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    }

    fetchData = (event) => {
        const { pageSize, page } = event;
        this.setState({ pageSize, pageNumber: page + 1 }, () => {
            this.getData();
        });
    }

    getVisualState = state => {
        /*
        capacitaciones
        0 = por hacer
        1 = capacitacion cerrada REALIZADA
        */
        if (state === 0) {
            return (<Badge color="success" pill>No Realizada</Badge>);
        }

        if (state === 1) {
            return (<Badge color="danger" pill>Realizada</Badge>);
        }

        return (<Badge color="primary" pill>No Realizada</Badge>);
    }

    getFecha = fechaRealizacion => {
        // se quita un dia para que las del dia de hoy no esten expiradas
        if (moment().subtract(1, 'day').isAfter(fechaRealizacion)) {
            return 'Expirada (' + moment(fechaRealizacion).format('DD-MM-YYYY');
        }
        return moment(fechaRealizacion).format('DD-MM-YYYY');
    }

    render() {
        const translations = { noDataText: 'No existen resultados', pageText: 'Página', ofText: 'de', rowsText: 'Filas', previousText: 'Anterior', nextText: 'Siguiente', loadingText: 'Cargando...' };
        const { date, data, totalPage, empresa } = this.state;
        return(
            <div>
                <Menu />
                <Container>
                    <Row>
                        <Col>
                            <Breadcrumb>
                                <BreadcrumbItem>
                                    <Link to="/home">Home</Link>
                                </BreadcrumbItem>
                                <BreadcrumbItem active>{empresa.nombre} - Capacitaciones</BreadcrumbItem>
                            </Breadcrumb>
                            <EmpresaCard empresa={empresa} link={`/home`} />
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Card className="mt-4">
                        <CardBody>
                            <Row>
                                <Col md="12">
                                    <Row>
                                        <Col md="12"><strong>Filtros de Busqueda</strong></Col>
                                        <Col md="12"><hr /></Col>
                                        <Col md="6">
                                            <FormGroup>
                                                <Label for="exampleSelect">Mes</Label>
                                                <Input type="select" name="select" onChange={(event) => this.onChangeDate(event.target.value, 'M')}>
                                                    {this.getMonths().map((e, i) => (
                                                        <option value={i} selected={i === date.getMonth()}>{e}</option>
                                                    ))}
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col md="6">
                                            <FormGroup>
                                                <Label for="exampleSelect">Año</Label>
                                                <Input type="select" name="select" onChange={(event) => this.onChangeDate(event.target.value, 'Y')}>
                                                    {this.getYears().map(e => (
                                                        <option value={e} selected={e === date.getFullYear()}>{e}</option>
                                                    ))}
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>Listado de Informes</Col>
                                    </Row>
                                    <ReactTable
                                        {...translations}
                                        columns={[
                                            { Header: "Nombre", id: "nombre",
                                                accessor: d => `${d.id}) ${d.nombre}`,
                                            },
                                            { Header: "Examinador", accessor: "examinador.name",
                                            },
                                            {
                                                Header: 'Fecha',
                                                id: "fechaRealizacion",
                                                accessor: d => this.getFecha(d.fechaRealizacion),
                                            },
                                            {
                                                Header: 'Estado',
                                                id: "estado",
                                                accessor: d => this.getVisualState(d.estado),
                                            }
                                        ]}
                                        manual // Forces table not to paginate or sort automatically, so we can handle it server-side
                                        data={data}
                                        pages={totalPage} // Display the total number of pages
                                        onFetchData={this.fetchData} // Request new data when things change
                                        defaultPageSize={5}
                                        className="-striped -highlight"
                                    />
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        );
    }
}

export default Capacitaciones;