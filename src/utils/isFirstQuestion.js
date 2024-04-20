/**
 * 
 * @param {string} currentKey 
 * @returns {boolean}
 */
export const isFirstQuestion = (currentKey) => {
  const questionNumber = currentKey.split('-')[1];
  return Number(questionNumber) === 0;
}