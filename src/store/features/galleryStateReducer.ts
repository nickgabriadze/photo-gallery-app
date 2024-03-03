import {createSlice} from "@reduxjs/toolkit";
import {GalleryState, UnsplashPhoto} from "../../types.ts";


const initialState: GalleryState = {
    currentPage: "Home",
    searchHistoryKeywords: [],
    currentlySearchingFor: "",
    inCurrentView: null,
    cache: {}
}


export const galleryState = createSlice({
    name: 'Gallery State',
    initialState,
    reducers: {
        updateCurrentlySearchingFor: (state, action: { payload: string }) => {
            if(!state.searchHistoryKeywords.includes(action.payload)){
            return {
                ...state,
                currentlySearchingFor: action.payload,
                searchHistoryKeywords: [...state.searchHistoryKeywords, action.payload]
            }}else{
                return{
                    ...state,
                    currentlySearchingFor: action.payload
                }
            }
        },
        setInCurrentView: (state, action: { payload: string[] }) => {
            return {
                ...state,
                inCurrentView: action.payload.length === 0 ? null : {
                    id: action.payload[0],
                    img_url: action.payload[1],
                    description: action.payload[2],
                    n_likes: action.payload[3]
                }
            }
        },
        setCache: (state, action: {
            payload: {
                keyword: string,
                data: UnsplashPhoto[]
            }
        }) => {
            return {
                ...state,
                cache: {
                    ...state.cache,
                    [`${action.payload.keyword}`]: [...action.payload.data]
                }
            }
        }


    }
})

export const {updateCurrentlySearchingFor, setInCurrentView, setCache} = galleryState.actions;

export default galleryState.reducer;