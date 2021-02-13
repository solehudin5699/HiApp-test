import React, { useState, useEffect} from 'react';
import { IonModal, IonItem, IonInput, IonLabel, IonSelect, IonSelectOption} from '@ionic/react';
import "./modaladd.css"
import {useSelector, useDispatch} from "react-redux"
import {updateVictim, resetStatus} from "../redux/actions/victims/update.victim"

export default function ModalUpdate(props:any) {
  const [data, setData] = useState({name:"",age:"", address:"",photo:"", gender:"", location:"", oldPhoto:"", titlePhoto:""});
  const {isOpen, setShowModal, oldData} = props;
  const inputRef = React.useRef<any>();
  const handleChangeFile = (e:any) => {
    let files = e.target.files;
    setData({
      ...data,
      photo: files[0],
    });
  };
  useEffect(() => {
    if(isOpen){
      setData({name:oldData.name,age:oldData.age, address:oldData.address,oldPhoto:oldData.photo, gender:oldData.gender, location:oldData.location, titlePhoto:oldData.titlePhoto,photo:""})
    }
  }, [isOpen])
  const {isUpdatePending, isUpdateFulfilled, isUpdateRejected} = useSelector((state:any) => state.victim)
  const dispatch = useDispatch()
  const handleUpdate=()=>{
    dispatch(updateVictim({...data, id:oldData.id}))
  }
  useEffect(() => {
    if(isUpdateRejected||isUpdateFulfilled){
      setShowModal(false)
      dispatch(resetStatus())
    }
  }, [isUpdateFulfilled, isUpdateRejected])
  return (
    <>
      <IonModal isOpen={isOpen} onDidDismiss={() => setShowModal(false)}>
        <div className="modalAdd">
          <div className="titleAddModal">
            <h3>Update Data of Victim</h3>
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
            <img src={data.photo?URL.createObjectURL(data.photo):data.oldPhoto} alt="Select image" onClick={() => {inputRef.current.click();}} />
            <h3 className="selectPhoto">Select photo</h3>
          </div>
          </div>
          <div className="btnCancelAdd">
          <button  className="btnCancel_add" onClick={() => setShowModal(false)}>Cancel</button>
          <button className="btnAddVictim" onClick={() => handleUpdate()}>{isUpdatePending?"Loading...":"Update"} </button>
          </div>
        </div>
      </IonModal>
    </>
  );
};
