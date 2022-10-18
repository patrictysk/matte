import { Mode } from '../types'
import * as Styled from './styles'

type BackProps = {
    handleBack: Function,
    value: Mode
}

const Back = ({ handleBack, value }: BackProps) => {
    return (
        <Styled.Button onClick={() => handleBack(value)}>Tillbaka till start</Styled.Button>
    )
}

export default Back