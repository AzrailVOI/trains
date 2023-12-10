import styles from "./WayItem.module.scss"
import {IWayResponse} from "../../types/IWay.ts";
import {ArrowRight} from "lucide-react";
import {useDispatch} from "react-redux";
import {setTo} from "../../redux/from_to/from_to.slice.ts";
import {setWayModule} from "../../redux/way/way.slice.ts";
interface IWayItem {}

export default function WayItem({startCity, endCity, depTime, arrTime}: IWayItem&IWayResponse){
    const dispatch = useDispatch()
    function goToCity(city:string) {
        dispatch(setTo(city))
        dispatch(setWayModule(false))
    }
    return (
        <div className={styles.root}>
            <div
                className={styles.item}
                data-city={true}
                onClick={() => goToCity(startCity)}
            >
                {startCity}
            </div>
            <div className={styles.item}>
                {depTime[0]} {depTime[1]}
            </div>
            <div className={styles.item}>
                <ArrowRight style={{paddingRight: '0.5rem', paddingLeft: '0.5rem'}}/>
            </div>
            <div
                className={styles.item}
                data-city={true}
                onClick={() => goToCity(endCity)}
            >
                {endCity}
            </div>
            <div className={styles.item}>
                {arrTime[0]} {arrTime[1]}
            </div>
        </div>

    )
}
