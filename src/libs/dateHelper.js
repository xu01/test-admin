/**
 * 时间校准用，(服务器时间 - 客户端时间) 得出的时间差，毫秒
 * @type {number}
 */
let timeChecker = 0;

/**
 * 时间校准
 * @param serverTime
 */
export const setTimeChecker = serverTime => timeChecker = serverTime - new Date().getTime();

/**
 * 前导零
 * @param v
 */
const prefix = v => ( v < 10 ? '0' : '') + v;

/**
 * 把时间对象格式化成字符串
 * @param date
 * @param format
 * @param checker
 * @returns {string}
 */
export const date2str = (date, format = '', checker = false) => {
  let newDate = new Date(date.getTime() + (checker ? timeChecker : 0));
  let replace = v => {
    switch (v) {
      case 'YYYY':
        return newDate.getFullYear();
      case 'YY':
        return newDate.getFullYear().substr(-2);
      case 'MM':
        return prefix(newDate.getMonth() + 1);
      case 'M':
        return newDate.getMonth() + 1;
      case 'DD':
        return prefix(newDate.getDate());
      case 'D':
        return newDate.getDate();
      case 'HH':
        return prefix(newDate.getHours());
      case 'H':
        return newDate.getHours();
      case 'mm':
        return prefix(newDate.getMinutes());
      case 'm':
        return newDate.getMinutes();
      case 'ss':
        return prefix(newDate.getSeconds());
      case 's':
        return newDate.getSeconds();
      case 'w':
        return newDate.getDay();
      case 'W':
        return ('日一二三四五六')[newDate.getDay()];
    }
  };
  return format.replace(/Y{4}|Y{2}|M{1,2}|D{1,2}|H{1,2}|m{1,2}|s{1,2}|W|w/g, $0 => replace($0));
};


/**
 * 根据一个时间列表里每一项的startTime，返回所用到的星期几列表
 * @param list
 */
export const calcDaysFromTimeList = list => [...new Set([...list.map(v => v.startTime.getDay())])]
  .sort();

/**
 * 根据一个日期对象，获取这个月初的时间对象
 * @param date
 */
const getMonthStart = date => new Date(`${date.getFullYear()}/${prefix(date.getMonth()+1)}/01 00:00:00`);

/**
 * 获取相对时间，N个月前或者N个月后
 * @param date
 * @param n
 * @returns {Date}
 */
const getRelativeMonth = (date, n) => {
  let v = new Date(date);
  v.setMonth(v.getMonth() + n);
  if (v.getDate() != date.getDate()) {  // 比如2016-10-31跳到2016-09的时候，因为9月没有31号，会跳到2016-10-01
    v.setDate(0);
  }
  return v;
};

/**
 * 获取相对时间，N天前或N天后
 * @param date
 * @param n
 * @returns {Date}
 */
const getRelativeDate = (date, n) => {
  let v = new Date(date);
  v.setDate(v.getDate() + n);
  return v;
};

/**
 * 根据一个时间列表，返回日历所需要的结构
 * @param list
 * @returns {Array}
 */
export const lessonTimeCalendar = list => {
  let res = [];
  if (list.length) {
    let monthFormat = 'YYYY年M月';
    let dateFormat = 'D';
    let timeFormat = 'HH:mm';
    list.sort((a, b) => a.startTime.getTime() > b.startTime.getTime() ? 1 : -1)
      .forEach(v => {
        let data = res.find(z => z.month == date2str(v.startTime, monthFormat, false));
        if (!data) {
          // 循环一次先做出空日历
          let monthStart = getMonthStart(v.startTime),
            monthEnd = new Date(getRelativeMonth(monthStart, 1).setDate(0)),
            startDate = getRelativeDate(monthStart, -monthStart.getDay()),
            endDate = getRelativeDate(monthEnd, 6-monthEnd.getDay()),
            list = [];
          for (let i = startDate.getTime(); i<= endDate.getTime(); i+=86400000) {
            let tmpDate = new Date(i);
            list.push({
              num: date2str(tmpDate, dateFormat),
              day: tmpDate.getDay(),
              isThisMonth: i >= monthStart.getTime() && i <= monthEnd.getTime(),
            });
          }
          data = {
            month: date2str(v.startTime, monthFormat, false),
            list,
          };
          res.push(data);
        }
        let getDate = data.list.find(z => z.isThisMonth && z.num == date2str(v.startTime, dateFormat, false));
        if (getDate) {
          getDate.timeRange = [
            date2str(v.startTime, timeFormat, false),
            date2str(v.endTime, timeFormat, false),
          ];
        }
      });
  }
  return res;
};

/**
 * 判断一个时间是不是已经到了过期时间
 * @param date
 */
export const isExpired = date => new Date().getTime() + timeChecker >= date.getTime();

/**
 * 判断离一个目标时间还有多久
 * @param date
 * @returns {string}
 */
export const timeDistance = date => {
  let seconds = Math.floor(date.getTime() - (new Date().getTime() + timeChecker)) / 1000;
  let res = [];
  let days = Math.floor(seconds / 86400);
  if (days > 0) {
    res.push(`${days}天`);
  }
  seconds %= 86400;
  let hours = Math.floor(seconds / 3600);
  if (hours > 0) {
    res.push(`${hours}小时`);
  }
  seconds %= 3600;
  let minutes = Math.floor(seconds / 60);
  if (minutes > 0) {
    res.push(`${minutes}分`);
  }
  seconds = Math.round(seconds % 60);
  if (seconds > 0) {
    res.push(`${seconds}秒`);
  }
  return res.length ? res.slice(0, 2).join('') : '';
};

export const formatDate = (time,YYYY) => {
  let t = parseInt(time);
  let d=new Date(t),
      year = d.getFullYear(),
      month = d.getMonth() + 1,
      date = d.getDate(),
      hour = d.getHours(),
      minute = d.getMinutes(),
      second = d.getSeconds();

  if(YYYY){
    return year + "-" + month + "-" + date + " " + hour + ":" + minute;
  }else{
    return month + "月" + date + "日" + hour + ":" + minute;
  }
}
