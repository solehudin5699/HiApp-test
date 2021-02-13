import { login, logout} from "./actionTypes";
export const setLogin=(data:any)=>{
  return {
    type:login.setLogin,
    payload:data
  }
}
export const setLogout=()=>{
  return {
    type:logout.logout,
  }
}
