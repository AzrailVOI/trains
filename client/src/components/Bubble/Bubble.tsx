import {JSX, useEffect} from "react";
import styles from "./Bubble.module.scss"
import {TrainTrack} from "lucide-react";
import {useGetWay} from "../../utils/getWay/getWay.ts";
import {useDispatch} from "react-redux";
import {setChosenTicket, setWay, setWayModule} from "../../redux/way/way.slice.ts";
import {IWayResponse} from "../../types/IWay.ts";
import {dateFormatter} from "../../utils/dateFormatter/dateFormatter.ts";
interface IBubble {
    children: JSX.Element | JSX.Element[] | string
    type: 'main' | 'text' | 'search' | 'ticket'
    onClick?: (e:any) => void
    cityId?: string
    way?: [string, string, number]
}

export default function Bubble({children, type, onClick, cityId, way}: IBubble){
    const {data:gettedWay, mutate} = useGetWay()
    const dispatch = useDispatch()
    async function TicketClick(way:[string, string, number]) {
        console.log("WAY",way)
        dispatch(setChosenTicket(way[2]))
        dispatch(setWayModule(true))
        way && mutate({ticket: way[2], to: way[1], from: way[0]})
    }
    useEffect(() => {
        if (gettedWay){
            const incorrectWay = decodeURIComponent(gettedWay.data)
                .replace(/\+/g, " ")
                .split(';')
            console.log("Way", incorrectWay)
            const way:IWayResponse[] = incorrectWay.map((way)=>{
                return{
                    depTime: [dateFormatter(new Date(way.split(',')[0].split('T')[0])), way.split(',')[0].split('T')[1].split('Z')[0]],
                    startCity: way.split(',')[1],
                    arrTime: [dateFormatter(new Date(way.split(',')[2].split('T')[0])), way.split(',')[2].split('T')[1].split('Z')[0]],
                    endCity: way.split(',')[3]
                }
            })
            dispatch(setWay(way))
        }
    }, [gettedWay])
    return (
        <div
            className={styles.bubble}
            data-type={type}
            onClick={onClick}
            data-cityId={cityId}
        >
            {type === 'ticket' ? <span>{children}</span> : children }
            {
                type === 'ticket' && way &&
                    <>
                        <div
                            className={styles.button}
                            onClick={() => TicketClick(way)}
                        >
                            <TrainTrack/>
                        </div>

                    </>
            }
        </div>
    )
}
