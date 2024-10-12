export const countTime = (
    intervalId: number | undefined,
    setTimeLeft: (timeLeft: number) => void,
    timeLeft: number
    ) => {
    intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
}

export const stopTime = (
    intervalId: number | undefined,
    setIsTimerOn: React.Dispatch<React.SetStateAction<boolean>>
    )=> {
    clearInterval(intervalId);
    setIsTimerOn(false);
  }