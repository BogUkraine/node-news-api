const NodeCache = require('node-cache');
const config    = require('../../config');

class Cache {
    constructor(ttlSeconds) {
        this.cache = new NodeCache({
            stdTTL      : ttlSeconds,
            checkperiod : ttlSeconds * 0.2,
            useClones   : false
        });
    }

    async get(key, storeFunction) {
        const value = this.cache.get(key.toString());

        if (value) {
            return value;
        }
    
        const store = await storeFunction();
        this.cache.set(store);

        return store;
    }

    async getSeveral(keys, storeFunction) {
        let values = [];

        keys.forEach((item) => {
            if (this.cache.get(item.toString()) !== undefined) {
                values.push(this.cache.get(item.toString()));
            }
        })
        
        if (values.length !== 0) {
            return values;
        }
    
        const store = await storeFunction();
        store.forEach((item) => {
            this.cache.set(item);
        });

        return store;
    }
    
    del(item) {
        this.cache.del(item._id.toString());
    }

    set(item) {
        this.cache.set(item._id.toString(), item)
    }

    setSeveral(items) {
        items.forEach((item) => {
            this.cache.set(item)
        })
    }

    flush() {
        this.cache.flushAll();
    }
}

const cache = new Cache(config.cacheTTL);

module.exports = cache;