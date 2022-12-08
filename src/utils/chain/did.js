import {
  addAllVCs,
  addDIDWhenEmpty,
  array_column,
  dbGetUserWallet,
  empty,
  getVCsByIDS,
  implode,
  json_to_obj,
} from "@@/utils/function";
import elliptic from "elliptic";

import moment from "moment";
import { base58Encode, Web3SignData } from "@@/utils/chain/wallet";
import { GetAvailableVC, MarkVCReceived } from "@@/utils/request/api";
import { ethers } from "@@/utils/chain/chainBase";

const EC = elliptic.ec;
const ec = new EC("secp256k1");

const PurposeAuth = "Authentication";
const Secp256k1Sig = "EcdsaSecp256ETHSignature2022";
const Secp256k1Key = "EcdsaSecp256k1VerificationKey2019";

const ContextDID = "https://w3id.org/did/v1";
// const ContextCredential = "https://www.w3.org/2018/credentials/v1"
const ContextSecp256k1 = "https://ns.did.ai/suites/secp256k1-2019/v1/";

// const TypeCredential   = "VerifiableCredential"
// const TypeVericDeposit = "VericDeposit"
const VerifiablePresentation = "VerifiablePresentation";

const DIDPrefix = "did:veric:";

function listSort(ArrList = [], key = "id") {
  let arr = {};
  let sortKeys = ArrList.map((item) => {
    arr[item[key]] = item;
    return item[key];
  });
  sortKeys.sort();
  let list = [];
  sortKeys.map((item) => {
    list = [...list, arr[item]];
    return item;
  });

  return list;
}

export function didIDCreate(account = "") {
  account = empty(account) ? dbGetUserWallet()?.account : account;
  console.log("DID Create Account: ", DIDPrefix + account);
  return DIDPrefix + account;
}

export const recoverPublicKeyFromSign = (signMsg, Signature) => {
  const msgHash = ethers.utils.hashMessage(signMsg);
  const msgHashBytes = ethers.utils.arrayify(msgHash);

  // Now you have the digest,
  return ethers.utils.recoverPublicKey(msgHashBytes, Signature);
};

export const recoverAddressFromSign = (signMsg, Signature) => {
  const msgHash = ethers.utils.hashMessage(signMsg);
  const msgHashBytes = ethers.utils.arrayify(msgHash);

  // Now you have the digest,
  return ethers.utils.recoverAddress(msgHashBytes, Signature);
};

function signPubData(publicKey = "") {
  const public_key_bytes = ec.keyFromPublic(publicKey.slice(2), "hex").getPublic().encode();
  return "z" + base58Encode(public_key_bytes);
}

const VPSignature = (vp = {}) => {
  let vp_copy = JSON.parse(JSON.stringify(vp));
  vp_copy.proof.jws = "";
  let signatureData = VPToByte(vp_copy);
  return ethers.utils.hashMessage(signatureData);
};

const BytesWriteString = (str) => {
  return ethers.utils.toUtf8Bytes(str);
};

const CSToByte = (cs) => {
  let Bytes = BytesWriteString(cs.chain + "");
  Bytes = [...Bytes, ...BytesWriteString(cs.currency + "")];
  Bytes = [...Bytes, ...BytesWriteString(cs.amount + "")];
  Bytes = [...Bytes, ...BytesWriteString(cs.platform_fee_amount + "")];
  Bytes = [...Bytes, ...BytesWriteString(cs.pool_fee_amount + "")];
  Bytes = [...Bytes, ...BytesWriteString(cs.merchant_amount + "")];
  return Bytes;
};

const VCToByte = (vc) => {
  vc["@context"].sort();
  vc.type.sort();

  let Bytes = BytesWriteString(implode(vc["@context"], ","));
  Bytes = [...Bytes, ...BytesWriteString(vc.id)];
  Bytes = [...Bytes, ...BytesWriteString(implode(vc.type, ","))];
  Bytes = [...Bytes, ...BytesWriteString(vc.issuer)];
  Bytes = [...Bytes, ...BytesWriteString(vc.issuanceDate)];
  Bytes = [...Bytes, ...BytesWriteString(vc.expirationDate)];
  Bytes = [...Bytes, ...BytesWriteString(vc.description)];
  Bytes = [...Bytes, ...CSToByte(vc.credentialSubject)];
  Bytes = [...Bytes, ...VCProofToByte(vc.proof)];
  return Bytes;
};

