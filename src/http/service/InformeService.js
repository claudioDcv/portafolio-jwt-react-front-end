import Service from './Service';

const endpoint = '/api/informes';

class InformeService {

     /**
     * findByEmpresaId
     * @param {number} empresaId 
     */

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

    static informeTrabajadorByID(id) {
        return new Promise((resolve, reject) => {
            Service.get(`${endpoint}/trabajador/${id}`).then((data) => {
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

    // {{API_HOST}}/api/informes/instalacion/por-estado/0
    static informesTrabajadorByEstado(empresaId, id) {
        return new Promise((resolve, reject) => {
            Service.get(`${endpoint}/trabajador/por-estado/${empresaId}/${id}`).then((data) => {
                const obj = data.obj;
                resolve(obj);
            }).catch((reason) => reject(reason));
        });
    }
    static informesTrabajadorBySupervisor(empresaId) {
        return new Promise((resolve, reject) => {
            Service.get(`${endpoint}/trabajador/by-supervisor/${empresaId}`).then((data) => {
                const obj = data.obj;
                resolve(obj);
            }).catch((reason) => reject(reason));
        });
    }
    

    static informesInstalacionByEstado(empresaId, id) {
        return new Promise((resolve, reject) => {
            Service.get(`${endpoint}/instalacion/por-estado/${empresaId}/${id}`).then((data) => {
                const obj = data.obj;
                resolve(obj);
            }).catch((reason) => reject(reason));
        });
    }
    static informesInstalacionBySupervisor(empresaId) {
       return new Promise((resolve, reject) => {
        Service.get(`${endpoint}/instalacion/by-supervisor/${empresaId}`).then((data) => {
                const obj = data.obj;
                resolve(obj);
            }).catch((reason) => reject(reason));
        });
    }

    // {{API_HOST}}/api/informes/solicitar-revision-informe-detalle-id/3
    static solicitudRevisionInforme(id) {
        return new Promise((resolve, reject) => {
            Service.get(`${endpoint}/solicitar-revision-informe-detalle-id/${id}`).then((data) => {
                const obj = data.obj;
                resolve(obj);
            }).catch((reason) => reject(reason));
        });
    }

    static asignarPrevencionista(data) {
        return new Promise((resolve, reject) => {
            Service.get(`${endpoint}/asignar-prevencionista/${data.idDetalle}/${data.idPrevencionista}`).then((data) => {
                const obj = data.obj;
                resolve(obj);
            }).catch((reason) => reject(reason));
        });
    }


    // "/instalacion/prevencionista/{empresa}/{estado}"
    static getAllInformeInstalacionyByEstadoPrevencionistaId(empresaId, confirmacionPreve) {
            return new Promise((resolve, reject) => {
                Service.get(`${endpoint}/instalacion/prevencionista/${empresaId}/${confirmacionPreve}`).then((data) => {
                    const obj = data.obj;
                    resolve(obj);
                }).catch((reason) => reject(reason));
            });
        }

    //"/trabajador/prevencionista/{empresa}/{estado}"
    static getAllInformeTrabajadorByEstadoPrevencionistaId(empresaId, confirmacionPreve) {
        return new Promise((resolve, reject) => {
            Service.get(`${endpoint}/trabajador/prevencionista/${empresaId}/${confirmacionPreve}`).then((data) => {
                const obj = data.obj;
                resolve(obj);
            }).catch((reason) => reject(reason));
        });
    }

    //recomendacion id
    static agregarRecomendacionParaObservacionPorPreve(data) {
        return new Promise((resolve, reject) => {
            Service.post(`${endpoint}/observaciones/recomendaciones`, data).then((data) => {
                const da = data.obj;
                resolve(da);
            }).catch((reason) => reject(reason));
        });
    }

    static rechazarInformeDetalle(informeDetalleId) {
        return new Promise((resolve, reject) => {
            Service.get(`${endpoint}/rechazar/${informeDetalleId}`).then((data) => {
                const obj = data.obj;
                resolve(obj);
            }).catch((reason) => reject(reason));
        });
    }

    static aprobarInformeDetalle(informeDetalleId) {
        return new Promise((resolve, reject) => {
            Service.get(`${endpoint}/aprobar/${informeDetalleId}`).then((data) => {
                const obj = data.obj;
                resolve(obj);
            }).catch((reason) => reject(reason));
        });
    }

}

export default InformeService;