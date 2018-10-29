export const getProfiles = () => JSON.parse(window.localStorage.getItem('profile')).profiles;

export const parseJwt = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
};

export const hasProfile = (profilesTest = []) => {
    let hasProfile = false;
    const profilesName = getProfiles().map(e => e.naturalKey);

    profilesTest.forEach(e => {
        if (profilesName.includes(e)){ hasProfile = true; }
    })
    return hasProfile;
};

export const notProfile = (profilesTest = []) => {
    let hasProfile = true;
    const profilesName = getProfiles().map(e => e.naturalKey);
    
    profilesTest.forEach(e => {
        if (profilesName.includes(e)){ hasProfile = false; }
    })
    return hasProfile;
};

export const profileList = {
    ADMIN_SAFE: 'ADMIN_SAFE',
	TECNICO: 'TECNICO',
	PREVENCIONISTA: 'PREVENCIONISTA',
	EXAMINADOR: 'EXAMINADOR',
	MEDICO: 'MEDICO',
    ADMIN_EMPRESA: 'ADMIN_EMPRESA',
    SUPERVISOR: 'SUPERVISOR',
    SAFE: ['ADMIN_SAFE','TECNICO','PREVENCIONISTA','EXAMINADOR','MEDICO','SUPERVISOR'],
    SAFE_ADMIN_SUPERVISOR: ['ADMIN_SAFE','SUPERVISOR'],
};

export const fechaFormateada = (date) => {
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const dia = date.getDate()
    const m = date.getMonth();
    const mes = (m + 1) < 10 ? `0${m}` : m ;
    const mesFormateado = meses[m];
    const anio = date.getFullYear()
    // return `${dia}/${mes}/${anio}`;
    return `${dia} de ${mesFormateado} de ${anio}`;
};

export const isFunction = fn => fn && typeof fn === 'function';