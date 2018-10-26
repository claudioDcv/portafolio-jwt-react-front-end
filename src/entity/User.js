class User {
    constructor(props = { id: '', password: '', email: '', name: '', profiles: [] }) {
        this.id = props.id;
        this.password = props.password;
        this.name = props.name;
        this.email = props.email;
        this.profiles = props.profiles;
    }
}

export default User;