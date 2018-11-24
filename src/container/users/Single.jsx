import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, Row, Col, Breadcrumb, BreadcrumbItem, Container, Alert, Badge } from 'reactstrap';

import Menu from '../../components/Menu';

import Loading from '../../components/Loading';

import UserService from '../../http/service/UserService';

import User from '../../entity/User';

class Single extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: new User(),
            visible: false,
            errorMessage: '',
            success: false,
        };
        this.handlerOnChangeUser = this.handlerOnChangeUser.bind(this);
        this.handlerOnClick = this.handlerOnClick.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        UserService.findById(id).then(data => this.setState({
            user: data,
        }));
    }

    handlerOnChangeUser(event) {
        const { name, value } = event.target;
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                [name]: value
            }
        }));
    }

    handlerOnClick() {
        const { user } = this.state;
        const self = this;
        this.setState({
            errorMessage: '',
            visible: false,
            success: false,
        });
        UserService.update(user).then(data => {
            this.setState({
                errorMessage: data.message || 'Datos invalidos',
                visible: data.obj === 0,
                success: data.obj !== 0,
            });

            if (data.obj !== 0) {
                setTimeout(() => self.props.history.push('/usuarios'), 1000);
            }
        });
    }

    onDismiss() {
        this.setState({ visible: false });
    }

    onDisabledButton() {
        const { displayName, password, email } = this.state.user;
        const { success } = this.state;
        if (displayName !== '' && password !== '' && email !== '' && !success) {
            return false;
        }
        return true;
    }

    render() {
        const { user, visible, errorMessage, success } = this.state;
        return user ? (
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
                                    <Link to="/usuarios">Usuarios</Link>
                                </BreadcrumbItem>
                                <BreadcrumbItem active>{user.id}</BreadcrumbItem>
                            </Breadcrumb>

                            <section>
                                <Form>
                                    <Row>
                                        <Col md="3">
                                            <FormGroup>
                                                <Label for="exampleEmail">#ID</Label>
                                                <Input
                                                    type="id"
                                                    name="id"
                                                    id="id"
                                                    placeholder="ID"
                                                    value={user.id}
                                                    onChange={this.handlerOnChangeUser}
                                                    readOnly
                                                    disabled
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md="9">
                                            <FormGroup>
                                                <Label for="name">Nombre</Label>
                                                <Input
                                                    type="name"
                                                    name="name"
                                                    id="name"
                                                    placeholder="Ingrese Nombre de Usuario"
                                                    value={user.name}
                                                    onChange={this.handlerOnChangeUser}
                                                    disabled
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="12">
                                            <FormGroup>
                                                <Label for="exampleEmail">Email</Label>
                                                <Input
                                                    disabled
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    placeholder="Ingrese Email"
                                                    value={user.email}
                                                    onChange={this.handlerOnChangeUser}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    {/*<Button disabled={this.onDisabledButton()} onClick={this.handlerOnClick}>Guardar</Button>*/}
                                    <div className="mt-4">
                                        <Alert color="danger" isOpen={visible} toggle={this.onDismiss}>
                                            {errorMessage}
                                        </Alert>

                                        <Alert color="success" isOpen={success}>
                                            Datos Actualizados con exito, redirigiendo a listado...
                            </Alert>
                                    </div>
                                </Form>
                            </section>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                            <h2 className="h2">Permisos</h2>
                        </Col>
                        <Col md="12">
                            {user.profiles.length > 0 ? user.profiles.map((e, i) => (
                                <Badge color="success" pill key={i} className="mr-2">
                                    #{e.id} {e.displayName}
                                </Badge>
                            )) : <span>Sin Perfil</span>}
                        </Col>
                    </Row>
                </Container>
            </div>
        ) : (<Loading />);
    }
}

export default Single;
