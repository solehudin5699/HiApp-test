import {firestore, storage} from "../../../services/firebase";
import {
  updateVictim as update,
  reset,
} from "./actionTypes";

const storageRef = storage.ref().child("photo")

export const updateVictim = (data:any) => {
  return (dispatch:any) => {
    dispatch(updateVictimPending());
    if(data.photo){
      let newUrl=""
      let titlePhoto=`${new Date().toISOString()}_${data?.photo?.name}`
      let desertRef = storageRef.child(data.titlePhoto);
      desertRef.delete().then(function() {
        storageRef.child(titlePhoto).put(data?.photo).then((res)=>{
          console.log("Success")
        }).then(()=>{
          return storageRef.child(titlePhoto).getDownloadURL()
        }).then(url=>{
          newUrl=url
          return firestore
            .collection('victims')
            .doc(`${data.id}`)
            .update({...data, photo:newUrl, titlePhoto});
        }).then(() => {
          console.log('Succesfull');
          let result = {
            status: 200,
            msg: 'Succes updating victim',
            data: {
              ...data, photo:newUrl
            }
          };
          dispatch(updateVictimFulfilled(result));
        }).catch((err) => {
          let error = {
            status: 500,
            msg: 'Error updating victim',
          };
          console.log(err);
          dispatch(updateVictimRejected(error));
        });
      }).catch(function(err) {
        // Uh-oh, an error occurred!
        let error = {
          status: 500,
          msg: 'Error updating victim',
        };
        console.log(err);
        dispatch(updateVictimRejected(error));
      });
    }else{
      firestore.collection('victims').doc(`${data.id}`).update(data).then(() => {
        console.log('Succesfull');
        let result = {
          status: 200,
          msg: 'Succes updating victim',
          data: data
        };
        dispatch(updateVictimFulfilled(result));
      }).catch(function(err) {
        // Uh-oh, an error occurred!
        let error = {
          status: 500,
          msg: 'Error updating victim',
        };
        dispatch(updateVictimRejected(error));
      });
    }
  }
};

const updateVictimPending = () => {
  return {
    type: update.pending,
  };
};
const updateVictimFulfilled = (data:any) => {
  return {
    type: update.fulfilled,
    payload: data,
  };
};
const updateVictimRejected = (error:any) => {
  return {
    type: update.rejected,
    payload: error,
  };
};
export const resetStatus = () => {
  return {
    type: reset.resetStatusUpdate,
  };
};
