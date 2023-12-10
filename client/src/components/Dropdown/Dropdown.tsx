import styles from "./Dropdown.module.scss";
import {ChevronDown, Search} from "lucide-react";
import {useEffect, useState} from "react";
import Bubble from "../Bubble/Bubble.tsx";
import Loader from "../Loader/Loader.tsx";
import {useDispatch} from "react-redux";
// import {setTickets} from "../../redux/tickets/tickets.slice.ts";
import {useGetCities} from "../../utils/getCities/getCities.ts";
// import {useGetTickets} from "../../utils/getTickets/getTickets.ts";
import {setFrom, setTo} from "../../redux/from_to/from_to.slice.ts";
import {useTypedSelector} from "../../utils/useTypedSelector/useTypedSelector.ts";

interface IDropdown {
    from: boolean
}
export default function Dropdown({from}: IDropdown) {
    const [active, setActive] = useState(false);
    const [city, setCity] = useState('');
    const [choosedFromCity, setChoosedFromCity] = useState<string>('');
    const [choosedToCity, setChoosedToCity] = useState<string>('');
    const [punkt, setPunkt] = useState<boolean>(true);
    const from_to = useTypedSelector((state) => state.from_to)

    const { data: citiesSet, isLoading: citiesLoading } = useGetCities()
    const dispatch = useDispatch()

    // const { data: tickets, mutate} = useGetTickets()


    // useEffect(() => {
    //     console.log(citiesSet);
    // }, [citiesSet]);

    // useEffect(() => {
    //     console.log("tickets\n",tickets);
    //     tickets && dispatch(setTickets(tickets.data));
    // }, [tickets]);

    useEffect(() => {
        console.log("CC",choosedFromCity, choosedToCity, from);

        if (from){
            dispatch(setFrom(choosedFromCity))
        }
        else {
            dispatch(setTo(choosedToCity))
        }

    }, [choosedFromCity, choosedToCity]);

    function dropdownHandler() {
        setActive(!active);
    }

    async function selectCity(selectedCity: string) {

        dropdownHandler()
        if (!selectedCity) {
            setPunkt(true)
            console.log('sss')
        } else {
            setPunkt(false)
            if (from) {
                setChoosedFromCity(selectedCity);
                console.log('from', choosedFromCity)
            } else {
                setChoosedToCity(selectedCity);
                console.log('to', choosedFromCity)
            }
            console.log(selectedCity);

            setCity(''); // Сбросить поле поиска при выборе города
        }
        console.log('sasaas', choosedFromCity, choosedToCity)
    }

    return (
        <div className={styles.main}>
            <div className={styles.dropdown} onClick={dropdownHandler}>
                {punkt ? from ? "Пункт отправления" : "Пункт назначения" : from ? from_to.from : from_to.to}
                <ChevronDown size={'2rem'} className={active ? styles.activeIcon : ``} />
            </div>
            {(
                <div className={styles.dropdown_menu_root}>
                    <div className={`${styles.dropdown_menu} ${!active && styles.fadeOut}`}>
                        <Bubble type={'search'}>
                            <div className={styles.dropdown_menu_search}>
                                <input type="text"
                                       placeholder={'Поиск'}
                                       value={city}
                                       onChange={(e) => setCity(e.target.value.replace(/[^\sa-zA-Zа-яА-Я]/g, ''))}
                                />
                                <Search/>
                            </div>
                        </Bubble>
                        <div className={styles.line}></div>
                        <div className={styles.dropdown_menu_cities}>
                            {citiesLoading ? (
                                <Loader />
                            ) : citiesSet && citiesSet.length ? (
                                citiesSet
                                    .filter(item => item.toLowerCase().includes(city.toLowerCase()))
                                    .map((item, index) => (
                                        item && !from ? item !== 'Ростов-на-Дону' &&
                                        <Bubble
                                            key={index}
                                            type={'text'}
                                            onClick={() => selectCity(item)}
                                        >
                                            {item}
                                        </Bubble>
                                        :
                                            <Bubble
                                                key={index}
                                                type={'text'}
                                                onClick={() => selectCity(item)}
                                            >
                                                {item}
                                            </Bubble>
                                    ))
                            ) : (
                                <Bubble type={'text'}>
                                    <span style={{ color: "red" }}>Города не найдены</span>
                                </Bubble>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
