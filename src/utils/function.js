import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import db from "@@/utils/db/browserDb";
import { dexieDB } from "@@/utils/db/indexDB";
const dbStore = db;
dayjs.extend(utc);

/* Check whether it is a mobile access */
export function _isMobile() {
  return navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  );
}

/**
 *  Hiding string
 *
 *  str         String to be processed
 *  start_len    The first few reserved
 *  end_len      Reserved last few digits
 *  symbol         Replaced string
 *  replace_len      How many characters to replace with the previously defined characters(Not transmitted or <=0, will be replaced with an equal number of characters)
 * */
export function hideStr(str = "", start_len = 1, end_len = 1, symbol = "*", replace_len = -1) {
  let len = replace_len <= 0 ? str.length - start_len - end_len : replace_len;
  let replace_symbol = "";
  for (let i = 0; i < len; i++) {
    replace_symbol += symbol;
  }
  return str.substring(0, start_len) + replace_symbol + str.substring(str.length - end_len);
}

/* Json String to Object */
export function json_to_obj(_data_) {
  if (typeof _data_ === "object") {
    return _data_;
  }
  if (!_data_ || typeof _data_ !== "string") {
    return {};
  }

  const pattern = "&quot;";
  if (_data_.indexOf(pattern) !== -1) {
    _data_ = _data_.replace(new RegExp(pattern, "gm"), '"');
  }
  return JSON.parse(_data_);

  /*if(type === 'local'){
    return eval('(' + _data_ + ')');
  }
  else{
    const json_str = _data_.replace(new RegExp('&quot;', "gm"), '"');
    return JSON.parse(json_str);
  }*/
}

/* The list array is sorted according to the fields of the objects in it */
export function arrListSort(arrList = [], key = "id") {
  const handle = (property) => {
    return function (a, b) {
      const val1 = a[property];
      const val2 = b[property];
      return val1 - val2;
    };
  };
  return arrList.sort(handle(key));
}

/* Judge whether it is empty */
export function empty(value) {
  return typeof value === "undefined" || value === null || value === false || value.length === 0;
}

export function array_column(array, field) {
  return array.map((v) => v[field]);
}

export function array_column2(array, field) {
  let arr = {}
   array.map((v) => {
     arr[v[field]] = v;
     return v
   });
  return arr;
}

export function array_values(array) {
  let arr = []
  for (const key in array) {
    arr = [...arr,array[key]]
  }
  return arr;
}

export function explode(str, separator) {
  return str.split(separator);
}
export function implode(array, separator) {
  return array.join(separator);
}

/* The seconds are optimized and displayed as days,hours,minutes */
export function timeToFriendly(time = 0) {
  let days = parseInt((time / (60 * 60 * 24)).toString());
  let hours = parseInt(((time % (60 * 60 * 24)) / (60 * 60)).toString());
  let minutes = parseInt(((time % (60 * 60)) / 60).toString());
  return days + " Days, " + hours + " Hours, " + minutes + " Minutes";
}

/* Convert timestamp to local time */
export function timeToLocalDate(timestamp = 0) {
  let date = new Date(timestamp * 1000);
  let Y = date.getFullYear() + "-";
  let Month = date.getMonth() + 1;
  let M = (Month < 10 ? "0" + Month : Month) + "-";

  let Data = date.getDate();
  let D = (Data < 10 ? "0" + Data : Data) + " ";

  let Hour = date.getHours();
  let h = (Hour < 10 ? "0" + Hour : Hour) + ":";

  let Minute = date.getMinutes();
  let m = (Minute < 10 ? "0" + Minute : Minute) + ":";

  let Second = date.getSeconds();
  let s = Second < 10 ? "0" + Second : Second;
  return Y + M + D + h + m + s;
}

