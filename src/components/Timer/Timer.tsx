import { useState, useEffect, useRef } from 'react'
import styles from './Timer.module.scss';

type TimerProps = {
    stop: boolean
}

const Timer = ({ stop }: TimerProps) => {
    // const [days, setDays] = useState(0)
    // const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)
    const [tenths, setTenths] = useState(0)

    const startTimeRef = useRef<number>(Date.now())

    const getTime = () => {
        const time = Date.now() - startTimeRef.current

        // setDays(Math.floor(time / (1000 * 60 * 60 * 24)))
        // setHours(Math.floor((time / (1000 * 60 * 60)) % 24))
        setMinutes(Math.floor((time / 1000 / 60) % 60))
        setSeconds(Math.floor((time / 1000) % 60))
        setTenths(Math.floor((time / 100) % 60))
    }

    useEffect(() => {
        if (!stop) {
            const interval = setInterval(() => getTime(), 10)
            return () => clearInterval(interval)
        }
    }, [stop])


    return (
        <div className={styles.timer}>
            <span>{minutes < 10 ? '0' : ''}{minutes}:{seconds < 10 ? '0' : ''}{seconds},{tenths < 10 ? '0' : ''}{tenths}</span>
        </div>
    )
}

export default Timer