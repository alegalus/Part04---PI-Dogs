export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const SEARCH_DOG = "SEARCH_DOG";
export const GET_DOG_DETAIL = "GET_DOG_DETAIL";
export const CLEAR_DETAIL = "CLEAR_DETAIL";
export const CLEAR_ALL_DOG = "CLEAR_ALL_DOG";
export const GET_ALL_TEMPERAMENTS = "GET_ALL_TEMPERAMENTS";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_WEIGHT = "ORDER_BY_WEIGHT";
export const FILTER_BY_TEMPERAMENT = "FILTER_BY_TEMPERAMENT";
export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN";
export const CREATE_DOG = "CREATE_DOG";
export const DELETE_DOG = "DELETE_DOG";
export const UPDATE_DOG = "UPDATE_DOG";
const axios = require("axios").default;
// las actions nos van a servir para disparar las acciones que van a modificar mi state
// get all dogs me va a conectar con el get de todos los perros para renderizar todo en pantalla
export function getAllDogs() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/dogs");
    return dispatch({
      type: GET_ALL_DOGS,
      //en payload guardamos la data que va a modificar el state
      payload: json.data,
    });
  };
}
//esta actions la vamos a usar en la serchBar en donde pasamos el name por query
export function searchDog(name) {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/dogs?name=" + name);
    return dispatch({
      type: SEARCH_DOG,
      //en payload guardamos la data que va a modificar el state
      payload: json.data,
    });
  };
}
//aca es para ingresar a details y poder acceder al perro por su id por params
export function getDogDetail(id) {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/dogs/" + id);
    return dispatch({
      type: GET_DOG_DETAIL,
      //en payload guardamos la data que va a modificar el state
      payload: json.data,
    });
  };
}
//esta actions la vamos a usar siempre para llamar a los temperamentos
export function getAllTemperaments() {
  return async function (dispatch) {
    let temp = await axios.get("http://localhost:3001/temperament");
    return dispatch({
      type: GET_ALL_TEMPERAMENTS,
      //en payload guardamos la data que va a modificar el state
      payload: temp.data,
    });
  };
}
//las actions de clear van a ser para limpiar los datos del state cuando se desmontan los componentes
export function clearDetail() {
  return { type: CLEAR_DETAIL };
}
export function clearAllDogs() {
  return { type: CLEAR_ALL_DOG };
}
//los order y los filtros son para filtrar u ordenar el state en el reducer
//el payload va a ser el value de lo que definamos en los select del home
export function orderByName(payload) {
  return { type: ORDER_BY_NAME, payload };
}

export function orderByWeight(payload) {
  return { type: ORDER_BY_WEIGHT, payload };
}

export function filterByTemp(payload) {
  return { type: FILTER_BY_TEMPERAMENT, payload };
}
export function filterByOrigin(payload) {
  return { type: FILTER_BY_ORIGIN, payload };
}
//en el post el payload se pasa como segundo parametro del axios.post, el primero es la url
//ese payload va a ser la infor que traiga del formulario create que voy a pasar por body en el back
export function createDog(payload) {
  return async function (dispatch) {
    await axios.post("http://localhost:3001/dog", payload);
    return dispatch({
      type: CREATE_DOG,
    });
  };
}
//aca estando en el componente detail con el id borro ese perro
//no teng payload por que solo necesito el id para borrarlo
export function deleteDog(id) {
  return async function (dispatch) {
    await axios.delete("http://localhost:3001/dogs/" + id);
    return dispatch({
      type: DELETE_DOG,
    });
  };
}
//en el put el payload se pasa como segundo parametro del axios.put, el primero es la url
//ese payload va a ser la infor que traiga del formulario de update que voy a pasar por body en el back
//y en el dispatch de la function voy a pasar el id y el objeto con los datos, en el componente detail
export function updateDog(id, payload) {
  return async function (dispatch) {
    await axios.put("http://localhost:3001/dogs/" + id, payload);
    return dispatch({
      type: UPDATE_DOG,
    });
  };
}
