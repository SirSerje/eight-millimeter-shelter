import axios from 'axios'

export const getAllRequest = () => axios.get(`api/movies`)

export const getByIdRequest = id => axios.get(`api/movies/0`)

export const addNewRequest = body => axios.post('/api/movies', { movie:{foo:'bar'} }) //FIXME: update properly

export const movieDeleteRequest = id => axios.delete()

export const updateExistingRequest = (id, body) => axios.put()
