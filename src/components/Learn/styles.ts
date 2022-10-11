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
`

const Row = styled.div`
    height: 50px;
    font-weight: 300;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: auto;

    &:first-of-type {
        font-weight: 700;
        font-size: 30px;
    }
    & > span {
        min-width: 50px;
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

const TableWrapper = styled.div`
        border: solid 1px white;
        display: inline-block;
        
`

const FormWrapper = styled.div`

    margin-bottom: 30px;
    .form-label {
        display: inline;
        width: auto;
        margin-right: 20px;
    }
    .form-control {
        display: inline;
        width: 100px;
        margin-right: 20px;
    }
`

export {
    Wrapper,
    Row,
    Button,
    TableWrapper,
    FormWrapper
}
