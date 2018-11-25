import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Col, Card, CardBody, Button, Breadcrumb, BreadcrumbItem, Container, Row, CardHeader } from 'reactstrap';
import moment from 'moment';
import Menu from '../../components/Menu';
import DateRange from '../../components/DateRange';

import ReactTable from "react-table";
import "react-table/react-table.css";

import Loading from '../../components/Loading';

import EmpresaCard from '../../components/EmpresaCard';

class Plant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            plant: null,
            capturedDate: null,
            controls: [],
            unit: 'day',
        };

        this.r = React.createRef();


    }


    handlerChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handlerSearch = () => {
        const { plant, capturedDate } = this.state;

        const data = {
            captured_date_from: moment(capturedDate.startDate).format('YYYY-MM-DD'),
            captured_date_to: moment(capturedDate.endDate).format('YYYY-MM-DD'),
        };

    }

    render() {
        const { plant, capturedDate, controls, unit } = this.state;
        const { empresa } = this.state;

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
            <Col md={12}>
                <Card>
                    <CardHeader>
                       
                    </CardHeader>
                    <CardBody>
                        <DateRange value={capturedDate} name="capturedDate" onChange={this.handlerChange} />
                        <Button disabled={capturedDate === null} onClick={this.handlerSearch}>Buscar</Button>
                    </CardBody>
                    <CardBody>
                       
                    </CardBody>
                </Card>
            </Col>
          </Row>
        </Container>
    </div>
        ) : (<Loading />);
    }
}

export default Plant;