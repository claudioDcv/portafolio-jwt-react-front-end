import Service from './Service';
import Empresa from '../../entity/Empresa';

const endpoint = '/api/empresas';

class EmpresaService {
    static findAll() {
        return new Promise((resolve, reject) => {
            Service.get(endpoint).then((data) => {
                const obj = data.obj.map(e => e);
                resolve(obj);
            }).catch((reason) => reject(reason));
        });
    }

    static findById(id) {
        return new Promise((resolve, reject) => {
            Service.findById(endpoint, id).then((data) => {
                const d = data;
                const obj = new Empresa(d.obj);
                resolve(obj);
            }).catch((reason) => reject(reason));
        });
    }
}

export default EmpresaService;