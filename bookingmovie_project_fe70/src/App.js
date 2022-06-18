import "./App.css";
import { createBrowserHistory } from "history";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import News from "./pages/News/News";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Detail from "./pages/Detail/Detail";
import { Route, Router, Switch } from "react-router-dom";
export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Switch>
        <HomeTemplate exact path="/" Component={Home} />
        <HomeTemplate exact path="/home" Component={Home} />
        <HomeTemplate exact path="/contact" Component={Contact} />
        <HomeTemplate exact path="/news" Component={News} />
        <HomeTemplate exact path="/detail/:id" Component={Detail} />


        <Route path="/login" exact Component={Login} />
        <Route path="/register" exact Component={Register} />
      </Switch>
    </Router>
  );
}

export default App;
