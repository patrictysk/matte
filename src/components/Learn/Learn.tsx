import * as Styled from './styles'

const Learn = () => {

    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    return (
        <Styled.Wrapper>
            {numbers.map(item =>
                <Styled.Row>
                    {numbers.map(innerItem => <span><span>{item * innerItem}</span></span>)}
                </Styled.Row>
            )}
        </Styled.Wrapper>
    )
}

export default Learn