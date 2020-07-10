import Axios from "axios";
import Cookie from "universal-cookie";
import userTypes from "../types/user";
import swal from "sweetalert";
const { ON_LOGIN_FAIL, ON_LOGIN_SUCCESS, ON_LOGOUT_SUCCESS, ON_CHANGE_PROFILE, ON_CHANGE_QUANTITY_CART } = userTypes;

const API_URL = `http://localhost:8080/`;
const cookieObj = new Cookie();

export const qtyCart = (userId) => {
  // console.log(userData)
  return (dispatch) => {
    Axios.get(`${API_URL}/carts/totalCart/${userId}/`)
      .then((res) => {
        console.log("masuk")
        dispatch({
          type: ON_CHANGE_QUANTITY_CART,
          payload: res.data.length
        });
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
export const loginHandler = (userData) => {
  // console.log(userData)
  return (dispatch) => {
    const { username, password } = userData;
    Axios.post(`${API_URL}/users/login`, userData)
      .then((res) => {
        console.log(res.data)
        swal("Sukses!", `Welcome ${res.data.username}`, "success");
        dispatch({
          type: ON_LOGIN_SUCCESS,
          payload: res.data,
        });
        Axios.get(`${API_URL}/carts/totalCart/${res.data.id}/`)
          .then((res) => {
            // console.log("masuk")
            dispatch({
              type: ON_CHANGE_QUANTITY_CART,
              payload: res.data.length
            });
          })
          .catch((err) => {
            console.log(err)
          })
      })
      .catch((err) => {
        console.log(err)
        // alert("error")
        swal("Salah", err.response.data.message, "error")
      })
  }
}

export const userKeepLogin = (userData) => {
  return (dispatch) => {
    Axios.post(`${API_URL}/users/login/${userData.id}`)
      .then((res) => {
        Axios.get(`${API_URL}/carts/totalCart/${res.data.id}/`)
          .then((res) => {
            // console.log("masuk")
            dispatch({
              type: ON_CHANGE_QUANTITY_CART,
              payload: res.data.length
            });
          })
          .catch((err) => {
            console.log(err)
          })
        dispatch({
          type: ON_LOGIN_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const cookieChecker = () => {
  return {
    type: "COOKIE_CHECK",
  };
};

export const logoutHandler = () => {
  cookieObj.remove("authData", { path: "/" });
  return {
    type: ON_LOGOUT_SUCCESS,
  };
};

export const changeProfileHandler = (userData) => {
  return {
    type: ON_CHANGE_PROFILE,
    payload: userData
  }
}