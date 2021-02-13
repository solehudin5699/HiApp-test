import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux"
import { IonModal, IonItem, IonInput, IonLabel, IonItemDivider, IonSelect, IonSelectOption} from '@ionic/react';
import "./modaladd.css"
import imgEmpty from "../assets/img.png"
import {postVictim, resetStatus} from "../redux/actions/victims/create.victim"

export default function ModalAdd(props:any) {
  const [data, setData] = useState({name:"",age:"", address:"",photo:"", gender:"", location:""});
  const {isOpen, setShowModal} = props;
  const inputRef = React.useRef<any>();
  const handleChangeFile = (e:any) => {
    let files = e.target.files;
    setData({
      ...data,
      photo: files[0],
    });
    console.log(data.photo)
  };
  const dispatch = useDispatch()
  const {user} = useSelector((state:any)=> state.auth)
  const {isPostPending,isPostFulfilled,isPostRejected}= useSelector((state:any) => state.victim)
  const handleAdd=()=>{
    const dataPost= {
      ...data, phone:user.phone
    }
    dispatch(postVictim(dataPost))
  }
  useEffect(() => {
    if(isPostFulfilled||isPostRejected){
      setShowModal(false)
      dispatch(resetStatus())
      console.log("Success")
    }
  }, [isPostFulfilled,isPostRejected])
  return (
    <>
      <IonModal isOpen={isOpen} onDidDismiss={() => setShowModal(false)}>
        <div className="modalAdd">
          <div className="titleAddModal">
            <h3>Add Data of Victim</h3>
          </div>
          <div className="contentForm">
          <IonItem>
            <IonLabel position="floating">Name</IonLabel>
            <IonInput required value={data.name} onIonChange={e => setData({...data,name:e.detail.value!})}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Age</IonLabel>
            <IonInput type="number" required value={data.age} onIonChange={e => setData({...data,age:e.detail.value!})}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>Gender</IonLabel>
            <IonSelect value={data.gender} onIonChange={e => setData({...data,gender:e.detail.value})}>
              <IonSelectOption value="male">Male</IonSelectOption>
              <IonSelectOption value="female">Female</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Address</IonLabel>
            <IonInput type="text" required value={data.address} onIonChange={e => setData({...data,address:e.detail.value!})}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Location</IonLabel>
            <IonInput type="text" required value={data.location} onIonChange={e => setData({...data,location:e.detail.value!})}></IonInput>
          </IonItem>
          <input style={{display:"none"}} type="file" onChange={(e:any) => handleChangeFile(e)}
          ref={inputRef}/>
          <div className="photoContainer">
            <img src={data.photo?URL.createObjectURL(data.photo):imgEmpty} alt="Select image" onClick={() => {inputRef.current.click();}} />
            <h3 className="selectPhoto">Select photo</h3>
          </div>
          </div>
          <div className="btnCancelAdd">
          <button  className="btnCancel_add" onClick={() => setShowModal(false)}>Cancel</button>
          <button className="btnAddVictim" onClick={() => handleAdd()}>{isPostPending?"Loading...":"Add"}</button>
          </div>
        </div>
      </IonModal>
    </>
  );
};
