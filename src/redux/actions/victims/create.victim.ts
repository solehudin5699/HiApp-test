import {firestore, storage} from "../../../services/firebase";
import { postVictim as post, reset } from "./actionTypes";

const storageRef = storage.ref().child("photo")

export const postVictim = (data:any) => {
  return (dispatch:any) => {
    dispatch(postVictimPending());
    let victim = {
      name: data.name,
      gender: data.gender,
      age: data.age,
      phone: data.phone,
      location: data.location,
      address: data.address,
      photo:data.photo,
      createdAt: new Date().toISOString(),
      titlePhoto:`${new Date().toISOString()}_${data?.photo?.name}`
    };
    storageRef.child(victim.titlePhoto).put(data?.photo).then((res)=>{
      console.log("Success")
    }).then(()=>{
      return storageRef.child(victim.titlePhoto).getDownloadURL()
    }).then(url=>{
      let newVictim={...victim, photo:url}
      firestore.collection("victims")
      .add(newVictim)
      .then((doc) => {
        let result = {
          status: 200,
          data: {
            id: doc.id,
            ...newVictim,
          },
          msg: "Success add victim",
        };
        dispatch(postVictimFulfilled(result));
      }).catch(err=>{
        let error = {
          status: 500,
          msg: "Failed add victim",
        };
        console.log(err)
        dispatch(postVictimRejected(error));
      })
    }).catch(err=>{
      let error = {
        status: 500,
        msg: "Failed add victim",
      };
      console.log(err)
      dispatch(postVictimRejected(error));
    })
  };
};

const postVictimPending = () => {
  return {
    type: post.pending,
  };
};
const postVictimFulfilled = (data:any) => {
  return {
    type: post.fulfilled,
    payload: data,
  };
};
const postVictimRejected = (error:any) => {
  return {
    type: post.rejected,
    payload: error,
  };
};
export const resetStatus = () => {
  return {
    type: reset.resetStatusPost,
  };
};
