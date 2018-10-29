import Service from './Service';

const endpoint = '';

class AtuhService {

    static login(d) {
        return new Promise((resolve, reject) => {
            Service.post(`${endpoint}/login`, d, false).then((data) => {
                const da = data.obj;
                resolve(da);
            }).catch((reason) => reject(reason));
        });
    }

    static register(d) {
        return new Promise((resolve, reject) => {
            Service.post(`${endpoint}/register`, d).then((data) => {
                const da = data.obj;
                resolve(da);
            }).catch((reason) => reject(reason));
        });
    }
}

export default AtuhService;