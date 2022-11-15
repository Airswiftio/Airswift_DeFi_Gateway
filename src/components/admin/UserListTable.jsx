import React from "react";
import "@@/components/admin/userListTable.scss";
import {array_column} from "@@/utils/function";

const UserListTable = ({ columns,dataList, isOpenCheck = false ,isSelectAll = false,checkedList,handleCheck,kid='id'}) => {

    // const aa
    console.log('dataList',dataList);

    return (
        <div className="userListTableWrapper">
            <div className="columnLabels">
                {isOpenCheck
                    ? (
                        <span className={isSelectAll ? null:'select'}>
                            {isSelectAll
                                // ? (<div className="checkBox"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg></div>)
                                ? (<div className="checkBox"></div>)
                                :'Selected'}
                        </span>
                        // {isSelectAll ? (<span className="select">Selected</span>) : (<span className="select">Selected</span>)}
                    )
                    : null}
                {columns.map((vv1, kk1) => (
                    <span key={kk1}>{vv1.title}</span>
                ))}
            </div>
            <div className="userListTableContent">
                {dataList.map(
                    (value, kk) => (
                        <div key={kk} className="historyElementWrapper" onClick={handleCheck}>
                            {isOpenCheck
                                ? (
                                    <span>
                                        <div className="checkBox">
                                            {array_column(checkedList,kid).includes(value[kid])
                                                ? (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>)
                                                : null}
                                        </div>
                                    </span>
                                )
                                : null}
                            {array_column(columns,'key').map((vv1, kk1) => (
                                <span key={kk1}>{value[vv1.key]}</span>
                            ))}
                        </div>

                    )
                )}
            </div>
        </div>
    );
};

export default UserListTable;
