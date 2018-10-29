class Empresa {
    constructor(props = { id: '', nombre: '', telefono: '', direccion: '', email: [] }) {
        this.id = props.id;
        this.nombre = props.nombre;
        this.telefono = props.telefono;
        this.direccion = props.direccion;
        this.email = props.email;
    }
}

export default Empresa;