module.exports = {
  genCode (len=16) {
    const str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWSYZ0123456789'
    let result = '';
    for (let i=0; i<len; i++) {
      result += str.charAt(this.random(0, str.length-1))
    }
    return result
  },
  /**
   * 生成几位（len）数字
   * @param {number} len 生成数字的数量 
   * @returns 
   */
  genCodeNumber (len=4) {
    return this.random(Math.pow(10, len-1), Math.pow(10, len) - 1)
  },
  random (min=0, max=1) {
    return Math.round( Math.random() * (max - min) + min )
  },
  dataType (data) {
    return Object.prototype.toString.call(data).slice(8, -1)
  },
  /**
   * 清空空字符
   * @param {*} params
   * @returns
   */
  notEmpty(value) {
    const type = this.dataType(value);
    switch (type) {
      case 'String':
        return value.trim().length > 0;
      case 'Number':
        return !isNaN(value);
      case 'Undefined':
      case 'Null':
        return false;
      case 'Array':
        return value.length > 0;
      case 'Object':
        return Object.keys(value).length;
      default:
        return true;
    }
  },

  clearEmptyField(params) {
    for (const key in params) {
      if (!this.notEmpty(params[key])) delete params[key];
    }
    return params;
  }
}
