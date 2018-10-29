import User from './User';
import Empresa from './Empresa';
import { fechaFormateada } from '../common/utils';

class VisitaMedica {
    constructor(props = {
            id: '',
            confirmacionMedico: false,
            supervisor: null,
            medico: null,
            empresa: null,
            fechaRealizacion: 0,
            fechaRealizacionFormateada: '',
    }) {
        this.id = props.id;
        this.confirmacionMedico = props.confirmacionMedico;
        this.supervisor = new User(props.supervisor);
        this.medico = new User(props.supervisor);
        this.empresa = new Empresa(props.empresa);
        this.fechaRealizacion = new Date(props.fechaRealizacion)
        this.fechaRealizacionFormateada = fechaFormateada(new Date(props.fechaRealizacion));
    }
}

export default VisitaMedica;