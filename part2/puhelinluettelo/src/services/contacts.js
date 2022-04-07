import axios from "axios";

const baseUrl = "/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request
    .then((response) => response.data)
    .catch(error => {
      console.log(error);
      throw error.response.data.error;
    });
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request
    .then((response) => response.data)
    .catch(error => {
      console.log(error);
      throw error.response.data.error;
    });
};

const del = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.status === 204);
};

const exportedObject = { getAll, create, update, del };

export default exportedObject;
