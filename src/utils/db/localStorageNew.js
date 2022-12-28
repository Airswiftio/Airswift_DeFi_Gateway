const sdStorage = function () {
    let lStorage = window.localStorage;

    //保存传入key data 多长时间过期，默认不过期
    function save(dKey, data, expires = null) {
        if (!lStorage) return false;
        let expireTime = 0; //不过期
        if (expires !== null) {
            expireTime = expires;
        }
        let obj = {sdata: data, exp: expireTime};
        //保存
        try {
            lStorage[dKey] = JSON.stringify(obj);
            return true;
        }
        catch (e) {
            console.error(e);
            return false;
        }
        return false;
    }

    //获取过期或者不存在都返回 ''
    function get(dKey) {
        if (!lStorage) return '';
        let str = lStorage[dKey];
        if (str) {
            try {
                let obj = JSON.parse(str);
                //判断是否过期
                let now = new Date().getTime();
                if (obj.exp && (obj.exp === 0 || obj.exp > now)) {
                    //console.log('key:' + dKey + ',离过期还有 ' + (obj.exp - now) / 1000 + ' 秒');
                    return obj.sdata;
                } else {
                    //过期则删除
                    remove(dKey);
                    return '';
                }
            } catch (e) {
                console.error(e);
                return '';
            }
        }
        return '';
    }

    //清除所有,如果传入前辍，则只清除前辍为prefix的
    function clear(prefix) {
        if (!lStorage) return;
        if (prefix) {
            for (let i = 0; i < lStorage.length; i++) {
                let key = lStorage.key(i);
                //如果prefix有值，则只处理前辍相同的
                if (key?.indexOf(prefix) === 0) {
                    lStorage.removeItem(key);
                }
            }
        } else {
            lStorage.clear();
        }
    }

    //删除单条
    function remove(dKey) {
        if (!lStorage) return;
        lStorage.removeItem(dKey);
    }

    //清除过期，传入key前辍，则只除以prefix开始已经过期的数据
    function removeExp(prefix) {
        if (!lStorage) return;
        for (let i = 0; i < lStorage.length; i++) {
            let key = lStorage.key(i);
            //如果prefix有值，则只处理前辍相同的
            if (!prefix || key?.indexOf(prefix) === 0) {
                get(key ?? '');
            }
            //console.log(key);
        }
    }

    //检测浏览器是否支持
    function test() {
        if (lStorage) {
            return true;
        } else {
            return false
        }
    }

    return {
        //检测是否支持
        test: test,
        //保存传入key data 多长时间过期，默认不过期，单位 s(秒) mi(分钟) h（小时） d(天) m(月) y(年)
        //成功返回true,或者false
        save: save,
        //获取，不存在或者过期 返回 ''
        get: get,
        //根据key删除
        remove: remove,
        //删除已经过期的 传入key前辍，则只除以prefix开始已经过期的数据
        removeExp: removeExp,
        //清除所有 如果传入前辍，则只清除前辍为prefix的
        clear: clear,

    };
}();

export default sdStorage