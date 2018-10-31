import React from 'react';
import { Link } from "react-router-dom";
import { Label, Row, Col, Card, CardBody, CardTitle, CardHeader, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EmpresaCard = ({ empresa, link }) => (
    <Card>
        <CardHeader>
            <CardTitle>
                {link && (<Link to={link}>
                    <Button outline><FontAwesomeIcon icon="arrow-left" /></Button>
                </Link>)} ({empresa.id}) {empresa.nombre}
            </CardTitle>
        </CardHeader>
        <CardBody>
            <Row>
                <Col md="4">
                    <Label for="exampleEmail">Email</Label>
                    <div className="display-data">{empresa.email}</div>
                </Col>
                <Col md="4">
                    <Label for="exampleEmail">Teléfono</Label>
                    <div className="display-data">{empresa.telefono}</div>
                </Col>
                <Col md="4">
                    <Label for="exampleEmail">Dirección</Label>
                    <div className="display-data">{empresa.direccion}</div>
                </Col>
            </Row>
        </CardBody>
    </Card>
);



export default EmpresaCard;