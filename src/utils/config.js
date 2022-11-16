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

export function select_currency(type = 'list') {
  if(type === 'list'){
    return [
      {key:'weth',title:'WETH'},
      {key:'tether',title:'USDT'},
    ]
  }
  else if(type === 'tree'){
    return  {Ethereum:{weth:'WETH',tether:'USDT'}}
  }
  else{
    return {};
  }
}

export function base_currency() {
  return  [{key:'usd',title:'USD'},{key:'cad',title:'CAD'}]
}

