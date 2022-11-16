import React, { useState,useEffect } from "react";
import {
  Dropdown,
  DefaultButton,
  Pagination,
  Invite,
} from "@@/components";

import "./admin.scss";
import UserListTable from "@@/components/admin/UserListTable";
import {
  ChangeUserMerchantRole,
  GetMerchantUserList,
  GetWithdrawList,
  ModifyApplicationBase
} from "@@/utils/request/api";
import DropdownNew from "../components/dropdownNew/dropdownNew";
import {useNavigate} from "react-router";
import {select_role} from "@@/utils/config";

const Admin = () => {
  const navigate = useNavigate();

  const [refreshNum, setRefreshNum] = useState(0);
  const [page, setPage] = useState(0);
  const [checkedUsers, setCheckedUsers] = useState([]);
  const [addUser, setAddUser] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [selectRole, setSelectRole] = useState();

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
      alert('Please select the users.');
      return false;
    }
    if(typeof selectRole === 'undefined'){
      alert('Please select the role you want to change the users.');
      return false;
    }

    // todo 888 批量修改用户角色
    let userIds = [];
    for (const kk in checkedUsers) {
      const value = checkedUsers[kk];
      const user = dataList?.[value];
      userIds = [...userIds,user?.id]
      // if(user.role === 'admin'){
      //   alert('The admin user cannot be modified !');
      //   return false;
      // }
    }

    const res = await ChangeUserMerchantRole({
      relation_ids: userIds,
      role: select_role()?.[selectRole]?.key
    });
    if(res?.code !== 1000){
      alert(res?.msg);
      return false;
    }
    setRefreshNum(refreshNum + 1)
  }

  useEffect(() => {
    getList()
    console.log('aa');
  }, [refreshNum]);

  return (
    <div className="adminWrapper">
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
            {/*<Pagination pages={1} page={page} setPage={setPage} />*/}
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
