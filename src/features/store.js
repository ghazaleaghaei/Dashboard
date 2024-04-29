import { configureStore } from '@reduxjs/toolkit'
import productsReducer from "./data/dataSlice"

export const store = configureStore({
    reducer: {
        productsData: productsReducer,
        //add another reducer here
    },
})
