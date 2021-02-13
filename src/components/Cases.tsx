import React, {useState, useEffect} from 'react'
import "./cases.css"
import {IonCard, IonItem, IonCardContent, IonButton, IonLabel, IonAvatar, IonIcon} from "@ionic/react"
import { trashOutline, createOutline} from 'ionicons/icons'
import ModalUpdate from "./ModalUpdate"
import {useDispatch, useSelector} from "react-redux"
import {getAllVictims} from "../redux/actions/victims/read.victim"
import ConfirmDelete from "./ConfirmDelete"
const dummy=[
  {
    name:"Nama Orang",
    photo:"https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y",
    gender:"Female",
    age:290,
    location:"Benua Antah Brantah",
    address:"Benua Antah Brantah, Benua Antah Brantah"
  },
  {
    name:"Nama Orang",
    photo:"https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y",
    gender:"Female",
    age:290,
    location:"Benua Antah Brantah",
    address:"Benua Antah Brantah, Benua Antah Brantah"
  },
  {
    name:"Nama Orang",
    photo:"https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y",
    gender:"Female",
    age:290,
    location:"Benua Antah Brantah",
    address:"Benua Antah Brantah, Benua Antah Brantah"
  }
  ,{
    name:"Nama Orang",
    photo:"https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y",
    gender:"Female",
    age:290,
    location:"Benua Antah Brantah",
    address:"Benua Antah Brantah, Benua Antah Brantah"
  }
  ,{
    name:"Nama Orang",
    photo:"https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y",
    gender:"Male",
    age:290,
    location:"Benua Antah Brantah",
    address:"Benua Antah Brantah, Benua Antah Brantah"
  }
]

export default function Cases() {
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [oldData, setOldData] = useState<Object>()
  const {user} = useSelector((state:any) => state.auth)
  const {victims} = useSelector((state:any) => state.victim)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllVictims({phone:user.phone}))
  }, [])
  return (
    <div className="cases_container">
      {victims.map((victim:any,index:any)=>{
        return(
          <>
        <IonCard key={index.toString()}>
          <IonItem>
            <IonAvatar>
              <img src={victim.photo} />
            </IonAvatar>
            <IonLabel style={{marginLeft:"5px"}}>{victim.name} ({victim.gender})</IonLabel>
          </IonItem>

          <IonCardContent>
            <table style={{width:"100%"}}>
              <tr>
                <td style={{width:"30%"}}>Age</td>
                <td>:</td>
                <td style={{width:"69%",paddingLeft:"3px"}}>{victim.age}</td>
              </tr>
              <tr>
                <td>Location</td>
                <td>:</td>
                <td style={{paddingLeft:"3px"}}>{victim.location}</td>
              </tr>
              <tr style={{verticalAlign:"top"}}>
                <td>Address</td>
                <td>:</td>
                <td style={{paddingLeft:"3px"}}>{victim.address}</td>
              </tr>
            </table>
          </IonCardContent>
          <IonItem style={{}}>
            <IonButton fill="outline" slot="end" onClick={()=>{setOldData(victim); setShowModalUpdate(true)}} ><IonIcon  icon={createOutline} size="medium" />Update</IonButton>
            <IonButton fill="outline" slot="end" onClick={()=>{setOldData(victim); setShowModalDelete(true)}}><IonIcon  icon={trashOutline} size="medium" />Delete</IonButton>
          </IonItem>
        </IonCard>
          </>
        )
      })}
      <ModalUpdate isOpen={showModalUpdate} setShowModal={setShowModalUpdate} oldData={oldData} />
      <ConfirmDelete isOpen={showModalDelete} setShowModal={setShowModalDelete} oldData={oldData} />
      </div>
  )
}
