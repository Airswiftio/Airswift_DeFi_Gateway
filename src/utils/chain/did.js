import {
  addAllVCs,
  array_column,
  dbClearAccount,
  dbGetUserWallet,
  empty,
  fullClose,
  getVCsByIDS,
  json_to_obj
} from "@@/utils/function";
import elliptic from 'elliptic'
import secp256k1 from 'secp256k1'

import moment from "moment";
import {base58btc} from "multiformats/bases/base58";
import {base58Encode, base58Encode1, Web3SignData} from "@@/utils/chain/wallet";
import {GetAvailableVC, MarkVCReceived} from "@@/utils/request/api";
import {ethers} from "@@/utils/chain/chainBase";

const EC = elliptic.ec;
const ec = new EC('secp256k1');


const PurposeAuth  = "Authentication"
const Secp256k1Sig = "EcdsaSecp256k1Signature2019"
const Secp256k1Key = "EcdsaSecp256k1VerificationKey2019"

const ContextDID        = "https://w3id.org/did/v1"
const ContextCredential = "https://www.w3.org/2018/credentials/v1"
const ContextSecp256k1  = "https://ns.did.ai/suites/secp256k1-2019/v1/"

const TypeCredential   = "VerifiableCredential"
const TypeVericDeposit = "VericDeposit"
const VerifiablePresentation = "VerifiablePresentation"

const DIDPrefix = "did:veric:"
// const RFC_3339 = 'YYYY-MM-DDTHH:mm:ss';
const RFC_3339 = 'YYYY-MM-DDTHH:mm:ssZ07:00';


export function didCreate(account = '') {
  // const aa= TestCreateUserDID();
  account = empty(account) ? dbGetUserWallet()?.account : account;
  const didAddress = DIDPrefix+account;
  return  didAddress


  // const aa= EllipticMarshal()
  // const aa= base58btc.baseEncode(EllipticMarshal())
// //> 'mAYAEEiCTojlxqRTl6svwqNJRVM2jCcPBxy+7mRTUfGDzy2gViA'no
  // currentTime := time.Now().Format(time.RFC3339)
//   const currentTime = moment.utc().format(RFC_3339);
//   const pubData = multibase.Encode(multibase.Base58BTC, userPbKey.EllipticMarshal())
//
//
//   const DIDDocument = {
//     ID:documentId,
//     Context:documentId,
//     //       Context:        []string{ContextSecp256k1, ContextDID},
//     Created:currentTime,
//     Updated:currentTime,
//     Version:        1,
//     Authentication: documentId + "#verification",
//     Address:        userPbKey.Address().String(),
//     VerificationMethod:[
//       {
//         ID:           documentId + "#verification",
//         Controller:   documentId,
//         MethodType:   Secp256k1Key,
//         MultibaseKey: pubData,
//       },
//     ],
//
//   }

  // currentTime := time.Now().Format(time.RFC3339)
  // pubData = multibase.Encode(multibase.Base58BTC, userPbKey.EllipticMarshal())
  // return &DIDDocument{
  //   ID:             documentId,
  //   Created:        currentTime,
  //       Updated:        currentTime,
  //       Version:        1,
  //       Authentication: documentId + "#verification",
  //       Address:        userPbKey.Address().String(),
  //       VerificationMethod: []VerificationMethod{
  //     {
  //       ID:           documentId + "#verification",
  //           Controller:   documentId,
  //         MethodType:   Secp256k1Key,
  //         MultibaseKey: pubData,
  //     },
  //   },
  // }
  //todo 999
  // account = empty(account) ? dbGetUserWallet()?.account : account;
  // return  didAddress
}

function PublicKey(ppp) {
  this.key = new ec.keyFromPublic();

}
PublicKey.prototype.Address = function (){
  // this.key.

}

function signPubData() {
  const public_key = '04ae0270fa5d50d1910a1d87dcccde4ceceb9beaf5e6aa83cf5feea8f1cbe4bd94e042c71688837aa0282e943fbe0e2611e9918c09529a5c49e363ba8ccb97f9d3';
  const public_key_bytes =   ec.keyFromPublic(public_key,'hex').getPublic().encode()
  return 'z'+base58Encode(public_key_bytes)

 /* const private_key = '5c913b25ad68a82be4db5b05b3123390105c6e8742b7b3ed0f628d392d2e006e';
  const public_key = '04ae0270fa5d50d1910a1d87dcccde4ceceb9beaf5e6aa83cf5feea8f1cbe4bd94e042c71688837aa0282e943fbe0e2611e9918c09529a5c49e363ba8ccb97f9d3';
  // const public_key_bytes = ec.keyFromPrivate(private_key).getPublic().encode();
  const public_key_bytes =   ec.keyFromPublic(public_key,'hex').getPublic().encode()
  // return 'z'+base58Encode(ec.keyFromPrivate('5c913b25ad68a82be4db5b05b3123390105c6e8742b7b3ed0f628d392d2e006e').getPublic().encode())
  return 'z'+base58Encode(public_key_bytes)*/

  //zQxDgxC3FpGcazoQ2NguXkbm1KQzGBDXuc6bjmd67AUuzZFxcABiReNZS1CZXqkggwN5MuDpvwaPLqek9yA4W6SMG
}


