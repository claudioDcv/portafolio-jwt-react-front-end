import Service from './Service';

const endpoint = '/api/trabajadores';

class TrabajadorService {
    static findAll() {
        return new Promise((resolve, reject) => {
            Service.get(endpoint).then((data) => {
                const obj = data.obj.map(e => e);
                resolve(obj);
            }).catch((reason) => reject(reason));
        });
    }

    static findAllByEmpresaId(id) {
        return new Promise((resolve, reject) => {
            Service.get(`${endpoint}/empresa/${id}`).then((data) => {
                const obj = data.obj.map(e => e);
                resolve(obj);
            }).catch((reason) => reject(reason));
        });
    }

    // /en-empresa-con-riesgo/{empresaId}
    static findAllTrabajadoresRiesgoByEmpresaId(empresaId) {
        return new Promise((resolve, reject) => {
            Service.get(`${endpoint}/en-empresa-con-riesgo/${empresaId}`).then((data) => {
                resolve(data.obj);
            }).catch((reason) => reject(reason));
        });
    }
}

export default TrabajadorService;