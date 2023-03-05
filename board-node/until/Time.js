/**
 * @description: 生成sql格式的时间戳
 * @param {}
 * @return {fmt: sql格式的时间戳}
 **/
function sqlTime() {
  let date = new Date();
  let fmt = "YYYY-MM-DD hh:mm:ss";
  let opt = {
    "Y+": date.getFullYear().toString(),
    "M+": (date.getMonth() + 1).toString(),
    "D+": date.getDate().toString(),
    "h+": date.getHours().toString(),
    "m+": date.getMinutes().toString(),
    "s+": date.getSeconds().toString(),
  };
  for (let k in opt) {
    let ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(
        ret[1],
        ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
      );
    }
  }
  return fmt;
}
/**
 * @description: 生成一个较短的时间戳
 * @param {}
 * @return {code: 时间戳}
 **/
function generateSixDigitCode() {
  let code = "";
  // 获取当前时间戳
  let timestamp = new Date().getTime();
  // 根据时间戳生成6位数
  for (let i = 0; i < 6; i++) {
    let c = timestamp % 36;
    // 根据ASCII码值转换成字符
    if (c < 10) {
      c = String.fromCharCode(c + 48);
    } else {
      c = String.fromCharCode(c + 55);
    }
    timestamp = Math.floor(timestamp / 36);
    code = code + c;
  }
  return code;
}
/**
 * @description: 生成一个由前缀 + 时间戳 + 随机数组成的字符串
 * @param {prefix: 前缀}
 * @return {str: 随机字符串}
 **/
function timesTamp(prefix) {
  let nowTime = generateSixDigitCode();
  let random = String(Math.ceil(Math.random() * 10001));
  return prefix + nowTime + random;
}
module.exports = { sqlTime, timesTamp };
