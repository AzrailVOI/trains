import styles from './TicketItem.module.scss'
import Bubble from "../Bubble/Bubble.tsx";
import {ITickets} from "../../types/Tickets.interface.ts";
import {dateFormatter} from "../../utils/dateFormatter/dateFormatter.ts";
import {useTypedSelector} from "../../utils/useTypedSelector/useTypedSelector.ts";
interface ITicketItem {}

export default function TicketItem({  ticketId , trainNumber, trainType, departureTime, arrivalTime, numberOfCarriages, startStation, endStation, trainClass}: ITicketItem & ITickets){
    // console.log(ticketId, trainNumber, trainType, departureTime, arrivalTime, numberOfCarriages)
    const way = useTypedSelector(state => state.way)
    return (
    <div
        className={styles.item}
        data-way={way.ticket === Number(ticketId)}
    >
        <div className={styles.item_head}>
            <Bubble type={'text'}>
                {trainNumber && trainNumber}
            </Bubble>
            <Bubble type={'text'}>
                <>{trainClass && trainClass}</>
            </Bubble>
            <Bubble type={'text'}>
                {trainType && trainType}
            </Bubble>

        </div>
        <Bubble type={'text'}>
            <>{arrivalTime && <>{dateFormatter(new Date(arrivalTime.split('T')[0])) + " " + arrivalTime.split('T')[1].split("Z")[0]}</>} - {departureTime && <>{dateFormatter(new Date(departureTime.split(' ')[0])) + " " + departureTime.split('T')[1].split("Z")[0]}</>}</>
        </Bubble>
        <Bubble type={'ticket'} way={[startStation, endStation, Number(ticketId)]}>
            <>{startStation && startStation} - {endStation}</>
        </Bubble>
        <Bubble type={'text'}>
            <>{numberOfCarriages && numberOfCarriages} вагонов</>
        </Bubble>
    </div>

    )
}
