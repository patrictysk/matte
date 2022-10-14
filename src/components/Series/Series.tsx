import { useEffect, useRef, useCallback, useState } from 'react';
import { shuffleArray } from '../../utils/helpers';
import Row from '../Row/Row';
import styles from './Series.module.scss';

type SeriesProps = {
    table: number,
    factor: boolean
}

const Series = ({ table, factor }: SeriesProps) => {

    const numbersRef = useRef(shuffleArray<number>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))

    const inputsRef = useRef<Array<HTMLInputElement>>([])

    const [sum, setSum] = useState<number>(0)

    useEffect(() => {
        inputsRef.current[0].focus()
    }, [inputsRef])

    useEffect(() => {
        if (sum === numbersRef.current.length) {
            console.log('Done!!');
        }
    }, [sum])

    const saveRefs = (instance: HTMLInputElement): void => {
        inputsRef.current.push(instance)
    }

    const test = () => {
        setSum((s: number) => s + 1)
    }

    return (
        <div className={styles.wrapper}>
            {factor && table}
            {!factor &&
                <div>
                    {numbersRef.current.map((n, index) =>
                        <Row
                            table={table}
                            n={n}
                            key={n}
                            ref={saveRefs}
                            test={test}
                        />
                    )}
                </div>
            }
        </div>
    )
}

export default Series
