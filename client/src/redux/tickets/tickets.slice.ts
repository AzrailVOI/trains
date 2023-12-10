import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {StateTickets} from "../../types/Tickets.interface.ts";

const initialState:StateTickets = {
    tickets: []
}

export const ticketsSlice = createSlice({
    name: "tickets",
    initialState,
    reducers:{
        // @ts-ignore
        setTickets: (state, action: PayloadAction<string>) => {
            state.tickets = []
            const ticketsArr = decodeURIComponent(action.payload)
                .replace(/\+/g, " ")
                .split(';')
            ticketsArr.map((ticket: string) => {
                const [ticketId, trainNumber, trainType, arrivalTime, departureTime , numberOfCarriages, trainClass, startStation, endStation] = ticket.split(',');
                state.tickets.push({
                    ticketId,
                    trainNumber,
                    trainType: trainType === '1' ? 'Плацкарт' : trainType === '2' ? 'Купе' : "Люкс",
                    departureTime,
                    arrivalTime,
                    numberOfCarriages: Number(numberOfCarriages),
                    trainClass: trainClass === '1' ? 'Эконом' : trainClass === '2' ? 'Комфорт' : "Бизнес",
                    startStation,
                    endStation
                })
            })
        }
    }
})

export const { setTickets } = ticketsSlice.actions

export default ticketsSlice.reducer
