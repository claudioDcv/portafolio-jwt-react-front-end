import Service from './Service';
import Empresa from '../../entity/Empresa';

const endpoint = '/api/empresas';

class EmpresaService {

    static findAllPublic() {
        return new Promise((resolve, reject) => {
            Service.get('/certificados/empresas', false).then((data) => {
                const obj = data.obj.map(e => e);
                resolve(obj);
            }).catch((reason) => reject(reason));
        });
    }

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

    static misCertificados(data) {
        return new Promise((resolve, reject) => {
            Service.post('/certificados/trabajador/capacitacion', data, false).then((data) => {
                const obj = data.obj.map(e => e);
                resolve(obj);
            }).catch((reason) => reject(reason));
        });
    }

    static descargarCertificado(data) {
        return new Promise((resolve, reject) => {
            Service.blob('/descargas/certificados/capacitacion?format=pdf', data, false).then((data) => {
                const obj = data.obj.map(e => e);
                resolve(obj);
            }).catch((reason) => reject(reason));
        });
    }
}

export default EmpresaService;