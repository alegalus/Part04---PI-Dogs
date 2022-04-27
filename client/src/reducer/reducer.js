import {
  GET_ALL_DOGS,
  SEARCH_DOG,
  GET_DOG_DETAIL,
  CLEAR_DETAIL,
  GET_ALL_TEMPERAMENTS,
  ORDER_BY_NAME,
  ORDER_BY_WEIGHT,
  FILTER_BY_TEMPERAMENT,
  FILTER_BY_ORIGIN,
  CREATE_DOG,
  DELETE_DOG,
} from "../actions/action";

const initialState = {
  allDogs: [],
  dogDetail: {},
  allTemperaments: [],
  filterDogs: [],
 
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_DOGS: {
      return { ...state, allDogs: action.payload };
    }

    case SEARCH_DOG: {
      return { ...state, allDogs: action.payload };
    }

    case GET_DOG_DETAIL: {
      return { ...state, dogDetail: action.payload };
    }

    case CLEAR_DETAIL: {
      return { ...state, dogDetail: {} };
    }

    case GET_ALL_TEMPERAMENTS: {
      return {...state, allTemperaments: action.payload};
    }
    

    case ORDER_BY_NAME: {
      let sortName = action.payload === "A-Z"
          ? state.allDogs.sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
              if (a.name.toLowerCase()  < b.name.toLowerCase() ) return -1;
              return 0;
            })
          : state.allDogs.sort((a, b) => {
              if (a.name.toLowerCase()  > b.name.toLowerCase() ) return -1;
              if (a.name.toLowerCase()  < b.name.toLowerCase() ) return 1;
              return 0;
            });
      return { ...state, allDogs: sortName };
    }

    case ORDER_BY_WEIGHT:{
      let sortWeight = action.payload === "Min to Max"
        ? state.allDogs.sort((a, b) => {
            if (parseInt(a.weight.substring(0,2).trim()) > parseInt(b.weight.substring(0,2).trim())) return 1;
            if (parseInt(a.weight.substring(0,2).trim()) < parseInt(b.weight.substring(0,2).trim())) return -1;
            return 0;
          })
        : state.allDogs.sort((a, b) => {
            if (parseInt(a.weight.substring(0,2).trim()) > parseInt(b.weight.substring(0,2).trim()) ) return -1;
            if (parseInt(a.weight.substring(0,2).trim()) < parseInt(b.weight.substring(0,2).trim()) ) return 1;
            return 0;
          });
    return { ...state, allDogs: sortWeight }
  }
  case FILTER_BY_ORIGIN: {
    if(action.payload === "all") {
      return {...state, filterDogs: []}
    }

    if(action.payload ==="Api Dog" ) {
      let api = state.allDogs?.filter((el) => el.apiDog === true )
      return {...state, filterDogs: api}
    }
    if(action.payload === "Data Base Dog"){
     let db = state.allDogs?.filter((el) => el.dogDbCreated === true )
    return {...state, filterDogs: db}
    }
  }
 
  case FILTER_BY_TEMPERAMENT: {
  
   if(action.payload === "all"){
     return {...state, filterDogs: []}
    }
    let dogsFound = state.allDogs?.filter((dog) => {
         for (const temp of dog.temperaments) {
              if(temp.name === action.payload){
                return dog
          }
         }
       }) 
      return {...state, filterDogs: dogsFound}

    }
    case CREATE_DOG: {
      return {...state}
    }
    case DELETE_DOG: {
      return { ...state};
    }

    default:
      return state;
  }
}

export default rootReducer;
