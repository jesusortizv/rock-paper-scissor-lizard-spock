/**
 * @method html
 * @desc Generate HTML based on dynamic data
 * @param {String} literal -
 * @param {String} cooked -
 * @return {Html} Parse Html
 **/
export default function html(literal, ...cooked) {
  let result = '';
  cooked.forEach((cook, i) => {
    let lit = literal[i];
    if (Array.isArray(cook)) {
      cook = cook.join('');
    }
    result += lit;
    result += cook;
  });
  result += literal[literal.length - 1];
  return result;
}
