import {createSlice} from "@reduxjs/toolkit";
import {GalleryState} from "../../types.ts";



const initialState:GalleryState={
    currentPage: "Home",
    searchHistoryKeywords: [],
    currentlySearchingFor: "",
}


export const galleryState = createSlice({
    name: 'Gallery State',
    initialState,
    reducers: {
        updateCurrentlySearchingFor: (state, action:{payload:string}) =>{
          return {
              ...state,
              currentlySearchingFor: action.payload,
              searchHistoryKeywords: [...state.searchHistoryKeywords, action.payload]
          }
        },

    }
})

export const {updateCurrentlySearchingFor} = galleryState.actions;

export default galleryState.reducer;