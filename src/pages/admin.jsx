import React, { useState,useEffect } from "react";
import {
  DefaultButton,
  Invite,
} from "@@/components";

import "./admin.scss";
import UserListTable from "@@/components/admin/UserListTable";
import {
  ChangeUserMerchantRole,
  GetMerchantUserList,
} from "@@/utils/request/api";
import DropdownNew from "../components/dropdownNew/dropdownNew";
import {select_role} from "@@/utils/config";
import Popup from "reactjs-popup";
import Alert from "@@/components/PopUp/Alert";

const Admin = () => {
  const [refreshNum, setRefreshNum] = useState(0);
  const [checkedUsers, setCheckedUsers] = useState([]);
  const [addUser, setAddUser] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [selectRole, setSelectRole] = useState();
  const [openAlert, setOpenAlert] = useState(false);
  const [alertData, setAlertData] = useState({});

  const userColumns = [
    {key:'did',width:'60%',title:'DID Wallet'},
    {key:'role',width:'30%',title:'Role'},
  ];

  const getList = async () => {
    const res = await GetMerchantUserList({status:'all',page:1,size:100});
    console.log('res',res);
    if(res?.code === 1000){
      let data = res?.data?.merchant_users ?? []
      for (const dataKey in data) {
        data[dataKey].did =  data?.[dataKey]?.user_detail?.did ?? '';
      }
      setDataList([...data])
    }
  }

  const changeUsersToRole = async () => {
    if(!checkedUsers?.length){
      setOpenAlert(true)
      setAlertData({msg:'Please select the users!'})
      return false;
    }

    if(typeof selectRole === 'undefined'){
      setOpenAlert(true)
      setAlertData({msg:'Please select the role you want to change the users! '})
      return false;
    }

    let userIds = [];
    for (const kk in checkedUsers) {
      const value = checkedUsers[kk];
      const user = dataList?.[value];
      userIds = [...userIds,user?.id]
      if(user.role === 'admin'){
        setOpenAlert(true)
        setAlertData({msg:'The admin user cannot be modified!'})
        return false;
      }
    }

    const res = await ChangeUserMerchantRole({
      relation_ids: userIds,
      role: select_role()?.[selectRole]?.key
    });
    if(res?.code !== 1000){
      setOpenAlert(true)
      setAlertData({msg:res?.msg})
      return false;
    }
    setRefreshNum(refreshNum + 1)
  }

  useEffect(() => {
    getList()
  }, [refreshNum]);

  return (
    <div className="adminWrapper">
      <Popup open={openAlert} closeOnDocumentClick onClose={()=>setOpenAlert(false)}>
        <Alert alertData={alertData} setCloseAlert={setOpenAlert} />
      </Popup>
      {!addUser ? (
        <>
          <div className="controls">
            <div className="controlsLeft">
              <DropdownNew
                  buttonStyle={{width:'170px'}}
                  options={select_role()}
                  defaultTitle="Change Role to"
                  selected={selectRole}
                  setSelected={setSelectRole}
              />
              <div className="controlsChange" onClick={changeUsersToRole}>Change</div>
            </div>

            <DefaultButton
              title="Add User"
              type={0}
              align={2}
              btnStyle={{height:'44px',padding: '0 59px',margin:'0 0 0 12px'}}
              click={() => setAddUser(true)}
            />
          </div>
          <div className="main">
            <UserListTable
                columns={userColumns}
                isSelectAll={true}
                dataList={dataList}
                checkedList={checkedUsers}
                setCheckedList={setCheckedUsers}
                isOpenCheck={true}>
            </UserListTable>
          </div>
        </>
      ) : (
        <Invite
            setAddUser={setAddUser}
            refreshNum={refreshNum}
            setRefreshNum={setRefreshNum} />
      )}
    </div>
  );
};

export default Admin;
