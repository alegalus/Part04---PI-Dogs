import "./App.css";
import { Route, Switch } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { DogDetail } from "./components/DogDetail/DogDetail";
import { LandingPage } from "./components/LandingPage/LandingPage";
import { FormDog } from "./components/FormDog/FormDog";

function App() {
  return (
    //armamos el router de cada componente con distinta url
    <div>
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/detail/:id" >
          <DogDetail />
        </Route>
        <Route exact path="/Formdog">
          <FormDog/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
