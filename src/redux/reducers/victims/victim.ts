import {
  postVictim,
  getVictim,
  updateVictim,
  deleteVictim,
  reset,
} from "../../actions/victims/actionTypes";

const initialState = {
  dataPost: {},
  errorPost: undefined,
  isPostPending: false,
  isPostFulfilled: false,
  isPostRejected: false,

  victims:Array<{}>(),
  errorGet: undefined,
  isGetPending: false,
  isGetFulfilled: false,
  isGetRejected: false,

  dataUpdate: {},
  errorUpdate: undefined,
  isUpdatePending: false,
  isUpdateFulfilled: false,
  isUpdateRejected: false,

  dataDelete: {},
  errorDelete: undefined,
  isDeletePending: false,
  isDeleteFulfilled: false,
  isDeleteRejected: false,
};

const victimReducer = (prevState = initialState, action:any) => {
  switch (action.type) {
    //CREATE
    case postVictim.pending:
      return {
        ...prevState,
        isPostPending: true,
      };
    case postVictim.fulfilled:
      prevState.victims.push(action.payload.data);
      return {
        ...prevState,
        dataPost: action.payload,
        isPostPending: false,
        isPostFulfilled: true,
        isPostRejected: false,
      };
    case postVictim.rejected:
      return {
        ...prevState,
        errorPost: action.payload,
        isPostPending: false,
        isPostFulfilled: false,
        isPostRejected: true,
      };

    //GET 
    case getVictim.pending:
      return {
        ...prevState,
        isGetPending: true,
      };
    case getVictim.fulfilled:
      return {
        ...prevState,
        victims: action.payload.data,
        isGetPending: false,
        isGetFulfilled: true,
        isGetRejected: false,
      };
    case getVictim.rejected:
      return {
        ...prevState,
        errorGet: action.payload,
        isGetPending: false,
        isGetFulfilled: false,
        isGetRejected: true,
      };

    //UPDATE 
    case updateVictim.pending:
      return {
        ...prevState,
        isUpdatePending: true,
      };
    case updateVictim.fulfilled:
      let updatedVictims = prevState.victims.map((item:any) => {
        if (item.id == action.payload.data.id) {
          return {
            ...item,
            ...action.payload.data,
          };
        } else {
          return item;
        }
      });
      return {
        ...prevState,
        victims: updatedVictims,
        dataUpdate: action.payload,
        isUpdatePending: false,
        isUpdateFulfilled: true,
        isUpdateRejected: false,
      };
    case updateVictim.rejected:
      return {
        ...prevState,
        errorUpdate: action.payload,
        isUpdatePending: false,
        isUpdateFulfilled: false,
        isUpdateRejected: true,
      };

    //DELETE 
    case deleteVictim.pending:
      return {
        ...prevState,
        isDeletePending: true,
      };
    case deleteVictim.fulfilled: {
      let newVictims = prevState.victims.filter(
        (item:any) => item.id.toString() != action.payload.id.toString()
      );
      return {
        ...prevState,
        victims: newVictims,
        dataDelete: action.payload,
        isDeletePending: false,
        isDeleteFulfilled: true,
        isDeleteRejected: false,
      };
    }
    case deleteVictim.rejected:
      return {
        ...prevState,
        errorDelete: action.payload,
        isDeletePending: false,
        isDeleteFulfilled: false,
        isDeleteRejected: true,
      };
    case reset.resetStatusPost:
      return {
        ...prevState,
        isPostFulfilled: false,
        isPostRejected: false,
      };
    case reset.resetStatusGet:
      return {
        ...prevState,
        isGetFulfilled: false,
        isGetRejected: false,
      };
    case reset.resetStatusUpdate:
      return {
        ...prevState,
        isUpdateFulfilled: false,
        isUpdateRejected: false,
      };
    case reset.resetStatusDelete:
      return {
        ...prevState,
        isDeleteFulfilled: false,
        isDeleteRejected: false,
      };
    default:
      return prevState;
  }
};

export default victimReducer;
