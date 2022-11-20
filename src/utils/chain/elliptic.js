import elliptic from 'elliptic'
import ecdsa from 'ecdsa-secp256k1'
import secp256k1 from 'secp256k1'
import randomBytes from "randombytes-pure";
import moment from "moment";
import {base58btc} from "multiformats/bases/base58";

const EC = elliptic.ec;
// const ec = new elliptic.ec({curve: elliptic.curves.secp256k1});
// Create and initialize EC context
// (better do it once and reuse it)
const ec = new EC('secp256k1');
const private_key = '0x2cf9e6739d9eac37baa9ec2a0debcf42fc2db84f4cda09cbdc0e18c75059639d';
const public_key = '0x04d75ed47b5a540626e4b0f55898984788259f2fdc90fbeb69f28b863830146ce074b3443a84974f2eb2b815baf49b369c19cfa447060a84f0f8174b365ce1d97d';


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

const generatePrivateKey = function() {
  return ec.genKeyPair().getPrivate().toString();
}
//
// const toBuffer = function(ab)  {
//   window.Buffer = window.Buffer || require("buffer").Buffer;
//
//   const buf = new Buffer(ab.byteLength);
//   const view = new Uint8Array(ab);
//   for (let i = 0; i < buf.length; ++i) {
//     buf[i] = view[i];
//   }
//   return buf;
// }


const generatePublicKey = (privateKey) => {
  const pubPoint = ec.keyFromPrivate(privateKey).getPublic();
  return pubPoint.encode()

  // console.log('p11ubPoint',pubPoint);
  // console.log('pubPoint.encode(\'hex\')',pubPoint.encode('hex'));
  // console.log('pubPoint.encod',pubPoint.encode('hex').toString());
  //
  return {x:pubPoint.getX().toString("hex"), y:pubPoint.getY().toString("hex")}
}




export const EllipticMarshal = () => {
  console.log('randomUserKey',randomUserKey().getPublic());
  return ;



  // const pubPoint = ec.keyFromPrivate(private_key).getPublic().encode();
  // console.log('pubPoint',pubPoint);
  // return pubPoint

  const aa = '92e8ed592f256a37ecefc0c25282cf76aa7bca0e79919ac8271c8259cad33095'
  const pubPoint = ec.keyFromPrivate(aa).getPublic();
  console.log('pubPoint',pubPoint);
  console.log('pubPointencode',pubPoint.encode());
  return pubPoint.encode()



  // Import public key
  const publicKey = {
    x:public_key.substring(4,67),
    y:public_key.substring(68,131)
  }
  var key = ec.keyFromPublic(publicKey, 'hex').pub.encode();
  console.log('key',key);

  return key
  /*let privateKeyNum = 0x2cf9e6739d9eac37baa9ec2a0debcf42fc2db84f4cda09cbdc0e18c75059639d;
  let publicKeyPoint = ecdsa.getPublicKeyPoint(privateKeyNum);
  const aa = ecdsa.publicKeyPoint2HexStr(publicKeyPoint);
  console.log('aa',aa);*/




  /*// get the public key in a compressed format
  const pubKey = secp256k1.publicKeyCreate(private_key);//根据私钥生成公钥
  console.log(pubKey,'------');

  return
  // const publicKey = generatePublicKey(private_key)
  // return publicKey
  // console.log('publicKey',publicKey);
  // console.log('publicKey.encode(\'hex\')',publicKey.encode('hex'));
  // Import public key
  // console.log('ec.keyFromPublic(public_key, \'short\')',ec.keyFromPublic(public_key, ));
  console.log('public_key',public_key.length);
  const publicKey = {
    x:public_key.substring(4,67),
    y:public_key.substring(68,131)
  }
  return ec.keyFromPublic(publicKey, 'hex').getPublic().encode('secp256k1');*/
}


// export function aaaaa(){
//
//   /* // Generate keys
//    // const key = ec.genKeyPair();
//    // console.log('key',key);
//
//    // Sign the message's hash (input must be an array, or a hex-string)
//    const msgHash = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
//    const signature = key.sign(msgHash);
//    console.log('signature',signature);
//
//  // Export DER encoded signature in Array
//    const derSign = signature.toDER();
//    console.log('derSign',derSign);
//
//    // Verify signature
//    console.log(key.verify(msgHash, derSign));
//  */
//
//
//
//   // CHECK WITH NO PRIVATE KEY
//
//   var pubPoint = key.getPublic();
//   var x = pubPoint.getX();
//   var y = pubPoint.getY();
//
// // Public Key MUST be either:
// // 1) '04' + hex string of x + hex string of y; or
// // 2) object with two hex string properties (x and y); or
// // 3) object with two buffer properties (x and y)
//   var pub = pubPoint.encode('hex');                                 // case 1
//   var pub = { x: x.toString('hex'), y: y.toString('hex') };         // case 2
//   var pub = { x: x.toBuffer(), y: y.toBuffer() };                   // case 3
//   var pub = { x: x.toArrayLike(Buffer), y: y.toArrayLike(Buffer) }; // case 3
//
// // Import public key
//   var key = ec.keyFromPublic(pub, 'hex');
//
// // Signature MUST be either:
// // 1) DER-encoded signature as hex-string; or
// // 2) DER-encoded signature as buffer; or
// // 3) object with two hex-string properties (r and s); or
// // 4) object with two buffer properties (r and s)
//
//   var signature = '3046022100...'; // case 1
//   var signature = new Buffer('...'); // case 2
//   var signature = { r: 'b1fc...', s: '9c42...' }; // case 3
//
// // Verify signature
//   console.log(key.verify(msgHash, signature));
//
// }

































export const randomUserKey = () => {
  const key = ec.genKeyPair();
  return EETH().NewPrivateKeyFromECDSA(key)
}



function PrivateKey(p) {
  this.kk = p;
  this.PublicKey = function() {
    return p.key.getPublic()
  };
}

export function EETH(){

  const NewPrivateKeyFromECDSA = (key) => {
    // return PrivateKey
    this.nnnnn = key;
    console.log('bb');
    //
    // this.PublicKey = () => {
    //
    //   console.log('aa');
    //   return key.getPublic();
    // }

    // this.EllipticMarshal = () => {
    //   return ec.keyFromPublic(key, 'hex');
    // }
    //
    // this.Address = () => {
    //   return key.encode('hex');
    // }
    //
    // this.Address.String = () => {
    //   return this.Address.encode('hex');
    // }
    // return {key: key}
  }


  return {
    NewPrivateKeyFromECDSA,
  }

}

export const randomUserDID = () => {
  const key = randomUserKey();
  console.log('key.PublicKey()11111');
  // console.log('key.PublicKey()11111',key.PublicKey());
  // const did = CreateUserDID(key.PublicKey())
  // return {key,did}
}

export const CreateUserDID = (userPbKey) => {
  const documentId = DIDPrefix+userPbKey.Address().String();
  // currentTime := time.Now().Format(time.RFC3339)
  const currentTime = moment.utc().format(RFC_3339);
  const pubData= base58btc.baseEncode(userPbKey.EllipticMarshal())


  const DIDDocument = {
    ID:documentId,
    Context:        [ContextSecp256k1,ContextDID],
    Created:currentTime,
    Updated:currentTime,
    Version:        1,
    Authentication: documentId + "#verification",
    Address:        userPbKey.Address().String(),
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




export const TestCreateUserDID = () => {
  const a1  = new PrivateKey('dd');
  const aa = a1.PublicKey('mm')
  console.log('aa999',aa);
  // const {_,oriDid} = randomUserDID();
  //
  //
  // return oriDid;
}