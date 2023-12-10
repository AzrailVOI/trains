import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IFromTo} from "../../types/IFromTo.ts";

const initialState:IFromTo = {
    from: '',
    to: ''
}

export const from_toSlice = createSlice({
    name: "tickets",
    initialState,
    reducers:{
        // @ts-ignore
        setFrom: (state, action: PayloadAction<string>) => {
            state.from = action.payload
        },
        // @ts-ignore
        setTo: (state, action: PayloadAction<string>) => {
            state.to = action.payload
        }
    }
})

export const { setFrom, setTo } = from_toSlice.actions

export default from_toSlice.reducer
