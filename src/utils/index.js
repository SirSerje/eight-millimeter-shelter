import axios from 'axios'

export const getAllRequest = () => axios.get('api/movies')

export const getByIdRequest = id => axios.get(`api/movies/${id}`)

export const addNewRequest = (body = {movie:{}}) => axios.post('/api/movies', body)

export const movieDeleteRequest = id => axios.delete()

export const updateExistingRequest = (id, body) => axios.put()
