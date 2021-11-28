export const log = (logMsg) => (logValue) => {
  console.log(logMsg, logValue);
  return logValue;
};
