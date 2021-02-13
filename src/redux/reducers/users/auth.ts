import { login} from "../../actions/users/actionTypes";

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
    default:
      return prevState;
  }
};

export default authReducer;
