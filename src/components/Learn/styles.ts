import styled from 'styled-components'
import { default as BsButton } from 'react-bootstrap/Button';

interface TitleProps {
    backgroundColor?: string
}

const Button = styled(BsButton) <TitleProps>`
    ${props => props.backgroundColor ? `background-color: ${props.backgroundColor};` : ``}
    border: solid 3px yellow;
    display: block;
`

const Wrapper = styled.div`
    border: solid 1px white;
`

const Row = styled.div`
    height: 50px;
    font-weight: 300;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:first-of-type {
        font-weight: 700;
        font-size: 30px;
    }
    & > span {
        width: 50px;
        height: 50px;
        display: inline-block;
        border: solid 1px white;
        display: flex;
        justify-content: center;
        align-items: center;

        &:first-of-type {
            font-weight: 700;
            font-size: 30px;
        }
    }
`

export {
    Wrapper,
    Row,
    Button
}
