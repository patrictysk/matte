import { useEffect, useRef, useState } from 'react';
import { shuffleArray } from '../../utils/helpers';
import Row from '../Row/Row';
import Back from '../Back/Back';
import Button from 'react-bootstrap/Button';
import styles from './Series.module.scss';

type SeriesProps = {
    table: Array<number>,
    factor: boolean
    setMode: React.Dispatch<React.SetStateAction<string>>
}

const Series = ({ table, factor, setMode }: SeriesProps) => {

    const numbersRef = useRef(shuffleArray<number>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))
    const inputsRef = useRef<Array<HTMLInputElement>>([])

    const [numberOfAnswers, setNumberOfAnswers] = useState<number>(0)
    const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState<number>(0)
    const [showResult, setShowResult] = useState<boolean>(false)

    useEffect(() => {
        inputsRef.current[0].focus()
    }, [inputsRef])

    useEffect(() => {
        if (numberOfAnswers === numbersRef.current.length) {
            setShowResult(true)
        }
    }, [numberOfAnswers, numberOfCorrectAnswers])

    const saveRefs = (instance: HTMLInputElement): void => {
        inputsRef.current.push(instance)
    }

    const markAsAnswered = (correct: boolean) => {
        setNumberOfAnswers((s: number) => s + 1)
        if (correct) {
            setNumberOfCorrectAnswers((s: number) => s + 1)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.code === 'Enter') {
            console.log('index :>> ', index, inputsRef.current[index + 1]);
            if (inputsRef.current[index + 1]) {
                console.log('here');
                inputsRef.current[index + 1].focus()
            } else {
                console.log('or here');
                inputsRef.current[index].blur()
            }
            e.preventDefault()
        }
    }

    return (
        <div className={styles.wrapper}>
            <div>
                {numbersRef.current.map((n, index) =>
                    <div
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        key={index}
                    >
                        <Row
                            table={table[0]}
                            n={n}
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
                        onClick={() => setMode('train')}
                        className={styles.back}
                    >En gång till!</Button>
                }
            </div>
        </div>
    )
}

export default Series
