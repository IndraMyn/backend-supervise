module.exports = class Extras {
    filter_object(data, key){
        const allowed = key;
        let filtered = Object.keys(data)
        .filter(key => allowed.includes(key))
        .reduce((obj, key) => {
            obj[key] = data[key];
            return obj;
        },{});
        return filtered;
    }
}