
import styles from "./index.module.css"

export const MessageModal = (props) => {
    return (
        <div className={styles.container}>
            <span>{props.message}</span>
        </div>
    )
}