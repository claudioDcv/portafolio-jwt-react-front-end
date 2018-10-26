import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, Row, Col, Breadcrumb, BreadcrumbItem, Container } from 'reactstrap';

import Menu from '../../components/Menu';

import Loading from '../../components/Loading';

import AuthService from '../../http/service/AuthService';

import User from '../../entity/User';

const hasNumber = v => /\d/.test(v);
const hasLowerCase = v => /[a-z]/.test(v);
const hasUpperCase = v => /[A-Z]/.test(v);
const hasValid = (v, pristine) => {
    if (pristine) return { };
    if (hasNumber(v) && hasLowerCase(v) && hasUpperCase(v)) return { valid: true};
    return { invalid: true };
}

class Create extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...new User(),
            registering: false,
            passwordPristine: true,
        };
        this.handlerOnClick = this.handlerOnClick.bind(this);
        this.handlerOnChangeUser = this.handlerOnChangeUser.bind(this);
        this.handlerOnChangePristine = this.handlerOnChangePristine.bind(this);
    }

    componentDidMount() {
        this.setState({
            displayName: ' ',
        });
    }

    handlerOnClick() {
        const { displayName, password, email } = this.state;
        this.setState({ registering: true });
        AuthService.register({
            displayName,
            password,
            email,
        }).then(data => this.setState({
            ...data,
            registering: false,
        }));
    }

    handlerOnChangeUser(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    onDisabledButton() {
        const { displayName, password, email } = this.state;
        return !(displayName !== '' && password !== '' && email !== '');
    }

    handlerOnChangePristine(item) {
        return (event) => {
            this.setState({ [`${item}Pristine`]: false });
        };
    };

    render() {
        const { registering, displayName, email, password, passwordPristine } = this.state;
        return !registering ? (
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
                        <BreadcrumbItem active>Registrar</BreadcrumbItem>
                    </Breadcrumb>

                <section>
                    <Form>
                        <Row>
                            <Col md="6">
                                <FormGroup>
                                    <Label for="exampleEmail">Nombre de Usuario</Label>
                                    <Input
                                        type="displayName"
                                        name="displayName"
                                        id="displayName"
                                        placeholder="Ingrese Nombre de Usuario"
                                        value={displayName}
                                        onChange={this.handlerOnChangeUser}
                                        maxLength="50"
                                        autoComplete="off"
                                        onFocus={e => e.target.value === ' ' ? this.setState({ displayName: '' }) : ''}
                                />
                                </FormGroup>
                            </Col>
                            <Col md="6">
                                <FormGroup>
                                    <Label for="exampleEmail">Email</Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Ingrese Email"
                                        value={email}
                                        onChange={this.handlerOnChangeUser}
                                        autoComplete="off"
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12">
                                <FormGroup>
                                    <Label for="password">Contraseña</Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Ingrese Contraseña"
                                        value={password}
                                        onBlur={this.handlerOnChangePristine('password')}
                                        onChange={this.handlerOnChangeUser}
                                        autoComplete="off"
                                        {...hasValid(password, passwordPristine)}
                                    />
                                    <span className={passwordPristine || hasNumber(password) ? 'form-text text-muted' : 'form-text text-danger'}>- Debe contener al menos 1 numero</span>
                                    <span className={passwordPristine || hasUpperCase(password) ? 'form-text text-muted' : 'form-text text-danger'}>- Debe contener al menos 1 caracter en mayuscula</span>
                                    <span className={passwordPristine || hasLowerCase(password) ? 'form-text text-muted' : 'form-text text-danger'}>- Debe contener al menos 1 caracter en minuscula</span>   
                                </FormGroup>
                            </Col>
                        </Row>
                        <Button disabled={this.onDisabledButton()} onClick={this.handlerOnClick} >Guardar</Button>
                    </Form>
                </section>
                </Col>
                </Row>
                </Container>
            </div>
        ) : (<Loading />);
    }
}

export default Create;
