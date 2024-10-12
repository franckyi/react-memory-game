export const resetMovesCount = (setStatus: any, initialStatus: any) => {
    setStatus({...initialStatus, movesCount: 0});
}