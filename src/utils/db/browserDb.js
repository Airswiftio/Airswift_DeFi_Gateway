// class Peson{
//     add(){
//         console.log('新增接口');
//     }
//     del(){
//         console.log('删除接口');
//     }
// }

// export default Peson;


import LocalStore from "@@/utils/db/localStorage";
import {json_to_obj} from "@@/utils/function";

export const dbSet = (key,value) => {
    return  LocalStore.setLocal(key, value)

}

class browserDb {

    set(key = '',value){
        return  LocalStore.setLocal(key, value)
    }

    get(key = ''){
        return  LocalStore.getLocal(key)
    }

    delete(key = ''){
        return  LocalStore.deleteLocal(key)
    }

    clearAll(){
        return  LocalStore.clearAll()
    }

    clear(db = ''){
        return  LocalStore.clear(db)
    }
}


const db = new browserDb();

export default db
