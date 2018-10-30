import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Input,
  FormGroup,
  Form,
  Table,
  CardBody,
  CardHeader,
  BreadcrumbItem,
  Container,
  Breadcrumb,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  Label,
  Row,
  Col
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames";

import Menu from "../../components/Menu";

import UserService from "../../http/service/UserService";
import { email } from "../../config/const";

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      value: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  nextItemId = 0;

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  makeItem() {
    return {
      id: this.nextItemId++,
      value: this.state.value
    };
  }

  addItemImmutably = () => {
    this.setState({
      items: [...this.state.items, this.makeItem()]
    });
  };

  // componentDidMount() {
  //   UserService.findAll().then(data =>
  //     this.setState({
  //       data: data.filter(e => e.email !== email())
  //     })
  //   );
  // }

  render() {
    const { items } = this.state;
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
                  <Link to="/tecnicos">Tecnicos</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>Informe Instalacion</BreadcrumbItem>
              </Breadcrumb>
              <Card>
                <CardHeader>
                  <CardTitle>Nuevo Informe | Instalación</CardTitle>
                  <Form>
                    <Row form>
                      <Col md={3}>
                        <FormGroup>
                          <Label for="exampleSelect">Empresa</Label>
                          <Input
                            type="select"
                            name="select"
                            id="exampleSelect"
                          />
                        </FormGroup>
                      </Col>
                      <Col md={3}>
                        <FormGroup>
                          <Label for="exampleSelect">Instalacion</Label>
                          <Input
                            type="select"
                            name="select"
                            id="exampleSelect"
                          />
                        </FormGroup>
                      </Col>
                      <Col md={3}>
                        <FormGroup>
                          <Label for="exampleSelect">Supervisor</Label>
                          <Input
                            type="select"
                            name="select"
                            id="exampleSelect"
                          />
                        </FormGroup>
                      </Col>
                      <Col md={10}>
                        <FormGroup>
                          <Label for="exampleAddress2">Observaciones</Label>
                          <Input
                            type="text"
                            value={this.state.value}
                            onChange={this.handleChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={2}>
                        <Button onClick={this.addItemImmutably} block>
                          Agregar
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardHeader>
                <CardBody>
                  <Table size="sm" striped hover responsive>
                    <thead>
                      <tr>
                        <th>Titulo</th>
                        <th>Accion</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map(e => (
                        <tr key={e.id}>
                          <td>{e.value}</td>
                          <td>
                            <Link to={`/informe/detalle/${e.id}`}>
                              <Button color="primary" size="sm" outline>
                                ver :<FontAwesomeIcon icon="eye" />
                              </Button>
                            </Link>{" "}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default List;
