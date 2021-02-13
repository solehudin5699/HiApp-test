import React, { useState, useEffect} from 'react';
import { IonModal} from '@ionic/react';
import {useDispatch, useSelector} from "react-redux"
import "./modaladd.css"
import {deleteVictim, resetStatus} from "../redux/actions/victims/delete.victim"

export default function ConfirmDelete(props:any) {
  const [data, setData] = useState({name:"",age:"", address:"",photo:"", gender:"", location:"", oldPhoto:"", id:""});
  const {isOpen, setShowModal, oldData} = props;
  useEffect(() => {
    if(isOpen){
      setData({...data, ...oldData})
    }
  }, [isOpen])
  const dispatch = useDispatch()
  const {isDeletePending, isDeleteFulfilled,isDeleteRejected } = useSelector((state:any) => state.victim)
  const handleDelete=()=>{
    dispatch(deleteVictim({id:data.id}))
  }
  useEffect(() => {
    if(isDeleteRejected||isDeleteFulfilled){
      setShowModal(false)
      dispatch(resetStatus())
    }
  }, [isDeleteFulfilled,isDeleteRejected ])
  return (
    <>
      <IonModal backdropDismiss showBackdrop={true} isOpen={isOpen} onDidDismiss={() => setShowModal(false)}>
        <div className="modalDelete">
          <div style={{padding:"15px"}}>
          <h3 style={{textAlign:"center"}}>Victim detail</h3>
          <img src={data.photo} alt="photo" style={{width:"100%"}} />
            <table style={{width:"100%"}}>
              <tr>
                <td style={{width:"30%", verticalAlign:"top"}}>Name</td>
                <td style={{width:"70%"}}>{data.name}</td>
              </tr>
              <tr>
                <td style={{ verticalAlign:"top"}}>Gender</td>
                <td>{data.gender}</td>
              </tr>
              <tr>
                <td style={{ verticalAlign:"top"}}>Age</td>
                <td>{data.age}</td>
              </tr>
              <tr>
                <td style={{ verticalAlign:"top"}}>Address</td>
                <td>{data.address}</td>
              </tr>
              <tr>
                <td style={{ verticalAlign:"top"}}>Location</td>
                <td>{data.location}</td>
              </tr>
            </table>
          </div>
          <div className="modalDelete_btn">
          <h3>Delete this victim ?</h3>
          <div className="btnCancelDelete">
            <button  className="btnCancel_delete" onClick={() => setShowModal(false)}>Cancel</button>
            <button className="btnDeleteVictim" onClick={() => handleDelete()}>{isDeletePending?"Loading...":"Delete"} </button>
          </div>
        </div>
        </div>
      </IonModal>
    </>
  );
};
