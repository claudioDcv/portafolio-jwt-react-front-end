import Service from './Service';

const endpoint = '/api/informes';

class InformeService {

    static informeTrabajadorSave(data) {
        return new Promise((resolve, reject) => {
            Service.post(`${endpoint}/nuevo-trabajador`, data).then((data) => {
                const obj = data.obj;
                resolve(obj);
            }).catch((reason) => reject(reason));
        });
    }

    static informeInstalacionSave(data) {
        return new Promise((resolve, reject) => {
            Service.post(`${endpoint}/nueva-instalacion`, data).then((data) => {
                const obj = data.obj;
                resolve(obj);
            }).catch((reason) => reject(reason));
        });
    }

    static informeInstalacionByID(id) {
        return new Promise((resolve, reject) => {
            Service.get(`${endpoint}/instalacion/${id}`).then((data) => {
                const obj = data.obj;
                resolve(obj);
            }).catch((reason) => reject(reason));
        });
    }

    static observacionByInformeId(id) {
        return new Promise((resolve, reject) => {
            Service.get(`${endpoint}/observaciones/informe-detalle/${id}`).then((data) => {
                const obj = data.obj;
                resolve(obj);
            }).catch((reason) => reject(reason));
        });
    }

    static insertObservacion(data) {
        return new Promise((resolve, reject) => {
            Service.post(`${endpoint}/observaciones`, data).then((data) => {
                const da = data.obj;
                resolve(da);
            }).catch((reason) => reject(reason));
        });
    }
}

export default InformeService;