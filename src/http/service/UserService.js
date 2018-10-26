import Service from './Service';
import User from '../../entity/User';
import Profile from '../../entity/Profile';

const endpoint = '/api/usuarios';

class UserService {
    static findAll() {
        return new Promise((resolve, reject) => {
            Service.findAll(endpoint).then((data) => {
                const obj = data.obj.map(e => new User(e));
                resolve(obj);
            }).catch((reason) => reject(reason));
        });
    }
    
    static findById(id) {
        return new Promise((resolve, reject) => {
            Service.findById(endpoint, id).then((data) => {
                const d = data;
                d.obj.profiles = data.obj.profiles.map(e => new Profile(e));
                const obj = new User(d.obj);
                resolve(obj);
            }).catch((reason) => reject(reason));
        });
    }


    static delete(id) {
        return new Promise((resolve, reject) => {
            Service.delete(endpoint, id).then((data) => {
                resolve(data.obj);
            }).catch((reason) => reject(reason));
        });
    }

    static update(data) {
        return new Promise((resolve, reject) => {
            Service.update(endpoint, data).then((data) => {
                resolve(data);
            }).catch((reason) => reject(reason));
        });
    }
}

export default UserService;