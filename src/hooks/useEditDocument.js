import { useState, useReducer } from "react";
import { db } from "../firebase/config";
import { updateDoc, doc } from "firebase/firestore";

const initialState = {
  loading: null,
  error: null,
};

const editReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "UPDATED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export const useEditDocument = (docCollection) => {
  const [response, dispatch] = useReducer(editReducer, initialState);
  
  // deal with memory task
  const [cancelled] = useState(false);
  
  const checkCancelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const editDocument = async (id, data) => {
    checkCancelBeforeDispatch({ type: "LOADING" });

    try {
      
        const docRef = await doc(db, docCollection, id)

        const editedDocument = await updateDoc(docRef, data)

      checkCancelBeforeDispatch({
        type: "UPDATED_DOC",
        payload: editedDocument,
      });
    } catch (error) {
      checkCancelBeforeDispatch({ type: "ERROR", payload: error.message });
    }
  };
  
  return { editDocument, response };
};
