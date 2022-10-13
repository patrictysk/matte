import { useEffect, useRef } from 'react';
import { shuffleArray } from '../../utils/helpers';
import Row from '../Row/Row';
import styles from './Series.module.scss';

type SeriesProps = {
    table: number,
    factor: boolean
}

const Series = ({ table, factor }: SeriesProps) => {

    const numbers = shuffleArray<number>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

    const inputsRef = useRef<Array<HTMLInputElement>>([])

    useEffect(() => {
        inputsRef.current[0].focus()
    }, [inputsRef])

    const saveRefs = (instance: HTMLInputElement): void => {
        inputsRef.current.push(instance)
    }

    return (
        <div className={styles.wrapper}>
            {factor && table}
            {!factor &&
                <div>
                    {numbers.map((n, index) =>
                        <Row
                            table={table}
                            n={n}
                            key={n}
                            ref={saveRefs}
                        />
                    )}
                </div>
            }
        </div>
    )
}

export default Series
