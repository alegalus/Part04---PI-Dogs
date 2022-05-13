import {createStore, applyMiddleware, compose} from "redux"
import rootReducer from "../reducer/reducer"
import thunk from "redux-thunk"
//esto es para que funcionen las redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose 
//aca conecto el store con los reducer que tenga y con el thunk que sirve para poder hacer peticiones asincronas
const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
)

export default store