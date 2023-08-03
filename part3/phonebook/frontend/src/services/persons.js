import axios from 'axios';
const baseUrl = '/api/persons';

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
};

const createPerson = newObject => {
    const request = axios.post(baseUrl, newObject);
    return request.then(response => response.data);
};

const deletePerson = id => {
    return axios.delete(`${baseUrl}/${id}`);
};

const updatePerson = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    return request.then(response => response.data);
}

const personService = { getAll, createPerson, deletePerson, updatePerson };
export default personService;