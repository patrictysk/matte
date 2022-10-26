import { useState, useEffect, useRef } from 'react'
import styles from './Timer.module.scss';

type TimerProps = {
    stop: boolean
    highScore: string
    setTime: (time: number) => void,
    clearHighScore: () => void
}

const Timer = ({ stop, highScore, setTime, clearHighScore }: TimerProps) => {
    // const [days, setDays] = useState(0)
    // const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)
    const [tenths, setTenths] = useState(0)
    const [internalHighscore, setInternalHighscore] = useState(highScore)

    const startTimeRef = useRef<number>(Date.now())

    const getTime = () => {
        const time = Date.now() - startTimeRef.current

        // setDays(Math.floor(time / (1000 * 60 * 60 * 24)))
        // setHours(Math.floor((time / (1000 * 60 * 60)) % 24))
        setMinutes(Math.floor((time / 1000 / 60) % 60))
        setSeconds(Math.floor((time / 1000) % 60))
        setTenths(Math.floor((time / 10) % 60))

        return time
    }

    useEffect(() => {
        if (!stop) {
            const interval = setInterval(() => getTime(), 10)
            return () => clearInterval(interval)
        } else {
            setTime(getTime())
        }
    }, [minutes, seconds, setTime, stop, tenths])



    return (
        <div className={styles.timer}>
            <span>{minutes < 10 ? '0' : ''}{minutes}:{seconds < 10 ? '0' : ''}{seconds},{tenths < 10 ? '0' : ''}{tenths}</span><br />
            <span className={styles.highscore}>Bästa tiden med <br />alla rätt: {internalHighscore ? internalHighscore : '-'}</span><br />
            {internalHighscore && <a href='#' tabIndex={-1} onClick={() => {
                if (window.confirm('Är du säker på att du vill nollställa bästa tiden?')) {
                    setInternalHighscore('')
                    clearHighScore()
                }
            }}>Nollställ bästa tiden </a>}
        </div>
    )
}

export default Timer