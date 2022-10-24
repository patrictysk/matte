import React, { useEffect, useRef, useState } from 'react';
import { shuffleArray } from '../../utils/helpers';
import Row from '../Row/Row';
import Button from 'react-bootstrap/Button';
import styles from './Series.module.scss';

type SeriesProps = {
    table: Array<number>,
    factor: boolean
    restart: () => void
}

const Series = ({ table, factor, restart }: SeriesProps) => {

    const numbersRef = useRef(shuffleArray<number>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))
    const inputsRef = useRef<Array<HTMLInputElement>>([])

    const [numberOfAnswers, setNumberOfAnswers] = useState<number>(0)
    const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState<number>(0)
    const [showResult, setShowResult] = useState<boolean>(false)

    useEffect(() => {
        if (!showResult) {
            inputsRef.current[0].focus()
        }
    }, [inputsRef, showResult])

    useEffect(() => {
        if (numberOfAnswers === numbersRef.current.length) {
            setShowResult(true)
        }
    }, [numberOfAnswers, numberOfCorrectAnswers])

    const saveRefs = (instance: HTMLInputElement): void => {
        if (instance) {
            const index: number = Number(instance.dataset?.index)

            if (index >= 0) {
                inputsRef.current[index] = instance
            }
        }
    }

    const markAsAnswered = (correct: boolean) => {
        setNumberOfAnswers((s: number) => s + 1)
        if (correct) {
            setNumberOfCorrectAnswers((s: number) => s + 1)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.code === 'Enter') {
            if (inputsRef.current[index + 1]) {
                console.log('here');
                inputsRef.current[index + 1].focus()
            } else {
                inputsRef.current[index].blur()
            }
            e.preventDefault()
        }
    }

    const handleReset = () => {
        restart()
    }

    return (
        <div className={styles.wrapper}>
            <div>
                {!showResult && numbersRef.current.map((n, index) =>
                    <div
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        key={index}
                    >
                        <Row
                            table={table[0]}
                            n={n}
                            index={index}
                            ref={saveRefs}
                            markAsAnswered={markAsAnswered}
                            factor={factor}
                            shouldDisable={true}
                            compete={true}
                        />
                    </div>
                )}
                {showResult && (numberOfCorrectAnswers === numberOfAnswers) &&
                    <h1 className='heading1'>Du hade alla rätt! Bra jobbat :)</h1>
                }
                {showResult && (numberOfCorrectAnswers === 0) &&
                    <h1 className='heading1'>Det blev inga rätt den här gången men var inte ledsen för det, prova igen!</h1>
                }
                {showResult && (numberOfCorrectAnswers > 0 && numberOfCorrectAnswers < numberOfAnswers) &&
                    <h1 className='heading1'>Du hade {numberOfCorrectAnswers} rätt av {numberOfAnswers}!</h1>
                }
                {showResult &&
                    <Button
                        onClick={handleReset}
                    >En gång till!</Button>
                }
            </div>
        </div>
    )
}

export default Series
