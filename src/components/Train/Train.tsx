import styles from './Train.module.scss';
import Button from 'react-bootstrap/Button';

const Train = () => {

    const renderButtons = () => {
        const buttons = []
        for (let i = 0; i < 13; i++) {
            buttons.push(
                <Button
                    className={styles.button}
                    key={i}>
                    {i}
                </Button>
            )
        }
        return buttons
    }

    return (
        <div className={styles.wrapper}>
            <h1>Välj en tabell:</h1>
            {renderButtons()}

        </div>
    )
}

export default Train