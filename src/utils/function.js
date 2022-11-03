import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import LocalStore from "@@/utils/db/localStorage";
import db from "@@/utils/db/browserDb";
const dbStore = db;
dayjs.extend(utc);

/* Check whether it is a mobile access */
export function _isMobile() {
  return navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
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
export function hideStr(str = '', start_len = 1, end_len = 1,symbol = '*',replace_len = -1) {
  let len = replace_len <= 0 ? str.length - start_len - end_len :replace_len;
  let replace_symbol = '';
  for (let i = 0; i < len; i++) {
    replace_symbol += symbol;
  }
  return str.substring(0, start_len) + replace_symbol + str.substring(str.length - end_len);
}

/* Json String to Object */
export function json_to_obj(_data_) {
  if(typeof _data_ === 'object'){
    return _data_;
  }
  if(!_data_ || typeof _data_ !== 'string'){
    return {};
  }

  const pattern = '&quot;';
  if(_data_.indexOf(pattern)!==-1){
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
export function arrListSort(arrList = [],key = 'id'){
  const handle = (property) => {
    return function(a,b){
      const val1 = a[property];
      const val2 = b[property];
      return val1 - val2;
    }
  }
  return arrList.sort(handle(key));
}

/* Judge whether it is empty */
export function empty(value){
  return typeof value === 'undefined' || value === null || value === false || value.length === 0;
}

/* The seconds are optimized and displayed as days,hours,minutes */
export function timeToFriendly(time = 0) {
  let days = parseInt((time / ( 60 * 60 * 24)).toString());
  let hours = parseInt(((time % ( 60 * 60 * 24)) / ( 60 * 60)).toString());
  let minutes = parseInt(((time % (60 * 60)) / ( 60)).toString());
  return days + " Days, " + hours + " Hours, " + minutes + " Minutes";
}

/* Convert timestamp to local time */
export function timeToLocalDate(timestamp = 0) {
  let date = new Date(timestamp * 1000);
  let Y = date.getFullYear() + '-';
  let Month = date.getMonth()+1;
  let M = (Month < 10 ? ('0'+Month) : Month) + '-';

  let Data = date.getDate();
  let D = (Data < 10 ? ('0'+Data) : Data)+ ' ';

  let Hour = date.getHours();
  let h = (Hour < 10 ? ('0'+Hour) : Hour)+ ':';

  let Minute = date.getMinutes();
  let m = (Minute < 10 ? ('0'+Minute) : Minute)+ ':';

  let Second = date.getSeconds();
  let s = (Second < 10 ? ('0'+Second) : Second);
  return Y+M+D+h+m+s;
}

export function conversionUtcDate(date, type) {
  if (type === 'local') {
    // Pass in local to convert UTC time to local time
    return dayjs.utc(date).local().format('YYYY-MM-DD HH:mm:ss')
  } else if (type === 'UTC') {
    // Convert the time to UTC when it is passed in to UTC
    return dayjs(date).utc().format()
  }
}


const userWalletKey = 'userWallet'
export function dbGetUserWallet() {
  return  dbStore.get(userWalletKey)
}

export function dbSetUserWallet(value){
  return  dbStore.set(userWalletKey,value)
}

const JWTTokenKey = 'JWTToken'
export function dbGetJWTToken() {
  return  dbStore.get(JWTTokenKey)
}
export function dbSetJWTToken(value) {
  return  dbStore.set(JWTTokenKey,value)
}

export function dbClearAccount() {
  return  dbStore.clear()
}


const SignDataKey = 'SignData';
export function dbSetSignData(value) {
  return  dbStore.set(SignDataKey,value)
}




