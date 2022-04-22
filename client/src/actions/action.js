export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const SEARCH_DOG = "SEARCH_DOG";
export const GET_DOG_DETAIL = "GET_DOG_DETAIL";
export const CLEAR_DETAIL = "CLEAR_DETAIL";
export const GET_ALL_TEMPERAMENTS = "GET_ALL_TEMPERAMENTS";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_WEIGHT = "ORDER_BY_WEIGHT";
export const FILTER_BY_TEMPERAMENT = "FILTER_BY_TEMPERAMENT"
export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN"
const axios = require("axios").default;


export function getAllDogs(){
    return async function(dispatch){
        let json = await axios.get("http://localhost:3001/dogs")
        return dispatch({
            type: GET_ALL_DOGS,
            payload: json.data
        })
    }
}
export function searchDog(name){
    return async function(dispatch){
        let json = await axios.get("http://localhost:3001/dogs?name=" + name)
        return dispatch({
            type: SEARCH_DOG,
            payload: json.data
        })
    }
}

export function getDogDetail(id){
    return async function(dispatch){
        let json = await axios.get("http://localhost:3001/dogs/" + id)
        return dispatch({
            type: GET_DOG_DETAIL,
            payload: json.data
        })
    }
}

export function getAllTemperaments (){
    return async function (dispatch){
        let temp = await axios.get("http://localhost:3001/temperament")
        return dispatch({
            type: GET_ALL_TEMPERAMENTS,
            payload: temp.data
        })
    }
}

export function clearDetail() {
    return {type: CLEAR_DETAIL}
} 
export function orderByName(payload) {
    return {type: ORDER_BY_NAME, payload}
} 

export function orderByWeight(payload) {
    return {type: ORDER_BY_WEIGHT, payload}
} 

export function filterByTemp(payload) {
    return {type: FILTER_BY_TEMPERAMENT, payload}
} 
export function filterByOrigin(payload) {
    return {type: FILTER_BY_ORIGIN, payload}
} 