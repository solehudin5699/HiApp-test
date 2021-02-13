import React, {useState} from 'react'
import "./home.css"
import {IonIcon} from "@ionic/react"
import { add} from 'ionicons/icons'
import Cases from "../components/Cases"
import ModalAdd from "../components/ModalAdd"
import {useSelector} from "react-redux"

export default function Home() {
  const [showModalAdd, setShowModalAdd] = useState(false);
  const {victims} = useSelector((state:any) => state.victim)
  return (
    <>
    <div className="home_container">
      <h3 style={{color:"#FFFFFF"}}>Data of victims</h3>
      {victims.length?<Cases/>:(<h5 style={{color:"#FFFFFF"}}>Data kosong</h5>)}
      <div onClick={()=>setShowModalAdd(true)} className="btn_addContainer"><IonIcon className="icon_add" icon={add} size="large" /></div>
    </div>
    <ModalAdd isOpen={showModalAdd} setShowModal={setShowModalAdd}/>
    </>
  )
}
