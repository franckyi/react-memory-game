export const resetMovesCount = (setStatus: any, initialStatus: any) => {
    setStatus({...initialStatus, moves: 0});
}