import Dexie from 'dexie';
export const db = new Dexie('AirSwiftDeFiDatabase');
db.version(21).stores({
    as_did: '++id, did, did_document',
    as_local: '++id, key, value',
    as_vc: 'id, created_at, updated_at, payment_id, payment, merchant_id, merchant, vc_id, vc_content, vc_status, is_get, trans_id, currency, amount, time', // Primary key and indexed props
});

export function dexieDB(table = ''){
    this.table = table
}
dexieDB.prototype = {
    add(Item = {}){
        return db[this.table].add(Item)
            .then((data)=>{
                return data;
            })
            .catch((ff)=>{
                return false;
            });
    },
    addOnce(Item = {},where = {}){
        return db[this.table].get(where)
            .then((data)=>{
                if(!data){
                   return  db[this.table].add(Item)
                        .then((data1)=>{return data1;})
                        .catch((ff)=>{return false;});
                }
                else{
                    return data
                }
            })
            .catch((ff)=>{return false;});
    },
    addAll(list = []){
        return db[this.table].bulkAdd(list)
            .then((data)=>{
                return data;
            })
            .catch((ff)=>{
                return false;
            });
    },
    async addAllOrUpdate(list = []){
        return db[this.table].bulkPut(list)
            .then((data)=>{
                return data;
            })
            .catch((ff)=>{
                return false;
            });
    },
    get(where = {}){
        return db[this.table].get(where)
            .then((data)=>{
                return data;
            })
            .catch((ff)=>{
                return false;
            });
    },
    getAll(){
        return db[this.table].toArray()
            .then((data)=>{
                return data;
            })
            .catch((ff)=>{
                return false;
            });
    },
    getAllByKey(key = '',IDs = []){
        // console.log(db[this.table].where(key).anyOf(IDs))
        return db[this.table].where(key).anyOf(IDs).toArray()
            .then((data)=>{
                return data;
            })
            .catch((ff)=>{
                return false;
            });
    },
    _init(){
        return db[this.table];
    },
}

// export default {dexieDB,db}
//
// module.exports = dexieDB;


