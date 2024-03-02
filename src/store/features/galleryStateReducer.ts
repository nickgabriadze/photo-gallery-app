import {createSlice} from "@reduxjs/toolkit";
import {GalleryState} from "../../types.ts";



const initialState:GalleryState={
    currentPage: "Home",
    searchHistoryKeywords: [],
    currentlySearchingFor: "",
    inCurrentView: null,
    cache:{}
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
        setInCurrentView:(state, action:{payload: string[]}) => {
            return {
                ...state,
                inCurrentView: action.payload.length === 0 ? null : {
                    id: action.payload[0],
                    img_url: action.payload[1],
                    description: action.payload[2]
                }
            }
        },


    }
})

export const {updateCurrentlySearchingFor, setInCurrentView} = galleryState.actions;

export default galleryState.reducer;