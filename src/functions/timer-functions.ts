export const stopTime = (
    intervalId: number | undefined,
    setIsTimerOn: React.Dispatch<React.SetStateAction<boolean>>
    )=> {
    clearInterval(intervalId);
    setIsTimerOn(false);
}