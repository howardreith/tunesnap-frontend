export default function setAndClearError(setErrorCallback, errorMessage) {
  setErrorCallback(errorMessage);
  setTimeout(() => {
    setErrorCallback('');
  }, 5000);
}
