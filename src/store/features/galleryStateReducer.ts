import {createSlice} from "@reduxjs/toolkit";
import {Page} from "../../types/types.ts";



const initialState={
    currentPage: "Home",
    searchHistoryKeywords: [],



}


export const galleryState = createSlice({
    name: 'Gallery State',
    initialState,
    reducers: {
        updateCurrentPage: (state, action:{payload:Page}) => {
            return {
                ...state,
                currentPage: action.payload
            }
        }
    }
})

export const {updateCurrentPage} = galleryState.actions;

export default galleryState.reducer;