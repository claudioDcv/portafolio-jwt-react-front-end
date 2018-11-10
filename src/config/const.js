import { parseJwt } from '../common/utils';
const strToJson = s => JSON.parse(s);

// export const apiHost = 'http://localhost:4000';
export const apiHost = 'http://192.168.0.19:4000';
export const email = () => profile();
export const user = () => strToJson(window.localStorage.getItem('user'));
export const profile = () => {
    const data = parseJwt(window.localStorage.getItem('token'));
    return data.sub;
};