import { firestore } from "../../../services/firebase";
import { getVictim, reset } from "./actionTypes";

export const getAllVictims = (data:any) => {
  return (dispatch:any) => {
    dispatch(getAllVictimsPending());
    firestore.collection("victims")
      .where("phone", "==", data.phone)
      .orderBy("createdAt", "desc")
      .get()
      .then((data) => {
        let victims:any = [];
        data.forEach((doc) => {
          victims.push({
            id: doc.id,
            name: doc.data().name,
            age: doc.data().age,
            gender: doc.data().gender,
            phone: doc.data().phone,
            location: doc.data().location,
            address:doc.data().address,
            photo:doc.data().photo,
            createdAt:doc.data().createdAt,
            titlePhoto:doc.data().titlePhoto
          });
        });
        dispatch(getAllVictimFulfilled({ status: 200, data: victims }));
      })
      .catch((err) => {
        console.log(err)
        dispatch(
          getAllVictimsRejected({ status: 500, msg: "Can not get all victims" })
        );
      });
  };
};

const getAllVictimsPending = () => {
  return {
    type: getVictim.pending,
  };
};
const getAllVictimFulfilled = (data:any) => {
  return {
    type: getVictim.fulfilled,
    payload: data,
  };
};
const getAllVictimsRejected = (error:any) => {
  return {
    type: getVictim.rejected,
    payload: error,
  };
};
export const resetStatus = () => {
  return {
    type: reset.resetStatusGet,
  };
};
