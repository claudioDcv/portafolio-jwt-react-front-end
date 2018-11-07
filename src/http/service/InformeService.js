import Service from './Service';
import Profile from '../../entity/Profile';

const endpoint = '/api/informes';

class InformeService {

    static InformetrabajadorSave(data) {
        return new Promise((resolve, reject) => {
            Service.post(`${endpoint}/nuevo-trabajador`, data).then((data) => {
                const obj = data.obj;
                resolve(obj);
            }).catch((reason) => reject(reason));
        });
    }
}

export default InformeService;