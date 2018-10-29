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
            Service.post(endpoint, {
                empresaId,
            }).then((data) => {
                const d = data;
                const obj = d.obj.map(e => new Capacitacion(e));
                resolve(obj);
            }).catch((reason) => reject(reason));
        });
    }
}

export default CapacitacionService;