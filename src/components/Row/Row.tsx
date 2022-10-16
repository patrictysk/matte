import { forwardRef, useRef, useState } from 'react'
import Form from 'react-bootstrap/Form';
import styles from './Row.module.scss';

type RowProps = {
    table: number,
    n: number,
    test: () => void,
    shouldDisable?: boolean
}

const Row = forwardRef(({ table, n, test, shouldDisable = false }: RowProps, ref: ((instance: HTMLInputElement | null) => void) | React.RefObject<HTMLInputElement> | null | undefined) => {
    const orderRef = useRef<number>(Math.random())

    const [answered, setAnswered] = useState<boolean>(false)
    const [value, setValue] = useState<string>()
    const [correct, setCorrect] = useState<boolean>()

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.code === 'Enter') {
            e.preventDefault()
        }
    }

    return (
        <div
            className={styles.row}
            onKeyDown={handleKeyDown}
        >
            {orderRef.current < 0.5 &&
                <span>{table} * {n}</span>
            }
            {orderRef.current >= 0.5 &&
                <span>{n} * {table}</span>
            }
            <span>=</span>
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
                        test()
                        if (typeof value === 'string') {
                            setAnswered(true)
                            if (Math.round(parseInt(value)) === (table * n)) {
                                setCorrect(true)
                            }
                        }
                    }}
                    disabled={shouldDisable && answered}
                />
            </Form>
            <span className={styles.answer}>{answered && !correct && <span>{table * n}</span>}</span>
        </div>
    )
})

export default Row