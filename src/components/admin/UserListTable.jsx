import React,{useState} from "react";
import "@@/components/admin/userListTable.scss";
import {array_column} from "@@/utils/function";

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
        //
        // if (checkedList?.length === 0) {
        //     setIsAll(true);
        //     setCheckedList(dataList.map((ee,kk)=>kk));
        // } else {
        //     setIsAll(false);
        //     setCheckedList([]);
        // }
    };

    return (
        <div className="userListTableWrapper">
            <div className="columnLabels">
                {isOpenCheck
                    ? (
                        <span style={{width:'10%'}} className={isSelectAll ? null:'select'}>
                            {isSelectAll
                                // ? (<div className="checkBox"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg></div>)
                                ? (
                                    <div className="checkBox" onClick={()=>selectAll()}>
                                        {isAll && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>}
                                    </div>
                                )
                                :'Selected'}
                        </span>
                        // {isSelectAll ? (<span className="select">Selected</span>) : (<span className="select">Selected</span>)}
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
                                            {checkedList?.includes(kk)
                                                ? (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>)
                                                : null}
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
