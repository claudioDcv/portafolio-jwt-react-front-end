import Service from './Service';

const endpoint = '/api';

class AdminEmpresaService {

    static informesTrabajadorPaginado(data) {
        return new Promise((resolve, reject) => {
            Service.post(`${endpoint}/informes/trabajador-admin-empresa`, data)
            .then((da) => {
                const d = da;
                const obj = d.obj;
                resolve(obj);
            }).catch((reason) => reject(reason));
        });
    }

    static informesInstalacionPaginado(data) {
        return new Promise((resolve, reject) => {
            Service.post(`${endpoint}/informes/instalacion-admin-empresa`, data)
            .then((da) => {
                const d = da;
                const obj = d.obj;
                resolve(obj);
            }).catch((reason) => reject(reason));
        });
    }

    static visitasMedicasPaginado(data) {
        return new Promise((resolve, reject) => {
            Service.post(`${endpoint}/visitas-medicas/admin-empresa`, data)
            .then((da) => {
                const d = da;
                const obj = d.obj;
                resolve(obj);
            }).catch((reason) => reject(reason));
        });
    }

    static capacitacionesPaginado(data) {
        return new Promise((resolve, reject) => {
            Service.post(`${endpoint}/capacitaciones/admin-empresa`, data)
            .then((da) => {
                const d = da;
                const obj = d.obj;
                resolve(obj);
            }).catch((reason) => reject(reason));
        });
    }
}

export default AdminEmpresaService;