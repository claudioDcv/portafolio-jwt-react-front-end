import Service from './Service';
import Profile from '../../entity/Profile';

const endpoint = '/api/perfil';

class ProfileService {

    static findByUserId(id) {
        return new Promise((resolve, reject) => {
            Service.findById(`${endpoint}/por-id-usuario`, id).then((data) => {
                const obj = data.obj.map(e => new Profile(e));
                resolve(obj);
            }).catch((reason) => reject(reason));
        });
    }

    static findAll() {
        return new Promise((resolve, reject) => {
            Service.findAll(endpoint).then((data) => {
                const obj = data.obj.map(e => new Profile(e));
                resolve(obj);
            }).catch((reason) => reject(reason));
        });
    }
}

export default ProfileService;