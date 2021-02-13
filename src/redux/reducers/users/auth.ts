import { login, logout} from "../../actions/users/actionTypes";

const initialState = {
  user: {},
  isLogin: false,
};

const authReducer = (prevState = initialState, action:any) => {
  switch (action.type) {
    case login.setLogin:
      return {
        ...prevState,
        user: {phone:action.payload},
        isLogin:true
      };
    case logout.logout:
    return {
      ...prevState,
      user: {},
      isLogin:false
    };
    default:
      return prevState;
  }
};

export default authReducer;
