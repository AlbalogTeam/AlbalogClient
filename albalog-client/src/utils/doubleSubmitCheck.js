let doubleSubmitFlag = false;
export const doubleSubmitCheck = () => {
  if (doubleSubmitFlag) {
    return doubleSubmitFlag;
  } else {
    doubleSubmitFlag = true;
    return false;
  }
};
