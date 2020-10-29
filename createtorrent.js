! function (e) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
    else if ("function" == typeof define && define.amd) define([], e);
    else {
        ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).createTorrent = e()
    }
}(function () {
    return function () {
        return function e(t, r, n) {
            function i(a, s) {
                if (!r[a]) {
                    if (!t[a]) {
                        var u = "function" == typeof require && require;
                        if (!s && u) return u(a, !0);
                        if (o) return o(a, !0);
                        var f = new Error("Cannot find module '" + a + "'");
                        throw f.code = "MODULE_NOT_FOUND", f
                    }
                    var l = r[a] = {
                        exports: {}
                    };
                    t[a][0].call(l.exports, function (e) {
                        return i(t[a][1][e] || e)
                    }, l, l.exports, e, t, r, n)
                }
                return r[a].exports
            }
            for (var o = "function" == typeof require && require, a = 0; a < n.length; a++) i(n[a]);
            return i
        }
    }()({
        1: [function (e, t, r) {
            "use strict";
            r.byteLength = function (e) {
                var t = f(e),
                    r = t[0],
                    n = t[1];
                return 3 * (r + n) / 4 - n
            }, r.toByteArray = function (e) {
                var t, r, n = f(e),
                    a = n[0],
                    s = n[1],
                    u = new o(function (e, t, r) {
                        return 3 * (t + r) / 4 - r
                    }(0, a, s)),
                    l = 0,
                    c = s > 0 ? a - 4 : a;
                for (r = 0; r < c; r += 4) t = i[e.charCodeAt(r)] << 18 | i[e.charCodeAt(r + 1)] << 12 | i[e.charCodeAt(r + 2)] << 6 | i[e.charCodeAt(r + 3)], u[l++] = t >> 16 & 255, u[l++] = t >> 8 & 255, u[l++] = 255 & t;
                2 === s && (t = i[e.charCodeAt(r)] << 2 | i[e.charCodeAt(r + 1)] >> 4, u[l++] = 255 & t);
                1 === s && (t = i[e.charCodeAt(r)] << 10 | i[e.charCodeAt(r + 1)] << 4 | i[e.charCodeAt(r + 2)] >> 2, u[l++] = t >> 8 & 255, u[l++] = 255 & t);
                return u
            }, r.fromByteArray = function (e) {
                for (var t, r = e.length, i = r % 3, o = [], a = 0, s = r - i; a < s; a += 16383) o.push(l(e, a, a + 16383 > s ? s : a + 16383));
                1 === i ? (t = e[r - 1], o.push(n[t >> 2] + n[t << 4 & 63] + "==")) : 2 === i && (t = (e[r - 2] << 8) + e[r - 1], o.push(n[t >> 10] + n[t >> 4 & 63] + n[t << 2 & 63] + "="));
                return o.join("")
            };
            for (var n = [], i = [], o = "undefined" != typeof Uint8Array ? Uint8Array : Array, a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", s = 0, u = a.length; s < u; ++s) n[s] = a[s], i[a.charCodeAt(s)] = s;

            function f(e) {
                var t = e.length;
                if (t % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
                var r = e.indexOf("=");
                return -1 === r && (r = t), [r, r === t ? 0 : 4 - r % 4]
            }

            function l(e, t, r) {
                for (var i, o, a = [], s = t; s < r; s += 3) i = (e[s] << 16 & 16711680) + (e[s + 1] << 8 & 65280) + (255 & e[s + 2]), a.push(n[(o = i) >> 18 & 63] + n[o >> 12 & 63] + n[o >> 6 & 63] + n[63 & o]);
                return a.join("")
            }
            i["-".charCodeAt(0)] = 62, i["_".charCodeAt(0)] = 63
        }, {}],
        2: [function (e, t, r) {}, {}],
        3: [function (e, t, r) {
            arguments[4][2][0].apply(r, arguments)
        }, {
            dup: 2
        }],
        4: [function (e, t, r) {
            (function (t) {
                "use strict";
                var n = e("base64-js"),
                    i = e("ieee754");
                r.Buffer = t, r.SlowBuffer = function (e) {
                    +e != e && (e = 0);
                    return t.alloc(+e)
                }, r.INSPECT_MAX_BYTES = 50;
                var o = 2147483647;

                function a(e) {
                    if (e > o) throw new RangeError('The value "' + e + '" is invalid for option "size"');
                    var r = new Uint8Array(e);
                    return r.__proto__ = t.prototype, r
                }

                function t(e, t, r) {
                    if ("number" == typeof e) {
                        if ("string" == typeof t) throw new TypeError('The "string" argument must be of type string. Received type number');
                        return f(e)
                    }
                    return s(e, t, r)
                }

                function s(e, r, n) {
                    if ("string" == typeof e) return function (e, r) {
                        "string" == typeof r && "" !== r || (r = "utf8");
                        if (!t.isEncoding(r)) throw new TypeError("Unknown encoding: " + r);
                        var n = 0 | h(e, r),
                            i = a(n),
                            o = i.write(e, r);
                        o !== n && (i = i.slice(0, o));
                        return i
                    }(e, r);
                    if (ArrayBuffer.isView(e)) return l(e);
                    if (null == e) throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e);
                    if (D(e, ArrayBuffer) || e && D(e.buffer, ArrayBuffer)) return function (e, r, n) {
                        if (r < 0 || e.byteLength < r) throw new RangeError('"offset" is outside of buffer bounds');
                        if (e.byteLength < r + (n || 0)) throw new RangeError('"length" is outside of buffer bounds');
                        var i;
                        i = void 0 === r && void 0 === n ? new Uint8Array(e) : void 0 === n ? new Uint8Array(e, r) : new Uint8Array(e, r, n);
                        return i.__proto__ = t.prototype, i
                    }(e, r, n);
                    if ("number" == typeof e) throw new TypeError('The "value" argument must not be of type number. Received type number');
                    var i = e.valueOf && e.valueOf();
                    if (null != i && i !== e) return t.from(i, r, n);
                    var o = function (e) {
                        if (t.isBuffer(e)) {
                            var r = 0 | c(e.length),
                                n = a(r);
                            return 0 === n.length ? n : (e.copy(n, 0, 0, r), n)
                        }
                        if (void 0 !== e.length) return "number" != typeof e.length || W(e.length) ? a(0) : l(e);
                        if ("Buffer" === e.type && Array.isArray(e.data)) return l(e.data)
                    }(e);
                    if (o) return o;
                    if ("undefined" != typeof Symbol && null != Symbol.toPrimitive && "function" == typeof e[Symbol.toPrimitive]) return t.from(e[Symbol.toPrimitive]("string"), r, n);
                    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e)
                }

                function u(e) {
                    if ("number" != typeof e) throw new TypeError('"size" argument must be of type number');
                    if (e < 0) throw new RangeError('The value "' + e + '" is invalid for option "size"')
                }

                function f(e) {
                    return u(e), a(e < 0 ? 0 : 0 | c(e))
                }

                function l(e) {
                    for (var t = e.length < 0 ? 0 : 0 | c(e.length), r = a(t), n = 0; n < t; n += 1) r[n] = 255 & e[n];
                    return r
                }

                function c(e) {
                    if (e >= o) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + o.toString(16) + " bytes");
                    return 0 | e
                }

                function h(e, r) {
                    if (t.isBuffer(e)) return e.length;
                    if (ArrayBuffer.isView(e) || D(e, ArrayBuffer)) return e.byteLength;
                    if ("string" != typeof e) throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof e);
                    var n = e.length,
                        i = arguments.length > 2 && !0 === arguments[2];
                    if (!i && 0 === n) return 0;
                    for (var o = !1;;) switch (r) {
                        case "ascii":
                        case "latin1":
                        case "binary":
                            return n;
                        case "utf8":
                        case "utf-8":
                            return U(e).length;
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return 2 * n;
                        case "hex":
                            return n >>> 1;
                        case "base64":
                            return I(e).length;
                        default:
                            if (o) return i ? -1 : U(e).length;
                            r = ("" + r).toLowerCase(), o = !0
                    }
                }

                function d(e, t, r) {
                    var n = e[t];
                    e[t] = e[r], e[r] = n
                }

                function p(e, r, n, i, o) {
                    if (0 === e.length) return -1;
                    if ("string" == typeof n ? (i = n, n = 0) : n > 2147483647 ? n = 2147483647 : n < -2147483648 && (n = -2147483648), W(n = +n) && (n = o ? 0 : e.length - 1), n < 0 && (n = e.length + n), n >= e.length) {
                        if (o) return -1;
                        n = e.length - 1
                    } else if (n < 0) {
                        if (!o) return -1;
                        n = 0
                    }
                    if ("string" == typeof r && (r = t.from(r, i)), t.isBuffer(r)) return 0 === r.length ? -1 : y(e, r, n, i, o);
                    if ("number" == typeof r) return r &= 255, "function" == typeof Uint8Array.prototype.indexOf ? o ? Uint8Array.prototype.indexOf.call(e, r, n) : Uint8Array.prototype.lastIndexOf.call(e, r, n) : y(e, [r], n, i, o);
                    throw new TypeError("val must be string, number or Buffer")
                }

                function y(e, t, r, n, i) {
                    var o, a = 1,
                        s = e.length,
                        u = t.length;
                    if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
                        if (e.length < 2 || t.length < 2) return -1;
                        a = 2, s /= 2, u /= 2, r /= 2
                    }

                    function f(e, t) {
                        return 1 === a ? e[t] : e.readUInt16BE(t * a)
                    }
                    if (i) {
                        var l = -1;
                        for (o = r; o < s; o++)
                            if (f(e, o) === f(t, -1 === l ? 0 : o - l)) {
                                if (-1 === l && (l = o), o - l + 1 === u) return l * a
                            } else -1 !== l && (o -= o - l), l = -1
                    } else
                        for (r + u > s && (r = s - u), o = r; o >= 0; o--) {
                            for (var c = !0, h = 0; h < u; h++)
                                if (f(e, o + h) !== f(t, h)) {
                                    c = !1;
                                    break
                                } if (c) return o
                        }
                    return -1
                }

                function g(e, t, r, n) {
                    r = Number(r) || 0;
                    var i = e.length - r;
                    n ? (n = Number(n)) > i && (n = i) : n = i;
                    var o = t.length;
                    n > o / 2 && (n = o / 2);
                    for (var a = 0; a < n; ++a) {
                        var s = parseInt(t.substr(2 * a, 2), 16);
                        if (W(s)) return a;
                        e[r + a] = s
                    }
                    return a
                }

                function b(e, t, r, n) {
                    return P(U(t, e.length - r), e, r, n)
                }

                function w(e, t, r, n) {
                    return P(function (e) {
                        for (var t = [], r = 0; r < e.length; ++r) t.push(255 & e.charCodeAt(r));
                        return t
                    }(t), e, r, n)
                }

                function v(e, t, r, n) {
                    return w(e, t, r, n)
                }

                function m(e, t, r, n) {
                    return P(I(t), e, r, n)
                }

                function _(e, t, r, n) {
                    return P(function (e, t) {
                        for (var r, n, i, o = [], a = 0; a < e.length && !((t -= 2) < 0); ++a) r = e.charCodeAt(a), n = r >> 8, i = r % 256, o.push(i), o.push(n);
                        return o
                    }(t, e.length - r), e, r, n)
                }

                function E(e, t, r) {
                    return 0 === t && r === e.length ? n.fromByteArray(e) : n.fromByteArray(e.slice(t, r))
                }

                function S(e, t, r) {
                    r = Math.min(e.length, r);
                    for (var n = [], i = t; i < r;) {
                        var o, a, s, u, f = e[i],
                            l = null,
                            c = f > 239 ? 4 : f > 223 ? 3 : f > 191 ? 2 : 1;
                        if (i + c <= r) switch (c) {
                            case 1:
                                f < 128 && (l = f);
                                break;
                            case 2:
                                128 == (192 & (o = e[i + 1])) && (u = (31 & f) << 6 | 63 & o) > 127 && (l = u);
                                break;
                            case 3:
                                o = e[i + 1], a = e[i + 2], 128 == (192 & o) && 128 == (192 & a) && (u = (15 & f) << 12 | (63 & o) << 6 | 63 & a) > 2047 && (u < 55296 || u > 57343) && (l = u);
                                break;
                            case 4:
                                o = e[i + 1], a = e[i + 2], s = e[i + 3], 128 == (192 & o) && 128 == (192 & a) && 128 == (192 & s) && (u = (15 & f) << 18 | (63 & o) << 12 | (63 & a) << 6 | 63 & s) > 65535 && u < 1114112 && (l = u)
                        }
                        null === l ? (l = 65533, c = 1) : l > 65535 && (l -= 65536, n.push(l >>> 10 & 1023 | 55296), l = 56320 | 1023 & l), n.push(l), i += c
                    }
                    return function (e) {
                        var t = e.length;
                        if (t <= A) return String.fromCharCode.apply(String, e);
                        var r = "",
                            n = 0;
                        for (; n < t;) r += String.fromCharCode.apply(String, e.slice(n, n += A));
                        return r
                    }(n)
                }
                r.kMaxLength = o, t.TYPED_ARRAY_SUPPORT = function () {
                    try {
                        var e = new Uint8Array(1);
                        return e.__proto__ = {
                            __proto__: Uint8Array.prototype,
                            foo: function () {
                                return 42
                            }
                        }, 42 === e.foo()
                    } catch (e) {
                        return !1
                    }
                }(), t.TYPED_ARRAY_SUPPORT || "undefined" == typeof console || "function" != typeof console.error || console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."), Object.defineProperty(t.prototype, "parent", {
                    enumerable: !0,
                    get: function () {
                        if (t.isBuffer(this)) return this.buffer
                    }
                }), Object.defineProperty(t.prototype, "offset", {
                    enumerable: !0,
                    get: function () {
                        if (t.isBuffer(this)) return this.byteOffset
                    }
                }), "undefined" != typeof Symbol && null != Symbol.species && t[Symbol.species] === t && Object.defineProperty(t, Symbol.species, {
                    value: null,
                    configurable: !0,
                    enumerable: !1,
                    writable: !1
                }), t.poolSize = 8192, t.from = function (e, t, r) {
                    return s(e, t, r)
                }, t.prototype.__proto__ = Uint8Array.prototype, t.__proto__ = Uint8Array, t.alloc = function (e, t, r) {
                    return function (e, t, r) {
                        return u(e), e <= 0 ? a(e) : void 0 !== t ? "string" == typeof r ? a(e).fill(t, r) : a(e).fill(t) : a(e)
                    }(e, t, r)
                }, t.allocUnsafe = function (e) {
                    return f(e)
                }, t.allocUnsafeSlow = function (e) {
                    return f(e)
                }, t.isBuffer = function (e) {
                    return null != e && !0 === e._isBuffer && e !== t.prototype
                }, t.compare = function (e, r) {
                    if (D(e, Uint8Array) && (e = t.from(e, e.offset, e.byteLength)), D(r, Uint8Array) && (r = t.from(r, r.offset, r.byteLength)), !t.isBuffer(e) || !t.isBuffer(r)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
                    if (e === r) return 0;
                    for (var n = e.length, i = r.length, o = 0, a = Math.min(n, i); o < a; ++o)
                        if (e[o] !== r[o]) {
                            n = e[o], i = r[o];
                            break
                        } return n < i ? -1 : i < n ? 1 : 0
                }, t.isEncoding = function (e) {
                    switch (String(e).toLowerCase()) {
                        case "hex":
                        case "utf8":
                        case "utf-8":
                        case "ascii":
                        case "latin1":
                        case "binary":
                        case "base64":
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return !0;
                        default:
                            return !1
                    }
                }, t.concat = function (e, r) {
                    if (!Array.isArray(e)) throw new TypeError('"list" argument must be an Array of Buffers');
                    if (0 === e.length) return t.alloc(0);
                    var n;
                    if (void 0 === r)
                        for (r = 0, n = 0; n < e.length; ++n) r += e[n].length;
                    var i = t.allocUnsafe(r),
                        o = 0;
                    for (n = 0; n < e.length; ++n) {
                        var a = e[n];
                        if (D(a, Uint8Array) && (a = t.from(a)), !t.isBuffer(a)) throw new TypeError('"list" argument must be an Array of Buffers');
                        a.copy(i, o), o += a.length
                    }
                    return i
                }, t.byteLength = h, t.prototype._isBuffer = !0, t.prototype.swap16 = function () {
                    var e = this.length;
                    if (e % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
                    for (var t = 0; t < e; t += 2) d(this, t, t + 1);
                    return this
                }, t.prototype.swap32 = function () {
                    var e = this.length;
                    if (e % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
                    for (var t = 0; t < e; t += 4) d(this, t, t + 3), d(this, t + 1, t + 2);
                    return this
                }, t.prototype.swap64 = function () {
                    var e = this.length;
                    if (e % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
                    for (var t = 0; t < e; t += 8) d(this, t, t + 7), d(this, t + 1, t + 6), d(this, t + 2, t + 5), d(this, t + 3, t + 4);
                    return this
                }, t.prototype.toString = function () {
                    var e = this.length;
                    return 0 === e ? "" : 0 === arguments.length ? S(this, 0, e) : function (e, t, r) {
                        var n = !1;
                        if ((void 0 === t || t < 0) && (t = 0), t > this.length) return "";
                        if ((void 0 === r || r > this.length) && (r = this.length), r <= 0) return "";
                        if ((r >>>= 0) <= (t >>>= 0)) return "";
                        for (e || (e = "utf8");;) switch (e) {
                            case "hex":
                                return k(this, t, r);
                            case "utf8":
                            case "utf-8":
                                return S(this, t, r);
                            case "ascii":
                                return x(this, t, r);
                            case "latin1":
                            case "binary":
                                return R(this, t, r);
                            case "base64":
                                return E(this, t, r);
                            case "ucs2":
                            case "ucs-2":
                            case "utf16le":
                            case "utf-16le":
                                return L(this, t, r);
                            default:
                                if (n) throw new TypeError("Unknown encoding: " + e);
                                e = (e + "").toLowerCase(), n = !0
                        }
                    }.apply(this, arguments)
                }, t.prototype.toLocaleString = t.prototype.toString, t.prototype.equals = function (e) {
                    if (!t.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
                    return this === e || 0 === t.compare(this, e)
                }, t.prototype.inspect = function () {
                    var e = "",
                        t = r.INSPECT_MAX_BYTES;
                    return e = this.toString("hex", 0, t).replace(/(.{2})/g, "$1 ").trim(), this.length > t && (e += " ... "), "<Buffer " + e + ">"
                }, t.prototype.compare = function (e, r, n, i, o) {
                    if (D(e, Uint8Array) && (e = t.from(e, e.offset, e.byteLength)), !t.isBuffer(e)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof e);
                    if (void 0 === r && (r = 0), void 0 === n && (n = e ? e.length : 0), void 0 === i && (i = 0), void 0 === o && (o = this.length), r < 0 || n > e.length || i < 0 || o > this.length) throw new RangeError("out of range index");
                    if (i >= o && r >= n) return 0;
                    if (i >= o) return -1;
                    if (r >= n) return 1;
                    if (this === e) return 0;
                    for (var a = (o >>>= 0) - (i >>>= 0), s = (n >>>= 0) - (r >>>= 0), u = Math.min(a, s), f = this.slice(i, o), l = e.slice(r, n), c = 0; c < u; ++c)
                        if (f[c] !== l[c]) {
                            a = f[c], s = l[c];
                            break
                        } return a < s ? -1 : s < a ? 1 : 0
                }, t.prototype.includes = function (e, t, r) {
                    return -1 !== this.indexOf(e, t, r)
                }, t.prototype.indexOf = function (e, t, r) {
                    return p(this, e, t, r, !0)
                }, t.prototype.lastIndexOf = function (e, t, r) {
                    return p(this, e, t, r, !1)
                }, t.prototype.write = function (e, t, r, n) {
                    if (void 0 === t) n = "utf8", r = this.length, t = 0;
                    else if (void 0 === r && "string" == typeof t) n = t, r = this.length, t = 0;
                    else {
                        if (!isFinite(t)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                        t >>>= 0, isFinite(r) ? (r >>>= 0, void 0 === n && (n = "utf8")) : (n = r, r = void 0)
                    }
                    var i = this.length - t;
                    if ((void 0 === r || r > i) && (r = i), e.length > 0 && (r < 0 || t < 0) || t > this.length) throw new RangeError("Attempt to write outside buffer bounds");
                    n || (n = "utf8");
                    for (var o = !1;;) switch (n) {
                        case "hex":
                            return g(this, e, t, r);
                        case "utf8":
                        case "utf-8":
                            return b(this, e, t, r);
                        case "ascii":
                            return w(this, e, t, r);
                        case "latin1":
                        case "binary":
                            return v(this, e, t, r);
                        case "base64":
                            return m(this, e, t, r);
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return _(this, e, t, r);
                        default:
                            if (o) throw new TypeError("Unknown encoding: " + n);
                            n = ("" + n).toLowerCase(), o = !0
                    }
                }, t.prototype.toJSON = function () {
                    return {
                        type: "Buffer",
                        data: Array.prototype.slice.call(this._arr || this, 0)
                    }
                };
                var A = 4096;

                function x(e, t, r) {
                    var n = "";
                    r = Math.min(e.length, r);
                    for (var i = t; i < r; ++i) n += String.fromCharCode(127 & e[i]);
                    return n
                }

                function R(e, t, r) {
                    var n = "";
                    r = Math.min(e.length, r);
                    for (var i = t; i < r; ++i) n += String.fromCharCode(e[i]);
                    return n
                }

                function k(e, t, r) {
                    var n = e.length;
                    (!t || t < 0) && (t = 0), (!r || r < 0 || r > n) && (r = n);
                    for (var i = "", o = t; o < r; ++o) i += N(e[o]);
                    return i
                }

                function L(e, t, r) {
                    for (var n = e.slice(t, r), i = "", o = 0; o < n.length; o += 2) i += String.fromCharCode(n[o] + 256 * n[o + 1]);
                    return i
                }

                function T(e, t, r) {
                    if (e % 1 != 0 || e < 0) throw new RangeError("offset is not uint");
                    if (e + t > r) throw new RangeError("Trying to access beyond buffer length")
                }

                function C(e, r, n, i, o, a) {
                    if (!t.isBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance');
                    if (r > o || r < a) throw new RangeError('"value" argument is out of bounds');
                    if (n + i > e.length) throw new RangeError("Index out of range")
                }

                function M(e, t, r, n, i, o) {
                    if (r + n > e.length) throw new RangeError("Index out of range");
                    if (r < 0) throw new RangeError("Index out of range")
                }

                function O(e, t, r, n, o) {
                    return t = +t, r >>>= 0, o || M(e, 0, r, 4), i.write(e, t, r, n, 23, 4), r + 4
                }

                function j(e, t, r, n, o) {
                    return t = +t, r >>>= 0, o || M(e, 0, r, 8), i.write(e, t, r, n, 52, 8), r + 8
                }
                t.prototype.slice = function (e, r) {
                    var n = this.length;
                    (e = ~~e) < 0 ? (e += n) < 0 && (e = 0) : e > n && (e = n), (r = void 0 === r ? n : ~~r) < 0 ? (r += n) < 0 && (r = 0) : r > n && (r = n), r < e && (r = e);
                    var i = this.subarray(e, r);
                    return i.__proto__ = t.prototype, i
                }, t.prototype.readUIntLE = function (e, t, r) {
                    e >>>= 0, t >>>= 0, r || T(e, t, this.length);
                    for (var n = this[e], i = 1, o = 0; ++o < t && (i *= 256);) n += this[e + o] * i;
                    return n
                }, t.prototype.readUIntBE = function (e, t, r) {
                    e >>>= 0, t >>>= 0, r || T(e, t, this.length);
                    for (var n = this[e + --t], i = 1; t > 0 && (i *= 256);) n += this[e + --t] * i;
                    return n
                }, t.prototype.readUInt8 = function (e, t) {
                    return e >>>= 0, t || T(e, 1, this.length), this[e]
                }, t.prototype.readUInt16LE = function (e, t) {
                    return e >>>= 0, t || T(e, 2, this.length), this[e] | this[e + 1] << 8
                }, t.prototype.readUInt16BE = function (e, t) {
                    return e >>>= 0, t || T(e, 2, this.length), this[e] << 8 | this[e + 1]
                }, t.prototype.readUInt32LE = function (e, t) {
                    return e >>>= 0, t || T(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3]
                }, t.prototype.readUInt32BE = function (e, t) {
                    return e >>>= 0, t || T(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
                }, t.prototype.readIntLE = function (e, t, r) {
                    e >>>= 0, t >>>= 0, r || T(e, t, this.length);
                    for (var n = this[e], i = 1, o = 0; ++o < t && (i *= 256);) n += this[e + o] * i;
                    return n >= (i *= 128) && (n -= Math.pow(2, 8 * t)), n
                }, t.prototype.readIntBE = function (e, t, r) {
                    e >>>= 0, t >>>= 0, r || T(e, t, this.length);
                    for (var n = t, i = 1, o = this[e + --n]; n > 0 && (i *= 256);) o += this[e + --n] * i;
                    return o >= (i *= 128) && (o -= Math.pow(2, 8 * t)), o
                }, t.prototype.readInt8 = function (e, t) {
                    return e >>>= 0, t || T(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
                }, t.prototype.readInt16LE = function (e, t) {
                    e >>>= 0, t || T(e, 2, this.length);
                    var r = this[e] | this[e + 1] << 8;
                    return 32768 & r ? 4294901760 | r : r
                }, t.prototype.readInt16BE = function (e, t) {
                    e >>>= 0, t || T(e, 2, this.length);
                    var r = this[e + 1] | this[e] << 8;
                    return 32768 & r ? 4294901760 | r : r
                }, t.prototype.readInt32LE = function (e, t) {
                    return e >>>= 0, t || T(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
                }, t.prototype.readInt32BE = function (e, t) {
                    return e >>>= 0, t || T(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
                }, t.prototype.readFloatLE = function (e, t) {
                    return e >>>= 0, t || T(e, 4, this.length), i.read(this, e, !0, 23, 4)
                }, t.prototype.readFloatBE = function (e, t) {
                    return e >>>= 0, t || T(e, 4, this.length), i.read(this, e, !1, 23, 4)
                }, t.prototype.readDoubleLE = function (e, t) {
                    return e >>>= 0, t || T(e, 8, this.length), i.read(this, e, !0, 52, 8)
                }, t.prototype.readDoubleBE = function (e, t) {
                    return e >>>= 0, t || T(e, 8, this.length), i.read(this, e, !1, 52, 8)
                }, t.prototype.writeUIntLE = function (e, t, r, n) {
                    (e = +e, t >>>= 0, r >>>= 0, n) || C(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
                    var i = 1,
                        o = 0;
                    for (this[t] = 255 & e; ++o < r && (i *= 256);) this[t + o] = e / i & 255;
                    return t + r
                }, t.prototype.writeUIntBE = function (e, t, r, n) {
                    (e = +e, t >>>= 0, r >>>= 0, n) || C(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
                    var i = r - 1,
                        o = 1;
                    for (this[t + i] = 255 & e; --i >= 0 && (o *= 256);) this[t + i] = e / o & 255;
                    return t + r
                }, t.prototype.writeUInt8 = function (e, t, r) {
                    return e = +e, t >>>= 0, r || C(this, e, t, 1, 255, 0), this[t] = 255 & e, t + 1
                }, t.prototype.writeUInt16LE = function (e, t, r) {
                    return e = +e, t >>>= 0, r || C(this, e, t, 2, 65535, 0), this[t] = 255 & e, this[t + 1] = e >>> 8, t + 2
                }, t.prototype.writeUInt16BE = function (e, t, r) {
                    return e = +e, t >>>= 0, r || C(this, e, t, 2, 65535, 0), this[t] = e >>> 8, this[t + 1] = 255 & e, t + 2
                }, t.prototype.writeUInt32LE = function (e, t, r) {
                    return e = +e, t >>>= 0, r || C(this, e, t, 4, 4294967295, 0), this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = 255 & e, t + 4
                }, t.prototype.writeUInt32BE = function (e, t, r) {
                    return e = +e, t >>>= 0, r || C(this, e, t, 4, 4294967295, 0), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e, t + 4
                }, t.prototype.writeIntLE = function (e, t, r, n) {
                    if (e = +e, t >>>= 0, !n) {
                        var i = Math.pow(2, 8 * r - 1);
                        C(this, e, t, r, i - 1, -i)
                    }
                    var o = 0,
                        a = 1,
                        s = 0;
                    for (this[t] = 255 & e; ++o < r && (a *= 256);) e < 0 && 0 === s && 0 !== this[t + o - 1] && (s = 1), this[t + o] = (e / a >> 0) - s & 255;
                    return t + r
                }, t.prototype.writeIntBE = function (e, t, r, n) {
                    if (e = +e, t >>>= 0, !n) {
                        var i = Math.pow(2, 8 * r - 1);
                        C(this, e, t, r, i - 1, -i)
                    }
                    var o = r - 1,
                        a = 1,
                        s = 0;
                    for (this[t + o] = 255 & e; --o >= 0 && (a *= 256);) e < 0 && 0 === s && 0 !== this[t + o + 1] && (s = 1), this[t + o] = (e / a >> 0) - s & 255;
                    return t + r
                }, t.prototype.writeInt8 = function (e, t, r) {
                    return e = +e, t >>>= 0, r || C(this, e, t, 1, 127, -128), e < 0 && (e = 255 + e + 1), this[t] = 255 & e, t + 1
                }, t.prototype.writeInt16LE = function (e, t, r) {
                    return e = +e, t >>>= 0, r || C(this, e, t, 2, 32767, -32768), this[t] = 255 & e, this[t + 1] = e >>> 8, t + 2
                }, t.prototype.writeInt16BE = function (e, t, r) {
                    return e = +e, t >>>= 0, r || C(this, e, t, 2, 32767, -32768), this[t] = e >>> 8, this[t + 1] = 255 & e, t + 2
                }, t.prototype.writeInt32LE = function (e, t, r) {
                    return e = +e, t >>>= 0, r || C(this, e, t, 4, 2147483647, -2147483648), this[t] = 255 & e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24, t + 4
                }, t.prototype.writeInt32BE = function (e, t, r) {
                    return e = +e, t >>>= 0, r || C(this, e, t, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e, t + 4
                }, t.prototype.writeFloatLE = function (e, t, r) {
                    return O(this, e, t, !0, r)
                }, t.prototype.writeFloatBE = function (e, t, r) {
                    return O(this, e, t, !1, r)
                }, t.prototype.writeDoubleLE = function (e, t, r) {
                    return j(this, e, t, !0, r)
                }, t.prototype.writeDoubleBE = function (e, t, r) {
                    return j(this, e, t, !1, r)
                }, t.prototype.copy = function (e, r, n, i) {
                    if (!t.isBuffer(e)) throw new TypeError("argument should be a Buffer");
                    if (n || (n = 0), i || 0 === i || (i = this.length), r >= e.length && (r = e.length), r || (r = 0), i > 0 && i < n && (i = n), i === n) return 0;
                    if (0 === e.length || 0 === this.length) return 0;
                    if (r < 0) throw new RangeError("targetStart out of bounds");
                    if (n < 0 || n >= this.length) throw new RangeError("Index out of range");
                    if (i < 0) throw new RangeError("sourceEnd out of bounds");
                    i > this.length && (i = this.length), e.length - r < i - n && (i = e.length - r + n);
                    var o = i - n;
                    if (this === e && "function" == typeof Uint8Array.prototype.copyWithin) this.copyWithin(r, n, i);
                    else if (this === e && n < r && r < i)
                        for (var a = o - 1; a >= 0; --a) e[a + r] = this[a + n];
                    else Uint8Array.prototype.set.call(e, this.subarray(n, i), r);
                    return o
                }, t.prototype.fill = function (e, r, n, i) {
                    if ("string" == typeof e) {
                        if ("string" == typeof r ? (i = r, r = 0, n = this.length) : "string" == typeof n && (i = n, n = this.length), void 0 !== i && "string" != typeof i) throw new TypeError("encoding must be a string");
                        if ("string" == typeof i && !t.isEncoding(i)) throw new TypeError("Unknown encoding: " + i);
                        if (1 === e.length) {
                            var o = e.charCodeAt(0);
                            ("utf8" === i && o < 128 || "latin1" === i) && (e = o)
                        }
                    } else "number" == typeof e && (e &= 255);
                    if (r < 0 || this.length < r || this.length < n) throw new RangeError("Out of range index");
                    if (n <= r) return this;
                    var a;
                    if (r >>>= 0, n = void 0 === n ? this.length : n >>> 0, e || (e = 0), "number" == typeof e)
                        for (a = r; a < n; ++a) this[a] = e;
                    else {
                        var s = t.isBuffer(e) ? e : t.from(e, i),
                            u = s.length;
                        if (0 === u) throw new TypeError('The value "' + e + '" is invalid for argument "value"');
                        for (a = 0; a < n - r; ++a) this[a + r] = s[a % u]
                    }
                    return this
                };
                var B = /[^+\/0-9A-Za-z-_]/g;

                function N(e) {
                    return e < 16 ? "0" + e.toString(16) : e.toString(16)
                }

                function U(e, t) {
                    var r;
                    t = t || 1 / 0;
                    for (var n = e.length, i = null, o = [], a = 0; a < n; ++a) {
                        if ((r = e.charCodeAt(a)) > 55295 && r < 57344) {
                            if (!i) {
                                if (r > 56319) {
                                    (t -= 3) > -1 && o.push(239, 191, 189);
                                    continue
                                }
                                if (a + 1 === n) {
                                    (t -= 3) > -1 && o.push(239, 191, 189);
                                    continue
                                }
                                i = r;
                                continue
                            }
                            if (r < 56320) {
                                (t -= 3) > -1 && o.push(239, 191, 189), i = r;
                                continue
                            }
                            r = 65536 + (i - 55296 << 10 | r - 56320)
                        } else i && (t -= 3) > -1 && o.push(239, 191, 189);
                        if (i = null, r < 128) {
                            if ((t -= 1) < 0) break;
                            o.push(r)
                        } else if (r < 2048) {
                            if ((t -= 2) < 0) break;
                            o.push(r >> 6 | 192, 63 & r | 128)
                        } else if (r < 65536) {
                            if ((t -= 3) < 0) break;
                            o.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128)
                        } else {
                            if (!(r < 1114112)) throw new Error("Invalid code point");
                            if ((t -= 4) < 0) break;
                            o.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128)
                        }
                    }
                    return o
                }

                function I(e) {
                    return n.toByteArray(function (e) {
                        if ((e = (e = e.split("=")[0]).trim().replace(B, "")).length < 2) return "";
                        for (; e.length % 4 != 0;) e += "=";
                        return e
                    }(e))
                }

                function P(e, t, r, n) {
                    for (var i = 0; i < n && !(i + r >= t.length || i >= e.length); ++i) t[i + r] = e[i];
                    return i
                }

                function D(e, t) {
                    return e instanceof t || null != e && null != e.constructor && null != e.constructor.name && e.constructor.name === t.name
                }

                function W(e) {
                    return e != e
                }
            }).call(this, e("buffer").Buffer)
        }, {
            "base64-js": 1,
            buffer: 4,
            ieee754: 6
        }],
        5: [function (e, t, r) {
            var n = Object.create || function (e) {
                    var t = function () {};
                    return t.prototype = e, new t
                },
                i = Object.keys || function (e) {
                    var t = [];
                    for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.push(r);
                    return r
                },
                o = Function.prototype.bind || function (e) {
                    var t = this;
                    return function () {
                        return t.apply(e, arguments)
                    }
                };

            function a() {
                this._events && Object.prototype.hasOwnProperty.call(this, "_events") || (this._events = n(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0
            }
            t.exports = a, a.EventEmitter = a, a.prototype._events = void 0, a.prototype._maxListeners = void 0;
            var s, u = 10;
            try {
                var f = {};
                Object.defineProperty && Object.defineProperty(f, "x", {
                    value: 0
                }), s = 0 === f.x
            } catch (e) {
                s = !1
            }

            function l(e) {
                return void 0 === e._maxListeners ? a.defaultMaxListeners : e._maxListeners
            }

            function c(e, t, r, i) {
                var o, a, s;
                if ("function" != typeof r) throw new TypeError('"listener" argument must be a function');
                if ((a = e._events) ? (a.newListener && (e.emit("newListener", t, r.listener ? r.listener : r), a = e._events), s = a[t]) : (a = e._events = n(null), e._eventsCount = 0), s) {
                    if ("function" == typeof s ? s = a[t] = i ? [r, s] : [s, r] : i ? s.unshift(r) : s.push(r), !s.warned && (o = l(e)) && o > 0 && s.length > o) {
                        s.warned = !0;
                        var u = new Error("Possible EventEmitter memory leak detected. " + s.length + ' "' + String(t) + '" listeners added. Use emitter.setMaxListeners() to increase limit.');
                        u.name = "MaxListenersExceededWarning", u.emitter = e, u.type = t, u.count = s.length, "object" == typeof console && console.warn && console.warn("%s: %s", u.name, u.message)
                    }
                } else s = a[t] = r, ++e._eventsCount;
                return e
            }

            function h() {
                if (!this.fired) switch (this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length) {
                    case 0:
                        return this.listener.call(this.target);
                    case 1:
                        return this.listener.call(this.target, arguments[0]);
                    case 2:
                        return this.listener.call(this.target, arguments[0], arguments[1]);
                    case 3:
                        return this.listener.call(this.target, arguments[0], arguments[1], arguments[2]);
                    default:
                        for (var e = new Array(arguments.length), t = 0; t < e.length; ++t) e[t] = arguments[t];
                        this.listener.apply(this.target, e)
                }
            }

            function d(e, t, r) {
                var n = {
                        fired: !1,
                        wrapFn: void 0,
                        target: e,
                        type: t,
                        listener: r
                    },
                    i = o.call(h, n);
                return i.listener = r, n.wrapFn = i, i
            }

            function p(e, t, r) {
                var n = e._events;
                if (!n) return [];
                var i = n[t];
                return i ? "function" == typeof i ? r ? [i.listener || i] : [i] : r ? function (e) {
                    for (var t = new Array(e.length), r = 0; r < t.length; ++r) t[r] = e[r].listener || e[r];
                    return t
                }(i) : g(i, i.length) : []
            }

            function y(e) {
                var t = this._events;
                if (t) {
                    var r = t[e];
                    if ("function" == typeof r) return 1;
                    if (r) return r.length
                }
                return 0
            }

            function g(e, t) {
                for (var r = new Array(t), n = 0; n < t; ++n) r[n] = e[n];
                return r
            }
            s ? Object.defineProperty(a, "defaultMaxListeners", {
                enumerable: !0,
                get: function () {
                    return u
                },
                set: function (e) {
                    if ("number" != typeof e || e < 0 || e != e) throw new TypeError('"defaultMaxListeners" must be a positive number');
                    u = e
                }
            }) : a.defaultMaxListeners = u, a.prototype.setMaxListeners = function (e) {
                if ("number" != typeof e || e < 0 || isNaN(e)) throw new TypeError('"n" argument must be a positive number');
                return this._maxListeners = e, this
            }, a.prototype.getMaxListeners = function () {
                return l(this)
            }, a.prototype.emit = function (e) {
                var t, r, n, i, o, a, s = "error" === e;
                if (a = this._events) s = s && null == a.error;
                else if (!s) return !1;
                if (s) {
                    if (arguments.length > 1 && (t = arguments[1]), t instanceof Error) throw t;
                    var u = new Error('Unhandled "error" event. (' + t + ")");
                    throw u.context = t, u
                }
                if (!(r = a[e])) return !1;
                var f = "function" == typeof r;
                switch (n = arguments.length) {
                    case 1:
                        ! function (e, t, r) {
                            if (t) e.call(r);
                            else
                                for (var n = e.length, i = g(e, n), o = 0; o < n; ++o) i[o].call(r)
                        }(r, f, this);
                        break;
                    case 2:
                        ! function (e, t, r, n) {
                            if (t) e.call(r, n);
                            else
                                for (var i = e.length, o = g(e, i), a = 0; a < i; ++a) o[a].call(r, n)
                        }(r, f, this, arguments[1]);
                        break;
                    case 3:
                        ! function (e, t, r, n, i) {
                            if (t) e.call(r, n, i);
                            else
                                for (var o = e.length, a = g(e, o), s = 0; s < o; ++s) a[s].call(r, n, i)
                        }(r, f, this, arguments[1], arguments[2]);
                        break;
                    case 4:
                        ! function (e, t, r, n, i, o) {
                            if (t) e.call(r, n, i, o);
                            else
                                for (var a = e.length, s = g(e, a), u = 0; u < a; ++u) s[u].call(r, n, i, o)
                        }(r, f, this, arguments[1], arguments[2], arguments[3]);
                        break;
                    default:
                        for (i = new Array(n - 1), o = 1; o < n; o++) i[o - 1] = arguments[o];
                        ! function (e, t, r, n) {
                            if (t) e.apply(r, n);
                            else
                                for (var i = e.length, o = g(e, i), a = 0; a < i; ++a) o[a].apply(r, n)
                        }(r, f, this, i)
                }
                return !0
            }, a.prototype.addListener = function (e, t) {
                return c(this, e, t, !1)
            }, a.prototype.on = a.prototype.addListener, a.prototype.prependListener = function (e, t) {
                return c(this, e, t, !0)
            }, a.prototype.once = function (e, t) {
                if ("function" != typeof t) throw new TypeError('"listener" argument must be a function');
                return this.on(e, d(this, e, t)), this
            }, a.prototype.prependOnceListener = function (e, t) {
                if ("function" != typeof t) throw new TypeError('"listener" argument must be a function');
                return this.prependListener(e, d(this, e, t)), this
            }, a.prototype.removeListener = function (e, t) {
                var r, i, o, a, s;
                if ("function" != typeof t) throw new TypeError('"listener" argument must be a function');
                if (!(i = this._events)) return this;
                if (!(r = i[e])) return this;
                if (r === t || r.listener === t) 0 == --this._eventsCount ? this._events = n(null) : (delete i[e], i.removeListener && this.emit("removeListener", e, r.listener || t));
                else if ("function" != typeof r) {
                    for (o = -1, a = r.length - 1; a >= 0; a--)
                        if (r[a] === t || r[a].listener === t) {
                            s = r[a].listener, o = a;
                            break
                        } if (o < 0) return this;
                    0 === o ? r.shift() : function (e, t) {
                        for (var r = t, n = r + 1, i = e.length; n < i; r += 1, n += 1) e[r] = e[n];
                        e.pop()
                    }(r, o), 1 === r.length && (i[e] = r[0]), i.removeListener && this.emit("removeListener", e, s || t)
                }
                return this
            }, a.prototype.removeAllListeners = function (e) {
                var t, r, o;
                if (!(r = this._events)) return this;
                if (!r.removeListener) return 0 === arguments.length ? (this._events = n(null), this._eventsCount = 0) : r[e] && (0 == --this._eventsCount ? this._events = n(null) : delete r[e]), this;
                if (0 === arguments.length) {
                    var a, s = i(r);
                    for (o = 0; o < s.length; ++o) "removeListener" !== (a = s[o]) && this.removeAllListeners(a);
                    return this.removeAllListeners("removeListener"), this._events = n(null), this._eventsCount = 0, this
                }
                if ("function" == typeof (t = r[e])) this.removeListener(e, t);
                else if (t)
                    for (o = t.length - 1; o >= 0; o--) this.removeListener(e, t[o]);
                return this
            }, a.prototype.listeners = function (e) {
                return p(this, e, !0)
            }, a.prototype.rawListeners = function (e) {
                return p(this, e, !1)
            }, a.listenerCount = function (e, t) {
                return "function" == typeof e.listenerCount ? e.listenerCount(t) : y.call(e, t)
            }, a.prototype.listenerCount = y, a.prototype.eventNames = function () {
                return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : []
            }
        }, {}],
        6: [function (e, t, r) {
            r.read = function (e, t, r, n, i) {
                var o, a, s = 8 * i - n - 1,
                    u = (1 << s) - 1,
                    f = u >> 1,
                    l = -7,
                    c = r ? i - 1 : 0,
                    h = r ? -1 : 1,
                    d = e[t + c];
                for (c += h, o = d & (1 << -l) - 1, d >>= -l, l += s; l > 0; o = 256 * o + e[t + c], c += h, l -= 8);
                for (a = o & (1 << -l) - 1, o >>= -l, l += n; l > 0; a = 256 * a + e[t + c], c += h, l -= 8);
                if (0 === o) o = 1 - f;
                else {
                    if (o === u) return a ? NaN : 1 / 0 * (d ? -1 : 1);
                    a += Math.pow(2, n), o -= f
                }
                return (d ? -1 : 1) * a * Math.pow(2, o - n)
            }, r.write = function (e, t, r, n, i, o) {
                var a, s, u, f = 8 * o - i - 1,
                    l = (1 << f) - 1,
                    c = l >> 1,
                    h = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                    d = n ? 0 : o - 1,
                    p = n ? 1 : -1,
                    y = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
                for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (s = isNaN(t) ? 1 : 0, a = l) : (a = Math.floor(Math.log(t) / Math.LN2), t * (u = Math.pow(2, -a)) < 1 && (a--, u *= 2), (t += a + c >= 1 ? h / u : h * Math.pow(2, 1 - c)) * u >= 2 && (a++, u /= 2), a + c >= l ? (s = 0, a = l) : a + c >= 1 ? (s = (t * u - 1) * Math.pow(2, i), a += c) : (s = t * Math.pow(2, c - 1) * Math.pow(2, i), a = 0)); i >= 8; e[r + d] = 255 & s, d += p, s /= 256, i -= 8);
                for (a = a << i | s, f += i; f > 0; e[r + d] = 255 & a, d += p, a /= 256, f -= 8);
                e[r + d - p] |= 128 * y
            }
        }, {}],
        7: [function (e, t, r) {
            (function (e) {
                function t(e, t) {
                    for (var r = 0, n = e.length - 1; n >= 0; n--) {
                        var i = e[n];
                        "." === i ? e.splice(n, 1) : ".." === i ? (e.splice(n, 1), r++) : r && (e.splice(n, 1), r--)
                    }
                    if (t)
                        for (; r--; r) e.unshift("..");
                    return e
                }

                function n(e, t) {
                    if (e.filter) return e.filter(t);
                    for (var r = [], n = 0; n < e.length; n++) t(e[n], n, e) && r.push(e[n]);
                    return r
                }
                r.resolve = function () {
                    for (var r = "", i = !1, o = arguments.length - 1; o >= -1 && !i; o--) {
                        var a = o >= 0 ? arguments[o] : e.cwd();
                        if ("string" != typeof a) throw new TypeError("Arguments to path.resolve must be strings");
                        a && (r = a + "/" + r, i = "/" === a.charAt(0))
                    }
                    return (i ? "/" : "") + (r = t(n(r.split("/"), function (e) {
                        return !!e
                    }), !i).join("/")) || "."
                }, r.normalize = function (e) {
                    var o = r.isAbsolute(e),
                        a = "/" === i(e, -1);
                    return (e = t(n(e.split("/"), function (e) {
                        return !!e
                    }), !o).join("/")) || o || (e = "."), e && a && (e += "/"), (o ? "/" : "") + e
                }, r.isAbsolute = function (e) {
                    return "/" === e.charAt(0)
                }, r.join = function () {
                    var e = Array.prototype.slice.call(arguments, 0);
                    return r.normalize(n(e, function (e, t) {
                        if ("string" != typeof e) throw new TypeError("Arguments to path.join must be strings");
                        return e
                    }).join("/"))
                }, r.relative = function (e, t) {
                    function n(e) {
                        for (var t = 0; t < e.length && "" === e[t]; t++);
                        for (var r = e.length - 1; r >= 0 && "" === e[r]; r--);
                        return t > r ? [] : e.slice(t, r - t + 1)
                    }
                    e = r.resolve(e).substr(1), t = r.resolve(t).substr(1);
                    for (var i = n(e.split("/")), o = n(t.split("/")), a = Math.min(i.length, o.length), s = a, u = 0; u < a; u++)
                        if (i[u] !== o[u]) {
                            s = u;
                            break
                        } var f = [];
                    for (u = s; u < i.length; u++) f.push("..");
                    return (f = f.concat(o.slice(s))).join("/")
                }, r.sep = "/", r.delimiter = ":", r.dirname = function (e) {
                    if ("string" != typeof e && (e += ""), 0 === e.length) return ".";
                    for (var t = e.charCodeAt(0), r = 47 === t, n = -1, i = !0, o = e.length - 1; o >= 1; --o)
                        if (47 === (t = e.charCodeAt(o))) {
                            if (!i) {
                                n = o;
                                break
                            }
                        } else i = !1;
                    return -1 === n ? r ? "/" : "." : r && 1 === n ? "/" : e.slice(0, n)
                }, r.basename = function (e, t) {
                    var r = function (e) {
                        "string" != typeof e && (e += "");
                        var t, r = 0,
                            n = -1,
                            i = !0;
                        for (t = e.length - 1; t >= 0; --t)
                            if (47 === e.charCodeAt(t)) {
                                if (!i) {
                                    r = t + 1;
                                    break
                                }
                            } else -1 === n && (i = !1, n = t + 1);
                        return -1 === n ? "" : e.slice(r, n)
                    }(e);
                    return t && r.substr(-1 * t.length) === t && (r = r.substr(0, r.length - t.length)), r
                }, r.extname = function (e) {
                    "string" != typeof e && (e += "");
                    for (var t = -1, r = 0, n = -1, i = !0, o = 0, a = e.length - 1; a >= 0; --a) {
                        var s = e.charCodeAt(a);
                        if (47 !== s) - 1 === n && (i = !1, n = a + 1), 46 === s ? -1 === t ? t = a : 1 !== o && (o = 1) : -1 !== t && (o = -1);
                        else if (!i) {
                            r = a + 1;
                            break
                        }
                    }
                    return -1 === t || -1 === n || 0 === o || 1 === o && t === n - 1 && t === r + 1 ? "" : e.slice(t, n)
                };
                var i = "b" === "ab".substr(-1) ? function (e, t, r) {
                    return e.substr(t, r)
                } : function (e, t, r) {
                    return t < 0 && (t = e.length + t), e.substr(t, r)
                }
            }).call(this, e("_process"))
        }, {
            _process: 8
        }],
        8: [function (e, t, r) {
            var n, i, o = t.exports = {};

            function a() {
                throw new Error("setTimeout has not been defined")
            }

            function s() {
                throw new Error("clearTimeout has not been defined")
            }

            function u(e) {
                if (n === setTimeout) return setTimeout(e, 0);
                if ((n === a || !n) && setTimeout) return n = setTimeout, setTimeout(e, 0);
                try {
                    return n(e, 0)
                } catch (t) {
                    try {
                        return n.call(null, e, 0)
                    } catch (t) {
                        return n.call(this, e, 0)
                    }
                }
            }! function () {
                try {
                    n = "function" == typeof setTimeout ? setTimeout : a
                } catch (e) {
                    n = a
                }
                try {
                    i = "function" == typeof clearTimeout ? clearTimeout : s
                } catch (e) {
                    i = s
                }
            }();
            var f, l = [],
                c = !1,
                h = -1;

            function d() {
                c && f && (c = !1, f.length ? l = f.concat(l) : h = -1, l.length && p())
            }

            function p() {
                if (!c) {
                    var e = u(d);
                    c = !0;
                    for (var t = l.length; t;) {
                        for (f = l, l = []; ++h < t;) f && f[h].run();
                        h = -1, t = l.length
                    }
                    f = null, c = !1,
                        function (e) {
                            if (i === clearTimeout) return clearTimeout(e);
                            if ((i === s || !i) && clearTimeout) return i = clearTimeout, clearTimeout(e);
                            try {
                                i(e)
                            } catch (t) {
                                try {
                                    return i.call(null, e)
                                } catch (t) {
                                    return i.call(this, e)
                                }
                            }
                        }(e)
                }
            }

            function y(e, t) {
                this.fun = e, this.array = t
            }

            function g() {}
            o.nextTick = function (e) {
                var t = new Array(arguments.length - 1);
                if (arguments.length > 1)
                    for (var r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
                l.push(new y(e, t)), 1 !== l.length || c || u(p)
            }, y.prototype.run = function () {
                this.fun.apply(null, this.array)
            }, o.title = "browser", o.browser = !0, o.env = {}, o.argv = [], o.version = "", o.versions = {}, o.on = g, o.addListener = g, o.once = g, o.off = g, o.removeListener = g, o.removeAllListeners = g, o.emit = g, o.prependListener = g, o.prependOnceListener = g, o.listeners = function (e) {
                return []
            }, o.binding = function (e) {
                throw new Error("process.binding is not supported")
            }, o.cwd = function () {
                return "/"
            }, o.chdir = function (e) {
                throw new Error("process.chdir is not supported")
            }, o.umask = function () {
                return 0
            }
        }, {}],
        9: [function (e, t, r) {
            (function (r, n, i) {
                const o = e("bencode"),
                    a = e("block-stream2"),
                    s = e("piece-length"),
                    u = e("path"),
                    f = e("filestream/read"),
                    l = e("is-file"),
                    c = e("junk"),
                    h = e("multistream"),
                    d = e("once"),
                    p = e("run-parallel"),
                    y = e("simple-sha1"),
                    g = e("readable-stream"),
                    b = e("./get-files");

                function w(e, t, n) {
                    var o;
                    if (o = e, "undefined" != typeof FileList && o instanceof FileList && (e = Array.from(e)), Array.isArray(e) || (e = [e]), 0 === e.length) throw new Error("invalid input type");
                    e.forEach(e => {
                        if (null == e) throw new Error(`invalid input type: ${e}`)
                    }), 1 !== (e = e.map(e => m(e) && "string" == typeof e.path && "function" == typeof b ? e.path : e)).length || "string" == typeof e[0] || e[0].name || (e[0].name = t.name);
                    let a = null;
                    e.forEach((t, r) => {
                        if ("string" == typeof t) return;
                        let n = t.fullPath || t.name;
                        n || (n = `Unknown File ${r+1}`, t.unknownName = !0), t.path = n.split("/"), t.path[0] || t.path.shift(), t.path.length < 2 ? a = null : 0 === r && e.length > 1 ? a = t.path[0] : t.path[0] !== a && (a = null)
                    }), e = e.filter(e => {
                        if ("string" == typeof e) return !0;
                        const t = e.path[e.path.length - 1];
                        return function (e) {
                            return "." !== e[0]
                        }(t) && c.not(t)
                    }), a && e.forEach(e => {
                        const t = (i.isBuffer(e) || _(e)) && !e.path;
                        "string" == typeof e || t || e.path.shift()
                    }), !t.name && a && (t.name = a), t.name || e.some(e => "string" == typeof e ? (t.name = u.basename(e), !0) : e.unknownName ? void 0 : (t.name = e.path[e.path.length - 1], !0)), t.name || (t.name = `Unnamed Torrent ${Date.now()}`);
                    const s = e.reduce((e, t) => e + Number("string" == typeof t), 0);
                    let h = 1 === e.length;
                    if (1 === e.length && "string" == typeof e[0]) {
                        if ("function" != typeof b) throw new Error("filesystem paths do not work in the browser");
                        l(e[0], (e, t) => {
                            if (e) return n(e);
                            h = t, d()
                        })
                    } else r.nextTick(() => {
                        d()
                    });

                    function d() {
                        p(e.map(e => t => {
                            const r = {};
                            if (m(e)) r.getStream = function (e) {
                                return () => new f(e)
                            }(e), r.length = e.size;
                            else if (i.isBuffer(e)) r.getStream = function (e) {
                                return () => {
                                    const t = new g.PassThrough;
                                    return t.end(e), t
                                }
                            }(e), r.length = e.length;
                            else {
                                if (!_(e)) {
                                    if ("string" == typeof e) {
                                        if ("function" != typeof b) throw new Error("filesystem paths do not work in the browser");
                                        return void b(e, s > 1 || h, t)
                                    }
                                    throw new Error("invalid input type")
                                }
                                r.getStream = function (e, t) {
                                    return () => {
                                        const r = new g.Transform;
                                        return r._transform = function (e, r, n) {
                                            t.length += e.length, this.push(e), n()
                                        }, e.pipe(r), r
                                    }
                                }(e, r), r.length = 0
                            }
                            r.path = e.path, t(null, r)
                        }), (e, t) => {
                            if (e) return n(e);
                            t = function e(t) {
                                return t.reduce((t, r) => Array.isArray(r) ? t.concat(e(r)) : t.concat(r), [])
                            }(t), n(null, t, h)
                        })
                    }
                }

                function v(e, t) {
                    return e + t.length
                }

                function m(e) {
                    return "undefined" != typeof Blob && e instanceof Blob
                }

                function _(e) {
                    return "object" == typeof e && null != e && "function" == typeof e.pipe
                }
                t.exports = function (e, r, u) {
                    "function" == typeof r && ([r, u] = [u, r]), w(e, r = r ? Object.assign({}, r) : {}, (e, f, l) => {
                        if (e) return u(e);
                        r.singleFileTorrent = l,
                            function (e, r, u) {
                                let f = r.announceList;
                                f || ("string" == typeof r.announce ? f = [
                                    [r.announce]
                                ] : Array.isArray(r.announce) && (f = r.announce.map(e => [e]))), f || (f = []), n.WEBTORRENT_ANNOUNCE && ("string" == typeof n.WEBTORRENT_ANNOUNCE ? f.push([
                                    [n.WEBTORRENT_ANNOUNCE]
                                ]) : Array.isArray(n.WEBTORRENT_ANNOUNCE) && (f = f.concat(n.WEBTORRENT_ANNOUNCE.map(e => [e])))), void 0 === r.announce && void 0 === r.announceList && (f = f.concat(t.exports.announceList)), "string" == typeof r.urlList && (r.urlList = [r.urlList]);
                                const l = {
                                    info: {
                                        name: r.name
                                    },
                                    "creation date": Math.ceil((Number(r.creationDate) || Date.now()) / 1e3),
                                    encoding: "UTF-8"
                                };
                                0 !== f.length && (l.announce = f[0][0], l["announce-list"] = f), void 0 !== r.comment && (l.comment = r.comment), void 0 !== r.createdBy && (l["created by"] = r.createdBy), void 0 !== r.private && (l.info.private = Number(r.private)), void 0 !== r.info && Object.assign(l.info, r.info), void 0 !== r.sslCert && (l.info["ssl-cert"] = r.sslCert), void 0 !== r.urlList && (l["url-list"] = r.urlList);
                                const c = r.pieceLength || s(e.reduce(v, 0));
                                l.info["piece length"] = c,
                                    function (e, t, r) {
                                        r = d(r);
                                        const n = [];
                                        let o = 0;
                                        const s = e.map(e => e.getStream);
                                        let u = 0,
                                            f = 0,
                                            l = !1;
                                        const c = new h(s),
                                            p = new a(t, {
                                                zeroPadding: !1
                                            });

                                        function g(e) {
                                            o += e.length;
                                            const t = f;
                                            y(e, e => {
                                                n[t] = e, u -= 1, m()
                                            }), u += 1, f += 1
                                        }

                                        function b() {
                                            l = !0, m()
                                        }

                                        function w(e) {
                                            v(), r(e)
                                        }

                                        function v() {
                                            c.removeListener("error", w), p.removeListener("data", g), p.removeListener("end", b), p.removeListener("error", w)
                                        }

                                        function m() {
                                            l && 0 === u && (v(), r(null, i.from(n.join(""), "hex"), o))
                                        }
                                        c.on("error", w), c.pipe(p).on("data", g).on("end", b).on("error", w)
                                    }(e, c, (t, n, i) => {
                                        if (t) return u(t);
                                        l.info.pieces = n, e.forEach(e => {
                                            delete e.getStream
                                        }), r.singleFileTorrent ? l.info.length = i : l.info.files = e, u(null, o.encode(l))
                                    })
                            }(f, r, u)
                    })
                }, t.exports.parseInput = function (e, t, r) {
                    "function" == typeof t && ([t, r] = [r, t]), w(e, t = t ? Object.assign({}, t) : {}, r)
                }, t.exports.announceList = [
                    ["udp://tracker.leechers-paradise.org:6969"],
                    ["udp://tracker.coppersurfer.tk:6969"],
                    ["udp://tracker.opentrackr.org:1337"],
                    ["udp://explodie.org:6969"],
                    ["udp://tracker.empire-js.us:1337"],
                    ["wss://tracker.btorrent.xyz"],
                    ["wss://tracker.openwebtorrent.com"]
                ]
            }).call(this, e("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer)
        }, {
            "./get-files": 2,
            _process: 8,
            bencode: 12,
            "block-stream2": 13,
            buffer: 4,
            "filestream/read": 14,
            "is-file": 16,
            junk: 18,
            multistream: 19,
            once: 20,
            path: 7,
            "piece-length": 21,
            "readable-stream": 36,
            "run-parallel": 37,
            "simple-sha1": 40
        }],
        10: [function (e, t, r) {
            var n = e("safe-buffer").Buffer;

            function i(e, t, r) {
                for (var n = 0, i = 1, o = t; o < r; o++) {
                    var a = e[o];
                    if (a < 58 && a >= 48) n = 10 * n + (a - 48);
                    else if (o !== t || 43 !== a) {
                        if (o !== t || 45 !== a) {
                            if (46 === a) break;
                            throw new Error("not a number: buffer[" + o + "] = " + a)
                        }
                        i = -1
                    }
                }
                return n * i
            }

            function o(e, t, r, i) {
                return null == e || 0 === e.length ? null : ("number" != typeof t && null == i && (i = t, t = void 0), "number" != typeof r && null == i && (i = r, r = void 0), o.position = 0, o.encoding = i || null, o.data = n.isBuffer(e) ? e.slice(t, r) : n.from(e), o.bytes = o.data.length, o.next())
            }
            o.bytes = 0, o.position = 0, o.data = null, o.encoding = null, o.next = function () {
                switch (o.data[o.position]) {
                    case 100:
                        return o.dictionary();
                    case 108:
                        return o.list();
                    case 105:
                        return o.integer();
                    default:
                        return o.buffer()
                }
            }, o.find = function (e) {
                for (var t = o.position, r = o.data.length, n = o.data; t < r;) {
                    if (n[t] === e) return t;
                    t++
                }
                throw new Error('Invalid data: Missing delimiter "' + String.fromCharCode(e) + '" [0x' + e.toString(16) + "]")
            }, o.dictionary = function () {
                o.position++;
                for (var e = {}; 101 !== o.data[o.position];) e[o.buffer()] = o.next();
                return o.position++, e
            }, o.list = function () {
                o.position++;
                for (var e = []; 101 !== o.data[o.position];) e.push(o.next());
                return o.position++, e
            }, o.integer = function () {
                var e = o.find(101),
                    t = i(o.data, o.position + 1, e);
                return o.position += e + 1 - o.position, t
            }, o.buffer = function () {
                var e = o.find(58),
                    t = i(o.data, o.position, e),
                    r = ++e + t;
                return o.position = r, o.encoding ? o.data.toString(o.encoding, e, r) : o.data.slice(e, r)
            }, t.exports = o
        }, {
            "safe-buffer": 39
        }],
        11: [function (e, t, r) {
            var n = e("safe-buffer").Buffer;

            function i(e, t, r) {
                var o = [],
                    a = null;
                return i._encode(o, e), a = n.concat(o), i.bytes = a.length, n.isBuffer(t) ? (a.copy(t, r), t) : a
            }
            i.bytes = -1, i._floatConversionDetected = !1, i.getType = function (e) {
                return n.isBuffer(e) ? "buffer" : Array.isArray(e) ? "array" : ArrayBuffer.isView(e) ? "arraybufferview" : e instanceof Number ? "number" : e instanceof Boolean ? "boolean" : e instanceof ArrayBuffer ? "arraybuffer" : typeof e
            }, i._encode = function (e, t) {
                if (null != t) switch (i.getType(t)) {
                    case "buffer":
                        i.buffer(e, t);
                        break;
                    case "object":
                        i.dict(e, t);
                        break;
                    case "array":
                        i.list(e, t);
                        break;
                    case "string":
                        i.string(e, t);
                        break;
                    case "number":
                    case "boolean":
                        i.number(e, t);
                        break;
                    case "arraybufferview":
                        i.buffer(e, n.from(t.buffer, t.byteOffset, t.byteLength));
                        break;
                    case "arraybuffer":
                        i.buffer(e, n.from(t))
                }
            };
            var o = n.from("e"),
                a = n.from("d"),
                s = n.from("l");
            i.buffer = function (e, t) {
                e.push(n.from(t.length + ":"), t)
            }, i.string = function (e, t) {
                e.push(n.from(n.byteLength(t) + ":" + t))
            }, i.number = function (e, t) {
                var r = 2147483648 * (t / 2147483648 << 0) + (t % 2147483648 << 0);
                e.push(n.from("i" + r + "e")), r === t || i._floatConversionDetected || (i._floatConversionDetected = !0, console.warn('WARNING: Possible data corruption detected with value "' + t + '":', 'Bencoding only defines support for integers, value was converted to "' + r + '"'), console.trace())
            }, i.dict = function (e, t) {
                e.push(a);
                for (var r, n = 0, s = Object.keys(t).sort(), u = s.length; n < u; n++) null != t[r = s[n]] && (i.string(e, r), i._encode(e, t[r]));
                e.push(o)
            }, i.list = function (e, t) {
                var r = 0,
                    n = t.length;
                for (e.push(s); r < n; r++) null != t[r] && i._encode(e, t[r]);
                e.push(o)
            }, t.exports = i
        }, {
            "safe-buffer": 39
        }],
        12: [function (e, t, r) {
            var n = t.exports;
            n.encode = e("./encode"), n.decode = e("./decode"), n.byteLength = n.encodingLength = function (e) {
                return n.encode(e).length
            }
        }, {
            "./decode": 10,
            "./encode": 11
        }],
        13: [function (e, t, r) {
            (function (r) {
                const {
                    Transform: n
                } = e("readable-stream");
                t.exports = class extends n {
                    constructor(e, t = {}) {
                        super(t), "object" == typeof e && (e = (t = e).size), this.size = e || 512;
                        const {
                            nopad: r,
                            zeroPadding: n = !0
                        } = t;
                        this._zeroPadding = !r && !!n, this._buffered = [], this._bufferedBytes = 0
                    }
                    _transform(e, t, n) {
                        for (this._bufferedBytes += e.length, this._buffered.push(e); this._bufferedBytes >= this.size;) {
                            const e = r.concat(this._buffered);
                            this._bufferedBytes -= this.size, this.push(e.slice(0, this.size)), this._buffered = [e.slice(this.size, e.length)]
                        }
                        n()
                    }
                    _flush() {
                        if (this._bufferedBytes && this._zeroPadding) {
                            const e = r.alloc(this.size - this._bufferedBytes);
                            this._buffered.push(e), this.push(r.concat(this._buffered)), this._buffered = null
                        } else this._bufferedBytes && (this.push(r.concat(this._buffered)), this._buffered = null);
                        this.push(null)
                    }
                }
            }).call(this, e("buffer").Buffer)
        }, {
            buffer: 4,
            "readable-stream": 36
        }],
        14: [function (e, t, r) {
            const {
                Readable: n
            } = e("readable-stream"), i = e("typedarray-to-buffer");
            t.exports = class extends n {
                constructor(e, t = {}) {
                    super(t), this._offset = 0, this._ready = !1, this._file = e, this._size = e.size, this._chunkSize = t.chunkSize || Math.max(this._size / 1e3, 204800);
                    const r = new FileReader;
                    r.onload = (() => {
                        this.push(i(r.result))
                    }), r.onerror = (() => {
                        this.emit("error", r.error)
                    }), this.reader = r, this._generateHeaderBlocks(e, t, (e, t) => {
                        if (e) return this.emit("error", e);
                        Array.isArray(t) && t.forEach(e => this.push(e)), this._ready = !0, this.emit("_ready")
                    })
                }
                _generateHeaderBlocks(e, t, r) {
                    r(null, [])
                }
                _read() {
                    if (!this._ready) return void this.once("_ready", this._read.bind(this));
                    const e = this._offset;
                    let t = this._offset + this._chunkSize;
                    if (t > this._size && (t = this._size), e === this._size) return this.destroy(), void this.push(null);
                    this.reader.readAsArrayBuffer(this._file.slice(e, t)), this._offset = t
                }
                destroy() {
                    if (this._file = null, this.reader) {
                        this.reader.onload = null, this.reader.onerror = null;
                        try {
                            this.reader.abort()
                        } catch (e) {}
                    }
                    this.reader = null
                }
            }
        }, {
            "readable-stream": 36,
            "typedarray-to-buffer": 43
        }],
        15: [function (e, t, r) {
            "function" == typeof Object.create ? t.exports = function (e, t) {
                t && (e.super_ = t, e.prototype = Object.create(t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }))
            } : t.exports = function (e, t) {
                if (t) {
                    e.super_ = t;
                    var r = function () {};
                    r.prototype = t.prototype, e.prototype = new r, e.prototype.constructor = e
                }
            }
        }, {}],
        16: [function (e, t, r) {
            "use strict";
            var n = e("fs");

            function i(e) {
                return n.existsSync(e) && n.statSync(e).isFile()
            }
            t.exports = function (e, t) {
                if (!t) return i(e);
                n.stat(e, function (e, r) {
                    return e ? t(e) : t(null, r.isFile())
                })
            }, t.exports.sync = i
        }, {
            fs: 3
        }],
        17: [function (e, t, r) {
            t.exports = o, o.strict = a, o.loose = s;
            var n = Object.prototype.toString,
                i = {
                    "[object Int8Array]": !0,
                    "[object Int16Array]": !0,
                    "[object Int32Array]": !0,
                    "[object Uint8Array]": !0,
                    "[object Uint8ClampedArray]": !0,
                    "[object Uint16Array]": !0,
                    "[object Uint32Array]": !0,
                    "[object Float32Array]": !0,
                    "[object Float64Array]": !0
                };

            function o(e) {
                return a(e) || s(e)
            }

            function a(e) {
                return e instanceof Int8Array || e instanceof Int16Array || e instanceof Int32Array || e instanceof Uint8Array || e instanceof Uint8ClampedArray || e instanceof Uint16Array || e instanceof Uint32Array || e instanceof Float32Array || e instanceof Float64Array
            }

            function s(e) {
                return i[n.call(e)]
            }
        }, {}],
        18: [function (e, t, r) {
            "use strict";
            r.re = (() => {
                throw new Error("`junk.re` was renamed to `junk.regex`")
            }), r.regex = new RegExp(["^npm-debug\\.log$", "^\\..*\\.swp$", "^\\.DS_Store$", "^\\.AppleDouble$", "^\\.LSOverride$", "^Icon\\r$", "^\\._.*", "^\\.Spotlight-V100(?:$|\\/)", "\\.Trashes", "^__MACOSX$", "~$", "^Thumbs\\.db$", "^ehthumbs\\.db$", "^Desktop\\.ini$", "@eaDir$"].join("|")), r.is = (e => r.regex.test(e)), r.not = (e => !r.is(e)), r.default = t.exports
        }, {}],
        19: [function (e, t, r) {
            var n = e("readable-stream");

            function i(e) {
                return a(e, {
                    objectMode: !0,
                    highWaterMark: 16
                })
            }

            function o(e) {
                return a(e)
            }

            function a(e, t) {
                if (!e || "function" == typeof e || e._readableState) return e;
                var r = new n.Readable(t).wrap(e);
                return e.destroy && (r.destroy = e.destroy.bind(e)), r
            }
            class s extends n.Readable {
                constructor(e, t) {
                    super(t), this.destroyed = !1, this._drained = !1, this._forwarding = !1, this._current = null, this._toStreams2 = t && t.objectMode ? i : o, "function" == typeof e ? this._queue = e : (this._queue = e.map(this._toStreams2), this._queue.forEach(e => {
                        "function" != typeof e && this._attachErrorListener(e)
                    })), this._next()
                }
                _read() {
                    this._drained = !0, this._forward()
                }
                _forward() {
                    if (!this._forwarding && this._drained && this._current) {
                        var e;
                        for (this._forwarding = !0; null !== (e = this._current.read()) && this._drained;) this._drained = this.push(e);
                        this._forwarding = !1
                    }
                }
                destroy(e) {
                    this.destroyed || (this.destroyed = !0, this._current && this._current.destroy && this._current.destroy(), "function" != typeof this._queue && this._queue.forEach(e => {
                        e.destroy && e.destroy()
                    }), e && this.emit("error", e), this.emit("close"))
                }
                _next() {
                    if (this._current = null, "function" == typeof this._queue) this._queue((e, t) => {
                        if (e) return this.destroy(e);
                        t = this._toStreams2(t), this._attachErrorListener(t), this._gotNextStream(t)
                    });
                    else {
                        var e = this._queue.shift();
                        "function" == typeof e && (e = this._toStreams2(e()), this._attachErrorListener(e)), this._gotNextStream(e)
                    }
                }
                _gotNextStream(e) {
                    if (!e) return this.push(null), void this.destroy();
                    this._current = e, this._forward();
                    const t = () => {
                            this._forward()
                        },
                        r = () => {
                            e._readableState.ended || this.destroy()
                        },
                        n = () => {
                            this._current = null, e.removeListener("readable", t), e.removeListener("end", n), e.removeListener("close", r), this._next()
                        };
                    e.on("readable", t), e.once("end", n), e.once("close", r)
                }
                _attachErrorListener(e) {
                    if (!e) return;
                    const t = r => {
                        e.removeListener("error", t), this.destroy(r)
                    };
                    e.once("error", t)
                }
            }
            s.obj = (e => new s(e, {
                objectMode: !0,
                highWaterMark: 16
            })), t.exports = s
        }, {
            "readable-stream": 36
        }],
        20: [function (e, t, r) {
            var n = e("wrappy");

            function i(e) {
                var t = function () {
                    return t.called ? t.value : (t.called = !0, t.value = e.apply(this, arguments))
                };
                return t.called = !1, t
            }

            function o(e) {
                var t = function () {
                        if (t.called) throw new Error(t.onceError);
                        return t.called = !0, t.value = e.apply(this, arguments)
                    },
                    r = e.name || "Function wrapped with `once`";
                return t.onceError = r + " shouldn't be called more than once", t.called = !1, t
            }
            t.exports = n(i), t.exports.strict = n(o), i.proto = i(function () {
                Object.defineProperty(Function.prototype, "once", {
                    value: function () {
                        return i(this)
                    },
                    configurable: !0
                }), Object.defineProperty(Function.prototype, "onceStrict", {
                    value: function () {
                        return o(this)
                    },
                    configurable: !0
                })
            })
        }, {
            wrappy: 45
        }],
        21: [function (e, t, r) {
            t.exports = function (e) {
                return Math.max(16384, 1 << Math.log2(e < 1024 ? 1 : e / 1024) + .5 | 0)
            }
        }, {}],
        22: [function (e, t, r) {
            "use strict";
            var n = {};

            function i(e, t, r) {
                r || (r = Error);
                var i = function (e) {
                    var r, n;

                    function i(r, n, i) {
                        return e.call(this, function (e, r, n) {
                            return "string" == typeof t ? t : t(e, r, n)
                        }(r, n, i)) || this
                    }
                    return n = e, (r = i).prototype = Object.create(n.prototype), r.prototype.constructor = r, r.__proto__ = n, i
                }(r);
                i.prototype.name = r.name, i.prototype.code = e, n[e] = i
            }

            function o(e, t) {
                if (Array.isArray(e)) {
                    var r = e.length;
                    return e = e.map(function (e) {
                        return String(e)
                    }), r > 2 ? "one of ".concat(t, " ").concat(e.slice(0, r - 1).join(", "), ", or ") + e[r - 1] : 2 === r ? "one of ".concat(t, " ").concat(e[0], " or ").concat(e[1]) : "of ".concat(t, " ").concat(e[0])
                }
                return "of ".concat(t, " ").concat(String(e))
            }
            i("ERR_INVALID_OPT_VALUE", function (e, t) {
                return 'The value "' + t + '" is invalid for option "' + e + '"'
            }, TypeError), i("ERR_INVALID_ARG_TYPE", function (e, t, r) {
                var n, i, a, s;
                if ("string" == typeof t && (i = "not ", t.substr(!a || a < 0 ? 0 : +a, i.length) === i) ? (n = "must not be", t = t.replace(/^not /, "")) : n = "must be", function (e, t, r) {
                        return (void 0 === r || r > e.length) && (r = e.length), e.substring(r - t.length, r) === t
                    }(e, " argument")) s = "The ".concat(e, " ").concat(n, " ").concat(o(t, "type"));
                else {
                    var u = function (e, t, r) {
                        return "number" != typeof r && (r = 0), !(r + t.length > e.length) && -1 !== e.indexOf(t, r)
                    }(e, ".") ? "property" : "argument";
                    s = 'The "'.concat(e, '" ').concat(u, " ").concat(n, " ").concat(o(t, "type"))
                }
                return s += ". Received type ".concat(typeof r)
            }, TypeError), i("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF"), i("ERR_METHOD_NOT_IMPLEMENTED", function (e) {
                return "The " + e + " method is not implemented"
            }), i("ERR_STREAM_PREMATURE_CLOSE", "Premature close"), i("ERR_STREAM_DESTROYED", function (e) {
                return "Cannot call " + e + " after a stream was destroyed"
            }), i("ERR_MULTIPLE_CALLBACK", "Callback called multiple times"), i("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable"), i("ERR_STREAM_WRITE_AFTER_END", "write after end"), i("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError), i("ERR_UNKNOWN_ENCODING", function (e) {
                return "Unknown encoding: " + e
            }, TypeError), i("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event"), t.exports.codes = n
        }, {}],
        23: [function (e, t, r) {
            (function (r) {
                "use strict";
                var n = Object.keys || function (e) {
                    var t = [];
                    for (var r in e) t.push(r);
                    return t
                };
                t.exports = f;
                var i = e("./_stream_readable"),
                    o = e("./_stream_writable");
                e("inherits")(f, i);
                for (var a = n(o.prototype), s = 0; s < a.length; s++) {
                    var u = a[s];
                    f.prototype[u] || (f.prototype[u] = o.prototype[u])
                }

                function f(e) {
                    if (!(this instanceof f)) return new f(e);
                    i.call(this, e), o.call(this, e), this.allowHalfOpen = !0, e && (!1 === e.readable && (this.readable = !1), !1 === e.writable && (this.writable = !1), !1 === e.allowHalfOpen && (this.allowHalfOpen = !1, this.once("end", l)))
                }

                function l() {
                    this._writableState.ended || r.nextTick(c, this)
                }

                function c(e) {
                    e.end()
                }
                Object.defineProperty(f.prototype, "writableHighWaterMark", {
                    enumerable: !1,
                    get: function () {
                        return this._writableState.highWaterMark
                    }
                }), Object.defineProperty(f.prototype, "writableBuffer", {
                    enumerable: !1,
                    get: function () {
                        return this._writableState && this._writableState.getBuffer()
                    }
                }), Object.defineProperty(f.prototype, "writableLength", {
                    enumerable: !1,
                    get: function () {
                        return this._writableState.length
                    }
                }), Object.defineProperty(f.prototype, "destroyed", {
                    enumerable: !1,
                    get: function () {
                        return void 0 !== this._readableState && void 0 !== this._writableState && (this._readableState.destroyed && this._writableState.destroyed)
                    },
                    set: function (e) {
                        void 0 !== this._readableState && void 0 !== this._writableState && (this._readableState.destroyed = e, this._writableState.destroyed = e)
                    }
                })
            }).call(this, e("_process"))
        }, {
            "./_stream_readable": 25,
            "./_stream_writable": 27,
            _process: 8,
            inherits: 15
        }],
        24: [function (e, t, r) {
            "use strict";
            t.exports = i;
            var n = e("./_stream_transform");

            function i(e) {
                if (!(this instanceof i)) return new i(e);
                n.call(this, e)
            }
            e("inherits")(i, n), i.prototype._transform = function (e, t, r) {
                r(null, e)
            }
        }, {
            "./_stream_transform": 26,
            inherits: 15
        }],
        25: [function (e, t, r) {
            (function (r, n) {
                "use strict";
                var i;
                t.exports = x, x.ReadableState = A;
                e("events").EventEmitter;
                var o = function (e, t) {
                        return e.listeners(t).length
                    },
                    a = e("./internal/streams/stream"),
                    s = e("buffer").Buffer,
                    u = n.Uint8Array || function () {};
                var f, l = e("util");
                f = l && l.debuglog ? l.debuglog("stream") : function () {};
                var c, h, d, p = e("./internal/streams/buffer_list"),
                    y = e("./internal/streams/destroy"),
                    g = e("./internal/streams/state").getHighWaterMark,
                    b = e("../errors").codes,
                    w = b.ERR_INVALID_ARG_TYPE,
                    v = b.ERR_STREAM_PUSH_AFTER_EOF,
                    m = b.ERR_METHOD_NOT_IMPLEMENTED,
                    _ = b.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;
                e("inherits")(x, a);
                var E = y.errorOrDestroy,
                    S = ["error", "close", "destroy", "pause", "resume"];

                function A(t, r, n) {
                    i = i || e("./_stream_duplex"), t = t || {}, "boolean" != typeof n && (n = r instanceof i), this.objectMode = !!t.objectMode, n && (this.objectMode = this.objectMode || !!t.readableObjectMode), this.highWaterMark = g(this, t, "readableHighWaterMark", n), this.buffer = new p, this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.paused = !0, this.emitClose = !1 !== t.emitClose, this.autoDestroy = !!t.autoDestroy, this.destroyed = !1, this.defaultEncoding = t.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, t.encoding && (c || (c = e("string_decoder/").StringDecoder), this.decoder = new c(t.encoding), this.encoding = t.encoding)
                }

                function x(t) {
                    if (i = i || e("./_stream_duplex"), !(this instanceof x)) return new x(t);
                    var r = this instanceof i;
                    this._readableState = new A(t, this, r), this.readable = !0, t && ("function" == typeof t.read && (this._read = t.read), "function" == typeof t.destroy && (this._destroy = t.destroy)), a.call(this)
                }

                function R(e, t, r, n, i) {
                    f("readableAddChunk", t);
                    var o, a = e._readableState;
                    if (null === t) a.reading = !1,
                        function (e, t) {
                            if (f("onEofChunk"), t.ended) return;
                            if (t.decoder) {
                                var r = t.decoder.end();
                                r && r.length && (t.buffer.push(r), t.length += t.objectMode ? 1 : r.length)
                            }
                            t.ended = !0, t.sync ? C(e) : (t.needReadable = !1, t.emittedReadable || (t.emittedReadable = !0, M(e)))
                        }(e, a);
                    else if (i || (o = function (e, t) {
                            var r;
                            n = t, s.isBuffer(n) || n instanceof u || "string" == typeof t || void 0 === t || e.objectMode || (r = new w("chunk", ["string", "Buffer", "Uint8Array"], t));
                            var n;
                            return r
                        }(a, t)), o) E(e, o);
                    else if (a.objectMode || t && t.length > 0)
                        if ("string" == typeof t || a.objectMode || Object.getPrototypeOf(t) === s.prototype || (t = function (e) {
                                return s.from(e)
                            }(t)), n) a.endEmitted ? E(e, new _) : k(e, a, t, !0);
                        else if (a.ended) E(e, new v);
                    else {
                        if (a.destroyed) return !1;
                        a.reading = !1, a.decoder && !r ? (t = a.decoder.write(t), a.objectMode || 0 !== t.length ? k(e, a, t, !1) : O(e, a)) : k(e, a, t, !1)
                    } else n || (a.reading = !1, O(e, a));
                    return !a.ended && (a.length < a.highWaterMark || 0 === a.length)
                }

                function k(e, t, r, n) {
                    t.flowing && 0 === t.length && !t.sync ? (t.awaitDrain = 0, e.emit("data", r)) : (t.length += t.objectMode ? 1 : r.length, n ? t.buffer.unshift(r) : t.buffer.push(r), t.needReadable && C(e)), O(e, t)
                }
                Object.defineProperty(x.prototype, "destroyed", {
                    enumerable: !1,
                    get: function () {
                        return void 0 !== this._readableState && this._readableState.destroyed
                    },
                    set: function (e) {
                        this._readableState && (this._readableState.destroyed = e)
                    }
                }), x.prototype.destroy = y.destroy, x.prototype._undestroy = y.undestroy, x.prototype._destroy = function (e, t) {
                    t(e)
                }, x.prototype.push = function (e, t) {
                    var r, n = this._readableState;
                    return n.objectMode ? r = !0 : "string" == typeof e && ((t = t || n.defaultEncoding) !== n.encoding && (e = s.from(e, t), t = ""), r = !0), R(this, e, t, !1, r)
                }, x.prototype.unshift = function (e) {
                    return R(this, e, null, !0, !1)
                }, x.prototype.isPaused = function () {
                    return !1 === this._readableState.flowing
                }, x.prototype.setEncoding = function (t) {
                    c || (c = e("string_decoder/").StringDecoder);
                    var r = new c(t);
                    this._readableState.decoder = r, this._readableState.encoding = this._readableState.decoder.encoding;
                    for (var n = this._readableState.buffer.head, i = ""; null !== n;) i += r.write(n.data), n = n.next;
                    return this._readableState.buffer.clear(), "" !== i && this._readableState.buffer.push(i), this._readableState.length = i.length, this
                };
                var L = 1073741824;

                function T(e, t) {
                    return e <= 0 || 0 === t.length && t.ended ? 0 : t.objectMode ? 1 : e != e ? t.flowing && t.length ? t.buffer.head.data.length : t.length : (e > t.highWaterMark && (t.highWaterMark = function (e) {
                        return e >= L ? e = L : (e--, e |= e >>> 1, e |= e >>> 2, e |= e >>> 4, e |= e >>> 8, e |= e >>> 16, e++), e
                    }(e)), e <= t.length ? e : t.ended ? t.length : (t.needReadable = !0, 0))
                }

                function C(e) {
                    var t = e._readableState;
                    f("emitReadable", t.needReadable, t.emittedReadable), t.needReadable = !1, t.emittedReadable || (f("emitReadable", t.flowing), t.emittedReadable = !0, r.nextTick(M, e))
                }

                function M(e) {
                    var t = e._readableState;
                    f("emitReadable_", t.destroyed, t.length, t.ended), t.destroyed || !t.length && !t.ended || (e.emit("readable"), t.emittedReadable = !1), t.needReadable = !t.flowing && !t.ended && t.length <= t.highWaterMark, I(e)
                }

                function O(e, t) {
                    t.readingMore || (t.readingMore = !0, r.nextTick(j, e, t))
                }

                function j(e, t) {
                    for (; !t.reading && !t.ended && (t.length < t.highWaterMark || t.flowing && 0 === t.length);) {
                        var r = t.length;
                        if (f("maybeReadMore read 0"), e.read(0), r === t.length) break
                    }
                    t.readingMore = !1
                }

                function B(e) {
                    var t = e._readableState;
                    t.readableListening = e.listenerCount("readable") > 0, t.resumeScheduled && !t.paused ? t.flowing = !0 : e.listenerCount("data") > 0 && e.resume()
                }

                function N(e) {
                    f("readable nexttick read 0"), e.read(0)
                }

                function U(e, t) {
                    f("resume", t.reading), t.reading || e.read(0), t.resumeScheduled = !1, e.emit("resume"), I(e), t.flowing && !t.reading && e.read(0)
                }

                function I(e) {
                    var t = e._readableState;
                    for (f("flow", t.flowing); t.flowing && null !== e.read(););
                }

                function P(e, t) {
                    return 0 === t.length ? null : (t.objectMode ? r = t.buffer.shift() : !e || e >= t.length ? (r = t.decoder ? t.buffer.join("") : 1 === t.buffer.length ? t.buffer.first() : t.buffer.concat(t.length), t.buffer.clear()) : r = t.buffer.consume(e, t.decoder), r);
                    var r
                }

                function D(e) {
                    var t = e._readableState;
                    f("endReadable", t.endEmitted), t.endEmitted || (t.ended = !0, r.nextTick(W, t, e))
                }

                function W(e, t) {
                    if (f("endReadableNT", e.endEmitted, e.length), !e.endEmitted && 0 === e.length && (e.endEmitted = !0, t.readable = !1, t.emit("end"), e.autoDestroy)) {
                        var r = t._writableState;
                        (!r || r.autoDestroy && r.finished) && t.destroy()
                    }
                }

                function F(e, t) {
                    for (var r = 0, n = e.length; r < n; r++)
                        if (e[r] === t) return r;
                    return -1
                }
                x.prototype.read = function (e) {
                    f("read", e), e = parseInt(e, 10);
                    var t = this._readableState,
                        r = e;
                    if (0 !== e && (t.emittedReadable = !1), 0 === e && t.needReadable && ((0 !== t.highWaterMark ? t.length >= t.highWaterMark : t.length > 0) || t.ended)) return f("read: emitReadable", t.length, t.ended), 0 === t.length && t.ended ? D(this) : C(this), null;
                    if (0 === (e = T(e, t)) && t.ended) return 0 === t.length && D(this), null;
                    var n, i = t.needReadable;
                    return f("need readable", i), (0 === t.length || t.length - e < t.highWaterMark) && f("length less than watermark", i = !0), t.ended || t.reading ? f("reading or ended", i = !1) : i && (f("do read"), t.reading = !0, t.sync = !0, 0 === t.length && (t.needReadable = !0), this._read(t.highWaterMark), t.sync = !1, t.reading || (e = T(r, t))), null === (n = e > 0 ? P(e, t) : null) ? (t.needReadable = t.length <= t.highWaterMark, e = 0) : (t.length -= e, t.awaitDrain = 0), 0 === t.length && (t.ended || (t.needReadable = !0), r !== e && t.ended && D(this)), null !== n && this.emit("data", n), n
                }, x.prototype._read = function (e) {
                    E(this, new m("_read()"))
                }, x.prototype.pipe = function (e, t) {
                    var n = this,
                        i = this._readableState;
                    switch (i.pipesCount) {
                        case 0:
                            i.pipes = e;
                            break;
                        case 1:
                            i.pipes = [i.pipes, e];
                            break;
                        default:
                            i.pipes.push(e)
                    }
                    i.pipesCount += 1, f("pipe count=%d opts=%j", i.pipesCount, t);
                    var a = (!t || !1 !== t.end) && e !== r.stdout && e !== r.stderr ? u : g;

                    function s(t, r) {
                        f("onunpipe"), t === n && r && !1 === r.hasUnpiped && (r.hasUnpiped = !0, f("cleanup"), e.removeListener("close", p), e.removeListener("finish", y), e.removeListener("drain", l), e.removeListener("error", d), e.removeListener("unpipe", s), n.removeListener("end", u), n.removeListener("end", g), n.removeListener("data", h), c = !0, !i.awaitDrain || e._writableState && !e._writableState.needDrain || l())
                    }

                    function u() {
                        f("onend"), e.end()
                    }
                    i.endEmitted ? r.nextTick(a) : n.once("end", a), e.on("unpipe", s);
                    var l = function (e) {
                        return function () {
                            var t = e._readableState;
                            f("pipeOnDrain", t.awaitDrain), t.awaitDrain && t.awaitDrain--, 0 === t.awaitDrain && o(e, "data") && (t.flowing = !0, I(e))
                        }
                    }(n);
                    e.on("drain", l);
                    var c = !1;

                    function h(t) {
                        f("ondata");
                        var r = e.write(t);
                        f("dest.write", r), !1 === r && ((1 === i.pipesCount && i.pipes === e || i.pipesCount > 1 && -1 !== F(i.pipes, e)) && !c && (f("false write response, pause", i.awaitDrain), i.awaitDrain++), n.pause())
                    }

                    function d(t) {
                        f("onerror", t), g(), e.removeListener("error", d), 0 === o(e, "error") && E(e, t)
                    }

                    function p() {
                        e.removeListener("finish", y), g()
                    }

                    function y() {
                        f("onfinish"), e.removeListener("close", p), g()
                    }

                    function g() {
                        f("unpipe"), n.unpipe(e)
                    }
                    return n.on("data", h),
                        function (e, t, r) {
                            if ("function" == typeof e.prependListener) return e.prependListener(t, r);
                            e._events && e._events[t] ? Array.isArray(e._events[t]) ? e._events[t].unshift(r) : e._events[t] = [r, e._events[t]] : e.on(t, r)
                        }(e, "error", d), e.once("close", p), e.once("finish", y), e.emit("pipe", n), i.flowing || (f("pipe resume"), n.resume()), e
                }, x.prototype.unpipe = function (e) {
                    var t = this._readableState,
                        r = {
                            hasUnpiped: !1
                        };
                    if (0 === t.pipesCount) return this;
                    if (1 === t.pipesCount) return e && e !== t.pipes ? this : (e || (e = t.pipes), t.pipes = null, t.pipesCount = 0, t.flowing = !1, e && e.emit("unpipe", this, r), this);
                    if (!e) {
                        var n = t.pipes,
                            i = t.pipesCount;
                        t.pipes = null, t.pipesCount = 0, t.flowing = !1;
                        for (var o = 0; o < i; o++) n[o].emit("unpipe", this, {
                            hasUnpiped: !1
                        });
                        return this
                    }
                    var a = F(t.pipes, e);
                    return -1 === a ? this : (t.pipes.splice(a, 1), t.pipesCount -= 1, 1 === t.pipesCount && (t.pipes = t.pipes[0]), e.emit("unpipe", this, r), this)
                }, x.prototype.on = function (e, t) {
                    var n = a.prototype.on.call(this, e, t),
                        i = this._readableState;
                    return "data" === e ? (i.readableListening = this.listenerCount("readable") > 0, !1 !== i.flowing && this.resume()) : "readable" === e && (i.endEmitted || i.readableListening || (i.readableListening = i.needReadable = !0, i.flowing = !1, i.emittedReadable = !1, f("on readable", i.length, i.reading), i.length ? C(this) : i.reading || r.nextTick(N, this))), n
                }, x.prototype.addListener = x.prototype.on, x.prototype.removeListener = function (e, t) {
                    var n = a.prototype.removeListener.call(this, e, t);
                    return "readable" === e && r.nextTick(B, this), n
                }, x.prototype.removeAllListeners = function (e) {
                    var t = a.prototype.removeAllListeners.apply(this, arguments);
                    return "readable" !== e && void 0 !== e || r.nextTick(B, this), t
                }, x.prototype.resume = function () {
                    var e = this._readableState;
                    return e.flowing || (f("resume"), e.flowing = !e.readableListening, function (e, t) {
                        t.resumeScheduled || (t.resumeScheduled = !0, r.nextTick(U, e, t))
                    }(this, e)), e.paused = !1, this
                }, x.prototype.pause = function () {
                    return f("call pause flowing=%j", this._readableState.flowing), !1 !== this._readableState.flowing && (f("pause"), this._readableState.flowing = !1, this.emit("pause")), this._readableState.paused = !0, this
                }, x.prototype.wrap = function (e) {
                    var t = this,
                        r = this._readableState,
                        n = !1;
                    for (var i in e.on("end", function () {
                            if (f("wrapped end"), r.decoder && !r.ended) {
                                var e = r.decoder.end();
                                e && e.length && t.push(e)
                            }
                            t.push(null)
                        }), e.on("data", function (i) {
                            (f("wrapped data"), r.decoder && (i = r.decoder.write(i)), r.objectMode && null == i) || (r.objectMode || i && i.length) && (t.push(i) || (n = !0, e.pause()))
                        }), e) void 0 === this[i] && "function" == typeof e[i] && (this[i] = function (t) {
                        return function () {
                            return e[t].apply(e, arguments)
                        }
                    }(i));
                    for (var o = 0; o < S.length; o++) e.on(S[o], this.emit.bind(this, S[o]));
                    return this._read = function (t) {
                        f("wrapped _read", t), n && (n = !1, e.resume())
                    }, this
                }, "function" == typeof Symbol && (x.prototype[Symbol.asyncIterator] = function () {
                    return void 0 === h && (h = e("./internal/streams/async_iterator")), h(this)
                }), Object.defineProperty(x.prototype, "readableHighWaterMark", {
                    enumerable: !1,
                    get: function () {
                        return this._readableState.highWaterMark
                    }
                }), Object.defineProperty(x.prototype, "readableBuffer", {
                    enumerable: !1,
                    get: function () {
                        return this._readableState && this._readableState.buffer
                    }
                }), Object.defineProperty(x.prototype, "readableFlowing", {
                    enumerable: !1,
                    get: function () {
                        return this._readableState.flowing
                    },
                    set: function (e) {
                        this._readableState && (this._readableState.flowing = e)
                    }
                }), x._fromList = P, Object.defineProperty(x.prototype, "readableLength", {
                    enumerable: !1,
                    get: function () {
                        return this._readableState.length
                    }
                }), "function" == typeof Symbol && (x.from = function (t, r) {
                    return void 0 === d && (d = e("./internal/streams/from")), d(x, t, r)
                })
            }).call(this, e("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {
            "../errors": 22,
            "./_stream_duplex": 23,
            "./internal/streams/async_iterator": 28,
            "./internal/streams/buffer_list": 29,
            "./internal/streams/destroy": 30,
            "./internal/streams/from": 32,
            "./internal/streams/state": 34,
            "./internal/streams/stream": 35,
            _process: 8,
            buffer: 4,
            events: 5,
            inherits: 15,
            "string_decoder/": 42,
            util: 2
        }],
        26: [function (e, t, r) {
            "use strict";
            t.exports = l;
            var n = e("../errors").codes,
                i = n.ERR_METHOD_NOT_IMPLEMENTED,
                o = n.ERR_MULTIPLE_CALLBACK,
                a = n.ERR_TRANSFORM_ALREADY_TRANSFORMING,
                s = n.ERR_TRANSFORM_WITH_LENGTH_0,
                u = e("./_stream_duplex");

            function f(e, t) {
                var r = this._transformState;
                r.transforming = !1;
                var n = r.writecb;
                if (null === n) return this.emit("error", new o);
                r.writechunk = null, r.writecb = null, null != t && this.push(t), n(e);
                var i = this._readableState;
                i.reading = !1, (i.needReadable || i.length < i.highWaterMark) && this._read(i.highWaterMark)
            }

            function l(e) {
                if (!(this instanceof l)) return new l(e);
                u.call(this, e), this._transformState = {
                    afterTransform: f.bind(this),
                    needTransform: !1,
                    transforming: !1,
                    writecb: null,
                    writechunk: null,
                    writeencoding: null
                }, this._readableState.needReadable = !0, this._readableState.sync = !1, e && ("function" == typeof e.transform && (this._transform = e.transform), "function" == typeof e.flush && (this._flush = e.flush)), this.on("prefinish", c)
            }

            function c() {
                var e = this;
                "function" != typeof this._flush || this._readableState.destroyed ? h(this, null, null) : this._flush(function (t, r) {
                    h(e, t, r)
                })
            }

            function h(e, t, r) {
                if (t) return e.emit("error", t);
                if (null != r && e.push(r), e._writableState.length) throw new s;
                if (e._transformState.transforming) throw new a;
                return e.push(null)
            }
            e("inherits")(l, u), l.prototype.push = function (e, t) {
                return this._transformState.needTransform = !1, u.prototype.push.call(this, e, t)
            }, l.prototype._transform = function (e, t, r) {
                r(new i("_transform()"))
            }, l.prototype._write = function (e, t, r) {
                var n = this._transformState;
                if (n.writecb = r, n.writechunk = e, n.writeencoding = t, !n.transforming) {
                    var i = this._readableState;
                    (n.needTransform || i.needReadable || i.length < i.highWaterMark) && this._read(i.highWaterMark)
                }
            }, l.prototype._read = function (e) {
                var t = this._transformState;
                null === t.writechunk || t.transforming ? t.needTransform = !0 : (t.transforming = !0, this._transform(t.writechunk, t.writeencoding, t.afterTransform))
            }, l.prototype._destroy = function (e, t) {
                u.prototype._destroy.call(this, e, function (e) {
                    t(e)
                })
            }
        }, {
            "../errors": 22,
            "./_stream_duplex": 23,
            inherits: 15
        }],
        27: [function (e, t, r) {
            (function (r, n) {
                "use strict";

                function i(e) {
                    var t = this;
                    this.next = null, this.entry = null, this.finish = function () {
                        ! function (e, t, r) {
                            var n = e.entry;
                            e.entry = null;
                            for (; n;) {
                                var i = n.callback;
                                t.pendingcb--, i(r), n = n.next
                            }
                            t.corkedRequestsFree.next = e
                        }(t, e)
                    }
                }
                var o;
                t.exports = x, x.WritableState = A;
                var a = {
                        deprecate: e("util-deprecate")
                    },
                    s = e("./internal/streams/stream"),
                    u = e("buffer").Buffer,
                    f = n.Uint8Array || function () {};
                var l, c = e("./internal/streams/destroy"),
                    h = e("./internal/streams/state").getHighWaterMark,
                    d = e("../errors").codes,
                    p = d.ERR_INVALID_ARG_TYPE,
                    y = d.ERR_METHOD_NOT_IMPLEMENTED,
                    g = d.ERR_MULTIPLE_CALLBACK,
                    b = d.ERR_STREAM_CANNOT_PIPE,
                    w = d.ERR_STREAM_DESTROYED,
                    v = d.ERR_STREAM_NULL_VALUES,
                    m = d.ERR_STREAM_WRITE_AFTER_END,
                    _ = d.ERR_UNKNOWN_ENCODING,
                    E = c.errorOrDestroy;

                function S() {}

                function A(t, n, a) {
                    o = o || e("./_stream_duplex"), t = t || {}, "boolean" != typeof a && (a = n instanceof o), this.objectMode = !!t.objectMode, a && (this.objectMode = this.objectMode || !!t.writableObjectMode), this.highWaterMark = h(this, t, "writableHighWaterMark", a), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
                    var s = !1 === t.decodeStrings;
                    this.decodeStrings = !s, this.defaultEncoding = t.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function (e) {
                        ! function (e, t) {
                            var n = e._writableState,
                                i = n.sync,
                                o = n.writecb;
                            if ("function" != typeof o) throw new g;
                            if (function (e) {
                                    e.writing = !1, e.writecb = null, e.length -= e.writelen, e.writelen = 0
                                }(n), t) ! function (e, t, n, i, o) {
                                --t.pendingcb, n ? (r.nextTick(o, i), r.nextTick(M, e, t), e._writableState.errorEmitted = !0, E(e, i)) : (o(i), e._writableState.errorEmitted = !0, E(e, i), M(e, t))
                            }(e, n, i, t, o);
                            else {
                                var a = T(n) || e.destroyed;
                                a || n.corked || n.bufferProcessing || !n.bufferedRequest || L(e, n), i ? r.nextTick(k, e, n, a, o) : k(e, n, a, o)
                            }
                        }(n, e)
                    }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.emitClose = !1 !== t.emitClose, this.autoDestroy = !!t.autoDestroy, this.bufferedRequestCount = 0, this.corkedRequestsFree = new i(this)
                }

                function x(t) {
                    var r = this instanceof(o = o || e("./_stream_duplex"));
                    if (!r && !l.call(x, this)) return new x(t);
                    this._writableState = new A(t, this, r), this.writable = !0, t && ("function" == typeof t.write && (this._write = t.write), "function" == typeof t.writev && (this._writev = t.writev), "function" == typeof t.destroy && (this._destroy = t.destroy), "function" == typeof t.final && (this._final = t.final)), s.call(this)
                }

                function R(e, t, r, n, i, o, a) {
                    t.writelen = n, t.writecb = a, t.writing = !0, t.sync = !0, t.destroyed ? t.onwrite(new w("write")) : r ? e._writev(i, t.onwrite) : e._write(i, o, t.onwrite), t.sync = !1
                }

                function k(e, t, r, n) {
                    r || function (e, t) {
                        0 === t.length && t.needDrain && (t.needDrain = !1, e.emit("drain"))
                    }(e, t), t.pendingcb--, n(), M(e, t)
                }

                function L(e, t) {
                    t.bufferProcessing = !0;
                    var r = t.bufferedRequest;
                    if (e._writev && r && r.next) {
                        var n = t.bufferedRequestCount,
                            o = new Array(n),
                            a = t.corkedRequestsFree;
                        a.entry = r;
                        for (var s = 0, u = !0; r;) o[s] = r, r.isBuf || (u = !1), r = r.next, s += 1;
                        o.allBuffers = u, R(e, t, !0, t.length, o, "", a.finish), t.pendingcb++, t.lastBufferedRequest = null, a.next ? (t.corkedRequestsFree = a.next, a.next = null) : t.corkedRequestsFree = new i(t), t.bufferedRequestCount = 0
                    } else {
                        for (; r;) {
                            var f = r.chunk,
                                l = r.encoding,
                                c = r.callback;
                            if (R(e, t, !1, t.objectMode ? 1 : f.length, f, l, c), r = r.next, t.bufferedRequestCount--, t.writing) break
                        }
                        null === r && (t.lastBufferedRequest = null)
                    }
                    t.bufferedRequest = r, t.bufferProcessing = !1
                }

                function T(e) {
                    return e.ending && 0 === e.length && null === e.bufferedRequest && !e.finished && !e.writing
                }

                function C(e, t) {
                    e._final(function (r) {
                        t.pendingcb--, r && E(e, r), t.prefinished = !0, e.emit("prefinish"), M(e, t)
                    })
                }

                function M(e, t) {
                    var n = T(t);
                    if (n && (function (e, t) {
                            t.prefinished || t.finalCalled || ("function" != typeof e._final || t.destroyed ? (t.prefinished = !0, e.emit("prefinish")) : (t.pendingcb++, t.finalCalled = !0, r.nextTick(C, e, t)))
                        }(e, t), 0 === t.pendingcb && (t.finished = !0, e.emit("finish"), t.autoDestroy))) {
                        var i = e._readableState;
                        (!i || i.autoDestroy && i.endEmitted) && e.destroy()
                    }
                    return n
                }
                e("inherits")(x, s), A.prototype.getBuffer = function () {
                        for (var e = this.bufferedRequest, t = []; e;) t.push(e), e = e.next;
                        return t
                    },
                    function () {
                        try {
                            Object.defineProperty(A.prototype, "buffer", {
                                get: a.deprecate(function () {
                                    return this.getBuffer()
                                }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
                            })
                        } catch (e) {}
                    }(), "function" == typeof Symbol && Symbol.hasInstance && "function" == typeof Function.prototype[Symbol.hasInstance] ? (l = Function.prototype[Symbol.hasInstance], Object.defineProperty(x, Symbol.hasInstance, {
                        value: function (e) {
                            return !!l.call(this, e) || this === x && (e && e._writableState instanceof A)
                        }
                    })) : l = function (e) {
                        return e instanceof this
                    }, x.prototype.pipe = function () {
                        E(this, new b)
                    }, x.prototype.write = function (e, t, n) {
                        var i, o = this._writableState,
                            a = !1,
                            s = !o.objectMode && (i = e, u.isBuffer(i) || i instanceof f);
                        return s && !u.isBuffer(e) && (e = function (e) {
                            return u.from(e)
                        }(e)), "function" == typeof t && (n = t, t = null), s ? t = "buffer" : t || (t = o.defaultEncoding), "function" != typeof n && (n = S), o.ending ? function (e, t) {
                            var n = new m;
                            E(e, n), r.nextTick(t, n)
                        }(this, n) : (s || function (e, t, n, i) {
                            var o;
                            return null === n ? o = new v : "string" == typeof n || t.objectMode || (o = new p("chunk", ["string", "Buffer"], n)), !o || (E(e, o), r.nextTick(i, o), !1)
                        }(this, o, e, n)) && (o.pendingcb++, a = function (e, t, r, n, i, o) {
                            if (!r) {
                                var a = function (e, t, r) {
                                    e.objectMode || !1 === e.decodeStrings || "string" != typeof t || (t = u.from(t, r));
                                    return t
                                }(t, n, i);
                                n !== a && (r = !0, i = "buffer", n = a)
                            }
                            var s = t.objectMode ? 1 : n.length;
                            t.length += s;
                            var f = t.length < t.highWaterMark;
                            f || (t.needDrain = !0);
                            if (t.writing || t.corked) {
                                var l = t.lastBufferedRequest;
                                t.lastBufferedRequest = {
                                    chunk: n,
                                    encoding: i,
                                    isBuf: r,
                                    callback: o,
                                    next: null
                                }, l ? l.next = t.lastBufferedRequest : t.bufferedRequest = t.lastBufferedRequest, t.bufferedRequestCount += 1
                            } else R(e, t, !1, s, n, i, o);
                            return f
                        }(this, o, s, e, t, n)), a
                    }, x.prototype.cork = function () {
                        this._writableState.corked++
                    }, x.prototype.uncork = function () {
                        var e = this._writableState;
                        e.corked && (e.corked--, e.writing || e.corked || e.bufferProcessing || !e.bufferedRequest || L(this, e))
                    }, x.prototype.setDefaultEncoding = function (e) {
                        if ("string" == typeof e && (e = e.toLowerCase()), !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((e + "").toLowerCase()) > -1)) throw new _(e);
                        return this._writableState.defaultEncoding = e, this
                    }, Object.defineProperty(x.prototype, "writableBuffer", {
                        enumerable: !1,
                        get: function () {
                            return this._writableState && this._writableState.getBuffer()
                        }
                    }), Object.defineProperty(x.prototype, "writableHighWaterMark", {
                        enumerable: !1,
                        get: function () {
                            return this._writableState.highWaterMark
                        }
                    }), x.prototype._write = function (e, t, r) {
                        r(new y("_write()"))
                    }, x.prototype._writev = null, x.prototype.end = function (e, t, n) {
                        var i = this._writableState;
                        return "function" == typeof e ? (n = e, e = null, t = null) : "function" == typeof t && (n = t, t = null), null != e && this.write(e, t), i.corked && (i.corked = 1, this.uncork()), i.ending || function (e, t, n) {
                            t.ending = !0, M(e, t), n && (t.finished ? r.nextTick(n) : e.once("finish", n));
                            t.ended = !0, e.writable = !1
                        }(this, i, n), this
                    }, Object.defineProperty(x.prototype, "writableLength", {
                        enumerable: !1,
                        get: function () {
                            return this._writableState.length
                        }
                    }), Object.defineProperty(x.prototype, "destroyed", {
                        enumerable: !1,
                        get: function () {
                            return void 0 !== this._writableState && this._writableState.destroyed
                        },
                        set: function (e) {
                            this._writableState && (this._writableState.destroyed = e)
                        }
                    }), x.prototype.destroy = c.destroy, x.prototype._undestroy = c.undestroy, x.prototype._destroy = function (e, t) {
                        t(e)
                    }
            }).call(this, e("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {
            "../errors": 22,
            "./_stream_duplex": 23,
            "./internal/streams/destroy": 30,
            "./internal/streams/state": 34,
            "./internal/streams/stream": 35,
            _process: 8,
            buffer: 4,
            inherits: 15,
            "util-deprecate": 44
        }],
        28: [function (e, t, r) {
            (function (r) {
                "use strict";
                var n;

                function i(e, t, r) {
                    return t in e ? Object.defineProperty(e, t, {
                        value: r,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : e[t] = r, e
                }
                var o = e("./end-of-stream"),
                    a = Symbol("lastResolve"),
                    s = Symbol("lastReject"),
                    u = Symbol("error"),
                    f = Symbol("ended"),
                    l = Symbol("lastPromise"),
                    c = Symbol("handlePromise"),
                    h = Symbol("stream");

                function d(e, t) {
                    return {
                        value: e,
                        done: t
                    }
                }

                function p(e) {
                    var t = e[a];
                    if (null !== t) {
                        var r = e[h].read();
                        null !== r && (e[l] = null, e[a] = null, e[s] = null, t(d(r, !1)))
                    }
                }
                var y = Object.getPrototypeOf(function () {}),
                    g = Object.setPrototypeOf((i(n = {
                        get stream() {
                            return this[h]
                        },
                        next: function () {
                            var e = this,
                                t = this[u];
                            if (null !== t) return Promise.reject(t);
                            if (this[f]) return Promise.resolve(d(void 0, !0));
                            if (this[h].destroyed) return new Promise(function (t, n) {
                                r.nextTick(function () {
                                    e[u] ? n(e[u]) : t(d(void 0, !0))
                                })
                            });
                            var n, i = this[l];
                            if (i) n = new Promise(function (e, t) {
                                return function (r, n) {
                                    e.then(function () {
                                        t[f] ? r(d(void 0, !0)) : t[c](r, n)
                                    }, n)
                                }
                            }(i, this));
                            else {
                                var o = this[h].read();
                                if (null !== o) return Promise.resolve(d(o, !1));
                                n = new Promise(this[c])
                            }
                            return this[l] = n, n
                        }
                    }, Symbol.asyncIterator, function () {
                        return this
                    }), i(n, "return", function () {
                        var e = this;
                        return new Promise(function (t, r) {
                            e[h].destroy(null, function (e) {
                                e ? r(e) : t(d(void 0, !0))
                            })
                        })
                    }), n), y);
                t.exports = function (e) {
                    var t, n = Object.create(g, (i(t = {}, h, {
                        value: e,
                        writable: !0
                    }), i(t, a, {
                        value: null,
                        writable: !0
                    }), i(t, s, {
                        value: null,
                        writable: !0
                    }), i(t, u, {
                        value: null,
                        writable: !0
                    }), i(t, f, {
                        value: e._readableState.endEmitted,
                        writable: !0
                    }), i(t, c, {
                        value: function (e, t) {
                            var r = n[h].read();
                            r ? (n[l] = null, n[a] = null, n[s] = null, e(d(r, !1))) : (n[a] = e, n[s] = t)
                        },
                        writable: !0
                    }), t));
                    return n[l] = null, o(e, function (e) {
                        if (e && "ERR_STREAM_PREMATURE_CLOSE" !== e.code) {
                            var t = n[s];
                            return null !== t && (n[l] = null, n[a] = null, n[s] = null, t(e)), void(n[u] = e)
                        }
                        var r = n[a];
                        null !== r && (n[l] = null, n[a] = null, n[s] = null, r(d(void 0, !0))), n[f] = !0
                    }), e.on("readable", function (e) {
                        r.nextTick(p, e)
                    }.bind(null, n)), n
                }
            }).call(this, e("_process"))
        }, {
            "./end-of-stream": 31,
            _process: 8
        }],
        29: [function (e, t, r) {
            "use strict";

            function n(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter(function (t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    })), r.push.apply(r, n)
                }
                return r
            }

            function i(e, t, r) {
                return t in e ? Object.defineProperty(e, t, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = r, e
            }

            function o(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                }
            }
            var a = e("buffer").Buffer,
                s = e("util").inspect,
                u = s && s.custom || "inspect";
            t.exports = function () {
                function e() {
                    ! function (e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), this.head = null, this.tail = null, this.length = 0
                }
                var t, r, f;
                return t = e, (r = [{
                    key: "push",
                    value: function (e) {
                        var t = {
                            data: e,
                            next: null
                        };
                        this.length > 0 ? this.tail.next = t : this.head = t, this.tail = t, ++this.length
                    }
                }, {
                    key: "unshift",
                    value: function (e) {
                        var t = {
                            data: e,
                            next: this.head
                        };
                        0 === this.length && (this.tail = t), this.head = t, ++this.length
                    }
                }, {
                    key: "shift",
                    value: function () {
                        if (0 !== this.length) {
                            var e = this.head.data;
                            return 1 === this.length ? this.head = this.tail = null : this.head = this.head.next, --this.length, e
                        }
                    }
                }, {
                    key: "clear",
                    value: function () {
                        this.head = this.tail = null, this.length = 0
                    }
                }, {
                    key: "join",
                    value: function (e) {
                        if (0 === this.length) return "";
                        for (var t = this.head, r = "" + t.data; t = t.next;) r += e + t.data;
                        return r
                    }
                }, {
                    key: "concat",
                    value: function (e) {
                        if (0 === this.length) return a.alloc(0);
                        for (var t, r, n, i = a.allocUnsafe(e >>> 0), o = this.head, s = 0; o;) t = o.data, r = i, n = s, a.prototype.copy.call(t, r, n), s += o.data.length, o = o.next;
                        return i
                    }
                }, {
                    key: "consume",
                    value: function (e, t) {
                        var r;
                        return e < this.head.data.length ? (r = this.head.data.slice(0, e), this.head.data = this.head.data.slice(e)) : r = e === this.head.data.length ? this.shift() : t ? this._getString(e) : this._getBuffer(e), r
                    }
                }, {
                    key: "first",
                    value: function () {
                        return this.head.data
                    }
                }, {
                    key: "_getString",
                    value: function (e) {
                        var t = this.head,
                            r = 1,
                            n = t.data;
                        for (e -= n.length; t = t.next;) {
                            var i = t.data,
                                o = e > i.length ? i.length : e;
                            if (o === i.length ? n += i : n += i.slice(0, e), 0 === (e -= o)) {
                                o === i.length ? (++r, t.next ? this.head = t.next : this.head = this.tail = null) : (this.head = t, t.data = i.slice(o));
                                break
                            }++r
                        }
                        return this.length -= r, n
                    }
                }, {
                    key: "_getBuffer",
                    value: function (e) {
                        var t = a.allocUnsafe(e),
                            r = this.head,
                            n = 1;
                        for (r.data.copy(t), e -= r.data.length; r = r.next;) {
                            var i = r.data,
                                o = e > i.length ? i.length : e;
                            if (i.copy(t, t.length - e, 0, o), 0 === (e -= o)) {
                                o === i.length ? (++n, r.next ? this.head = r.next : this.head = this.tail = null) : (this.head = r, r.data = i.slice(o));
                                break
                            }++n
                        }
                        return this.length -= n, t
                    }
                }, {
                    key: u,
                    value: function (e, t) {
                        return s(this, function (e) {
                            for (var t = 1; t < arguments.length; t++) {
                                var r = null != arguments[t] ? arguments[t] : {};
                                t % 2 ? n(Object(r), !0).forEach(function (t) {
                                    i(e, t, r[t])
                                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : n(Object(r)).forEach(function (t) {
                                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                                })
                            }
                            return e
                        }({}, t, {
                            depth: 0,
                            customInspect: !1
                        }))
                    }
                }]) && o(t.prototype, r), f && o(t, f), e
            }()
        }, {
            buffer: 4,
            util: 2
        }],
        30: [function (e, t, r) {
            (function (e) {
                "use strict";

                function r(e, t) {
                    i(e, t), n(e)
                }

                function n(e) {
                    e._writableState && !e._writableState.emitClose || e._readableState && !e._readableState.emitClose || e.emit("close")
                }

                function i(e, t) {
                    e.emit("error", t)
                }
                t.exports = {
                    destroy: function (t, o) {
                        var a = this,
                            s = this._readableState && this._readableState.destroyed,
                            u = this._writableState && this._writableState.destroyed;
                        return s || u ? (o ? o(t) : t && (this._writableState ? this._writableState.errorEmitted || (this._writableState.errorEmitted = !0, e.nextTick(i, this, t)) : e.nextTick(i, this, t)), this) : (this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), this._destroy(t || null, function (t) {
                            !o && t ? a._writableState ? a._writableState.errorEmitted ? e.nextTick(n, a) : (a._writableState.errorEmitted = !0, e.nextTick(r, a, t)) : e.nextTick(r, a, t) : o ? (e.nextTick(n, a), o(t)) : e.nextTick(n, a)
                        }), this)
                    },
                    undestroy: function () {
                        this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, this._readableState.ended = !1, this._readableState.endEmitted = !1), this._writableState && (this._writableState.destroyed = !1, this._writableState.ended = !1, this._writableState.ending = !1, this._writableState.finalCalled = !1, this._writableState.prefinished = !1, this._writableState.finished = !1, this._writableState.errorEmitted = !1)
                    },
                    errorOrDestroy: function (e, t) {
                        var r = e._readableState,
                            n = e._writableState;
                        r && r.autoDestroy || n && n.autoDestroy ? e.destroy(t) : e.emit("error", t)
                    }
                }
            }).call(this, e("_process"))
        }, {
            _process: 8
        }],
        31: [function (e, t, r) {
            "use strict";
            var n = e("../../../errors").codes.ERR_STREAM_PREMATURE_CLOSE;

            function i() {}
            t.exports = function e(t, r, o) {
                if ("function" == typeof r) return e(t, null, r);
                r || (r = {}), o = function (e) {
                    var t = !1;
                    return function () {
                        if (!t) {
                            t = !0;
                            for (var r = arguments.length, n = new Array(r), i = 0; i < r; i++) n[i] = arguments[i];
                            e.apply(this, n)
                        }
                    }
                }(o || i);
                var a = r.readable || !1 !== r.readable && t.readable,
                    s = r.writable || !1 !== r.writable && t.writable,
                    u = function () {
                        t.writable || l()
                    },
                    f = t._writableState && t._writableState.finished,
                    l = function () {
                        s = !1, f = !0, a || o.call(t)
                    },
                    c = t._readableState && t._readableState.endEmitted,
                    h = function () {
                        a = !1, c = !0, s || o.call(t)
                    },
                    d = function (e) {
                        o.call(t, e)
                    },
                    p = function () {
                        var e;
                        return a && !c ? (t._readableState && t._readableState.ended || (e = new n), o.call(t, e)) : s && !f ? (t._writableState && t._writableState.ended || (e = new n), o.call(t, e)) : void 0
                    },
                    y = function () {
                        t.req.on("finish", l)
                    };
                return function (e) {
                        return e.setHeader && "function" == typeof e.abort
                    }(t) ? (t.on("complete", l), t.on("abort", p), t.req ? y() : t.on("request", y)) : s && !t._writableState && (t.on("end", u), t.on("close", u)), t.on("end", h), t.on("finish", l), !1 !== r.error && t.on("error", d), t.on("close", p),
                    function () {
                        t.removeListener("complete", l), t.removeListener("abort", p), t.removeListener("request", y), t.req && t.req.removeListener("finish", l), t.removeListener("end", u), t.removeListener("close", u), t.removeListener("finish", l), t.removeListener("end", h), t.removeListener("error", d), t.removeListener("close", p)
                    }
            }
        }, {
            "../../../errors": 22
        }],
        32: [function (e, t, r) {
            t.exports = function () {
                throw new Error("Readable.from is not available in the browser")
            }
        }, {}],
        33: [function (e, t, r) {
            "use strict";
            var n;
            var i = e("../../../errors").codes,
                o = i.ERR_MISSING_ARGS,
                a = i.ERR_STREAM_DESTROYED;

            function s(e) {
                if (e) throw e
            }

            function u(e) {
                e()
            }

            function f(e, t) {
                return e.pipe(t)
            }
            t.exports = function () {
                for (var t = arguments.length, r = new Array(t), i = 0; i < t; i++) r[i] = arguments[i];
                var l, c = function (e) {
                    return e.length ? "function" != typeof e[e.length - 1] ? s : e.pop() : s
                }(r);
                if (Array.isArray(r[0]) && (r = r[0]), r.length < 2) throw new o("streams");
                var h = r.map(function (t, i) {
                    var o = i < r.length - 1;
                    return function (t, r, i, o) {
                        o = function (e) {
                            var t = !1;
                            return function () {
                                t || (t = !0, e.apply(void 0, arguments))
                            }
                        }(o);
                        var s = !1;
                        t.on("close", function () {
                            s = !0
                        }), void 0 === n && (n = e("./end-of-stream")), n(t, {
                            readable: r,
                            writable: i
                        }, function (e) {
                            if (e) return o(e);
                            s = !0, o()
                        });
                        var u = !1;
                        return function (e) {
                            if (!s && !u) return u = !0,
                                function (e) {
                                    return e.setHeader && "function" == typeof e.abort
                                }(t) ? t.abort() : "function" == typeof t.destroy ? t.destroy() : void o(e || new a("pipe"))
                        }
                    }(t, o, i > 0, function (e) {
                        l || (l = e), e && h.forEach(u), o || (h.forEach(u), c(l))
                    })
                });
                return r.reduce(f)
            }
        }, {
            "../../../errors": 22,
            "./end-of-stream": 31
        }],
        34: [function (e, t, r) {
            "use strict";
            var n = e("../../../errors").codes.ERR_INVALID_OPT_VALUE;
            t.exports = {
                getHighWaterMark: function (e, t, r, i) {
                    var o = function (e, t, r) {
                        return null != e.highWaterMark ? e.highWaterMark : t ? e[r] : null
                    }(t, i, r);
                    if (null != o) {
                        if (!isFinite(o) || Math.floor(o) !== o || o < 0) throw new n(i ? r : "highWaterMark", o);
                        return Math.floor(o)
                    }
                    return e.objectMode ? 16 : 16384
                }
            }
        }, {
            "../../../errors": 22
        }],
        35: [function (e, t, r) {
            t.exports = e("events").EventEmitter
        }, {
            events: 5
        }],
        36: [function (e, t, r) {
            (r = t.exports = e("./lib/_stream_readable.js")).Stream = r, r.Readable = r, r.Writable = e("./lib/_stream_writable.js"), r.Duplex = e("./lib/_stream_duplex.js"), r.Transform = e("./lib/_stream_transform.js"), r.PassThrough = e("./lib/_stream_passthrough.js"), r.finished = e("./lib/internal/streams/end-of-stream.js"), r.pipeline = e("./lib/internal/streams/pipeline.js")
        }, {
            "./lib/_stream_duplex.js": 23,
            "./lib/_stream_passthrough.js": 24,
            "./lib/_stream_readable.js": 25,
            "./lib/_stream_transform.js": 26,
            "./lib/_stream_writable.js": 27,
            "./lib/internal/streams/end-of-stream.js": 31,
            "./lib/internal/streams/pipeline.js": 33
        }],
        37: [function (e, t, r) {
            (function (e) {
                t.exports = function (t, r) {
                    var n, i, o, a = !0;
                    Array.isArray(t) ? (n = [], i = t.length) : (o = Object.keys(t), n = {}, i = o.length);

                    function s(t) {
                        function i() {
                            r && r(t, n), r = null
                        }
                        a ? e.nextTick(i) : i()
                    }

                    function u(e, t, r) {
                        n[e] = r, (0 == --i || t) && s(t)
                    }
                    i ? o ? o.forEach(function (e) {
                        t[e](function (t, r) {
                            u(e, t, r)
                        })
                    }) : t.forEach(function (e, t) {
                        e(function (e, r) {
                            u(t, e, r)
                        })
                    }) : s(null);
                    a = !1
                }
            }).call(this, e("_process"))
        }, {
            _process: 8
        }],
        38: [function (e, t, r) {
            var n, i;
            n = "undefined" != typeof self ? self : this, i = function () {
                return function (e) {
                    var t = {};

                    function r(n) {
                        if (t[n]) return t[n].exports;
                        var i = t[n] = {
                            i: n,
                            l: !1,
                            exports: {}
                        };
                        return e[n].call(i.exports, i, i.exports, r), i.l = !0, i.exports
                    }
                    return r.m = e, r.c = t, r.d = function (e, t, n) {
                        r.o(e, t) || Object.defineProperty(e, t, {
                            configurable: !1,
                            enumerable: !0,
                            get: n
                        })
                    }, r.n = function (e) {
                        var t = e && e.__esModule ? function () {
                            return e.default
                        } : function () {
                            return e
                        };
                        return r.d(t, "a", t), t
                    }, r.o = function (e, t) {
                        return Object.prototype.hasOwnProperty.call(e, t)
                    }, r.p = "", r(r.s = 3)
                }([function (e, t, r) {
                    var n = r(5),
                        i = r(1),
                        o = i.toHex,
                        a = i.ceilHeapSize,
                        s = r(6),
                        u = function (e) {
                            for (e += 9; e % 64 > 0; e += 1);
                            return e
                        },
                        f = function (e, t) {
                            var r = new Int32Array(e, t + 320, 5),
                                n = new Int32Array(5),
                                i = new DataView(n.buffer);
                            return i.setInt32(0, r[0], !1), i.setInt32(4, r[1], !1), i.setInt32(8, r[2], !1), i.setInt32(12, r[3], !1), i.setInt32(16, r[4], !1), n
                        },
                        l = function () {
                            function e(t) {
                                if (function (e, t) {
                                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                                    }(this, e), (t = t || 65536) % 64 > 0) throw new Error("Chunk size must be a multiple of 128 bit");
                                this._offset = 0, this._maxChunkLen = t, this._padMaxChunkLen = u(t), this._heap = new ArrayBuffer(a(this._padMaxChunkLen + 320 + 20)), this._h32 = new Int32Array(this._heap), this._h8 = new Int8Array(this._heap), this._core = new n({
                                    Int32Array: Int32Array
                                }, {}, this._heap)
                            }
                            return e.prototype._initState = function (e, t) {
                                this._offset = 0;
                                var r = new Int32Array(e, t + 320, 5);
                                r[0] = 1732584193, r[1] = -271733879, r[2] = -1732584194, r[3] = 271733878, r[4] = -1009589776
                            }, e.prototype._padChunk = function (e, t) {
                                var r = u(e),
                                    n = new Int32Array(this._heap, 0, r >> 2);
                                return function (e, t) {
                                        var r = new Uint8Array(e.buffer),
                                            n = t % 4,
                                            i = t - n;
                                        switch (n) {
                                            case 0:
                                                r[i + 3] = 0;
                                            case 1:
                                                r[i + 2] = 0;
                                            case 2:
                                                r[i + 1] = 0;
                                            case 3:
                                                r[i + 0] = 0
                                        }
                                        for (var o = 1 + (t >> 2); o < e.length; o++) e[o] = 0
                                    }(n, e),
                                    function (e, t, r) {
                                        e[t >> 2] |= 128 << 24 - (t % 4 << 3), e[14 + (2 + (t >> 2) & -16)] = r / (1 << 29) | 0, e[15 + (2 + (t >> 2) & -16)] = r << 3
                                    }(n, e, t), r
                            }, e.prototype._write = function (e, t, r, n) {
                                s(e, this._h8, this._h32, t, r, n || 0)
                            }, e.prototype._coreCall = function (e, t, r, n, i) {
                                var o = r;
                                this._write(e, t, r), i && (o = this._padChunk(r, n)), this._core.hash(o, this._padMaxChunkLen)
                            }, e.prototype.rawDigest = function (e) {
                                var t = e.byteLength || e.length || e.size || 0;
                                this._initState(this._heap, this._padMaxChunkLen);
                                var r = 0,
                                    n = this._maxChunkLen;
                                for (r = 0; t > r + n; r += n) this._coreCall(e, r, n, t, !1);
                                return this._coreCall(e, r, t - r, t, !0), f(this._heap, this._padMaxChunkLen)
                            }, e.prototype.digest = function (e) {
                                return o(this.rawDigest(e).buffer)
                            }, e.prototype.digestFromString = function (e) {
                                return this.digest(e)
                            }, e.prototype.digestFromBuffer = function (e) {
                                return this.digest(e)
                            }, e.prototype.digestFromArrayBuffer = function (e) {
                                return this.digest(e)
                            }, e.prototype.resetState = function () {
                                return this._initState(this._heap, this._padMaxChunkLen), this
                            }, e.prototype.append = function (e) {
                                var t = 0,
                                    r = e.byteLength || e.length || e.size || 0,
                                    n = this._offset % this._maxChunkLen,
                                    i = void 0;
                                for (this._offset += r; t < r;) i = Math.min(r - t, this._maxChunkLen - n), this._write(e, t, i, n), t += i, (n += i) === this._maxChunkLen && (this._core.hash(this._maxChunkLen, this._padMaxChunkLen), n = 0);
                                return this
                            }, e.prototype.getState = function () {
                                var e = void 0;
                                if (this._offset % this._maxChunkLen) e = this._heap.slice(0);
                                else {
                                    var t = new Int32Array(this._heap, this._padMaxChunkLen + 320, 5);
                                    e = t.buffer.slice(t.byteOffset, t.byteOffset + t.byteLength)
                                }
                                return {
                                    offset: this._offset,
                                    heap: e
                                }
                            }, e.prototype.setState = function (e) {
                                (this._offset = e.offset, 20 === e.heap.byteLength) ? new Int32Array(this._heap, this._padMaxChunkLen + 320, 5).set(new Int32Array(e.heap)): this._h32.set(new Int32Array(e.heap));
                                return this
                            }, e.prototype.rawEnd = function () {
                                var e = this._offset,
                                    t = e % this._maxChunkLen,
                                    r = this._padChunk(t, e);
                                this._core.hash(r, this._padMaxChunkLen);
                                var n = f(this._heap, this._padMaxChunkLen);
                                return this._initState(this._heap, this._padMaxChunkLen), n
                            }, e.prototype.end = function () {
                                return o(this.rawEnd().buffer)
                            }, e
                        }();
                    e.exports = l, e.exports._core = n
                }, function (e, t) {
                    for (var r = new Array(256), n = 0; n < 256; n++) r[n] = (n < 16 ? "0" : "") + n.toString(16);
                    e.exports.toHex = function (e) {
                        for (var t = new Uint8Array(e), n = new Array(e.byteLength), i = 0; i < n.length; i++) n[i] = r[t[i]];
                        return n.join("")
                    }, e.exports.ceilHeapSize = function (e) {
                        var t = 0;
                        if (e <= 65536) return 65536;
                        if (e < 16777216)
                            for (t = 1; t < e; t <<= 1);
                        else
                            for (t = 16777216; t < e; t += 16777216);
                        return t
                    }, e.exports.isDedicatedWorkerScope = function (e) {
                        var t = "WorkerGlobalScope" in e && e instanceof e.WorkerGlobalScope,
                            r = "SharedWorkerGlobalScope" in e && e instanceof e.SharedWorkerGlobalScope,
                            n = "ServiceWorkerGlobalScope" in e && e instanceof e.ServiceWorkerGlobalScope;
                        return t && !r && !n
                    }
                }, function (e, t, r) {
                    e.exports = function () {
                        var e = r(0),
                            t = function (e, r, n, i, o) {
                                var a = new self.FileReader;
                                a.onloadend = function () {
                                    if (a.error) return o(a.error);
                                    var s = a.result;
                                    r += a.result.byteLength;
                                    try {
                                        e.append(s)
                                    } catch (e) {
                                        return void o(e)
                                    }
                                    r < i.size ? t(e, r, n, i, o) : o(null, e.end())
                                }, a.readAsArrayBuffer(i.slice(r, r + n))
                            },
                            n = !0;
                        return self.onmessage = function (r) {
                                if (n) {
                                    var i = r.data.data,
                                        o = r.data.file,
                                        a = r.data.id;
                                    if (void 0 !== a && (o || i)) {
                                        var s = r.data.blockSize || 4194304,
                                            u = new e(s);
                                        u.resetState();
                                        var f = function (e, t) {
                                            e ? self.postMessage({
                                                id: a,
                                                error: e.name
                                            }) : self.postMessage({
                                                id: a,
                                                hash: t
                                            })
                                        };
                                        i && function (e, t, r) {
                                            try {
                                                r(null, e.digest(t))
                                            } catch (e) {
                                                return r(e)
                                            }
                                        }(u, i, f), o && t(u, 0, s, o, f)
                                    }
                                }
                            },
                            function () {
                                n = !1
                            }
                    }
                }, function (e, t, r) {
                    var n = r(4),
                        i = r(0),
                        o = r(7),
                        a = r(2),
                        s = r(1).isDedicatedWorkerScope,
                        u = "undefined" != typeof self && s(self);
                    i.disableWorkerBehaviour = u ? a() : function () {}, i.createWorker = function () {
                        var e = n(2),
                            t = e.terminate;
                        return e.terminate = function () {
                            URL.revokeObjectURL(e.objectURL), t.call(e)
                        }, e
                    }, i.createHash = o, e.exports = i
                }, function (e, t, r) {
                    function n(e) {
                        var t = {};

                        function r(n) {
                            if (t[n]) return t[n].exports;
                            var i = t[n] = {
                                i: n,
                                l: !1,
                                exports: {}
                            };
                            return e[n].call(i.exports, i, i.exports, r), i.l = !0, i.exports
                        }
                        r.m = e, r.c = t, r.i = function (e) {
                            return e
                        }, r.d = function (e, t, n) {
                            r.o(e, t) || Object.defineProperty(e, t, {
                                configurable: !1,
                                enumerable: !0,
                                get: n
                            })
                        }, r.r = function (e) {
                            Object.defineProperty(e, "__esModule", {
                                value: !0
                            })
                        }, r.n = function (e) {
                            var t = e && e.__esModule ? function () {
                                return e.default
                            } : function () {
                                return e
                            };
                            return r.d(t, "a", t), t
                        }, r.o = function (e, t) {
                            return Object.prototype.hasOwnProperty.call(e, t)
                        }, r.p = "/", r.oe = function (e) {
                            throw console.error(e), e
                        };
                        var n = r(r.s = ENTRY_MODULE);
                        return n.default || n
                    }
                    var i = "[\\.|\\-|\\+|\\w|/|@]+",
                        o = "\\((/\\*.*?\\*/)?s?.*?(" + i + ").*?\\)";

                    function a(e) {
                        return (e + "").replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&")
                    }

                    function s(e, t, n) {
                        var s = {};
                        s[n] = [];
                        var u = t.toString(),
                            f = u.match(/^function\s?\(\w+,\s*\w+,\s*(\w+)\)/);
                        if (!f) return s;
                        for (var l, c = f[1], h = new RegExp("(\\\\n|\\W)" + a(c) + o, "g"); l = h.exec(u);) "dll-reference" !== l[3] && s[n].push(l[3]);
                        for (h = new RegExp("\\(" + a(c) + '\\("(dll-reference\\s(' + i + '))"\\)\\)' + o, "g"); l = h.exec(u);) e[l[2]] || (s[n].push(l[1]), e[l[2]] = r(l[1]).m), s[l[2]] = s[l[2]] || [], s[l[2]].push(l[4]);
                        return s
                    }

                    function u(e) {
                        return Object.keys(e).reduce(function (t, r) {
                            return t || e[r].length > 0
                        }, !1)
                    }
                    e.exports = function (e, t) {
                        t = t || {};
                        var i = {
                                main: r.m
                            },
                            o = t.all ? {
                                main: Object.keys(i)
                            } : function (e, t) {
                                for (var r = {
                                        main: [t]
                                    }, n = {
                                        main: []
                                    }, i = {
                                        main: {}
                                    }; u(r);)
                                    for (var o = Object.keys(r), a = 0; a < o.length; a++) {
                                        var f = o[a],
                                            l = r[f].pop();
                                        if (i[f] = i[f] || {}, !i[f][l] && e[f][l]) {
                                            i[f][l] = !0, n[f] = n[f] || [], n[f].push(l);
                                            for (var c = s(e, e[f][l], f), h = Object.keys(c), d = 0; d < h.length; d++) r[h[d]] = r[h[d]] || [], r[h[d]] = r[h[d]].concat(c[h[d]])
                                        }
                                    }
                                return n
                            }(i, e),
                            a = "";
                        Object.keys(o).filter(function (e) {
                            return "main" !== e
                        }).forEach(function (e) {
                            for (var t = 0; o[e][t];) t++;
                            o[e].push(t), i[e][t] = "(function(module, exports, __webpack_require__) { module.exports = __webpack_require__; })", a = a + "var " + e + " = (" + n.toString().replace("ENTRY_MODULE", JSON.stringify(t)) + ")({" + o[e].map(function (t) {
                                return JSON.stringify(t) + ": " + i[e][t].toString()
                            }).join(",") + "});\n"
                        }), a = a + "(" + n.toString().replace("ENTRY_MODULE", JSON.stringify(e)) + ")({" + o.main.map(function (e) {
                            return JSON.stringify(e) + ": " + i.main[e].toString()
                        }).join(",") + "})(self);";
                        var f = new window.Blob([a], {
                            type: "text/javascript"
                        });
                        if (t.bare) return f;
                        var l = (window.URL || window.webkitURL || window.mozURL || window.msURL).createObjectURL(f),
                            c = new window.Worker(l);
                        return c.objectURL = l, c
                    }
                }, function (e, t) {
                    e.exports = function (e, t, r) {
                        "use asm";
                        var n = new e.Int32Array(r);

                        function i(e, t) {
                            e = e | 0;
                            t = t | 0;
                            var r = 0,
                                i = 0,
                                o = 0,
                                a = 0,
                                s = 0,
                                u = 0,
                                f = 0,
                                l = 0,
                                c = 0,
                                h = 0,
                                d = 0,
                                p = 0,
                                y = 0,
                                g = 0;
                            o = n[t + 320 >> 2] | 0;
                            s = n[t + 324 >> 2] | 0;
                            f = n[t + 328 >> 2] | 0;
                            c = n[t + 332 >> 2] | 0;
                            d = n[t + 336 >> 2] | 0;
                            for (r = 0;
                                (r | 0) < (e | 0); r = r + 64 | 0) {
                                a = o;
                                u = s;
                                l = f;
                                h = c;
                                p = d;
                                for (i = 0;
                                    (i | 0) < 64; i = i + 4 | 0) {
                                    g = n[r + i >> 2] | 0;
                                    y = ((o << 5 | o >>> 27) + (s & f | ~s & c) | 0) + ((g + d | 0) + 1518500249 | 0) | 0;
                                    d = c;
                                    c = f;
                                    f = s << 30 | s >>> 2;
                                    s = o;
                                    o = y;
                                    n[e + i >> 2] = g
                                }
                                for (i = e + 64 | 0;
                                    (i | 0) < (e + 80 | 0); i = i + 4 | 0) {
                                    g = (n[i - 12 >> 2] ^ n[i - 32 >> 2] ^ n[i - 56 >> 2] ^ n[i - 64 >> 2]) << 1 | (n[i - 12 >> 2] ^ n[i - 32 >> 2] ^ n[i - 56 >> 2] ^ n[i - 64 >> 2]) >>> 31;
                                    y = ((o << 5 | o >>> 27) + (s & f | ~s & c) | 0) + ((g + d | 0) + 1518500249 | 0) | 0;
                                    d = c;
                                    c = f;
                                    f = s << 30 | s >>> 2;
                                    s = o;
                                    o = y;
                                    n[i >> 2] = g
                                }
                                for (i = e + 80 | 0;
                                    (i | 0) < (e + 160 | 0); i = i + 4 | 0) {
                                    g = (n[i - 12 >> 2] ^ n[i - 32 >> 2] ^ n[i - 56 >> 2] ^ n[i - 64 >> 2]) << 1 | (n[i - 12 >> 2] ^ n[i - 32 >> 2] ^ n[i - 56 >> 2] ^ n[i - 64 >> 2]) >>> 31;
                                    y = ((o << 5 | o >>> 27) + (s ^ f ^ c) | 0) + ((g + d | 0) + 1859775393 | 0) | 0;
                                    d = c;
                                    c = f;
                                    f = s << 30 | s >>> 2;
                                    s = o;
                                    o = y;
                                    n[i >> 2] = g
                                }
                                for (i = e + 160 | 0;
                                    (i | 0) < (e + 240 | 0); i = i + 4 | 0) {
                                    g = (n[i - 12 >> 2] ^ n[i - 32 >> 2] ^ n[i - 56 >> 2] ^ n[i - 64 >> 2]) << 1 | (n[i - 12 >> 2] ^ n[i - 32 >> 2] ^ n[i - 56 >> 2] ^ n[i - 64 >> 2]) >>> 31;
                                    y = ((o << 5 | o >>> 27) + (s & f | s & c | f & c) | 0) + ((g + d | 0) - 1894007588 | 0) | 0;
                                    d = c;
                                    c = f;
                                    f = s << 30 | s >>> 2;
                                    s = o;
                                    o = y;
                                    n[i >> 2] = g
                                }
                                for (i = e + 240 | 0;
                                    (i | 0) < (e + 320 | 0); i = i + 4 | 0) {
                                    g = (n[i - 12 >> 2] ^ n[i - 32 >> 2] ^ n[i - 56 >> 2] ^ n[i - 64 >> 2]) << 1 | (n[i - 12 >> 2] ^ n[i - 32 >> 2] ^ n[i - 56 >> 2] ^ n[i - 64 >> 2]) >>> 31;
                                    y = ((o << 5 | o >>> 27) + (s ^ f ^ c) | 0) + ((g + d | 0) - 899497514 | 0) | 0;
                                    d = c;
                                    c = f;
                                    f = s << 30 | s >>> 2;
                                    s = o;
                                    o = y;
                                    n[i >> 2] = g
                                }
                                o = o + a | 0;
                                s = s + u | 0;
                                f = f + l | 0;
                                c = c + h | 0;
                                d = d + p | 0
                            }
                            n[t + 320 >> 2] = o;
                            n[t + 324 >> 2] = s;
                            n[t + 328 >> 2] = f;
                            n[t + 332 >> 2] = c;
                            n[t + 336 >> 2] = d
                        }
                        return {
                            hash: i
                        }
                    }
                }, function (e, t) {
                    var r = this,
                        n = void 0;
                    "undefined" != typeof self && void 0 !== self.FileReaderSync && (n = new self.FileReaderSync);
                    var i = function (e, t, r, n, i, o) {
                        var a = void 0,
                            s = o % 4,
                            u = (i + s) % 4,
                            f = i - u;
                        switch (s) {
                            case 0:
                                t[o] = e[n + 3];
                            case 1:
                                t[o + 1 - (s << 1) | 0] = e[n + 2];
                            case 2:
                                t[o + 2 - (s << 1) | 0] = e[n + 1];
                            case 3:
                                t[o + 3 - (s << 1) | 0] = e[n]
                        }
                        if (!(i < u + (4 - s))) {
                            for (a = 4 - s; a < f; a = a + 4 | 0) r[o + a >> 2 | 0] = e[n + a] << 24 | e[n + a + 1] << 16 | e[n + a + 2] << 8 | e[n + a + 3];
                            switch (u) {
                                case 3:
                                    t[o + f + 1 | 0] = e[n + f + 2];
                                case 2:
                                    t[o + f + 2 | 0] = e[n + f + 1];
                                case 1:
                                    t[o + f + 3 | 0] = e[n + f]
                            }
                        }
                    };
                    e.exports = function (e, t, o, a, s, u) {
                        if ("string" == typeof e) return function (e, t, r, n, i, o) {
                            var a = void 0,
                                s = o % 4,
                                u = (i + s) % 4,
                                f = i - u;
                            switch (s) {
                                case 0:
                                    t[o] = e.charCodeAt(n + 3);
                                case 1:
                                    t[o + 1 - (s << 1) | 0] = e.charCodeAt(n + 2);
                                case 2:
                                    t[o + 2 - (s << 1) | 0] = e.charCodeAt(n + 1);
                                case 3:
                                    t[o + 3 - (s << 1) | 0] = e.charCodeAt(n)
                            }
                            if (!(i < u + (4 - s))) {
                                for (a = 4 - s; a < f; a = a + 4 | 0) r[o + a >> 2] = e.charCodeAt(n + a) << 24 | e.charCodeAt(n + a + 1) << 16 | e.charCodeAt(n + a + 2) << 8 | e.charCodeAt(n + a + 3);
                                switch (u) {
                                    case 3:
                                        t[o + f + 1 | 0] = e.charCodeAt(n + f + 2);
                                    case 2:
                                        t[o + f + 2 | 0] = e.charCodeAt(n + f + 1);
                                    case 1:
                                        t[o + f + 3 | 0] = e.charCodeAt(n + f)
                                }
                            }
                        }(e, t, o, a, s, u);
                        if (e instanceof Array) return i(e, t, o, a, s, u);
                        if (r && r.Buffer && r.Buffer.isBuffer(e)) return i(e, t, o, a, s, u);
                        if (e instanceof ArrayBuffer) return i(new Uint8Array(e), t, o, a, s, u);
                        if (e.buffer instanceof ArrayBuffer) return i(new Uint8Array(e.buffer, e.byteOffset, e.byteLength), t, o, a, s, u);
                        if (e instanceof Blob) return function (e, t, r, i, o, a) {
                            var s = void 0,
                                u = a % 4,
                                f = (o + u) % 4,
                                l = o - f,
                                c = new Uint8Array(n.readAsArrayBuffer(e.slice(i, i + o)));
                            switch (u) {
                                case 0:
                                    t[a] = c[3];
                                case 1:
                                    t[a + 1 - (u << 1) | 0] = c[2];
                                case 2:
                                    t[a + 2 - (u << 1) | 0] = c[1];
                                case 3:
                                    t[a + 3 - (u << 1) | 0] = c[0]
                            }
                            if (!(o < f + (4 - u))) {
                                for (s = 4 - u; s < l; s = s + 4 | 0) r[a + s >> 2 | 0] = c[s] << 24 | c[s + 1] << 16 | c[s + 2] << 8 | c[s + 3];
                                switch (f) {
                                    case 3:
                                        t[a + l + 1 | 0] = c[l + 2];
                                    case 2:
                                        t[a + l + 2 | 0] = c[l + 1];
                                    case 1:
                                        t[a + l + 3 | 0] = c[l]
                                }
                            }
                        }(e, t, o, a, s, u);
                        throw new Error("Unsupported data type.")
                    }
                }, function (e, t, r) {
                    var n = r(0),
                        i = r(1).toHex,
                        o = function () {
                            function e() {
                                ! function (e, t) {
                                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                                }(this, e), this._rusha = new n, this._rusha.resetState()
                            }
                            return e.prototype.update = function (e) {
                                return this._rusha.append(e), this
                            }, e.prototype.digest = function (e) {
                                var t = this._rusha.rawEnd().buffer;
                                if (!e) return t;
                                if ("hex" === e) return i(t);
                                throw new Error("unsupported digest encoding")
                            }, e
                        }();
                    e.exports = function () {
                        return new o
                    }
                }])
            }, "object" == typeof r && "object" == typeof t ? t.exports = i() : "object" == typeof r ? r.Rusha = i() : n.Rusha = i()
        }, {}],
        39: [function (e, t, r) {
            var n = e("buffer"),
                i = n.Buffer;

            function o(e, t) {
                for (var r in e) t[r] = e[r]
            }

            function a(e, t, r) {
                return i(e, t, r)
            }
            i.from && i.alloc && i.allocUnsafe && i.allocUnsafeSlow ? t.exports = n : (o(n, r), r.Buffer = a), a.prototype = Object.create(i.prototype), o(i, a), a.from = function (e, t, r) {
                if ("number" == typeof e) throw new TypeError("Argument must not be a number");
                return i(e, t, r)
            }, a.alloc = function (e, t, r) {
                if ("number" != typeof e) throw new TypeError("Argument must be a number");
                var n = i(e);
                return void 0 !== t ? "string" == typeof r ? n.fill(t, r) : n.fill(t) : n.fill(0), n
            }, a.allocUnsafe = function (e) {
                if ("number" != typeof e) throw new TypeError("Argument must be a number");
                return i(e)
            }, a.allocUnsafeSlow = function (e) {
                if ("number" != typeof e) throw new TypeError("Argument must be a number");
                return n.SlowBuffer(e)
            }
        }, {
            buffer: 4
        }],
        40: [function (e, t, r) {
            var n = e("rusha"),
                i = e("./rusha-worker-sha1"),
                o = new n,
                a = "undefined" != typeof window ? window : self,
                s = a.crypto || a.msCrypto || {},
                u = s.subtle || s.webkitSubtle;

            function f(e) {
                return o.digest(e)
            }
            try {
                u.digest({
                    name: "sha-1"
                }, new Uint8Array).catch(function () {
                    u = !1
                })
            } catch (e) {
                u = !1
            }
            t.exports = function (e, t) {
                u ? ("string" == typeof e && (e = function (e) {
                    for (var t = e.length, r = new Uint8Array(t), n = 0; n < t; n++) r[n] = e.charCodeAt(n);
                    return r
                }(e)), u.digest({
                    name: "sha-1"
                }, e).then(function (e) {
                    t(function (e) {
                        for (var t = e.length, r = [], n = 0; n < t; n++) {
                            var i = e[n];
                            r.push((i >>> 4).toString(16)), r.push((15 & i).toString(16))
                        }
                        return r.join("")
                    }(new Uint8Array(e)))
                }, function () {
                    t(f(e))
                })) : "undefined" != typeof window ? i(e, function (r, n) {
                    t(r ? f(e) : n)
                }) : queueMicrotask(() => t(f(e)))
            }, t.exports.sync = f
        }, {
            "./rusha-worker-sha1": 41,
            rusha: 38
        }],
        41: [function (e, t, r) {
            var n, i, o, a = e("rusha");
            t.exports = function (e, t) {
                n || (n = a.createWorker(), i = 1, o = {}, n.onmessage = function (e) {
                    var t = e.data.id,
                        r = o[t];
                    delete o[t], null != e.data.error ? r(new Error("Rusha worker error: " + e.data.error)) : r(null, e.data.hash)
                }), o[i] = t, n.postMessage({
                    id: i,
                    data: e
                }), i += 1
            }
        }, {
            rusha: 38
        }],
        42: [function (e, t, r) {
            "use strict";
            var n = e("safe-buffer").Buffer,
                i = n.isEncoding || function (e) {
                    switch ((e = "" + e) && e.toLowerCase()) {
                        case "hex":
                        case "utf8":
                        case "utf-8":
                        case "ascii":
                        case "binary":
                        case "base64":
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                        case "raw":
                            return !0;
                        default:
                            return !1
                    }
                };

            function o(e) {
                var t;
                switch (this.encoding = function (e) {
                    var t = function (e) {
                        if (!e) return "utf8";
                        for (var t;;) switch (e) {
                            case "utf8":
                            case "utf-8":
                                return "utf8";
                            case "ucs2":
                            case "ucs-2":
                            case "utf16le":
                            case "utf-16le":
                                return "utf16le";
                            case "latin1":
                            case "binary":
                                return "latin1";
                            case "base64":
                            case "ascii":
                            case "hex":
                                return e;
                            default:
                                if (t) return;
                                e = ("" + e).toLowerCase(), t = !0
                        }
                    }(e);
                    if ("string" != typeof t && (n.isEncoding === i || !i(e))) throw new Error("Unknown encoding: " + e);
                    return t || e
                }(e), this.encoding) {
                    case "utf16le":
                        this.text = u, this.end = f, t = 4;
                        break;
                    case "utf8":
                        this.fillLast = s, t = 4;
                        break;
                    case "base64":
                        this.text = l, this.end = c, t = 3;
                        break;
                    default:
                        return this.write = h, void(this.end = d)
                }
                this.lastNeed = 0, this.lastTotal = 0, this.lastChar = n.allocUnsafe(t)
            }

            function a(e) {
                return e <= 127 ? 0 : e >> 5 == 6 ? 2 : e >> 4 == 14 ? 3 : e >> 3 == 30 ? 4 : e >> 6 == 2 ? -1 : -2
            }

            function s(e) {
                var t = this.lastTotal - this.lastNeed,
                    r = function (e, t, r) {
                        if (128 != (192 & t[0])) return e.lastNeed = 0, "�";
                        if (e.lastNeed > 1 && t.length > 1) {
                            if (128 != (192 & t[1])) return e.lastNeed = 1, "�";
                            if (e.lastNeed > 2 && t.length > 2 && 128 != (192 & t[2])) return e.lastNeed = 2, "�"
                        }
                    }(this, e);
                return void 0 !== r ? r : this.lastNeed <= e.length ? (e.copy(this.lastChar, t, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal)) : (e.copy(this.lastChar, t, 0, e.length), void(this.lastNeed -= e.length))
            }

            function u(e, t) {
                if ((e.length - t) % 2 == 0) {
                    var r = e.toString("utf16le", t);
                    if (r) {
                        var n = r.charCodeAt(r.length - 1);
                        if (n >= 55296 && n <= 56319) return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = e[e.length - 2], this.lastChar[1] = e[e.length - 1], r.slice(0, -1)
                    }
                    return r
                }
                return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = e[e.length - 1], e.toString("utf16le", t, e.length - 1)
            }

            function f(e) {
                var t = e && e.length ? this.write(e) : "";
                if (this.lastNeed) {
                    var r = this.lastTotal - this.lastNeed;
                    return t + this.lastChar.toString("utf16le", 0, r)
                }
                return t
            }

            function l(e, t) {
                var r = (e.length - t) % 3;
                return 0 === r ? e.toString("base64", t) : (this.lastNeed = 3 - r, this.lastTotal = 3, 1 === r ? this.lastChar[0] = e[e.length - 1] : (this.lastChar[0] = e[e.length - 2], this.lastChar[1] = e[e.length - 1]), e.toString("base64", t, e.length - r))
            }

            function c(e) {
                var t = e && e.length ? this.write(e) : "";
                return this.lastNeed ? t + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : t
            }

            function h(e) {
                return e.toString(this.encoding)
            }

            function d(e) {
                return e && e.length ? this.write(e) : ""
            }
            r.StringDecoder = o, o.prototype.write = function (e) {
                if (0 === e.length) return "";
                var t, r;
                if (this.lastNeed) {
                    if (void 0 === (t = this.fillLast(e))) return "";
                    r = this.lastNeed, this.lastNeed = 0
                } else r = 0;
                return r < e.length ? t ? t + this.text(e, r) : this.text(e, r) : t || ""
            }, o.prototype.end = function (e) {
                var t = e && e.length ? this.write(e) : "";
                return this.lastNeed ? t + "�" : t
            }, o.prototype.text = function (e, t) {
                var r = function (e, t, r) {
                    var n = t.length - 1;
                    if (n < r) return 0;
                    var i = a(t[n]);
                    if (i >= 0) return i > 0 && (e.lastNeed = i - 1), i;
                    if (--n < r || -2 === i) return 0;
                    if ((i = a(t[n])) >= 0) return i > 0 && (e.lastNeed = i - 2), i;
                    if (--n < r || -2 === i) return 0;
                    if ((i = a(t[n])) >= 0) return i > 0 && (2 === i ? i = 0 : e.lastNeed = i - 3), i;
                    return 0
                }(this, e, t);
                if (!this.lastNeed) return e.toString("utf8", t);
                this.lastTotal = r;
                var n = e.length - (r - this.lastNeed);
                return e.copy(this.lastChar, 0, n), e.toString("utf8", t, n)
            }, o.prototype.fillLast = function (e) {
                if (this.lastNeed <= e.length) return e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
                e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, e.length), this.lastNeed -= e.length
            }
        }, {
            "safe-buffer": 39
        }],
        43: [function (e, t, r) {
            (function (r) {
                var n = e("is-typedarray").strict;
                t.exports = function (e) {
                    if (n(e)) {
                        var t = r.from(e.buffer);
                        return e.byteLength !== e.buffer.byteLength && (t = t.slice(e.byteOffset, e.byteOffset + e.byteLength)), t
                    }
                    return r.from(e)
                }
            }).call(this, e("buffer").Buffer)
        }, {
            buffer: 4,
            "is-typedarray": 17
        }],
        44: [function (e, t, r) {
            (function (e) {
                function r(t) {
                    try {
                        if (!e.localStorage) return !1
                    } catch (e) {
                        return !1
                    }
                    var r = e.localStorage[t];
                    return null != r && "true" === String(r).toLowerCase()
                }
                t.exports = function (e, t) {
                    if (r("noDeprecation")) return e;
                    var n = !1;
                    return function () {
                        if (!n) {
                            if (r("throwDeprecation")) throw new Error(t);
                            r("traceDeprecation") ? console.trace(t) : console.warn(t), n = !0
                        }
                        return e.apply(this, arguments)
                    }
                }
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {}],
        45: [function (e, t, r) {
            t.exports = function e(t, r) {
                if (t && r) return e(t)(r);
                if ("function" != typeof t) throw new TypeError("need wrapper function");
                Object.keys(t).forEach(function (e) {
                    n[e] = t[e]
                });
                return n;

                function n() {
                    for (var e = new Array(arguments.length), r = 0; r < e.length; r++) e[r] = arguments[r];
                    var n = t.apply(this, e),
                        i = e[e.length - 1];
                    return "function" == typeof n && n !== i && Object.keys(i).forEach(function (e) {
                        n[e] = i[e]
                    }), n
                }
            }
        }, {}]
    }, {}, [9])(9)
});