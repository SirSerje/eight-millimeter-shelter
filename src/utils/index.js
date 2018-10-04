import axios from 'axios'

export const getAllRequest = () => axios.get()

export const getByIdRequest = id => axios.get()

export const addNewRequest = body => axios.post()

export const movieDeleteRequest = id => axios.delete()

export const updateExistingRequest = (id, body) => axios.put()
