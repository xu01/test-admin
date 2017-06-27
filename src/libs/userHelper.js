
let userToken;

export const getToken = () => userToken;

export const setToken = token => userToken = token;

/**
 * 脱敏
 * @param str
 * @param mask
 * @param start
 * @param end
 * @returns {string}
 */
const masking = (str, mask='*', start=0, end=-1) => {
  return str.substr(0, start) + mask.repeat(str.slice(start, end).length) + str.substr(end);
};

/**
 * 手机号脱敏
 * @param mobile
 */
export const mobileMasking = mobile => masking(mobile.toString(), '*', 3, -4);

/**
 * 身份证脱敏
 * @param idCard
 */
export const idCardMasking = idCard => masking(idCard, '*', 3, -4);

/**
 * 判断手机格式
 * @param mobile
 */
export const mobileValid = mobile => /^1[34578][0-9]{9}$/.test(mobile);

/**
 * 判断身份证格式
 * @param idCard
 * @returns {boolean}
 */
export const idCardValid = idCard => {
  let ID = idCard;
  var city = {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙古",
    21: "辽宁",
    22: "吉林",
    23: "黑龙江 ",
    31: "上海",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",
    41: "河南",
    42: "湖北 ",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏 ",
    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",
    71: "台湾",
    81: "香港",
    82: "澳门",
    91: "国外"
  };
  var birthday = ID.substr(6, 4) + '/' + Number(ID.substr(10, 2)) + '/' + Number(ID.substr(12, 2));
  var d = new Date(birthday);
  var newBirthday = d.getFullYear() + '/' + Number(d.getMonth() + 1) + '/' + Number(d.getDate());
  var currentTime = new Date().getTime();
  var time = d.getTime();
  var arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  var arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
  var sum = 0, i, residue;
  if (!/^\d{17}(\d|x)$/i.test(ID)) {
    return false;
  }
  if (city[ID.substr(0, 2)] === undefined) {
    return false;
  }
  if (time >= currentTime || birthday !== newBirthday) {
    return false;
  }
  for (i = 0; i < 17; i++) {
    sum += ID.substr(i, 1) * arrInt[i];
  }
  residue = arrCh[sum % 11];
  if (residue !== ID.substr(17, 1)) {
    return false;
  }
  return true
};

/**
 * 验证联系人表单信息
 * @param realName
 * @param sex
 * @param mobile
 * @param idCard
 * @param areaID
 * @param address
 * @param emergencyName
 * @param emergencyMobile
 * @returns {*}
 */
export const checkContactInfo = ({
  realName = '',
  sex = 1,
  mobile = '',
  idCard = '',
  areaID = 0,
  address = '',
  emergencyName = '',
  emergencyMobile = ''
}) => {
  if (realName == '') {
    return '姓名填写有误';
  }
  if (![1, 2].includes(sex)) {
    return '性别选择有误';
  }
  if (!mobileValid(mobile)) {
    return '手机号填写有误';
  }
  if (!idCardValid(idCard)) {
    return '身份证填写有误';
  }
  if (!window.tdist[areaID]) {
    return '地区选择有误';
  }
  if (address == '') {
    return '联系地址填写有误';
  }
  if (emergencyMobile != '' && !mobileValid(emergencyMobile)) {
    return '紧急联系人的手机号填写有误';
  }
  return true;
};