import "./App.css";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import Header from "./components/Header/Header";
import SignUp from "./components/SignUp/SignUp";
import NotFound from "./components/NotFound/NotFound";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route Path="/signup" exact component={SignUp} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
export default App;
