import React, { useState } from 'react';
import styles from './Train.module.scss';
import Button from 'react-bootstrap/Button';
import Series from '../Series/Series'

type TrainProps = {
    setMode: React.Dispatch<React.SetStateAction<string>>
}

const Train = ({ setMode }: TrainProps) => {

    const [table, setTable] = useState<Array<number>>()
    const [factor, setFactor] = useState<boolean>(false);
    const [ready, setReady] = useState<boolean>(false)

    const handleTableSelect = (e: React.MouseEvent<HTMLButtonElement>) => {

        const target = e.target as HTMLButtonElement;
        const value: string | null = target.getAttribute('data-value')

        if (typeof value === 'string') {
            setTable([parseInt(value)])
        }
    }

    const renderButtons = () => {
        const buttons = []
        for (let i = 1; i <= 10; i++) {
            buttons.push(
                <Button
                    className={styles.button}
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

                {!table &&
                    <><h1 className='heading1'>Välj en tabell eller tiokompisar:</h1>
                        {renderButtons()}
                    </>
                }
                {/* <Button className={styles.button}>Tiokompisar</Button> */}
                {table && <>
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
            </>}
            {ready && table &&
                <>
                    <h1 className='heading1'>Öva!</h1>
                    <Series
                        table={table}
                        factor={factor}
                        setMode={setMode}
                    />
                </>
            }
        </div>
    )
}

export default Train