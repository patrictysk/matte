import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { shuffleArray } from '../../utils/helpers';
import styles from './Series.module.scss';

type SeriesProps = {
    table: number,
    factor: boolean
}

const Series = ({ table, factor }: SeriesProps) => {

    const numbers = shuffleArray<number>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

    return (
        <div className={styles.wrapper}>
            {factor && table}
            {!factor &&
                <div>
                    {numbers.map((n, index) =>
                        <div className={styles.row}>
                            <span>{table} * {n}</span><span>=</span>
                        </div>
                    )}
                </div>
            }
        </div>
    )
}

export default Series

    // < Form >
    //                 <Form.Label>Lägsta: </Form.Label>
    //                 <Form.Control type='number' step='1' value={low} size='lg' onChange={handleLowChange} />
    //                 <Form.Label>Högsta:</Form.Label>
    //                 <Form.Control type='number' step='1' value={high} size='lg' onChange={handleHighChange} />
    //             </Form >