export function SimonCreateDID( userPbKey1 ){
  const pubData = signPubData()
  const userPbKeyHexAddress =  dbGetUserWallet()?.account ?? '';
  const documentId = DIDPrefix + userPbKeyHexAddress;
  const currentTime = moment().format();
  const DIDDocument = {
    "@context":        [ContextSecp256k1,ContextDID],
    "id":documentId,
    "created":currentTime,
    "updated":currentTime,
    "version":        1,
    "verificationMethod":[
      {
        "id":           documentId + "#verification",
        "type":   Secp256k1Key,
        "controller":   documentId,
        "publicKeyMultibase": pubData,
      },
    ],
    "authentication": documentId + "#verification",
    "service":null,
    "address":        userPbKeyHexAddress,

  }

  return DIDDocument;
}

function publicKeyToAddress(publicKey) {
  //todo 888
  return publicKey
}

//可行方案
export function SimonCreateDID2( userPbKey1 ){
  // const userPbKey = new PublicKey();
  const key =  ec.genKeyPair();
  const userPbKey = key.getPublic();//PublicKey Point
  const pub = userPbKey.encode();//PublicKey hex address
  const pubData = base58Encode(pub)
  // console.log('pub',pub);
  // console.log('pub1',userPbKey.encode('hex'));
  // //046259bbb688f6a486b5b8c4c34761f2839cb94835a74044807da180f60569033fdab6ac9aeee020602efa78437d7ee88357b9ebc07cb53779872ceda5e7815fc9
  // console.log('pub2', userPbKey.encodeCompressed('hex'));//PublicKey hex address(Compressed)
  // //02d2fbea17dce1372852543878114841dbe4460fb92b909d9a774b82795fe27f92

  const userPbKeyHexAddress =  publicKeyToAddress(userPbKey.encodeCompressed('hex'));
  const documentId = DIDPrefix + userPbKeyHexAddress;
  const currentTime = moment.utc().format(RFC_3339);
  const DIDDocument = {
    ID:documentId,
    Context:        [ContextSecp256k1,ContextDID],
    Created:currentTime,
    Updated:currentTime,
    Version:        1,
    Authentication: documentId + "#verification",
    Address:        userPbKeyHexAddress,
    VerificationMethod:[
      {
        ID:           documentId + "#verification",
        Controller:   documentId,
        MethodType:   Secp256k1Key,
        MultibaseKey: pubData,
      },
    ],

  }

  return DIDDocument;
}


export function SimonCreateDID1( userPbKey ){
  const userPbKeyHexAddress =  userPbKey.Address().String();
  const documentId = DIDPrefix + userPbKeyHexAddress;
  const currentTime = moment.utc().format(RFC_3339);
  const pubData = base58btc.baseEncode(userPbKey.EllipticMarshal())
  const DIDDocument = {
    ID:documentId,
    Context:        [ContextSecp256k1,ContextDID],
    Created:currentTime,
    Updated:currentTime,
    Version:        1,
    Authentication: documentId + "#verification",
    Address:        userPbKeyHexAddress,
    VerificationMethod:[
      {
        ID:           documentId + "#verification",
        Controller:   documentId,
        MethodType:   Secp256k1Key,
        MultibaseKey: pubData,
      },
    ],

  }
  // const didAddress = DIDPrefix+account;
}


export  async function createVP(VCids = []){
  let VCs = await getVCsByIDS(VCids);
  let verifiableCredential = [];
  if(VCs?.length <= 0){
    return {code:-1,data:[],msg:'VC does not exist'}
  }

  VCs.map((item,index)=>{
    const objVc = json_to_obj(ethers.utils.toUtf8String(ethers.utils.base64.decode(item.vc_content)));
    verifiableCredential = [objVc,...verifiableCredential];
  })

  const uAccount = dbGetUserWallet()?.account;
  const holder = DIDPrefix + uAccount;
  const vp = {
    "@context":[ContextSecp256k1,ContextDID],
    "type":[VerifiablePresentation],
    "verifiableCredential":verifiableCredential,
    "holder":holder,
    "proof": {
      "type": Secp256k1Sig,
      "created": "2022-06-11T00:31:19+08:00",
      "verificationMethod": holder+"#verification",
      "proofPurpose": PurposeAuth,
      "jws": "",
      "nonce": fullClose(10000,99999)
    },
  }

  let res3 = await Web3SignData(uAccount,'Generate VP through VC');
  if(typeof res3?.code === 'undefined' || res3.code !== 1000 || empty(res3.data)){
    return res3;
  }
  vp.proof.jws = res3?.data;
  return {code:1000,data:vp,msg:'ok'}
}

//1.进入资产页面，调用GetAvailableVC,直到没数据了，才结束，获取后存入本地，然后调用MarkVCReceived，标记已接收


//2.资产列表检测到，vc状态是created,执行1操作

//3.资产列表检测到，vc是Active，但是本地却没有vc数据，显示置灰按钮
// 用户点击重新拉去时，调用MarkVCInvalid，隔几秒后再执行1操作

export const getVCs = async (page = 1)=>{
  const size = 100;
  const res = await GetAvailableVC({page:page,size:size});
  if(res?.code === 1000){
    if(res?.data?.length > 0){
      const aa = await addAllVCs(res?.data)
      console.log('addAllVCs',aa);
      const res2 = await MarkVCReceived({vc_ids:array_column(res?.data,'vc_id')})
      await getVCs(page + 1)
    }
  }
}