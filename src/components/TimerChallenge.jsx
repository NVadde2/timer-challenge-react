import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
    const [timerStarted, setTimerStarted] = useState(false);
    const [timerExpired, setTimerExpired] = useState(false);
    const [result, setResult] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [remaining, setRemaining] = useState(0);

    const timer = useRef(null);
    const startTime = useRef(null);

    function handleStart() {
        setTimerStarted(true);
        setTimerExpired(false);
        setResult(null);
        setShowModal(false);
        startTime.current = Date.now();
        timer.current = setTimeout(() => {
            setTimerExpired(true);
            setResult("lost");
            setRemaining(0);
            setShowModal(true);
        }, targetTime * 1000);
    }

    function handleStop() {
        clearTimeout(timer.current);
        setTimerStarted(false);
        const remainingTime = Math.max(0, (targetTime * 1000 - (Date.now() - startTime.current)) / 1000);
        setRemaining(remainingTime);
        if (!timerExpired) {
            setResult("won");
        } else {
            setResult("lost");
        }
        setShowModal(true);
    }

    function handleReset() {
        setShowModal(false);
        setTimerStarted(false);
        setTimerExpired(false);
        setResult(null);
        setRemaining(0);
    }

    return (
        <>
            {showModal && <ResultModal result={result} targetTime={targetTime} remaining={remaining} onClose={handleReset} />}
            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={timerStarted ? handleStop : handleStart}>
                        {timerStarted ? 'Stop' : 'Start'} Challenge
                    </button>
                </p>
                <p className="challenge-description">
                    {timerStarted ? 'Time is running ...' : 'Timer inactive'}
                </p>
            </section>
        </>
    );
}