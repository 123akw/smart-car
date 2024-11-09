function isDataObject(obj) {
    // 检查是否为非null的对象
    if (typeof obj !== 'object' || obj === null) {
        return false;
    }

    // 排除数组、日期和正则表达式对象
    if (Array.isArray(obj) || obj instanceof Date || obj instanceof RegExp) {
        return false;
    }

    // 使用Object.prototype.toString.call来确保是普通对象
    if (Object.prototype.toString.call(obj) !== '[object Object]') {
        return false;
    }

    // 检查对象是否包含至少一个键
    return Object.keys(obj).length > 0;
}

export default isDataObject;