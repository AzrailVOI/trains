
import {ChevronsRight} from "lucide-react";
import styles from "./Header.module.scss";
import Dropdown from "../Dropdown/Dropdown.tsx";
import {useTypedSelector} from "../../utils/useTypedSelector/useTypedSelector.ts";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {useGetTickets} from "../../utils/getTickets/getTickets.ts";
import {setTickets} from "../../redux/tickets/tickets.slice.ts";

interface IHeader {
}

export default function Header({}: IHeader){
    const from = useTypedSelector((state) => state.from_to.from)
    const to = useTypedSelector((state) => state.from_to.to)
    const dispatch = useDispatch()
    const { data: tickets, mutate} = useGetTickets()

    useEffect(() => {
        console.log("TK",tickets)
        tickets && dispatch(setTickets(tickets.data))
    }, [tickets])

    useEffect(() => {
        console.log("FT",from, to)
        if (from !== '' && to !== ''){
            mutate({from, to})
        }
    }, [from, to])
    return (
        <div className={styles.header}>
            {/*<Bubble type={'main'}>*/}
            {/*    Ростов-Главный*/}
            {/*</Bubble>*/}
            <Dropdown from={true}/>
            <div className={styles.icon}>
                <ChevronsRight size={'5rem'}/>
            </div>

            <Dropdown from={false}/>


        </div>
    )
}
