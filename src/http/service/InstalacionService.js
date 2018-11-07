import Service from './Service';

const endpoint = '/api/instalaciones';

class InstalacionService {

    static findAllByEmpresaId(id) {
        return new Promise((resolve, reject) => {
            Service.get(`${endpoint}/empresa/${id}`).then((data) => {
                const obj = data.obj.map(e => e);
                resolve(obj);
            }).catch((reason) => reject(reason));
        });
    }
}

export default InstalacionService;