import TicketItem from "../TicketItem/TicketItem.tsx";
import styles from './TicketsPage.module.scss'
// import {useEffect} from "react";
import {useTypedSelector} from "../../utils/useTypedSelector/useTypedSelector.ts";

interface ITicketsPage {
}

export default function TicketsPage({}: ITicketsPage){
    const {tickets} = useTypedSelector(state => state.tickets)
    // useEffect(() => {
    //     console.log("TP",tickets, !!tickets)
    // }, [tickets])

    if (tickets) {
        if (tickets.length > 0){
            return (
                <div className={styles.page}>
                    {
                        tickets.map(ticket => {
                            if (ticket.ticketId !== "") {
                                return (<TicketItem key={ticket.trainNumber}
                                                    trainNumber={ticket.trainNumber}
                                                    startStation={ticket.startStation}
                                                    arrivalTime={ticket.arrivalTime}
                                                    endStation={ticket.endStation}
                                                    departureTime={ticket.departureTime}
                                                    numberOfCarriages={ticket.numberOfCarriages}
                                                    trainType={ticket.trainType}
                                                    ticketId={ticket.ticketId}
                                                    trainClass={ticket.trainClass}
                                />)
                            }
                            else {
                                return <div className={styles.page}>
                                    <h1>Билетов не найдено</h1>
                                </div>
                            }

                        })}
                </div>
            )
        }else {
            return (
                <div className={styles.page}>
                    <h1>Билетов не найдено</h1>
                </div>
            )
        }
    }


}
