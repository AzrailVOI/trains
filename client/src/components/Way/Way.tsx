import styles from './Way.module.scss';
import {ArrowRight, XSquare} from "lucide-react";
import {useTypedSelector} from "../../utils/useTypedSelector/useTypedSelector.ts";
import {ITickets} from "../../types/Tickets.interface.ts";
import Bubble from "../Bubble/Bubble.tsx";
import {dateFormatter} from "../../utils/dateFormatter/dateFormatter.ts";
import {setWayModule} from "../../redux/way/way.slice.ts";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import WayItem from "../WayItem/WayItem.tsx";
interface IWay {
}

export default function Way({trainNumber, arrivalTime, departureTime, startStation, endStation, trainType, trainClass}: IWay & ITickets){
    const way = useTypedSelector(state => state.way)
    const dispatch = useDispatch()

    useEffect(() => {
        console.log("WWAAYY",way)
    }, [way])
    function wayClose() {
        dispatch(setWayModule(false))
    }
    return (
        <>
            <div className={styles.root}>
                <div className={styles.way}>
                    <div className={styles.way_header}>
                        <div className={styles.way_head}>
                            <Bubble type={'text'}>
                                {trainNumber && trainNumber}
                            </Bubble>
                            <Bubble type={'text'}>
                                <>{arrivalTime && <>{dateFormatter(new Date(arrivalTime.split('T')[0])) + " " + arrivalTime.split('T')[1].split("Z")[0]}</>} - {departureTime && <>{dateFormatter(new Date(departureTime.split(' ')[0])) + " " + departureTime.split('T')[1].split("Z")[0]}</>}</>
                            </Bubble>
                            <Bubble type={'text'}>
                                <>{startStation && startStation} <ArrowRight style={{paddingRight: '0.5rem', paddingLeft: '0.5rem'}}/> {endStation}</>
                            </Bubble>
                            <Bubble type={'text'}>
                                {trainClass && trainClass}
                            </Bubble>
                            <Bubble type={'text'}>
                                {trainType && trainType}
                            </Bubble>
                        </div>
                        <div className={styles.way_x}>
                            <XSquare
                                size={'2rem'}
                                onClick={wayClose}
                            />
                        </div>
                    </div>
                    <div className={styles.way_body}>
                        {way.way.map((item) => (
                            <WayItem depTime={item.depTime} arrTime={item.arrTime} startCity={item.startCity} endCity={item.endCity}/>
                        ))}
                    </div>
                </div>
            </div>
        </>

    )
}
