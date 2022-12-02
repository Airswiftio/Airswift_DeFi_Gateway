import db from "@@/utils/db/browserDb";
import {empty} from "@@/utils/function";
import {GetAvailableCurrency} from "@@/utils/request/api";
const dbStore = db;

export function select_role(type = 0) {
  if(type === 0){
    return [
      {key:'shop_manager',title:'Shop Manager'},
      {key:'contributor',title:'Contributor'},
    ]
  }
  else{
    return [
      {key:'admin',title:'Admin'},
      {key:'shop_manager',title:'Shop Manager'},
      {key:'contributor',title:'Contributor'},
    ]
  }
}

export function select_status(type = 'income') {
  if(type === 'income'){
    return  {pending:'Pending',success:'Finished'}
  }
  else if(type === 'withdraw'){
    return  {pending:'Pending',success:'Finished'}
  }
  else{
    return {};
  }
}

export async function loading_currency() {
  const currency_key = 'currency_key';
  const Currency =  dbStore.get(currency_key);
  if(!empty(Currency)){
    return Currency
  }
  const data = {
    list:[],
    tree:[],
  };
  const res = await GetAvailableCurrency();
  if(res?.code === 1000){
    const currencyList = res?.data?.currencies ?? [];
    const tmp_parent = {};
    data.list = currencyList.map((item)=>{
      tmp_parent[item?.chain_id] = {
        id:item?.chain_detail?.id,
        key:item?.chain_detail?.name,
        chain_id:item?.chain_id,
        title:item?.chain_detail?.name,
        img:item?.chain_detail?.image_url};
      return {id:item?.id,key:item?.search_name,title:item?.symbol,img:item?.image_url,chain_id:item?.chain_id}
    })

    for (const kk in tmp_parent) {
      const tmp_child = currencyList.filter((item)=>{
        return tmp_parent[kk]?.chain_id === item?.chain_id;
      })
      tmp_parent[kk]._child = tmp_child.map((item)=>{
        return {id:item?.id,key:item?.search_name,title:item?.symbol,img:item?.image_url,chain_id:item?.chain_id}
      })
      data.tree = [...data.tree,tmp_parent[kk]]
    }
  }

  dbStore.set(currency_key,data)
  return data;
}

export function select_currency(type = 'list') {
  const currency_key = 'currency_key';
  const Currency =  dbStore.get(currency_key);
  return Currency?.[type] ?? []
}

export function base_currency() {
  return  [{key:'usd',title:'USD'},{key:'cad',title:'CAD'}]
}

export function svg_icon(type = ''){
  switch (type) {
    case 'selected':
      return <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
      >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
        />
      </svg>;

    default:
      return '';
  }
}

