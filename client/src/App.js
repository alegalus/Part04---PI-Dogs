import "./App.css";
import { Route, Switch } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { DogDetail } from "./components/DogDetail/DogDetail";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/detail/:id">
          <DogDetail/>
        </Route>

      </Switch>
    </div>
  );
}

export default App;
