! function (e) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
    else if ("function" == typeof define && define.amd) define([], e);
    else {
        ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).prettierBytes = e()
    }
}(function () {
    return function () {
        return function e(t, r, n) {
            function o(i, u) {
                if (!r[i]) {
                    if (!t[i]) {
                        var d = "function" == typeof require && require;
                        if (!u && d) return d(i, !0);
                        if (f) return f(i, !0);
                        var p = new Error("Cannot find module '" + i + "'");
                        throw p.code = "MODULE_NOT_FOUND", p
                    }
                    var a = r[i] = {
                        exports: {}
                    };
                    t[i][0].call(a.exports, function (e) {
                        return o(t[i][1][e] || e)
                    }, a, a.exports, e, t, r, n)
                }
                return r[i].exports
            }
            for (var f = "function" == typeof require && require, i = 0; i < n.length; i++) o(n[i]);
            return o
        }
    }()({
        1: [function (e, t, r) {
            t.exports = function (e) {
                if ("number" != typeof e || isNaN(e)) throw new TypeError("Expected a number, got " + typeof e);
                var t = e < 0,
                    r = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
                t && (e = -e);
                if (e < 1) return (t ? "-" : "") + e + " B";
                var n = Math.min(Math.floor(Math.log(e) / Math.log(1e3)), r.length - 1);
                e = Number(e / Math.pow(1e3, n));
                var o = r[n];
                return e >= 10 || e % 1 == 0 ? (t ? "-" : "") + e.toFixed(0) + " " + o : (t ? "-" : "") + e.toFixed(1) + " " + o
            }
        }, {}]
    }, {}, [1])(1)
});