import {RefreshCw} from "lucide-react";
import styles from './Loader.module.scss'
interface ILoader {}

export default function Loader({}: ILoader){
    return (
        <div>
            <RefreshCw className={styles.loader} />
        </div>
    )
}
