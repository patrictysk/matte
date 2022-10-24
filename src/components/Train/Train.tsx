import React, { useState } from 'react';
import styles from './Train.module.scss';
import Button from 'react-bootstrap/Button';
import Series from '../Series/Series'

type TrainProps = {
    compete: boolean
}

const Train = ({ compete }: TrainProps) => {

    const [table, setTable] = useState<number>()
    const [friends, setFriends] = useState<number>()
    const [factor, setFactor] = useState<boolean>(false);
    const [ready, setReady] = useState<boolean>(false)

    const handleTableSelect = (e: React.MouseEvent<HTMLButtonElement>) => {

        const target = e.target as HTMLButtonElement;
        const value: string | null = target.getAttribute('data-value')

        if (typeof value === 'string') {
            setTable(parseInt(value))
        }
    }

    const handleFriendsSelect = (e: React.MouseEvent<HTMLButtonElement>) => {

        const target = e.target as HTMLButtonElement;
        const value: string | null = target.getAttribute('data-value')

        if (typeof value === 'string') {
            setFriends(parseInt(value))
            setReady(true)
        }
    }

    const handleTableCompete1 = () => {

    }

    const renderButtons = () => {

        // Tables
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

        // number-friends
        const buttons2 = []

        for (let i = 6; i <= 10; i++) {
            buttons2.push(
                <Button
                    className={styles.button}
                    key={i}
                    onClick={handleFriendsSelect}
                    data-value={i}
                >
                    {i}-kompisar
                </Button>
            )
        }

        return (
            <>
                <h1 className='heading1'>{compete ? 'Vad vill du tävla i?' : 'Välj en tabell eller kompisar:'}</h1>
                {compete &&
                    <>
                        <Button
                            className={styles.button}
                            key={1}
                            onClick={handleTableCompete1}
                        >
                            Ettan till femmans tabell
                        </Button>
                        <Button
                            className={styles.button}
                            key={1}
                        // onClick={handleTableCompete2}
                        >
                            Sexan till nians tabell
                        </Button>
                    </>
                }
                {!compete && <div>{buttons}</div>}
                <div>{buttons2}</div>
            </>
        )
    }

    const handleRestart = () => {
        setTable(undefined)
        setFriends(undefined)
        setFactor(false)
        setReady(false)
    }

    return (
        <div className={styles.wrapper}>
            {!ready && <>

                {!table &&
                    <>
                        {renderButtons()}
                    </>
                }
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
            {ready && (table || friends) &&
                <>
                    <h1 className='heading1'>Öva!</h1>
                    <Series
                        table={table}
                        friends={friends}
                        factor={factor}
                        restart={handleRestart}
                    />
                </>
            }
        </div>
    )
}

export default Train