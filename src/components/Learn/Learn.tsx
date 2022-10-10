import { useState } from 'react'
import * as Styled from './styles'
import Form from 'react-bootstrap/Form';
import { useEffect } from 'react';
import { setEnvironmentData } from 'worker_threads';

const Learn = () => {

    const [low, setLow] = useState<string>('1')
    const [high, setHigh] = useState<string>('10')
    // const [numbers, setNumbers] = useState<Array>

    const numbers: Array<number> = []

    useEffect(() => {

        if (Math.round(parseInt(low)) < Math.round(parseInt(high))) {
            for (let i = Math.round(parseInt(low)); i <= Math.round(parseInt(high)); i++) {
                numbers.push(i)
            }
        }

        console.log('numbers :>> ', numbers);

    }, [low, high])

    const handleLowChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLow(e.target.value)
    }

    const handleHighChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHigh(e.target.value)
    }

    console.log('low :>> ', low);

    return (
        <Styled.Wrapper>
            <Styled.FormWrapper>
                <Form>
                    <Form.Label>Lägsta: </Form.Label>
                    <Form.Control type='number' step='1' value={low} size='lg' onChange={handleLowChange} />
                    <Form.Label>Högsta:</Form.Label>
                    <Form.Control type='number' step='1' value={high} size='lg' onChange={handleHighChange} />
                </Form>
            </Styled.FormWrapper>
            <Styled.TableWrapper>
                <Styled.Row>
                    <span><span>{numbers[0] - 1}</span></span>
                    {numbers.map(item => <span><span>{item}</span></span>)}
                </Styled.Row>
                {numbers.map((item, index) =>
                    <Styled.Row>
                        <span><span>{numbers[index]}</span></span>{numbers.map(innerItem => <span><span>{item * innerItem}</span></span>)}
                    </Styled.Row>
                )}
            </Styled.TableWrapper>
        </Styled.Wrapper>
    )
}

export default Learn