! function (e) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
    else if ("function" == typeof define && define.amd) define([], e);
    else {
        ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).uploadElement = e()
    }
}(function () {
    return function () {
        return function e(n, t, r) {
            function f(i, u) {
                if (!t[i]) {
                    if (!n[i]) {
                        var l = "function" == typeof require && require;
                        if (!u && l) return l(i, !0);
                        if (o) return o(i, !0);
                        var d = new Error("Cannot find module '" + i + "'");
                        throw d.code = "MODULE_NOT_FOUND", d
                    }
                    var a = t[i] = {
                        exports: {}
                    };
                    n[i][0].call(a.exports, function (e) {
                        return f(n[i][1][e] || e)
                    }, a, a.exports, e, n, t, r)
                }
                return t[i].exports
            }
            for (var o = "function" == typeof require && require, i = 0; i < r.length; i++) f(r[i]);
            return f
        }
    }()({
        1: [function (e, n, t) {
            n.exports = function (e, n, t) {
                "function" == typeof n && (t = n, n = {}), "string" == typeof n && (n = {
                    type: n
                }), e.addEventListener("change", function (r) {
                    if (0 === e.files.length) return t(null, []);
                    var f = new FileReader,
                        o = 0,
                        i = [];

                    function u(t) {
                        var r = e.files[t];
                        "text" === n.type ? f.readAsText(r) : "url" === n.type ? f.readAsDataURL(r) : f.readAsArrayBuffer(r)
                    }
                    f.addEventListener("load", function (n) {
                        i.push({
                            file: e.files[o],
                            target: n.target
                        }), ++o === e.files.length ? t(null, i) : u(o)
                    }), u(o)
                })
            }
        }, {}]
    }, {}, [1])(1)
});