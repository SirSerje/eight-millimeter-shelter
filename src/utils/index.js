import axios from 'axios';
import PATH from '../constants/path';

export const getAllRequest = () => axios.get(PATH);
export const getById = id => axios.get(`${PATH}/${id}`);
export const addNewRequest = (body = { movie: {} }) => axios.post(PATH, { movie: body });
export const movieDeleteRequest = id => axios.delete(`${PATH}${id}`);
export const searchByName = name => axios.get(`${PATH}search?title=${name}`);
export const searchByActor = actor => axios.get(`${PATH}search?actor=${actor}`);
export const uploadFile = file => axios.post(`${PATH}upload`, file);

//Promise based timeout
// export const addNewRequest = (body = { movie: {} }) => new Promise(function(resolve) {
//   setTimeout(resolve.bind(null), 2000);
// });
