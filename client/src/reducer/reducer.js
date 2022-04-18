import {
  GET_ALL_DOGS,
  SEARCH_DOG,
  GET_DOG_DETAIL,
  CLEAR_DETAIL,
  GET_ALL_TEMPERAMENTS,
} from "../actions/action";

const initialState = {
  allDogs: [],
  dogDetail: {},
  allTemperaments: [],
};

function rootReducer(state = initialState, action) {
 switch(action.type){
     case GET_ALL_DOGS: {
         return{...state, allDogs: action.payload}
     }
     case SEARCH_DOG: {
       return {...state, allDogs:action.payload}
     }
     case GET_DOG_DETAIL: {
       return {...state, dogDetail: action.payload}
     }
     case CLEAR_DETAIL: {
       return {...state, dogDetail: {}}
     }

    default: 
        return state

 }


}

export default rootReducer;
