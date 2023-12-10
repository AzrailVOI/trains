import {combineReducers, configureStore} from "@reduxjs/toolkit";
import ticketsSlice from "./tickets/tickets.slice.ts";
import waySlice from "./way/way.slice.ts";
import from_toSlice from "./from_to/from_to.slice.ts";

const reducers = combineReducers({
    tickets: ticketsSlice,
    way: waySlice,
    from_to: from_toSlice
})
export const store = configureStore({
    reducer: reducers,
    devTools: true
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
