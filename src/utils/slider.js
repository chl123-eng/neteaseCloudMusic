//调整时间格式
export function getTimeFormat(timeValue) {
  let minute = 0;
  let second = 0;
  minute = parseInt(timeValue / 1000 / 60);
  second = (timeValue % (1000 * 60)) / 1000;

  if (String(second).indexOf(".") > -1) {
    second = second.toFixed(0);
  }
  if (minute < 10) {
    minute = "0" + minute;
  }
  if (second < 10) {
    second = "0" + second;
  }

  return minute + ":" + second;
}

//根据时间格式获取秒数
export function getSeconds(timeFormat) {
  let timeArr = [];
  let seconds = 0;
  timeArr = timeFormat.split(":");
  seconds = Number(timeArr[0] * 60) + Number(timeArr[1]);
  return seconds;
}
