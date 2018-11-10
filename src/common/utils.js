export const getProfiles = () => {
    const profile = window.localStorage.getItem('profile');
    if (profile) {
        return JSON.parse(profile).profiles;
    }
    if (window.location.href !== '/')
        window.location.href = '/';
    return null;
};

export const getUser = () => {
    const profile = window.localStorage.getItem('profile');
    if (profile) {
        return JSON.parse(profile);
    }
    return null;
};


export const parseJwt = (token) => {
    if (token === 'false') return false;

    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
};

export const hasProfile = (profilesTest = []) => {
    let hasProfile = false;
    const profiles = getProfiles();
    if (!profiles) return false;
    const profilesName = profiles.map(e => e.naturalKey);

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
    SUPERVISOR_ID: 7,
    EXAMINADOR_ID: 6,
};

export const fechaFormateada = (date) => {
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const dia = date.getDate()
    const m = date.getMonth();
    // const mes = (m + 1) < 10 ? `0${m}` : m ;
    const mesFormateado = meses[m];
    const anio = date.getFullYear()
    // return `${dia}/${mes}/${anio}`;
    return `${dia} de ${mesFormateado} de ${anio}`;
};

export const isFunction = fn => fn && typeof fn === 'function';