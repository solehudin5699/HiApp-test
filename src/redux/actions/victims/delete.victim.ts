import {firestore} from "../../../services/firebase";
import { deleteVictim as del, reset } from "./actionTypes";

export const deleteVictim = (data:any) => {
  return (dispatch:any) => {
    dispatch(deleteVictimPending());
    let document = firestore.doc(`/victims/${data.id}`);
    document
      .get()
      .then((doc:any) => {
        if (doc.exists) {
          document
          .delete()
          .then((res) => {
            let result = {
              status: 200,
              msg: "Successfully deleting victim",
              id: data.id,
            };
            dispatch(deleteVictimFulfilled(result));
          })
          .catch((err) => {
            let error = {
              status: 500,
              msg: "Failed deleting victim",
            };
            dispatch(deleteVictimRejected(error));
          });
        } else {
          let error = {
            status: 500,
            msg: "Data not found",
          };
          dispatch(deleteVictimRejected(error));
        }
      })
      .catch((err) => {
        let error = {
          status: 500,
          msg: "Failed deleting victim",
        };
        dispatch(deleteVictimRejected(error));
      });
  };
};

const deleteVictimPending = () => {
  return {
    type: del.pending,
  };
};
const deleteVictimFulfilled = (data:any) => {
  return {
    type: del.fulfilled,
    payload: data,
  };
};
const deleteVictimRejected = (error:any) => {
  return {
    type: del.rejected,
    payload: error,
  };
};
export const resetStatus = () => {
  return {
    type: reset.resetStatusDelete,
  };
};
