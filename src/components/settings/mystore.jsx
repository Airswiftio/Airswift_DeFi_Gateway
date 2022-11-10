import React,{useState,useEffect} from "react";
import { DropdownNew } from "@@/components";
import "./mystore.scss";
import {base_currency, dbGetUserWallet} from "@@/utils/function";
import {ModifyApplicationBase, ModifyApplicationIpnKey} from "@@/utils/request/api";

const MyStore = ({myStore,setMyStore}) => {
    const baseCurrency = base_currency();
    const [storeCurrency, setStoreCurrency] = useState('');
    const Currency = myStore?.legal_tender;
    console.log('Currency',Currency);
    const modifyBaseCurrency = async (value) => {
        const param = {app_id:0,name:myStore.name,link:myStore.link,callback_url:myStore.callbackUrl,legal_tender:value,}
        const res = await ModifyApplicationBase(param)
        if(res?.code !== 1000){
            alert('修改失败');
            return false;
        }

    }

    useEffect(() => {
        // console.log('aa---',myStore);
        setStoreCurrency(myStore?.legal_tender);
    }, [Currency]);

  return (
      <div className="myStore">
        <div className="main">
          <div className="row">
            <span className="label">Store Name</span>
            <span>{myStore.name}</span>
          </div>

          <div className="row">
            <span className="label">Role</span>
            <span>{dbGetUserWallet().roles}</span>
          </div>

          <div className="row">
            <span className="label">Store ID</span>
            <span>{myStore.id}</span>
          </div>
        </div>

        <div className="bottomSection">
          <span className="bottomSectionTitle">Base Currency</span>
          <DropdownNew options={baseCurrency} selectedValue={Currency} setSelectedValue={setStoreCurrency}  doSomething={modifyBaseCurrency}/>
        </div>
      </div>
  );
};

export default MyStore;
