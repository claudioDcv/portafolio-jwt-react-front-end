class User {
    constructor(props = { id: '', password: '', email: '', empresaFk: '', name: '', profiles: [] }) {
        this.id = props.id;
        this.password = props.password;
        this.name = props.name;
        this.email = props.email;
        this.profiles = props.profiles;
        this.empresaFk = props.empresaFk
    }
}

export default User;