function returnCloneData(value) {
    if (!value) {
      return null;
    }
    let temp = value;
    try {
      temp = JSON.parse(value);
    } catch (e) {
      temp = value;
      console.error(e);
    }
    return temp;
  }
  class BaseLocalStorage {
    constructor(preId, timeSign) {
      this.preId = preId;
      this.timeSign = timeSign || "|-|";
      this.storage = window.localStorage;
    }
    getKey(key) {
      return this.preId + key;
    }
    set(key, value, time) {
      if (!key || !value) {
        console.error(`${key} ${value} 未传入key value`);
        return;
      }
      value = JSON.stringify(value);
      key = this.getKey(key);
      try {
        time = new Date(time).getTime() || time.getTime();
      } catch (e) {
        //过期时间默认两个小时
        time = new Date().getTime() + (time || 2 * 60 * 60 * 1000);
        // console.error(e);
      }
      try {
        this.storage.setItem(key, time + this.timeSign + value);
      } catch (e) {
        console.error(e);
      }
    }
    get(key) {
      if (!key) {
        console.error(`${key} 未传入key`);
        return;
      }
      let value = null,
        timeSignLen = this.timeSign.length,
        index,
        time;
      key = this.getKey(key);
      try {
        value = this.storage.getItem(key);
      } catch (e) {
        value = null;
        console.error(e);
      }
      if (value) {
        index = value.indexOf(this.timeSign);
        time = +value.slice(0, index);
        if (new Date(time).getTime() > new Date().getTime() || time === 0) {
          value = value.slice(index + timeSignLen);
        } else {
          value = null;
          this.remove(key);
        }
      }
      return returnCloneData(value);
    }
    remove(key) {
      if (!key) {
        console.error(`${key} 未传入key`);
        return;
      }
      key = this.getKey(key);
      try {
        this.storage.removeItem(key);
      } catch (e) {
        console.error(e);
      }
    }
    clear() {
      try {
        this.storage.clear();
      } catch (e) {
        console.error(e);
      }
    }
  }
  export default new BaseLocalStorage("008E1CD2D1ED5841C8163DD238422F52");