import User from './User';
import Empresa from './Empresa';
import { fechaFormateada } from '../common/utils';

class Capacitacion {
    constructor(props = {
            id: '',
            nombre: '',
            descripcion: '',
            asistentesMinimos: 0,
            supervisor: null,
            examinador: null,
            empresa: null,
            fechaRealizacion: 0,
            fechaRealizacionFormateada: '',
    }) {
        this.id = props.id;
        this.nombre = props.nombre;
        this.descripcion = props.descripcion;
        this.asistentesMinimos = props.asistentesMinimos;
        this.supervisor = new User(props.supervisor);
        this.examinador = new User(props.examinador);
        this.empresa = new Empresa(props.empresa);
        this.fechaRealizacion = new Date(props.fechaRealizacion)
        this.fechaRealizacionFormateada = fechaFormateada(new Date(props.fechaRealizacion));
    }
}

export default Capacitacion;