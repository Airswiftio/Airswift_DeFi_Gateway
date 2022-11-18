import {dbGetUserWallet, empty} from "@@/utils/function";
import moment from "moment";
import {base58btc} from "multiformats/bases/base58";
import {EllipticMarshal, TestCreateUserDID} from "@@/utils/chain/elliptic";

const PurposeAuth  = "Authentication"
const Secp256k1Sig = "EcdsaSecp256k1Signature2019"
const Secp256k1Key = "EcdsaSecp256k1VerificationKey2019"

const ContextDID        = "https://w3id.org/did/v1"
const ContextCredential = "https://www.w3.org/2018/credentials/v1"
const ContextSecp256k1  = "https://ns.did.ai/suites/secp256k1-2019/v1/"

const TypeCredential   = "VerifiableCredential"
const TypeVericDeposit = "VericDeposit"
const DIDPrefix = "did:veric:"
const RFC_3339 = 'YYYY-MM-DDTHH:mm:ss';


export function didCreate(account = '') {
  // const aa= TestCreateUserDID();
  account = empty(account) ? dbGetUserWallet()?.account : account;
  const didAddress = DIDPrefix+account;
  return  didAddress


  // const aa= EllipticMarshal()
  // const aa= base58btc.baseEncode(EllipticMarshal())
// //> 'mAYAEEiCTojlxqRTl6svwqNJRVM2jCcPBxy+7mRTUfGDzy2gViA'no
  const documentId = DIDPrefix+account.toString();
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

//
// export function SimonCreateDID(account = ''){
//   account = empty(account) ? dbGetUserWallet()?.account : account;
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
//   const didAddress = DIDPrefix+account;
// }



export function createVP(){

}