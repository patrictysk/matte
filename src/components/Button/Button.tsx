import { default as BsButton } from 'react-bootstrap/Button';
import styles from './Button.module.scss';

type ButtonProps = {
    variant?: string,
    size?: "sm" | "lg" | undefined,
    children?: React.ReactNode;
}

const Button = ({ variant = 'primary', size, children }: ButtonProps) => {

    console.log('render Buttonn');

    return (
        <BsButton
            variant={variant}
            size={size}
            className={styles.button}
        >
            {children}
        </BsButton>
    )
}

export default Button