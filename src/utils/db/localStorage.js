// import md5 from "js-md5";
import {json_to_obj,md5} from "@@/utils/function";

//The auxiliary key in the localStorage uses this key to handle exceptions when the value is undefined (not a string)
const localStorageKey = 'localData';
//
// function md5(value) {
//   return value;
// }





class LocalStore {


  /* set localStorage */
   setLocal(key = '',value){
    let vv = {};
    vv[localStorageKey] = typeof value === "undefined" ?"undefined":value;
    // key = md5(key);
    return localStorage.setItem(key, JSON.stringify(vv));
  }

  /* delete localStorage */
   deleteLocal(key = ''){
    // key = md5(key);
    return localStorage.removeItem(key);
  }

  /* get localStorage */
   getLocal(key = ''){
    //When the incoming key is incorrect, an empty string is returned directly
    if(typeof key !== 'string' || key === ''){
      return '';
    }

    // key = md5(key);
    //When the obtained data is null or does not contain the specified string, null is returned directly
    let result = localStorage.getItem(key);
    if(result === null || result.indexOf(localStorageKey) === -1){
      return null;
    }

    //The json string is parsed into an object
    let data = json_to_obj(result)[localStorageKey];
    let undef;
    return data === "undefined"?undef: data;
  }

    clearAll(){
        return localStorage.clear();
    }

    clear(db){
        return localStorage.clear();
    }

  /* dbGetUserWallet */
  dbGetUserWallet(){
    return this.getLocal('userWallet');
  }

  /* dbSetUserWallet */
    dbSetUserWallet(value){
    return this.setLocal('userWallet',value);
  }

  /* delLocalUserWallet */
    delLocalUserWallet(){
    return this.deleteLocal('userWallet');
  }

  /* set JWTToken  */
    setJWTToken(value){
    return this.setLocal('JWTToken',value);
  }

  /* get JWTToken */
    getJWTToken(){
    return this.getLocal('JWTToken');
  }

    setStakingAddress(value){
    return this.setLocal('stakingAddress',value);
  }

    getStakingAddress(){
    return this.getLocal('stakingAddress');
  }

    delStakingAddress(){
    return this.deleteLocal('stakingAddress');
  }

    setNFTAddress(value){
    return this.setLocal('NFTAddress',value);
  }

    getNFTAddress(){
    return this.getLocal('NFTAddress');
  }

    delNFTAddress(){
    return this.deleteLocal('NFTAddress');
  }

    setTokensMetadata(value){
    return this.setLocal('TokensMetadata',value);
  }

    getTokensMetadata(){
    return this.getLocal('TokensMetadata');
  }

    delTokensMetadata(){
    return this.deleteLocal('TokensMetadata');
  }

}


const dbLocal = new LocalStore();

export default dbLocal


