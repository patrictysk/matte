import React, { useState } from 'react';
import styles from './Train.module.scss';
import Button from 'react-bootstrap/Button';
import Series from '../Series/Series'


const Train = () => {

    const [table, setTable] = useState<number>(5)
    const [factor, setFactor] = useState<boolean>(false);
    const [ready, setReady] = useState<boolean>(false)

    const handleTableSelect = (e: React.MouseEvent<HTMLButtonElement>) => {

        const target = e.target as HTMLButtonElement;
        const value: string | null = target.getAttribute('data-value')

        if (typeof value === 'string') {
            setTable(parseInt(value))
        }
    }

    const renderButtons = () => {
        const buttons = []
        for (let i = 1; i <= 10; i++) {
            buttons.push(
                <Button
                    className={`${i === table ? 'active' : ''} ${styles.button}`}
                    key={i}
                    onClick={handleTableSelect}
                    data-value={i}
                >
                    {i}
                </Button>
            )
        }
        return buttons
    }

    return (
        <div className={styles.wrapper}>
            {!ready && <>
                <h1 className='heading1'>Välj en tabell:</h1>
                {renderButtons()}
                <h1 className='heading1'>Vill du skriva svaret eller en faktor?</h1>
                <Button
                    className={styles.button}
                    onClick={() => setReady(true)}
                >
                    Svaret
                </Button>
                <Button
                    className={styles.button}
                    onClick={() => {
                        setFactor(true)
                        setReady(true)
                    }}
                >
                    En faktor
                </Button>
            </>}
            {ready && table &&
                <Series
                    table={table}
                    factor={factor}
                />
            }
        </div>
    )
}

export default Train