import React,{useState,useEffect} from "react";
import { DropdownNew } from "@@/components";
import "./mystore.scss";
import { dbGetUserWallet} from "@@/utils/function";
import {ModifyApplicationBase} from "@@/utils/request/api";
import {base_currency} from "@@/utils/config";
import Popup from "reactjs-popup";
import Alert from "@@/components/PopUp/Alert";

const MyStore = ({myStore,setMyStore}) => {
    const [selected, setSelected] = useState(null);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertData, setAlertData] = useState({});
    const modifyBaseCurrency = async (value) => {
        const param = {
            app_id:0,
            name:myStore.name,
            link:myStore.link,
            callback_url:myStore.callbackUrl,
            legal_tender:base_currency()?.[value]?.key}
        const res = await ModifyApplicationBase(param)
        if(res?.code !== 1000){
            setOpenAlert(true)
            setAlertData({msg:res?.msg})
            return false;
        }

    }

    useEffect(() => {
        base_currency()?.map((vv,ind)=>{
            if(vv.key === myStore?.legal_tender ){
                setSelected(ind)
            }
            return vv;
        })
    }, []);

  return (
      <div className="myStore">
          <Popup open={openAlert} closeOnDocumentClick onClose={()=>setOpenAlert(false)}>
              <Alert alertData={alertData} setCloseAlert={setOpenAlert} />
          </Popup>
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
