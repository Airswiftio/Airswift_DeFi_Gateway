import React,{useState,useEffect} from "react";
import { DropdownNew } from "@@/components";
import "./mystore.scss";
import { dbGetUserWallet} from "@@/utils/function";
import {ModifyApplicationBase, ModifyApplicationIpnKey} from "@@/utils/request/api";
import {base_currency, select_role} from "@@/utils/config";

const MyStore = ({myStore,setMyStore}) => {
    const baseCurrency = base_currency();
    const [selected, setSelected] = useState(null);
    // const [storeCurrency, setStoreCurrency] = useState(null);
    // const Currency = myStore?.legal_tender;
    // const Currency = 'usd';
    // console.log('Currency',Currency);
    const modifyBaseCurrency = async (value) => {
        const param = {
            app_id:0,
            name:myStore.name,
            link:myStore.link,
            callback_url:myStore.callbackUrl,
            legal_tender:base_currency()?.[value]?.key}
        const res = await ModifyApplicationBase(param)
        if(res?.code !== 1000){
            alert('修改失败');
            return false;
        }

    }

    useEffect(() => {
        base_currency()?.map((vv,ind)=>{
            if(vv.key === myStore?.legal_tender ){
                setSelected(ind)
            }
        })
    }, []);

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
          <DropdownNew
              buttonStyle={{width:'100px'}}
              options={base_currency()}
              defaultTitle={myStore?.legal_tender?.toUpperCase() ?? ''}
              selected={selected}
              setSelected={setSelected}
              doSomething={modifyBaseCurrency}/>
        </div>
      </div>
  );
};

export default MyStore;
