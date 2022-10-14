import { forwardRef, useState } from 'react'
import Form from 'react-bootstrap/Form';
import styles from './Row.module.scss';

type RowProps = {
    table: number,
    n: number
}

const Row = forwardRef(({ table, n }: RowProps, ref: ((instance: HTMLInputElement | null) => void) | React.RefObject<HTMLInputElement> | null | undefined) => {
    const [answered, setAnswered] = useState<boolean>(false)
    const [value, setValue] = useState<string>()
    const [correct, setCorrect] = useState<boolean>()

    // const handleKeyDown = (e: React.KeyboardEvent) => {

    //     if (e.code === 'Tab' || e.code === 'Enter') {
    //         if (typeof value === 'string' && (Math.round(parseInt(value)) === (table * n))) {
    //             setCorrect(true)
    //         }
    //     }

    //     if (e.code === 'Enter') {
    //         e.preventDefault()
    //     }
    // }

    return (
        <div
            className={styles.row}
        //onKeyDown={handleKeyDown}
        >
            <span>{table} * {n}</span>
            <span>=</span>
            <Form className={styles.answer}>
                <Form.Control
                    ref={ref}
                    type='number'
                    step='1'
                    size='lg'
                    onChange={(e) => {
                        setValue(e.target.value)
                    }}
                    onBlur={() => {
                        setAnswered(true)
                        if (typeof value === 'string' && (Math.round(parseInt(value)) === (table * n))) {
                            setCorrect(true)
                        }
                    }}
                />
            </Form>
            {answered && <span>{correct ? ' R ' : 'X'}</span>}
        </div>
    )
})

export default Row