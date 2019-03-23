function FormValidation() {
    var verify = {
        notEmpty: function(value, errMsg) {
            if (!value) {
                return errMsg;
            }
        },
        migLen: function(value, length, errMsg) {
            if (value.length < length) {
                return errMsg;
            }
        },
        isMobile: function(value, errMsg) {
            if (!/^1[3|5|8][0-9]{9}$/.test(value)) {
                return errMsg;
            }
        }
    }
    this.strategies = verify;
    this.validationFuns = []
}
FormValidation.prototype.add = function(dom, rule, errMsg) {
    var ary = rule.split(':');
    var arg = []
    var self = this;
    this.validationFuns.push(function() {
        arg = [];
        var ruleName = ary[0];
        arg.push(dom.value);
        if (ary[1]) {
            arg.push(ary[1])
        }
        return self.strategies[ruleName].apply(dom, arg)
    })
}
FormValidation.prototype.start = function() {
    for (var i = 0; i < this.validationFuns.length; i++) {
        var msg = this.validationFuns[i]();
        if (msg) {
            return msg;
        }
    }
}
var form = document.querySelect('form');
var validation = new FormValidation();
validation.add(form.userName,'notEmpty','用户名不能为空');
validation.add(form.password,'minLen:6','密码长度不能小于6个字符');