const VCProofToByte = (vc_proof) => {
  let Bytes = BytesWriteString(vc_proof.type);
  Bytes = [...Bytes, ...BytesWriteString(vc_proof.created)];
  Bytes = [...Bytes, ...BytesWriteString(vc_proof.verificationMethod)];
  Bytes = [...Bytes, ...BytesWriteString(vc_proof.proofPurpose)];
  Bytes = [...Bytes, ...BytesWriteString(vc_proof.jws)];
  return Bytes;
};

const VPProofToByte = (vp_proof) => {
  let Bytes = BytesWriteString(vp_proof.type);
  Bytes = [...Bytes, ...BytesWriteString(vp_proof.created)];
  Bytes = [...Bytes, ...BytesWriteString(vp_proof.verificationMethod)];
  Bytes = [...Bytes, ...BytesWriteString(vp_proof.proofPurpose)];
  Bytes = [...Bytes, ...BytesWriteString(vp_proof.jws)];
  Bytes = [...Bytes, ...BytesWriteString(vp_proof.nonce + "")];
  return Bytes;
};

const VPToByte = (vp) => {
  vp["@context"].sort();
  vp.type.sort();
  vp.verifiableCredential = listSort(vp.verifiableCredential, "id");
  // sortSort(vp.verifiableCredential)

  let Bytes = BytesWriteString(implode(vp["@context"], ","));
  Bytes = [...Bytes, ...BytesWriteString(implode(vp.type, ","))];

  vp.verifiableCredential.map((item, index) => {
    Bytes = [...Bytes, ...VCToByte(item)];
    return item;
  });
  Bytes = [...Bytes, ...BytesWriteString(vp.holder)];
  Bytes = [...Bytes, ...VPProofToByte(vp.proof)];
  return Bytes;
};

export function CreateDIDDocument(account = "", publicKey = "") {
  const pubData = signPubData(publicKey);
  const userPbKeyHexAddress = account;
  const documentId = DIDPrefix + userPbKeyHexAddress;
  const currentTime = moment().format();
  const DIDDocument = {
    "@context": [ContextSecp256k1, ContextDID],
    id: documentId,
    created: currentTime,
    updated: currentTime,
    version: 1,
    verificationMethod: [
      {
        id: documentId + "#verification",
        type: Secp256k1Key,
        controller: documentId,
        publicKeyMultibase: pubData,
      },
    ],
    authentication: documentId + "#verification",
    service: null,
    address: userPbKeyHexAddress,
  };
  addDIDWhenEmpty(DIDDocument);
  return DIDDocument;
}

export async function createVP(VCids = []) {
  let VCs = await getVCsByIDS(VCids);
  let verifiableCredential = [];
  if (VCs?.length <= 0) {
    return { code: -1, data: [], msg: "VC does not exist" };
  }

  VCs.map((item, index) => {
    const objVc = json_to_obj(
      ethers.utils.toUtf8String(ethers.utils.base64.decode(item.vc_content))
    );
    verifiableCredential = [objVc, ...verifiableCredential];
    return item;
  });

  const uAccount = dbGetUserWallet()?.account;
  const holder = DIDPrefix + uAccount;
  const currentTime = moment().format();
  const VP = {
    "@context": [ContextSecp256k1, ContextDID],
    type: [VerifiablePresentation],
    verifiableCredential: verifiableCredential,
    holder: holder,
    proof: {
      type: Secp256k1Sig,
      created: currentTime,
      verificationMethod: holder + "#verification",
      proofPurpose: PurposeAuth,
      jws: "",
      nonce: Math.ceil(Date.now()) + "",
    },
  };
  const VP_sign_hash = VPSignature(VP);
  const res3 = await Web3SignData(uAccount, VP_sign_hash);
  if (typeof res3?.code === "undefined" || res3.code !== 1000 || empty(res3.data)) {
    return res3;
  }
  VP.proof.jws = res3?.data;
  return { code: 1000, data: JSON.stringify(VP), msg: "ok" };
}

//1.进入资产页面，调用GetAvailableVC,直到没数据了，才结束，获取后存入本地，然后调用MarkVCReceived，标记已接收

//2.资产列表检测到，vc状态是created,执行1操作

//3.资产列表检测到，vc是Active，但是本地却没有vc数据，显示置灰按钮
// 用户点击重新拉去时，调用MarkVCInvalid，隔几秒后再执行1操作

export const getVCs = async (page = 1) => {
  const size = 100;
  const res = await GetAvailableVC({ page: page, size: size });
  if (res?.code === 1000) {
    if (res?.data?.length > 0) {
      const res1 = await addAllVCs(res?.data);
      if (res1 !== false) {
        await MarkVCReceived({ vc_ids: array_column(res?.data, "vc_id") });
      }
      await getVCs(page + 1);
    }
  } else {
    return true;
  }
};
