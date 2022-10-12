import { useState } from 'react'
import * as Styled from './styles'
import Form from 'react-bootstrap/Form';
import { useEffect } from 'react';

const Learn = () => {

    const [low, setLow] = useState<string>('1')
    const [high, setHigh] = useState<string>('10')
    const [numbers, setNumbers] = useState<Array<number>>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

    useEffect(() => {

        const tempNumbers: Array<number> = []

        if (Math.round(parseInt(low)) < Math.round(parseInt(high))) {
            for (let i = Math.round(parseInt(low)); i <= Math.round(parseInt(high)); i++) {
                tempNumbers.push(i)
            }
            setNumbers(tempNumbers)
        }
    }, [low, high])

    const handleLowChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLow(e.target.value)
    }

    const handleHighChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHigh(e.target.value)
    }

    console.log('Learn rerenders');

    return (
        <Styled.Wrapper>
            <Styled.FormWrapper>
                <h1 className='heading1'>Multiplikationstabellen!</h1>
                <Form>
                    <Form.Label>Lägsta: </Form.Label>
                    <Form.Control type='number' step='1' value={low} size='lg' onChange={handleLowChange} />
                    <Form.Label>Högsta:</Form.Label>
                    <Form.Control type='number' step='1' value={high} size='lg' onChange={handleHighChange} />
                </Form>
            </Styled.FormWrapper>
            <Styled.TableWrapper>
                <Styled.Row
                    key={`test-${numbers[0] - 1}`}
                >
                    <span><span>&nbsp;</span></span>
                    {numbers.map((item, index) => <span key={index}><span>{item}</span></span>)}
                </Styled.Row>
                {numbers.map((item, index) =>
                    <Styled.Row
                        key={`row-${numbers[index]}`}
                    >
                        <span><span>{numbers[index]}</span></span>{numbers.map((innerItem, index) => <span key={index}><span>{item * innerItem}</span></span>)}
                    </Styled.Row>
                )}
            </Styled.TableWrapper>
        </Styled.Wrapper>
    )
}

export default Learn