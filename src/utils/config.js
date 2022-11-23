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
      {id:1,key:'usd-coin',title:'USDC'},
      {id:2,key:'tether',title:'USDT'},
      {id:7,key:'wrapped-bitcoin',title:'WBTC'},
      {id:8,key:'weth',title:'WETH'},
    ]
  }
  else if(type === 'tree'){
    return [
      {
        key:'Ethereum',
        title:'Ethereum',
        img:'https://storage.googleapis.com/zapper-fi-assets/tokens/ethereum/0x0000000000000000000000000000000000000000.png',
        _child:[
          {id:1,key:'usd-coin',title:'USDC',img:'https://storage.googleapis.com/zapper-fi-assets/tokens/ethereum/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png',},
          {id:2,key:'tether',title:'USDT',img:'https://storage.googleapis.com/zapper-fi-assets/tokens/ethereum/0xdac17f958d2ee523a2206206994597c13d831ec7.png',},
          {id:7,key:'wrapped-bitcoin',title:'WBTC',img:'https://storage.googleapis.com/zapper-fi-assets/tokens/ethereum/0x2260fac5e5542a773aa44fbcfedf7c193bc2c599.png',},
          {id:8,key:'weth',title:'WETH',img:'https://storage.googleapis.com/zapper-fi-assets/tokens/ethereum/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png',},
        ]
      }
    ]
  }
  else{
    return {};
  }
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

