let strategies = {
  minLength: function (value, length, errMsg) {
    return value.length < length ? errMsg : "";
  },
  require: function (value, errMsg) {
    return value == "" ? errMsg : "";
  },
  isMobile: function (value, errMsg) {
    return !/(^1[3|5|8][0-9]{9}$)/.test(value) ? errMsg : "";
  },
};

export class Validator {
  constructor() {
    this.cache = [];
  }
  add(value, rules) {
    for (let i = 0, rule; (rule = rules[i++]); ) {
      ((rule) => {
        const strategyArr = rule.strategy.split(":");
        const errorMsg = rule.errMsg;
        this.cache.push(() => {
          const strategy = strategyArr.shift();
          strategyArr.unshift(value);
          strategyArr.push(errorMsg);
          return strategies[strategy](...strategyArr);
        });
      })(rule);
    }
  }
  start() {
    for (let i = 0, fn; (fn = this.cache[i++]); ) {
      let errMsg = fn();
      if (errMsg) {
        return errMsg;
      }
    }
  }
}
