import React,{useState} from "react";
import "@@/components/admin/userListTable.scss";
import {array_column} from "@@/utils/function";
import {svg_icon} from "@@/utils/config";

const UserListTable = ({
                           columns = [],
                           dataList = [],
                           isOpenCheck = false ,
                           isSelectAll = false,
                           checkedList = [],
                           setCheckedList = null,
                           handleCheck = null,
}) => {
    const [isAll, setIsAll] = useState(false);


    const selectRow = (key) => {
        if (checkedList?.includes(key)) {
            setCheckedList(checkedList.filter((e) => e !== key));
            if(checkedList?.length === dataList?.length){
                setIsAll(false);
            }
        } else {
            setCheckedList([...checkedList, key]);
            setIsAll(checkedList?.length +1 === dataList?.length ? true : false);
        }
    };

    const selectAll = () => {
        setIsAll(checkedList?.length === 0 ? true :false);
        setCheckedList(checkedList?.length === 0 ? dataList.map((ee,kk)=>kk) :[]);
    };

    return (
        <div className="userListTableWrapper">
            <div className="columnLabels">
                {isOpenCheck
                    ? (
                        <span style={{width:'10%'}} className={isSelectAll ? null:'select'}>
                            {isSelectAll
                                ? (
                                    <div className="checkBox" onClick={()=>selectAll()}>
                                        {isAll && svg_icon('selected')}
                                    </div>
                                )
                                :'Selected'}
                        </span>
                    )
                    : null}
                {columns?.map((vv1, kk1) => (
                    <span style={{width:vv1?.width ?? '100px'}} key={kk1}>{vv1.title}</span>
                ))}
            </div>
            <div className="userListTableContent">
                {dataList?.map(
                    (value, kk) => (
                        <div key={kk} className="historyElementWrapper" onClick={()=>selectRow(kk)}>
                            {isOpenCheck
                                ? (
                                    <span style={{width:'10%'}}>
                                        <div className="checkBox">
                                            {checkedList?.includes(kk) && (svg_icon('selected'))}
                                        </div>
                                    </span>
                                )
                                : null}
                            {columns?.map((vv1, kk1) => (
                                <span style={{width:vv1?.width ?? '100px'}} key={kk1}>{value[vv1?.key]}</span>
                            ))}
                        </div>

                    )
                )}
            </div>
        </div>
    );
};

export default UserListTable;
