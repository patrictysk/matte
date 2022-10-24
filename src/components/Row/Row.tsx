import { forwardRef, useRef, useState } from 'react'
import Form from 'react-bootstrap/Form';
import styles from './Row.module.scss';

type InputProps = {
    answered: boolean,
    correct: boolean | undefined,
    value: string | undefined,
    setValue: (value: string) => void,
    setAnswered: (answered: boolean) => void,
    product: number,
    setCorrect: (correct: boolean) => void,
    markAsAnswered: (correct: boolean) => void,
    shouldDisable: boolean,
    index: number,
    onBlur: () => void
}

const Input = forwardRef(({ answered, correct, value, setValue, setAnswered, product, setCorrect, markAsAnswered, shouldDisable, index }: InputProps, ref: ((instance: HTMLInputElement | null) => void) | React.RefObject<HTMLInputElement> | null | undefined) => {
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
    table: number,
    n: number,
    index: number,
    markAsAnswered: (correct: boolean) => void,
    shouldDisable?: boolean,
    factor: boolean
    compete?: boolean
}

const Row = forwardRef(({ table, n, index, markAsAnswered, shouldDisable = false, factor, compete }: RowProps, ref: ((instance: HTMLInputElement | null) => void) | React.RefObject<HTMLInputElement> | null | undefined) => {
    const orderRef = useRef<number>(Math.random())
    const productRef = useRef<number>(table * n)

    const [answered, setAnswered] = useState<boolean>(false)
    const [value, setValue] = useState<string>()
    const [correct, setCorrect] = useState<boolean>()

    return (
        <div
            className={styles.row}
        >
            {!factor &&
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
                    {/* <Form className={`${styles.field} ${answered ? correct ? styles.correct : styles.wrong : ''}`}>
                        <Form.Control
                            ref={ref}
                            type='number'
                            step='1'
                            size='lg'
                            onChange={(e) => {
                                setValue(e.target.value)
                            }}
                            onBlur={() => {
                                if (typeof value === 'string') {
                                    setAnswered(true)
                                    if (Math.round(parseInt(value)) === (productRef.current)) {
                                        setCorrect(true)
                                        markAsAnswered(true)
                                    } else {
                                        markAsAnswered(false)
                                    }
                                }
                            }}
                            disabled={shouldDisable && answered}
                            data-index={index}
                        />
                    </Form> */}
                    <Input
                        ref={ref}
                        answered={answered}
                        correct={correct}
                        value={value}
                        setValue={setValue}
                        setAnswered={setAnswered}
                        product={productRef.current}
                        setCorrect={setCorrect}
                        markAsAnswered={markAsAnswered}
                        shouldDisable={shouldDisable}
                        index={index}
                        onBlur={() => {
                            if (typeof value === 'string') {
                                setAnswered(true)
                                if (Math.round(parseInt(value)) === (productRef.current)) {
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
            {factor &&
                <>
                    {(!compete || (compete && orderRef.current < 0.5)) &&
                        <div className={styles.inner}>
                            <span className={styles.number}>{table}</span>
                            <span>*</span>
                            <Form className={`${styles.field} ${answered ? correct ? styles.correct : styles.wrong : ''}`}>
                                <Form.Control
                                    ref={ref}
                                    type='number'
                                    step='1'
                                    size='lg'
                                    onChange={(e) => {
                                        setValue(e.target.value)
                                    }}
                                    onBlur={() => {
                                        if (typeof value === 'string') {
                                            setAnswered(true)
                                            if (Math.round(parseInt(value)) === (productRef.current) / table) {
                                                setCorrect(true)
                                                markAsAnswered(true)
                                            } else {
                                                markAsAnswered(false)
                                            }
                                        }
                                    }}
                                    disabled={shouldDisable && answered}
                                    data-index={index}
                                />
                            </Form>
                            <span>=</span>
                            <span className={styles.number}>{productRef.current}</span>
                            <span className={styles.answer}>{answered && !correct && <span>{n}</span>}</span>
                        </div>
                    }

                    {compete && orderRef.current >= 0.5 &&
                        <div className={styles.inner}>
                            <span className={styles.number}>{n}</span>
                            <span>*</span>
                            <Form className={`${styles.field} ${answered ? correct ? styles.correct : styles.wrong : ''}`}>
                                <Form.Control
                                    ref={ref}
                                    type='number'
                                    step='1'
                                    size='lg'
                                    onChange={(e) => {
                                        setValue(e.target.value)
                                    }}
                                    onBlur={() => {
                                        if (typeof value === 'string') {
                                            setAnswered(true)
                                            if (Math.round(parseInt(value)) === (productRef.current) / n) {
                                                setCorrect(true)
                                                markAsAnswered(true)
                                            } else {
                                                markAsAnswered(false)
                                            }
                                        }
                                    }}
                                    disabled={shouldDisable && answered}
                                    data-index={index}
                                />
                            </Form>
                            <span>=</span>
                            <span className={styles.number}>{productRef.current}</span>
                            <span className={styles.answer}>{answered && !correct && <span>{table}</span>}</span>
                        </div>
                    }
                </>
            }
        </div>
    )
})

export default Row