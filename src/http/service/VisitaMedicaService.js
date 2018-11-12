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

    // /api/visitas-medicas
    static crearVisitaMedica(data) {
        return new Promise((resolve, reject) => {
            Service.post(endpoint, data).then(da => {
                resolve(da.obj);
            }).catch((reason) => reject(reason));
        });
    }

    // /mis-visitas-medicas-supervisor/
    static misVisitasMedicasSupervisor(empresaId) {
        return new Promise((resolve, reject) => {
            Service.get(`${endpoint}/mis-visitas-medicas-supervisor/${empresaId}`).then((da) => {
                const obj = da.obj;
                resolve(obj);
            }).catch((reason) => reject(reason));
        });
    }

    static rechazarVisitaMedica(visitaMedicaId) {
        return new Promise((resolve, reject) => {
            Service.get(`${endpoint}/rechazar/${visitaMedicaId}`).then((da) => {
                const obj = da.obj;
                resolve(obj);
            }).catch((reason) => reject(reason));
        });
    }

    static aceptarVisitaMedica(visitaMedicaId) {
        return new Promise((resolve, reject) => {
            Service.get(`${endpoint}/aceptar/${visitaMedicaId}`).then((da) => {
                const obj = da.obj;
                resolve(obj);
            }).catch((reason) => reject(reason));
        });
    }

    // @GetMapping("/{empresaId}/{visitaMedicaId}")
    static getVisitaMedicaById(empresaId, visitaMedicaId) {
        return new Promise((resolve, reject) => {
            Service.get(`${endpoint}/${empresaId}/${visitaMedicaId}`).then((da) => {
                const obj = da.obj;
                resolve(obj);
            }).catch((reason) => reject(reason));
        });
    }
    // /consulta-medica")
    static crearConsultaMedica(data) {
        return new Promise((resolve, reject) => {
            Service.post(`${endpoint}/consulta-medica`, data).then(da => {
                resolve(da.obj);
            }).catch((reason) => reject(reason));
        });
    }

    // @GetMapping("/consulta-medica/por-visiata-medica/{visitaMedicaId}")
    static getAllConsultasMedicasByVisitaMedica(visitaMedicaId) {
        return new Promise((resolve, reject) => {
            Service.get(`${endpoint}/consulta-medica/por-visita-medica/${visitaMedicaId}`).then((da) => {
                const obj = da.obj;
                resolve(obj);
            }).catch((reason) => reject(reason));
        });
    }
    static getAllExamenes() {
        return new Promise((resolve, reject) => {
            Service.get('/examenes').then((da) => {
                const obj = da.obj;
                resolve(obj);
            }).catch((reason) => reject(reason));
        });
    }
    /*
    @PostMapping("/asignar-examen-consulta-medica")
	asignarExamenConsultaMedica
        consultaMedicaId
        examenId
    */
    static asignarExamenConsultaMedica(data) {
        return new Promise((resolve, reject) => {
            Service.post(`${endpoint}/asignar-examen-consulta-medica`, data).then(da => {
                resolve(da.obj);
            }).catch((reason) => reject(reason));
        });
    }
    /*
    @GetMapping("/api/examenes/{consultaId}")
	public ResponseEntity<ResponseDto<List<ExamenEntity>>> getAllExamenesByConsultaId(
    */
    static getAllExamenesByConsultaId(consultaId) {
        return new Promise((resolve, reject) => {
            Service.get(`/api/examenes/${consultaId}`).then(da => {
                resolve(da.obj);
            }).catch((reason) => reject(reason));
        });
    }
}

export default VisitaMedicaService;