export function conversionUtcDate(date, type = 'local') {
  if (type === "local") {
    // Switch from UTC to local time
    const localTime = dayjs(date).local().format("YYYY-MM-DD HH:mm:ss");
    return localTime;
  } else if (type === "UTC") {
    // Convert the time to UTC when it is passed in to UTC
    return dayjs(date).utc().format();
  }
}

//取得[n,m]范围随机数
export function fullClose(n, m) {
  let result = Math.random() * (m + 1 - n) + n;
  while (result > m) {
    result = Math.random() * (m + 1 - n) + n;
  }
  return Math.ceil(result);
}

export function copy_text (content) {
  content = content === null ? '':content;
  if(typeof (navigator?.clipboard) !== 'undefined' && window?.isSecureContext){
    navigator?.clipboard?.writeText(content);
    if(content === ''){
      return false;
    }
    else{
      return true;
    }
  }
  else{
    const input = document.createElement('input');
    input.setAttribute('readonly', 'readonly');
    input.setAttribute('value',content );
    document.body.appendChild(input);
    input.select();
    let re = document.execCommand('copy');
    document.body.removeChild(input);
    if (re) {
      return true;
    }
    else{
      return false;
    }
  }
}


export function addNum (num1, num2) {
  let sq1,sq2,m;
  try {
    sq1 = num1.toString().split(".")[1].length;
  }
  catch (e) {
    sq1 = 0;
  }
  try {
    sq2 = num2.toString().split(".")[1].length;
  }
  catch (e) {
    sq2 = 0;
  }
  console.log('sq1',sq1);
  console.log('sq2',sq2);
  m = Math.pow(10,Math.max(sq1, sq2));
  return (num1 * m + num2 * m) / m;
}


export function dbClearAccount() {
  return dbStore.clear();
}

const userWalletKey = "userWallet";
export function dbSetUserWallet(value) {
  return dbStore.set(userWalletKey, value);
}
export function dbGetUserWallet() {
  return dbStore.get(userWalletKey);
}
export function dbDelUserWallet() {
  return dbStore.delete(userWalletKey);
}

const JWTTokenKey = "JWTToken";
export function dbSetJWTToken(value) {
  return dbStore.set(JWTTokenKey, value);
}
export function dbGetJWTToken() {
  return dbStore.get(JWTTokenKey);
}
export function dbDelJWTToken() {
  return dbStore.delete(JWTTokenKey);
}

const SignDataKey = "SignData";
export function dbSetSignData(value) {
  return dbStore.set(SignDataKey, value);
}
export function dbGetSignData() {
  return dbStore.get(SignDataKey);
}
export function dbDelSignData() {
  return dbStore.delete(SignDataKey);
}

export function addAllVCs(list) {
  console.log(new dexieDB("as_vc").addAllOrUpdate(list))
  return new dexieDB("as_vc").addAllOrUpdate(list);
}
export function getAllVCs() {
  return new dexieDB("as_vc").getAll();
}


export async function getVCsCanWithdraw(currency = '') {
  // const vcs = await new dexieDB("as_vc")._init().where({is_get:1}).where('vc_status').anyOf(['Active','Created']).toArray();
  const vcs = await new dexieDB("as_vc")._init().where({is_get:1,currency:currency}).filter(function (vc) {
    return ['Active','Created'].includes(vc.vc_status);
  }).toArray();
  return vcs;
}

export function getVCsByIDS(IDs = []) {
  return new dexieDB("as_vc").getAllByKey("vc_id", IDs);
}

export function addOneLocal(item) {
  return new dexieDB("as_local").add(item);
}

export function getAllLocal() {
  return new dexieDB("as_local").getAll();
}

export function addDIDWhenEmpty(item) {
  const did = item?.id ?? "";
  const data = { did: did, did_document: item };
  return new dexieDB("as_did").addOnce(data, { did: did });
}

export async function getOneDIDById(did = "") {
  const didById = await new dexieDB("as_did").get({ did: did });
  console.log("GET DID By ID: ", didById);
  return didById;
}


