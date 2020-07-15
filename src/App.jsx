import React from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from "react-router-dom"
import Cookie from "universal-cookie"
import Navbar from "../src/views/components/Navbar"
import "bootstrap/dist/css/bootstrap.css";
import Home from './views/Home/Home';
import "./Creepster-Regular.ttf"
import Footer from './views/components/Footer';
import AuthScreen from './views/AuthScreen/AuthScreen';
import Products from './views/Products/Products';
import { cookieChecker, userKeepLogin } from "../src/redux/actions"
import LupaPassword from './views/AuthScreen/LupaPassword';
import AdminProducts from './views/Admin/AdminProducts';
import EditProfile from './views/AuthScreen/EditProfile';
import ProductDetails from './views/ProductDetails/ProductDetails';
import PaketDetails from './views/components/PaketDetails/PaketDetails';
import Cart from './views/Cart/Cart';
import PageNotFound from './views/components/PageNotFound';
import StatusBelanja from './views/Status Belanja User/StatusBelanja';
import AdminPayment from './views/Admin/AdminPayment';
import AdminReport from './views/Admin/AdminReport';
const cookieObj = new Cookie();

class App extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      let cookieResult = cookieObj.get("authData", { path: "/" });
      if (cookieResult) {
        this.props.keepLogin(cookieResult)

      }
      else {
        this.props.cookieChecker();
      }
    }, 200);
  }
  renderAdminRoutes = () => {
    if (this.props.user.role == "admin") {
      return (
        <>
          <Route exact path="/adminproducts" component={AdminProducts} />
          <Route exact path="/carts/:id" component={Cart} />
          <Route exact path ="/statusbelanja" component={StatusBelanja}/>
          <Route exact path="/adminPayment" component = {AdminPayment}/>
          <Route exact path="/adminreport" component={AdminReport}/>
        </>
      )
    }
    else if (this.props.user.role == "user") {
      return (
        <>
          <Route exact path="/editProfile" component={EditProfile} />
          <Route exact path="/carts/:id" component={Cart} />
          <Route exact path ="/statusbelanja" component={StatusBelanja}/>
        </>
      )
    }
    else{
      return <Route exact path="*" component={PageNotFound}/>
    }
  }
  render() {
    if (this.props.user.cookieChecked) {
      return (
        <>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Auth" component={AuthScreen} />
            <Route exact path="/products" component={Products} />
            <Route exact path="/productdetails/:id" component={ProductDetails} />
            <Route exact path="/paketDetails/:id" component={PaketDetails} />
            <Route exact path="/LupaPassword/:username/:verivy" component={LupaPassword} />
            {this.renderAdminRoutes()}
          </Switch>
          <Footer />
        </>
      );
    }
    else {
      return <div>Loading ...</div>;
    }
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  keepLogin: userKeepLogin,
  cookieChecker,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
