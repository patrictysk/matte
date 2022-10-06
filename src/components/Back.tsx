
type BackProps = {
    handleBack: Function
}

const Back = ({ handleBack }: BackProps) => {
    console.log('render back');
    return (
        <div><a onClick={() => handleBack('start')}>Tillbaka!</a></div>
    )
}

export default Back