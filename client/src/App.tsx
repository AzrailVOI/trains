import styles from './App.module.scss'
import Header from "./components/Header/Header.tsx";
import TicketsPage from "./components/TicketsPage/TicketsPage.tsx";
import Way from "./components/Way/Way.tsx";
import {useTypedSelector} from "./utils/useTypedSelector/useTypedSelector.ts";

function App() {
    const {tickets} = useTypedSelector(state => state.tickets)
    const way = useTypedSelector(state => state.way)
    return (
    <div className={styles.page}>
        {
            tickets && way && tickets.map((ticket) => (
                way.wayModule && way.ticket === Number(ticket.ticketId) && <Way
                    key={ticket.ticketId}
                    ticketId={ticket.ticketId}
                    trainNumber={ticket.trainNumber}
                    trainType={ticket.trainType}
                    departureTime={ticket.departureTime}
                    arrivalTime={ticket.arrivalTime}
                    numberOfCarriages={ticket.numberOfCarriages}
                    trainClass={ticket.trainClass}
                    startStation={ticket.startStation}
                    endStation={ticket.endStation}
                />
            ))
        }
      <Header/>
      <TicketsPage/>

    </div>
  )
}

export default App
