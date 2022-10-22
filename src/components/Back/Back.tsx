import { Mode } from '../types'
import * as Styled from './styles'

type BackProps = {
    handleBack: Function,
    value: Mode
    children?: React.ReactNode
}

const Back = ({ handleBack, value, children = 'Tillbaka till start' }: BackProps) => {
    return (
        <Styled.Button onClick={() => handleBack(value)}>
            {children}
        </Styled.Button>
    )
}

export default Back