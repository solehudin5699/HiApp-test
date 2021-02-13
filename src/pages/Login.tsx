import React , {useState, useEffect} from "react"
import {useHistory} from "react-router-dom"
import './login.css';
// import firebase from "../services/fb"
import {auth, firebase} from "../services/firebase"
import {useSelector, useDispatch} from "react-redux"
import {setLogin} from "../redux/actions/users/auth"

declare global {
  interface Window {
    recaptchaVerifier:any;
    confirmationResult:any;
  }
}

const Login: React.FC = () => {
  const dispatch = useDispatch()
  const [phone, setPhone] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const setUpRecapcha=()=>{
    window.recaptchaVerifier= new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response:any) => {
        onSignInSubmit();
      }
    })
  }
  const onSignInSubmit=()=>{
    setLoading(true)
    setUpRecapcha()
    const phoneNumber = phone;
    const appVerifier = window.recaptchaVerifier;
    auth.signInWithPhoneNumber(phoneNumber, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
      const code:any = window.prompt("Enter OTP code");
      confirmationResult.confirm(code).then((result) => {
        const user = result.user;
        console.log(user?.phoneNumber)
        dispatch(setLogin(user?.phoneNumber))
        setLoading(false)
      }).catch((error) => {
        console.log("Failed")
        setLoading(false)
      });
      // ...
    }).catch((error) => {
      // Error; SMS not sent
      console.log("Failed")
      setLoading(false)
    });
  }
  const history=useHistory()
  const {isLogin} = useSelector((state:any) => state.auth)
  useEffect(() => {
    if(isLogin){
      history.push("/")
    }
  }, [isLogin])
  return (
    <div className="containerLogin">
      <div className="loginTitle">
        <h1>Login</h1>
        <p>Please login first to access LaporCovid</p>
      </div>
      <div className="form">
        <input onChange={(e)=>setPhone(e.target.value)} placeholder="Phone number eg: +628xxxxxxxxx" className="phone" type="phone"/>
        <button onClick={()=>onSignInSubmit() } className="btnLogin">{loading?"Loading...":"Log In"}</button>
      </div>
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default Login;
