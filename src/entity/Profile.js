class Profile {
    constructor(props = { id: '', naturalKey: '', displayName: '' }) {
        this.id = props.id;
        this.displayName = props.displayName;
        this.naturalKey = props.naturalKey;
    }
}

export default Profile;