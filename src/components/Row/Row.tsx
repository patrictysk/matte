import { forwardRef, useRef, useState } from 'react'
import Form from 'react-bootstrap/Form';
import styles from './Row.module.scss';

type InputProps = {
    answered: boolean,
    correct: boolean | undefined,
    setValue: (value: string) => void,
    shouldDisable: boolean,
    index: number,
    onBlur: () => void
}

const Input = forwardRef(({ answered, correct, setValue, shouldDisable, index, onBlur }: InputProps, ref: ((instance: HTMLInputElement | null) => void) | React.RefObject<HTMLInputElement> | null | undefined) => {
    return (
        <Form className={`${styles.field} ${answered ? correct ? styles.correct : styles.wrong : ''}`}>
            <Form.Control
                ref={ref}
                type='number'
                step='1'
                size='lg'
                onChange={(e) => {
                    setValue(e.target.value)
                }}
                onBlur={onBlur}
                disabled={shouldDisable && answered}
                data-index={index}
            />
        </Form>
    )
})

type RowProps = {
    table?: number | undefined,
    friends?: number | undefined,
    n: number,
    index: number,
    markAsAnswered: (correct: boolean) => void,
    shouldDisable?: boolean,
    factor: boolean
    compete?: boolean
}

const Row = forwardRef(({ table, friends, n, index, markAsAnswered, shouldDisable = false, factor, compete }: RowProps, ref: ((instance: HTMLInputElement | null) => void) | React.RefObject<HTMLInputElement> | null | undefined) => {
    const orderRef = useRef<number>(Math.random())
    const resultRef = useRef<number>(table ? table * n : -1)

    const [answered, setAnswered] = useState<boolean>(false)
    const [value, setValue] = useState<string>()
    const [correct, setCorrect] = useState<boolean>()

    return (
        <div
            className={styles.row}
        >
            {table && !factor &&
                <div className={styles.inner}>
                    {orderRef.current < 0.5 &&
                        <>
                            <span className={styles.number}>{table}</span>
                            <span>*</span>
                            <span className={styles.number}>{n}</span>
                        </>
                    }
                    {orderRef.current >= 0.5 &&
                        <>
                            <span className={styles.number}>{n}</span>
                            <span>*</span>
                            <span className={styles.number}>{table}</span>
                        </>
                    }
                    <span>=</span>
                    <Input
                        ref={ref}
                        answered={answered}
                        correct={correct}
                        setValue={setValue}
                        shouldDisable={shouldDisable}
                        index={index}
                        onBlur={() => {
                            if (typeof value === 'string') {
                                setAnswered(true)
                                if (Math.round(parseInt(value)) === (resultRef.current)) {
                                    setCorrect(true)
                                    markAsAnswered(true)
                                } else {
                                    markAsAnswered(false)
                                }
                            }
                        }}
                    />
                    <span className={styles.answer}>{answered && !correct && <span>{table * n}</span>}</span>
                </div>
            }
            {table && factor &&
                <>
                    {(orderRef.current < 0.5) &&
                        <div className={styles.inner}>
                            <span className={styles.number}>{table}</span>
                            <span>*</span>
                            <Input
                                ref={ref}
                                answered={answered}
                                correct={correct}
                                setValue={setValue}
                                shouldDisable={shouldDisable}
                                index={index}
                                onBlur={() => {
                                    if (typeof value === 'string') {
                                        setAnswered(true)
                                        if (Math.round(parseInt(value)) === (resultRef.current) / table) {
                                            setCorrect(true)
                                            markAsAnswered(true)
                                        } else {
                                            markAsAnswered(false)
                                        }
                                    }
                                }}
                            />
                            <span>=</span>
                            <span className={styles.number}>{resultRef.current}</span>
                            <span className={styles.answer}>{answered && !correct && <span>{n}</span>}</span>
                        </div>
                    }

                    {(orderRef.current >= 0.5) &&
                        <div className={styles.inner}>
                            <span className={styles.number}>{n}</span>
                            <span>*</span>
                            <Input
                                ref={ref}
                                answered={answered}
                                correct={correct}
                                setValue={setValue}
                                shouldDisable={shouldDisable}
                                index={index}
                                onBlur={() => {
                                    if (typeof value === 'string') {
                                        setAnswered(true)
                                        if (Math.round(parseInt(value)) === (resultRef.current) / n) {
                                            setCorrect(true)
                                            markAsAnswered(true)
                                        } else {
                                            markAsAnswered(false)
                                        }
                                    }
                                }}
                            />
                            <span>=</span>
                            <span className={styles.number}>{resultRef.current}</span>
                            <span className={styles.answer}>{answered && !correct && <span>{table}</span>}</span>
                        </div>
                    }
                </>
            }

            {friends &&
                <>
                    {(orderRef.current < 0.5) &&
                        <div className={styles.inner}>
                            <span className={styles.number}>{friends - n}</span>
                            <span>+</span>
                            <Input
                                ref={ref}
                                answered={answered}
                                correct={correct}
                                setValue={setValue}
                                shouldDisable={shouldDisable}
                                index={index}
                                onBlur={() => {
                                    if (typeof value === 'string') {
                                        setAnswered(true)
                                        if (Math.round(parseInt(value)) === n) {
                                            setCorrect(true)
                                            markAsAnswered(true)
                                        } else {
                                            markAsAnswered(false)
                                        }
                                    }
                                }}
                            />
                            <span>=</span>
                            <span className={styles.number}>{friends}</span>
                            <span className={styles.answer}>{answered && !correct && <span>{n}</span>}</span>
                        </div>
                    }

                    {(orderRef.current >= 0.5) &&
                        <div className={styles.inner}>
                            <span className={styles.number}>{n}</span>
                            <span>+</span>
                            <Input
                                ref={ref}
                                answered={answered}
                                correct={correct}
                                setValue={setValue}
                                shouldDisable={shouldDisable}
                                index={index}
                                onBlur={() => {
                                    if (typeof value === 'string') {
                                        setAnswered(true)
                                        if (Math.round(parseInt(value)) === (friends - n)) {
                                            setCorrect(true)
                                            markAsAnswered(true)
                                        } else {
                                            markAsAnswered(false)
                                        }
                                    }
                                }}
                            />
                            <span>=</span>
                            <span className={styles.number}>{friends}</span>
                            <span className={styles.answer}>{answered && !correct && <span>{friends - n}</span>}</span>
                        </div>
                    }
                </>
            }


        </div>
    )
})

export default Row