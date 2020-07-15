import userTypes from "../types/user";

const { ON_LOGIN_FAIL, ON_LOGIN_SUCCESS, ON_LOGOUT_SUCCESS, ON_CHANGE_PROFILE, ON_CHANGE_QUANTITY_CART } = userTypes;
const init_state = {
    id: 0,
    username: "",
    fullName: "",
    alamat: "",
    role: "",
    email:"",
    noHp:"",
    isVerified: false,
    errMsg: "",
    cookieChecked: false,
    itemCart :0
}

export default (state = init_state, action) => {
    switch (action.type) {
        case ON_LOGIN_SUCCESS:
            const { username, fullName, role, id,alamat,email,noHp,verified } = action.payload;
            return {
                ...state,
                id,
                username,
                fullName,
                alamat,
                role,
                email,
                noHp,
                isVerified: verified,
                cookieChecked: true,
            };
        case ON_LOGIN_FAIL:
            return { ...state, errMsg: action.payload, cookieChecked: true };
        case "ON_REGISTER_FAIL":
            return { ...state, errMsg: action.payload, cookieChecked: true };
        case ON_LOGOUT_SUCCESS:
            return { ...init_state, cookieChecked: true };
        case ON_CHANGE_QUANTITY_CART:
            return {...state,itemCart: action.payload}
        case "COOKIE_CHECK":
            return { ...state, cookieChecked: true };
        // case ON_CHANGE_PROFILE:
        //     // const { username, fullName, role, id,alamat,email,noHp,isVerified } = action.payload;
        //     return {
        //         ...state,
        //         id,
        //         alamat,
        //         email,
        //         fullName,
        //         noHp,
        //         username,
        //         cookieChecked:true
        //     }
        default:
            return { ...state };
    }
}