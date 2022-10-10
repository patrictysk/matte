import { useState } from 'react'
import * as Styled from './styles'
import Form from 'react-bootstrap/Form';

const Learn = () => {

    const [low, setLow] = useState<number>(3)

    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

    const handleLowChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('e :>> ', e.target.value);
        setLow(Number.parseInt(e.target.value))
    }

    console.log('low :>> ', low);

    return (
        <Styled.Wrapper>
            <Styled.FormWrapper>
                <Form>
                    <Form.Label>Lägsta: </Form.Label>
                    <Form.Control type='text' value={low} size='lg' onChange={handleLowChange} />
                    <Form.Label>Högsta:</Form.Label>
                    <Form.Control type='text' value='10' size='lg' />
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