import Form from 'react-bootstrap/Form';
import styles from './Row.module.scss';

type RowProps = {
    table: number,
    n: number
}

const Row = ({ table, n }: RowProps) => {
    return (
        <div className={styles.row}>
            <span>{table} * {n}</span>
            <span>=</span>
            <Form>
                <Form.Label>Lägsta: </Form.Label>
                <Form.Control type='number' step='1' size='lg' />
            </Form>
        </div>
    )
}

export default Row