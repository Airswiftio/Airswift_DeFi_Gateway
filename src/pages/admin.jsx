import React, { useState,useEffect } from "react";
import {
  Dropdown,
  DefaultButton,
  Pagination,
  Invite,
} from "@@/components";

import "./admin.scss";
import UserListTable from "@@/components/admin/UserListTable";
import {GetMerchantUserList, GetWithdrawList, ModifyApplicationBase} from "@@/utils/request/api";

const Admin = () => {
  const [page, setPage] = useState(0);
  const [checked, setChecked] = useState([]);
  const [addUser, setAddUser] = useState(false);
  const [dataList, setDataList] = useState([]);

  const userListColumns = [
    {key:'did',title:'DID Wallet'},
    {key:'role',title:'Role'},
  ];

  const getList = async () => {
    const res = await GetMerchantUserList({status:'all',page:1,size:100});

    if(res?.code === 1000){
      let data = res?.msg?.merchant_users ?? []
      for (const dataKey in data) {
        data[dataKey].did =  data[dataKey]?.user_detail?.did ?? '';
      }
      // console.log('[...data]',[1,23,4]);

      setDataList([...data])
    }
  }

  useEffect(() => {
    getList()

  }, []);

  return (
    <div className="adminWrapper">
      {!addUser ? (
        <>
          <div className="controls">
            <Dropdown options={["Admin", "Shop Manager", "Contributor"]} />
            <DefaultButton
              title="Add User"
              type={0}
              align={2}
              click={() => setAddUser(true)}
            />
          </div>
          <div className="main">
            <UserListTable columns={userListColumns} dada isSelectAll={true} dataList={dataList} isOpenCheck={true}></UserListTable>
            {/*<Pagination pages={1} page={page} setPage={setPage} />*/}
          </div>
        </>
      ) : (
        <Invite setAddUser={setAddUser} />
      )}
    </div>
  );
};

export default Admin;
