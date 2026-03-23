import { useRef, useEffect } from "react";

export default function ResultModal({ result, targetTime, remaining, onClose }) {
    const dialogRef = useRef();

    useEffect(() => {
        if (dialogRef.current) {
            dialogRef.current.showModal();
        }
    }, []);

    return (
        <dialog ref={dialogRef} className="result-modal">
            <h2>You {result}</h2>
            <p>The target time was <strong>{targetTime}</strong> seconds.</p>
            <p>You stopped the timer with <strong>{remaining.toFixed(2)} seconds left.</strong></p>
            <form method="dialog" onSubmit={onClose}>
                <button>Close</button>
            </form>
        </dialog>
    );
}