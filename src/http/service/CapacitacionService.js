import Service from './Service';
import Capacitacion from '../../entity/Capacitacion';

const endpoint = '/api/capacitaciones';

class CapacitacionService {

    /**
     * findByEmpresaId
     * @param {number} empresaId 
     */
    static findByEmpresaId(empresaId) {
        return new Promise((resolve, reject) => {
            Service.get(`${endpoint}/examinador/${empresaId}`, {
                empresaId,
            }).then((data) => {
                const d = data;
                const obj = d.obj.map(e => new Capacitacion(e));
                resolve(obj);
            }).catch((reason) => reject(reason));
        });
    }

    static findByEmpresaIdParaSupervisor(empresaId) {
        return new Promise((resolve, reject) => {
            Service.get(`${endpoint}/supervisor/${empresaId}`, {
                empresaId,
            }).then((data) => {
                const d = data;
                const obj = d.obj.map(e => new Capacitacion(e));
                resolve(obj);
            }).catch((reason) => reject(reason));
        });
    }

    static findById(id) {
        return new Promise((resolve, reject) => {
            Service.findById(endpoint, id).then((data) => {
                const d = data;
                const obj = new Capacitacion(d.obj)
                resolve(obj);
            }).catch((reason) => reject(reason));
        });
    }

    static asistentesByIdCapacication(id) {
        return new Promise((resolve, reject) => {
            Service.findById(`${endpoint}/asistencias`, id).then((data) => {
                const d = data;
                const obj = d.obj;
                resolve(obj);
            }).catch((reason) => reject(reason));
        });
    }
    static nuevacharlaSave(data) {
        return new Promise((resolve, reject) => {
            Service.post(`${endpoint}`, data).then((data) => {
                const obj = data.obj;
                resolve(obj);
            }).catch((reason) => reject(reason));
        });
    }
}

export default CapacitacionService;