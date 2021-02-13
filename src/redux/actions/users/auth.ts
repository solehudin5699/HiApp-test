import { login} from "./actionTypes";
export const setLogin=(data:any)=>{
  return {
    type:login.setLogin,
    payload:data
  }
}
