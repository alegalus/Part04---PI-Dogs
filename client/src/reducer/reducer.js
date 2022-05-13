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
  UPDATE_DOG,
  CLEAR_ALL_DOG,
} from "../actions/action";
// este es el initial state con todos los lugares en donde voy a guardar la info
const initialState = {
  allDogs: [],
  dogs:[],
  dogDetail: {},
  allTemperaments: [],
};

function rootReducer(state = initialState, action) {
  //aca switcheamos segun el action type(desde action van a venir las type que es que accion va a ocurrir y el payload)
  switch (action.type) {
    //en cada case guardamos en state lo que ya este y en el lugar que queremos modificar la infor nueva con payload
    case GET_ALL_DOGS: {
      return { ...state, allDogs: action.payload , dogs: action.payload};
    }
    //en los clear dejamos el state vacio para que cuando vuelva a renderizar no me muestre info vieja
    case CLEAR_ALL_DOG: {
      return { ...state, allDogs: [] };
    }
    case GET_DOG_DETAIL: {
      return { ...state, dogDetail: action.payload };
    }
    //aca en search dog nos va a guardar la busqueda
    case SEARCH_DOG: {
      return { ...state, allDogs: action.payload };
    }
    case CLEAR_DETAIL: {
      return { ...state, dogDetail: {} };
    }

    case GET_ALL_TEMPERAMENTS: {
      return {...state, allTemperaments: action.payload};
    }
    
//en los ordenamientos elegimos en payload solo la primer opcion
//y ordenamos el alldogs que es el que renderiza todo con un sort
//si el a.name es mayor que el b.name va a dar uno y los va a cambiar poniendo primero a b
//si a es menos que b.name va a dar menos 1 y va a dejar a primero
//si da cero no los mueve, el sort trabaja de acuerdo al codigo unicode
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
  //al final devuelve el alldogs ordenado segun corresponda
      return { ...state, allDogs: sortName };
    }
//este ordenamiento es igual al anterior, salvo que se creo un substring con el primer dato del peso
//por que notodos tenian dos datos, y con el trim eliminamos el espacio que podria tener despues
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
  //en este filtro buscamos ese valor que habiamos agregado en los perros tanto en los de la api como en los de db
  //y si tenia true el que correspondia los filtraba y los mostraba por pantalla
  //modificando el allDogd
  case FILTER_BY_ORIGIN: {
    if(action.payload ==="Api Dog" ) {
      let api = state.allDogs?.filter((el) => el.apiDog === true )
      return {...state, allDogs: api}
    }
    if(action.payload === "Data Base Dog"){
     let db = state.allDogs?.filter((el) => el.dogDbCreated === true )
    return {...state, allDogs: db}
    }
  }
 //en el filtrado por temperamentos se hizo un deoble recorrido
 //priemro en ercorre todos los perros con el filter
 //despues con el for of recorre los temperamentos nde cada perro or que es un arreglo de objetos dentro del perro
 //y ahi comparo si el payload(la opcion elegida en el select) esta incluida en ese perro, ose si tiene ese temperamento
 //y al final me devuelve filtrado los perros que tienen ese temp buscado
  case FILTER_BY_TEMPERAMENT: {
  
    let dogsFound = state.allDogs?.filter((dog) => {
         for (const temp of dog.temperaments) {
              if(temp.name === action.payload){
                return dog
          }
         }
       }) 
      return {...state, allDogs: dogsFound}

    }
    //para el create, el delete y el post solo devuelvo todo el state por que voy a estar modificabdo solo en el back
    //y en el get de alldogs cuando se haga va a venir actualizado de acuerdo a las modificaciones
    case CREATE_DOG: {
      return {...state}
    }
    case DELETE_DOG: {
      return { ...state};
    }
    case UPDATE_DOG: {
      return {...state}
    }

    default:
      return state;
  }
}

export default rootReducer;
