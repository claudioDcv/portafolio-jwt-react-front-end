import { apiHost } from '../../config/const';

const getHeadToken = (authenticated) => {

    if (authenticated) {
        return {
            authorization: `Bearer ${window.localStorage.getItem('token')}`,
        };
    }
    return {};
};

const responseControl = (data, resolve, reject) => {
    if (data.code >= 200 && data.code <= 299) {
        resolve(data);
    } else {
        if (data.code === 401) {
            alert(data.message);
            reject(data.message)
        }
        reject(data.message)
    }
}

const fileControl = (data, resolve, reject) => {
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `certificado-${(new Date()).getTime()}.pdf`);
    document.body.appendChild(link);
    link.click();
}

class Service {
    static findAll(endpoint) {
        return new Promise((resolve, reject, authenticated = true) => {

            fetch(`${apiHost}${endpoint}`, {
                method: 'GET', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                    ...getHeadToken(authenticated),
                },
            })
                .then((resp) => resp.json())
                .then((data) => responseControl(data, resolve, reject))
                .catch((reason) => {
                    reject(reason);
                });
        });
    }

    static get(endpoint) {
        return new Promise((resolve, reject, authenticated = true) => {
            fetch(`${apiHost}${endpoint}`, {
                method: 'GET', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                    ...getHeadToken(authenticated),
                },
            })
                .then((resp) => resp.json())
                .then((data) => responseControl(data, resolve, reject))
                .catch((reason) => {
                    reject(reason);
                });
        });
    }

    static findById(endpoint, id, authenticated = true) {
        return new Promise((resolve, reject) => {

            fetch(`${apiHost}${endpoint}/${id}`, {
                method: 'GET', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                    ...getHeadToken(authenticated),
                },
            })
                .then((resp) => resp.json())
                .then((data) => responseControl(data, resolve, reject))
                .catch((reason) => {
                    reject(reason);
                });
        });
    }

    static post(endpoint, data, authenticated = true) {
        return new Promise((resolve, reject) => {
            fetch(`${apiHost}${endpoint}`, {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json',
                    ...getHeadToken(authenticated),
                },
            })
                .then((resp) => resp.json())
                .then((data) => responseControl(data, resolve, reject))
                .catch((reason) => {
                    reject(reason);
                });
        });
    }

    static update(endpoint, data, authenticated = true) {
        return new Promise((resolve, reject) => {

            fetch(`${apiHost}${endpoint}/${data.id}`, {
                method: 'PUT', // or 'PUT'
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json',
                    ...getHeadToken(authenticated),
                },
            })
                .then((resp) => resp.json())
                .then((data) => responseControl(data, resolve, reject))
                .catch((reason) => {
                    reject(reason);
                });
        });
    }

    static delete(endpoint, id, authenticated = true) {
        return new Promise((resolve, reject) => {

            fetch(`${apiHost}${endpoint}/${id}`, {
                method: 'DELETE', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                    ...getHeadToken(authenticated),
                },
            })
                .then((resp) => resp.json())
                .then((data) => responseControl(data, resolve, reject))
                .catch((reason) => {
                    reject(reason);
                });
        });
    }

    static blob(endpoint, data, authenticated = false) {
        return new Promise((resolve, reject) => {

            fetch(`${apiHost}${endpoint}`, {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    ...getHeadToken(authenticated),
                },
            })
                .then((resp) => resp.blob())
                .then((data) => fileControl(data, resolve, reject))
                .catch((reason) => {
                    reject(reason);
                });
        });
    }
}

export default Service;