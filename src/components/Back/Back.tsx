import * as Styled from './styles'

type BackProps = {
    handleBack: Function
}

const Back = ({ handleBack }: BackProps) => {
    return (
        <Styled.Button onClick={() => handleBack('start')}>Tillbaka</Styled.Button>
    )
}

export default Back