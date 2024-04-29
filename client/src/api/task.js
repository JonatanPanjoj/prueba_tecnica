import axios from './axios'

export const obtenerTareas = () => axios.get('/obtenerTareas');
export const obtenerTareaId = (id) => axios.get(`/obtenerTareaId/${id}`);
export const registrarTarea = (task) => axios.post('/registrarTarea', task);
export const editarTarea = (id,task) => axios.put(`/editarTarea/${id}`, task);
export const eliminarTarea = (id) => axios.delete(`/eliminarTarea/${id}`);