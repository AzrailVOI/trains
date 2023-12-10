import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IWayResponse} from "../../types/IWay.ts";



const initialState: { way: IWayResponse[], ticket: number, wayModule: boolean } = {
    way: [],
    ticket: -1,
    wayModule: true
}

export const waySlice = createSlice({
    name: "way",
    initialState,
    reducers:{
        setWay: (state, action: PayloadAction<IWayResponse[]>) => {
            state.way = []
            //2023-12-02T11:20Z,Ростов-на-Дону,2023-12-02T12:10Z,Белгород
            action.payload.map((item) => {
                state.way.push({
                    startCity: item.startCity,
                    endCity: item.endCity,
                    arrTime: item.arrTime,
                    depTime: item.depTime
                })
            })
        },
        setChosenTicket: (state, action: PayloadAction<number>) => {
            state.ticket = action.payload
        },
        setWayModule: (state, action: PayloadAction<boolean>) => {
            state.wayModule = action.payload
        }
    }
})

export const { setWay, setChosenTicket, setWayModule } = waySlice.actions

export default waySlice.reducer
