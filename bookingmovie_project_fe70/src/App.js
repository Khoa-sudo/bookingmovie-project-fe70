import "./App.css";
import { createBrowserHistory } from "history";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import News from "./pages/News/News";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Detail from "./pages/Detail/Detail";
import Checkout from "./pages/Checkout/Checkout";
import { Router, Switch } from "react-router-dom";
import CheckoutTemplate from "./templates/CheckoutTemplate/CheckoutTemplate";
import { UserTemplate } from "./templates/UserTemplate/UserTemplate";
import Loading from "./components/Loading/Loading";
import Profile from "./pages/Profile/Profile";
import AdminTemplate from "./templates/AdminTemplate/AdminTemplate";
import Dashboard from "./pages/Admin/Dashboard.js/Dashboard";
import Films from "./pages/Admin/Films/Films";
import Users from "./pages/Admin/Users/Users";
import AddNew from "./pages/Admin/Films/AddNew/AddNew";
import EditFilm from "./pages/Admin/Films/EditFilm/EditFilm";
import Showtime from "./pages/Admin/Films/Showtime/Showtime";

//sử dụng loading lazy

export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Loading /> 
      <Switch>
        <HomeTemplate exact path="/" Component={Home} />
        <HomeTemplate exact path="/home" Component={Home} />
        <HomeTemplate exact path="/contact" Component={Contact} />
        <HomeTemplate exact path="/news" Component={News} />
        <HomeTemplate exact path="/detail/:id" Component={Detail} />
        <HomeTemplate exact path="/profile" Component={Profile} />
        <CheckoutTemplate exact path="/checkout/:id" Component={Checkout} />
        
        <UserTemplate path="/login" exact Component={Login} />
        <UserTemplate path="/register" exact Component={Register} />

        <AdminTemplate exact path="/admin" Component={Dashboard}/>
        <AdminTemplate exact path="/admin/films" Component={Films}/>
        <AdminTemplate exact path="/admin/films/addnew" Component={AddNew}/>
        <AdminTemplate exact path="/admin/films/edit/:id" Component={EditFilm}/>
        <AdminTemplate exact path="/admin/films/showtime/:id" Component={Showtime}/>
        <AdminTemplate exact path="/admin/users" Component={Users}/>
      </Switch>
    </Router>
  );
}

export default App;
