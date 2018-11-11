import Service from './Service';
import VisitaMedica from '../../entity/VisitaMedica';

const endpoint = '/api/visitas-medicas';

class VisitaMedicaService {

    /**
     * findByEmpresaIdConfirmacion confirmacion -1: rechazado 0: no visto 1: confirmado
     * @param {number} empresaId 
     * @param {number} confirmacion 
     */
    static findByEmpresaIdConfirmacion(empresaId, confirmacion) {
        return new Promise((resolve, reject) => {
            Service.post(`${endpoint}/mis-visitas-medicas-medico`, {
                empresaId,
                confirmacion,
            }).then((data) => {
                const d = data;
                const obj = d.obj.map(e => new VisitaMedica(e));
                resolve(obj);
            }).catch((reason) => reject(reason));
        });
    }
}

export default VisitaMedicaService;