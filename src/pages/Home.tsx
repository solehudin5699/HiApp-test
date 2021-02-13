import React, {useState} from 'react'
import "./home.css"
import {IonIcon} from "@ionic/react"
import { add, exitOutline} from 'ionicons/icons'
import Cases from "../components/Cases"
import ModalAdd from "../components/ModalAdd"
import {useSelector, useDispatch} from "react-redux"
import {setLogout} from "../redux/actions/users/auth"
import {useHistory} from "react-router-dom"

export default function Home() {
  const [showModalAdd, setShowModalAdd] = useState(false);
  const {victims} = useSelector((state:any) => state.victim)
  const dispatch = useDispatch()
  const history= useHistory()
  const handleLogout=()=>{
    dispatch(setLogout())
    history.push("/login")
  }
  return (
    <>
    <div className="home_container">
      <h3 style={{color:"#FFFFFF"}}>Data of victims</h3>
      {victims.length?<Cases/>:(<h5 style={{color:"#FFFFFF"}}>Data empty</h5>)}
      <div onClick={()=>setShowModalAdd(true)} className="btn_addContainer"><IonIcon className="icon_add" icon={add} size="large" /></div>
      <div onClick={()=>handleLogout()} className="btn_logoutContainer"><IonIcon className="icon_exit" icon={exitOutline} size="large" /></div>
    </div>
    <ModalAdd isOpen={showModalAdd} setShowModal={setShowModalAdd}/>
    </>
  )
}
