export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const SEARCH_DOG = "SEARCH_DOG";
export const GET_DOG_DETAIL = "GET_DOG_DETAIL";
export const CLEAR_DETAIL = "CLEAR_DETAIL";
export const GET_ALL_TEMPERAMENTS = "GET_ALL_TEMPERAMENTS";
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

export function clearDetail() {
    return {type: CLEAR_DETAIL}
} 