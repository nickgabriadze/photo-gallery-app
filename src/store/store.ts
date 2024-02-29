import {configureStore} from "@reduxjs/toolkit";
import galleryStateReducer from "./features/galleryStateReducer.ts";


export const store = configureStore({
    reducer: {
        galleryState: galleryStateReducer
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;