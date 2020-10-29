! function (e) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
    else if ("function" == typeof define && define.amd) define([], e);
    else {
        ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).simplePeer = e()
    }
}(function () {
    return function () {
        return function e(t, r, n) {
            function i(s, a) {
                if (!r[s]) {
                    if (!t[s]) {
                        var u = "function" == typeof require && require;
                        if (!a && u) return u(s, !0);
                        if (o) return o(s, !0);
                        var l = new Error("Cannot find module '" + s + "'");
                        throw l.code = "MODULE_NOT_FOUND", l
                    }
                    var h = r[s] = {
                        exports: {}
                    };
                    t[s][0].call(h.exports, function (e) {
                        return i(t[s][1][e] || e)
                    }, h, h.exports, e, t, r, n)
                }
                return r[s].exports
            }
            for (var o = "function" == typeof require && require, s = 0; s < n.length; s++) i(n[s]);
            return i
        }
    }()({
        1: [function (e, t, r) {
            "use strict";
            r.byteLength = function (e) {
                var t = l(e),
                    r = t[0],
                    n = t[1];
                return 3 * (r + n) / 4 - n
            }, r.toByteArray = function (e) {
                var t, r, n = l(e),
                    s = n[0],
                    a = n[1],
                    u = new o(function (e, t, r) {
                        return 3 * (t + r) / 4 - r
                    }(0, s, a)),
                    h = 0,
                    c = a > 0 ? s - 4 : s;
                for (r = 0; r < c; r += 4) t = i[e.charCodeAt(r)] << 18 | i[e.charCodeAt(r + 1)] << 12 | i[e.charCodeAt(r + 2)] << 6 | i[e.charCodeAt(r + 3)], u[h++] = t >> 16 & 255, u[h++] = t >> 8 & 255, u[h++] = 255 & t;
                2 === a && (t = i[e.charCodeAt(r)] << 2 | i[e.charCodeAt(r + 1)] >> 4, u[h++] = 255 & t);
                1 === a && (t = i[e.charCodeAt(r)] << 10 | i[e.charCodeAt(r + 1)] << 4 | i[e.charCodeAt(r + 2)] >> 2, u[h++] = t >> 8 & 255, u[h++] = 255 & t);
                return u
            }, r.fromByteArray = function (e) {
                for (var t, r = e.length, i = r % 3, o = [], s = 0, a = r - i; s < a; s += 16383) o.push(h(e, s, s + 16383 > a ? a : s + 16383));
                1 === i ? (t = e[r - 1], o.push(n[t >> 2] + n[t << 4 & 63] + "==")) : 2 === i && (t = (e[r - 2] << 8) + e[r - 1], o.push(n[t >> 10] + n[t >> 4 & 63] + n[t << 2 & 63] + "="));
                return o.join("")
            };
            for (var n = [], i = [], o = "undefined" != typeof Uint8Array ? Uint8Array : Array, s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", a = 0, u = s.length; a < u; ++a) n[a] = s[a], i[s.charCodeAt(a)] = a;

            function l(e) {
                var t = e.length;
                if (t % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
                var r = e.indexOf("=");
                return -1 === r && (r = t), [r, r === t ? 0 : 4 - r % 4]
            }

            function h(e, t, r) {
                for (var i, o, s = [], a = t; a < r; a += 3) i = (e[a] << 16 & 16711680) + (e[a + 1] << 8 & 65280) + (255 & e[a + 2]), s.push(n[(o = i) >> 18 & 63] + n[o >> 12 & 63] + n[o >> 6 & 63] + n[63 & o]);
                return s.join("")
            }
            i["-".charCodeAt(0)] = 62, i["_".charCodeAt(0)] = 63
        }, {}],
        2: [function (e, t, r) {}, {}],
        3: [function (e, t, r) {
            (function (t) {
                "use strict";
                var n = e("base64-js"),
                    i = e("ieee754");
                r.Buffer = t, r.SlowBuffer = function (e) {
                    +e != e && (e = 0);
                    return t.alloc(+e)
                }, r.INSPECT_MAX_BYTES = 50;
                var o = 2147483647;

                function s(e) {
                    if (e > o) throw new RangeError('The value "' + e + '" is invalid for option "size"');
                    var r = new Uint8Array(e);
                    return r.__proto__ = t.prototype, r
                }

                function t(e, t, r) {
                    if ("number" == typeof e) {
                        if ("string" == typeof t) throw new TypeError('The "string" argument must be of type string. Received type number');
                        return l(e)
                    }
                    return a(e, t, r)
                }

                function a(e, r, n) {
                    if ("string" == typeof e) return function (e, r) {
                        "string" == typeof r && "" !== r || (r = "utf8");
                        if (!t.isEncoding(r)) throw new TypeError("Unknown encoding: " + r);
                        var n = 0 | f(e, r),
                            i = s(n),
                            o = i.write(e, r);
                        o !== n && (i = i.slice(0, o));
                        return i
                    }(e, r);
                    if (ArrayBuffer.isView(e)) return h(e);
                    if (null == e) throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e);
                    if (B(e, ArrayBuffer) || e && B(e.buffer, ArrayBuffer)) return function (e, r, n) {
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
                                n = s(r);
                            return 0 === n.length ? n : (e.copy(n, 0, 0, r), n)
                        }
                        if (void 0 !== e.length) return "number" != typeof e.length || U(e.length) ? s(0) : h(e);
                        if ("Buffer" === e.type && Array.isArray(e.data)) return h(e.data)
                    }(e);
                    if (o) return o;
                    if ("undefined" != typeof Symbol && null != Symbol.toPrimitive && "function" == typeof e[Symbol.toPrimitive]) return t.from(e[Symbol.toPrimitive]("string"), r, n);
                    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e)
                }

                function u(e) {
                    if ("number" != typeof e) throw new TypeError('"size" argument must be of type number');
                    if (e < 0) throw new RangeError('The value "' + e + '" is invalid for option "size"')
                }

                function l(e) {
                    return u(e), s(e < 0 ? 0 : 0 | c(e))
                }

                function h(e) {
                    for (var t = e.length < 0 ? 0 : 0 | c(e.length), r = s(t), n = 0; n < t; n += 1) r[n] = 255 & e[n];
                    return r
                }

                function c(e) {
                    if (e >= o) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + o.toString(16) + " bytes");
                    return 0 | e
                }

                function f(e, r) {
                    if (t.isBuffer(e)) return e.length;
                    if (ArrayBuffer.isView(e) || B(e, ArrayBuffer)) return e.byteLength;
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
                            return D(e).length;
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return 2 * n;
                        case "hex":
                            return n >>> 1;
                        case "base64":
                            return F(e).length;
                        default:
                            if (o) return i ? -1 : D(e).length;
                            r = ("" + r).toLowerCase(), o = !0
                    }
                }

                function d(e, t, r) {
                    var n = e[t];
                    e[t] = e[r], e[r] = n
                }

                function p(e, r, n, i, o) {
                    if (0 === e.length) return -1;
                    if ("string" == typeof n ? (i = n, n = 0) : n > 2147483647 ? n = 2147483647 : n < -2147483648 && (n = -2147483648), U(n = +n) && (n = o ? 0 : e.length - 1), n < 0 && (n = e.length + n), n >= e.length) {
                        if (o) return -1;
                        n = e.length - 1
                    } else if (n < 0) {
                        if (!o) return -1;
                        n = 0
                    }
                    if ("string" == typeof r && (r = t.from(r, i)), t.isBuffer(r)) return 0 === r.length ? -1 : g(e, r, n, i, o);
                    if ("number" == typeof r) return r &= 255, "function" == typeof Uint8Array.prototype.indexOf ? o ? Uint8Array.prototype.indexOf.call(e, r, n) : Uint8Array.prototype.lastIndexOf.call(e, r, n) : g(e, [r], n, i, o);
                    throw new TypeError("val must be string, number or Buffer")
                }

                function g(e, t, r, n, i) {
                    var o, s = 1,
                        a = e.length,
                        u = t.length;
                    if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
                        if (e.length < 2 || t.length < 2) return -1;
                        s = 2, a /= 2, u /= 2, r /= 2
                    }

                    function l(e, t) {
                        return 1 === s ? e[t] : e.readUInt16BE(t * s)
                    }
                    if (i) {
                        var h = -1;
                        for (o = r; o < a; o++)
                            if (l(e, o) === l(t, -1 === h ? 0 : o - h)) {
                                if (-1 === h && (h = o), o - h + 1 === u) return h * s
                            } else -1 !== h && (o -= o - h), h = -1
                    } else
                        for (r + u > a && (r = a - u), o = r; o >= 0; o--) {
                            for (var c = !0, f = 0; f < u; f++)
                                if (l(e, o + f) !== l(t, f)) {
                                    c = !1;
                                    break
                                } if (c) return o
                        }
                    return -1
                }

                function y(e, t, r, n) {
                    r = Number(r) || 0;
                    var i = e.length - r;
                    n ? (n = Number(n)) > i && (n = i) : n = i;
                    var o = t.length;
                    n > o / 2 && (n = o / 2);
                    for (var s = 0; s < n; ++s) {
                        var a = parseInt(t.substr(2 * s, 2), 16);
                        if (U(a)) return s;
                        e[r + s] = a
                    }
                    return s
                }

                function b(e, t, r, n) {
                    return j(D(t, e.length - r), e, r, n)
                }

                function _(e, t, r, n) {
                    return j(function (e) {
                        for (var t = [], r = 0; r < e.length; ++r) t.push(255 & e.charCodeAt(r));
                        return t
                    }(t), e, r, n)
                }

                function m(e, t, r, n) {
                    return _(e, t, r, n)
                }

                function w(e, t, r, n) {
                    return j(F(t), e, r, n)
                }

                function v(e, t, r, n) {
                    return j(function (e, t) {
                        for (var r, n, i, o = [], s = 0; s < e.length && !((t -= 2) < 0); ++s) r = e.charCodeAt(s), n = r >> 8, i = r % 256, o.push(i), o.push(n);
                        return o
                    }(t, e.length - r), e, r, n)
                }

                function E(e, t, r) {
                    return 0 === t && r === e.length ? n.fromByteArray(e) : n.fromByteArray(e.slice(t, r))
                }

                function C(e, t, r) {
                    r = Math.min(e.length, r);
                    for (var n = [], i = t; i < r;) {
                        var o, s, a, u, l = e[i],
                            h = null,
                            c = l > 239 ? 4 : l > 223 ? 3 : l > 191 ? 2 : 1;
                        if (i + c <= r) switch (c) {
                            case 1:
                                l < 128 && (h = l);
                                break;
                            case 2:
                                128 == (192 & (o = e[i + 1])) && (u = (31 & l) << 6 | 63 & o) > 127 && (h = u);
                                break;
                            case 3:
                                o = e[i + 1], s = e[i + 2], 128 == (192 & o) && 128 == (192 & s) && (u = (15 & l) << 12 | (63 & o) << 6 | 63 & s) > 2047 && (u < 55296 || u > 57343) && (h = u);
                                break;
                            case 4:
                                o = e[i + 1], s = e[i + 2], a = e[i + 3], 128 == (192 & o) && 128 == (192 & s) && 128 == (192 & a) && (u = (15 & l) << 18 | (63 & o) << 12 | (63 & s) << 6 | 63 & a) > 65535 && u < 1114112 && (h = u)
                        }
                        null === h ? (h = 65533, c = 1) : h > 65535 && (h -= 65536, n.push(h >>> 10 & 1023 | 55296), h = 56320 | 1023 & h), n.push(h), i += c
                    }
                    return function (e) {
                        var t = e.length;
                        if (t <= R) return String.fromCharCode.apply(String, e);
                        var r = "",
                            n = 0;
                        for (; n < t;) r += String.fromCharCode.apply(String, e.slice(n, n += R));
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
                    return a(e, t, r)
                }, t.prototype.__proto__ = Uint8Array.prototype, t.__proto__ = Uint8Array, t.alloc = function (e, t, r) {
                    return function (e, t, r) {
                        return u(e), e <= 0 ? s(e) : void 0 !== t ? "string" == typeof r ? s(e).fill(t, r) : s(e).fill(t) : s(e)
                    }(e, t, r)
                }, t.allocUnsafe = function (e) {
                    return l(e)
                }, t.allocUnsafeSlow = function (e) {
                    return l(e)
                }, t.isBuffer = function (e) {
                    return null != e && !0 === e._isBuffer && e !== t.prototype
                }, t.compare = function (e, r) {
                    if (B(e, Uint8Array) && (e = t.from(e, e.offset, e.byteLength)), B(r, Uint8Array) && (r = t.from(r, r.offset, r.byteLength)), !t.isBuffer(e) || !t.isBuffer(r)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
                    if (e === r) return 0;
                    for (var n = e.length, i = r.length, o = 0, s = Math.min(n, i); o < s; ++o)
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
                        var s = e[n];
                        if (B(s, Uint8Array) && (s = t.from(s)), !t.isBuffer(s)) throw new TypeError('"list" argument must be an Array of Buffers');
                        s.copy(i, o), o += s.length
                    }
                    return i
                }, t.byteLength = f, t.prototype._isBuffer = !0, t.prototype.swap16 = function () {
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
                    return 0 === e ? "" : 0 === arguments.length ? C(this, 0, e) : function (e, t, r) {
                        var n = !1;
                        if ((void 0 === t || t < 0) && (t = 0), t > this.length) return "";
                        if ((void 0 === r || r > this.length) && (r = this.length), r <= 0) return "";
                        if ((r >>>= 0) <= (t >>>= 0)) return "";
                        for (e || (e = "utf8");;) switch (e) {
                            case "hex":
                                return A(this, t, r);
                            case "utf8":
                            case "utf-8":
                                return C(this, t, r);
                            case "ascii":
                                return S(this, t, r);
                            case "latin1":
                            case "binary":
                                return T(this, t, r);
                            case "base64":
                                return E(this, t, r);
                            case "ucs2":
                            case "ucs-2":
                            case "utf16le":
                            case "utf-16le":
                                return k(this, t, r);
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
                    if (B(e, Uint8Array) && (e = t.from(e, e.offset, e.byteLength)), !t.isBuffer(e)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof e);
                    if (void 0 === r && (r = 0), void 0 === n && (n = e ? e.length : 0), void 0 === i && (i = 0), void 0 === o && (o = this.length), r < 0 || n > e.length || i < 0 || o > this.length) throw new RangeError("out of range index");
                    if (i >= o && r >= n) return 0;
                    if (i >= o) return -1;
                    if (r >= n) return 1;
                    if (this === e) return 0;
                    for (var s = (o >>>= 0) - (i >>>= 0), a = (n >>>= 0) - (r >>>= 0), u = Math.min(s, a), l = this.slice(i, o), h = e.slice(r, n), c = 0; c < u; ++c)
                        if (l[c] !== h[c]) {
                            s = l[c], a = h[c];
                            break
                        } return s < a ? -1 : a < s ? 1 : 0
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
                            return y(this, e, t, r);
                        case "utf8":
                        case "utf-8":
                            return b(this, e, t, r);
                        case "ascii":
                            return _(this, e, t, r);
                        case "latin1":
                        case "binary":
                            return m(this, e, t, r);
                        case "base64":
                            return w(this, e, t, r);
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return v(this, e, t, r);
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
                var R = 4096;

                function S(e, t, r) {
                    var n = "";
                    r = Math.min(e.length, r);
                    for (var i = t; i < r; ++i) n += String.fromCharCode(127 & e[i]);
                    return n
                }

                function T(e, t, r) {
                    var n = "";
                    r = Math.min(e.length, r);
                    for (var i = t; i < r; ++i) n += String.fromCharCode(e[i]);
                    return n
                }

                function A(e, t, r) {
                    var n = e.length;
                    (!t || t < 0) && (t = 0), (!r || r < 0 || r > n) && (r = n);
                    for (var i = "", o = t; o < r; ++o) i += P(e[o]);
                    return i
                }

                function k(e, t, r) {
                    for (var n = e.slice(t, r), i = "", o = 0; o < n.length; o += 2) i += String.fromCharCode(n[o] + 256 * n[o + 1]);
                    return i
                }

                function L(e, t, r) {
                    if (e % 1 != 0 || e < 0) throw new RangeError("offset is not uint");
                    if (e + t > r) throw new RangeError("Trying to access beyond buffer length")
                }

                function N(e, r, n, i, o, s) {
                    if (!t.isBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance');
                    if (r > o || r < s) throw new RangeError('"value" argument is out of bounds');
                    if (n + i > e.length) throw new RangeError("Index out of range")
                }

                function O(e, t, r, n, i, o) {
                    if (r + n > e.length) throw new RangeError("Index out of range");
                    if (r < 0) throw new RangeError("Index out of range")
                }

                function x(e, t, r, n, o) {
                    return t = +t, r >>>= 0, o || O(e, 0, r, 4), i.write(e, t, r, n, 23, 4), r + 4
                }

                function M(e, t, r, n, o) {
                    return t = +t, r >>>= 0, o || O(e, 0, r, 8), i.write(e, t, r, n, 52, 8), r + 8
                }
                t.prototype.slice = function (e, r) {
                    var n = this.length;
                    (e = ~~e) < 0 ? (e += n) < 0 && (e = 0) : e > n && (e = n), (r = void 0 === r ? n : ~~r) < 0 ? (r += n) < 0 && (r = 0) : r > n && (r = n), r < e && (r = e);
                    var i = this.subarray(e, r);
                    return i.__proto__ = t.prototype, i
                }, t.prototype.readUIntLE = function (e, t, r) {
                    e >>>= 0, t >>>= 0, r || L(e, t, this.length);
                    for (var n = this[e], i = 1, o = 0; ++o < t && (i *= 256);) n += this[e + o] * i;
                    return n
                }, t.prototype.readUIntBE = function (e, t, r) {
                    e >>>= 0, t >>>= 0, r || L(e, t, this.length);
                    for (var n = this[e + --t], i = 1; t > 0 && (i *= 256);) n += this[e + --t] * i;
                    return n
                }, t.prototype.readUInt8 = function (e, t) {
                    return e >>>= 0, t || L(e, 1, this.length), this[e]
                }, t.prototype.readUInt16LE = function (e, t) {
                    return e >>>= 0, t || L(e, 2, this.length), this[e] | this[e + 1] << 8
                }, t.prototype.readUInt16BE = function (e, t) {
                    return e >>>= 0, t || L(e, 2, this.length), this[e] << 8 | this[e + 1]
                }, t.prototype.readUInt32LE = function (e, t) {
                    return e >>>= 0, t || L(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3]
                }, t.prototype.readUInt32BE = function (e, t) {
                    return e >>>= 0, t || L(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
                }, t.prototype.readIntLE = function (e, t, r) {
                    e >>>= 0, t >>>= 0, r || L(e, t, this.length);
                    for (var n = this[e], i = 1, o = 0; ++o < t && (i *= 256);) n += this[e + o] * i;
                    return n >= (i *= 128) && (n -= Math.pow(2, 8 * t)), n
                }, t.prototype.readIntBE = function (e, t, r) {
                    e >>>= 0, t >>>= 0, r || L(e, t, this.length);
                    for (var n = t, i = 1, o = this[e + --n]; n > 0 && (i *= 256);) o += this[e + --n] * i;
                    return o >= (i *= 128) && (o -= Math.pow(2, 8 * t)), o
                }, t.prototype.readInt8 = function (e, t) {
                    return e >>>= 0, t || L(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
                }, t.prototype.readInt16LE = function (e, t) {
                    e >>>= 0, t || L(e, 2, this.length);
                    var r = this[e] | this[e + 1] << 8;
                    return 32768 & r ? 4294901760 | r : r
                }, t.prototype.readInt16BE = function (e, t) {
                    e >>>= 0, t || L(e, 2, this.length);
                    var r = this[e + 1] | this[e] << 8;
                    return 32768 & r ? 4294901760 | r : r
                }, t.prototype.readInt32LE = function (e, t) {
                    return e >>>= 0, t || L(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
                }, t.prototype.readInt32BE = function (e, t) {
                    return e >>>= 0, t || L(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
                }, t.prototype.readFloatLE = function (e, t) {
                    return e >>>= 0, t || L(e, 4, this.length), i.read(this, e, !0, 23, 4)
                }, t.prototype.readFloatBE = function (e, t) {
                    return e >>>= 0, t || L(e, 4, this.length), i.read(this, e, !1, 23, 4)
                }, t.prototype.readDoubleLE = function (e, t) {
                    return e >>>= 0, t || L(e, 8, this.length), i.read(this, e, !0, 52, 8)
                }, t.prototype.readDoubleBE = function (e, t) {
                    return e >>>= 0, t || L(e, 8, this.length), i.read(this, e, !1, 52, 8)
                }, t.prototype.writeUIntLE = function (e, t, r, n) {
                    (e = +e, t >>>= 0, r >>>= 0, n) || N(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
                    var i = 1,
                        o = 0;
                    for (this[t] = 255 & e; ++o < r && (i *= 256);) this[t + o] = e / i & 255;
                    return t + r
                }, t.prototype.writeUIntBE = function (e, t, r, n) {
                    (e = +e, t >>>= 0, r >>>= 0, n) || N(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
                    var i = r - 1,
                        o = 1;
                    for (this[t + i] = 255 & e; --i >= 0 && (o *= 256);) this[t + i] = e / o & 255;
                    return t + r
                }, t.prototype.writeUInt8 = function (e, t, r) {
                    return e = +e, t >>>= 0, r || N(this, e, t, 1, 255, 0), this[t] = 255 & e, t + 1
                }, t.prototype.writeUInt16LE = function (e, t, r) {
                    return e = +e, t >>>= 0, r || N(this, e, t, 2, 65535, 0), this[t] = 255 & e, this[t + 1] = e >>> 8, t + 2
                }, t.prototype.writeUInt16BE = function (e, t, r) {
                    return e = +e, t >>>= 0, r || N(this, e, t, 2, 65535, 0), this[t] = e >>> 8, this[t + 1] = 255 & e, t + 2
                }, t.prototype.writeUInt32LE = function (e, t, r) {
                    return e = +e, t >>>= 0, r || N(this, e, t, 4, 4294967295, 0), this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = 255 & e, t + 4
                }, t.prototype.writeUInt32BE = function (e, t, r) {
                    return e = +e, t >>>= 0, r || N(this, e, t, 4, 4294967295, 0), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e, t + 4
                }, t.prototype.writeIntLE = function (e, t, r, n) {
                    if (e = +e, t >>>= 0, !n) {
                        var i = Math.pow(2, 8 * r - 1);
                        N(this, e, t, r, i - 1, -i)
                    }
                    var o = 0,
                        s = 1,
                        a = 0;
                    for (this[t] = 255 & e; ++o < r && (s *= 256);) e < 0 && 0 === a && 0 !== this[t + o - 1] && (a = 1), this[t + o] = (e / s >> 0) - a & 255;
                    return t + r
                }, t.prototype.writeIntBE = function (e, t, r, n) {
                    if (e = +e, t >>>= 0, !n) {
                        var i = Math.pow(2, 8 * r - 1);
                        N(this, e, t, r, i - 1, -i)
                    }
                    var o = r - 1,
                        s = 1,
                        a = 0;
                    for (this[t + o] = 255 & e; --o >= 0 && (s *= 256);) e < 0 && 0 === a && 0 !== this[t + o + 1] && (a = 1), this[t + o] = (e / s >> 0) - a & 255;
                    return t + r
                }, t.prototype.writeInt8 = function (e, t, r) {
                    return e = +e, t >>>= 0, r || N(this, e, t, 1, 127, -128), e < 0 && (e = 255 + e + 1), this[t] = 255 & e, t + 1
                }, t.prototype.writeInt16LE = function (e, t, r) {
                    return e = +e, t >>>= 0, r || N(this, e, t, 2, 32767, -32768), this[t] = 255 & e, this[t + 1] = e >>> 8, t + 2
                }, t.prototype.writeInt16BE = function (e, t, r) {
                    return e = +e, t >>>= 0, r || N(this, e, t, 2, 32767, -32768), this[t] = e >>> 8, this[t + 1] = 255 & e, t + 2
                }, t.prototype.writeInt32LE = function (e, t, r) {
                    return e = +e, t >>>= 0, r || N(this, e, t, 4, 2147483647, -2147483648), this[t] = 255 & e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24, t + 4
                }, t.prototype.writeInt32BE = function (e, t, r) {
                    return e = +e, t >>>= 0, r || N(this, e, t, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e, t + 4
                }, t.prototype.writeFloatLE = function (e, t, r) {
                    return x(this, e, t, !0, r)
                }, t.prototype.writeFloatBE = function (e, t, r) {
                    return x(this, e, t, !1, r)
                }, t.prototype.writeDoubleLE = function (e, t, r) {
                    return M(this, e, t, !0, r)
                }, t.prototype.writeDoubleBE = function (e, t, r) {
                    return M(this, e, t, !1, r)
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
                        for (var s = o - 1; s >= 0; --s) e[s + r] = this[s + n];
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
                    var s;
                    if (r >>>= 0, n = void 0 === n ? this.length : n >>> 0, e || (e = 0), "number" == typeof e)
                        for (s = r; s < n; ++s) this[s] = e;
                    else {
                        var a = t.isBuffer(e) ? e : t.from(e, i),
                            u = a.length;
                        if (0 === u) throw new TypeError('The value "' + e + '" is invalid for argument "value"');
                        for (s = 0; s < n - r; ++s) this[s + r] = a[s % u]
                    }
                    return this
                };
                var I = /[^+\/0-9A-Za-z-_]/g;

                function P(e) {
                    return e < 16 ? "0" + e.toString(16) : e.toString(16)
                }

                function D(e, t) {
                    var r;
                    t = t || 1 / 0;
                    for (var n = e.length, i = null, o = [], s = 0; s < n; ++s) {
                        if ((r = e.charCodeAt(s)) > 55295 && r < 57344) {
                            if (!i) {
                                if (r > 56319) {
                                    (t -= 3) > -1 && o.push(239, 191, 189);
                                    continue
                                }
                                if (s + 1 === n) {
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

                function F(e) {
                    return n.toByteArray(function (e) {
                        if ((e = (e = e.split("=")[0]).trim().replace(I, "")).length < 2) return "";
                        for (; e.length % 4 != 0;) e += "=";
                        return e
                    }(e))
                }

                function j(e, t, r, n) {
                    for (var i = 0; i < n && !(i + r >= t.length || i >= e.length); ++i) t[i + r] = e[i];
                    return i
                }

                function B(e, t) {
                    return e instanceof t || null != e && null != e.constructor && null != e.constructor.name && e.constructor.name === t.name
                }

                function U(e) {
                    return e != e
                }
            }).call(this, e("buffer").Buffer)
        }, {
            "base64-js": 1,
            buffer: 3,
            ieee754: 5
        }],
        4: [function (e, t, r) {
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

            function s() {
                this._events && Object.prototype.hasOwnProperty.call(this, "_events") || (this._events = n(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0
            }
            t.exports = s, s.EventEmitter = s, s.prototype._events = void 0, s.prototype._maxListeners = void 0;
            var a, u = 10;
            try {
                var l = {};
                Object.defineProperty && Object.defineProperty(l, "x", {
                    value: 0
                }), a = 0 === l.x
            } catch (e) {
                a = !1
            }

            function h(e) {
                return void 0 === e._maxListeners ? s.defaultMaxListeners : e._maxListeners
            }

            function c(e, t, r, i) {
                var o, s, a;
                if ("function" != typeof r) throw new TypeError('"listener" argument must be a function');
                if ((s = e._events) ? (s.newListener && (e.emit("newListener", t, r.listener ? r.listener : r), s = e._events), a = s[t]) : (s = e._events = n(null), e._eventsCount = 0), a) {
                    if ("function" == typeof a ? a = s[t] = i ? [r, a] : [a, r] : i ? a.unshift(r) : a.push(r), !a.warned && (o = h(e)) && o > 0 && a.length > o) {
                        a.warned = !0;
                        var u = new Error("Possible EventEmitter memory leak detected. " + a.length + ' "' + String(t) + '" listeners added. Use emitter.setMaxListeners() to increase limit.');
                        u.name = "MaxListenersExceededWarning", u.emitter = e, u.type = t, u.count = a.length, "object" == typeof console && console.warn && console.warn("%s: %s", u.name, u.message)
                    }
                } else a = s[t] = r, ++e._eventsCount;
                return e
            }

            function f() {
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
                    i = o.call(f, n);
                return i.listener = r, n.wrapFn = i, i
            }

            function p(e, t, r) {
                var n = e._events;
                if (!n) return [];
                var i = n[t];
                return i ? "function" == typeof i ? r ? [i.listener || i] : [i] : r ? function (e) {
                    for (var t = new Array(e.length), r = 0; r < t.length; ++r) t[r] = e[r].listener || e[r];
                    return t
                }(i) : y(i, i.length) : []
            }

            function g(e) {
                var t = this._events;
                if (t) {
                    var r = t[e];
                    if ("function" == typeof r) return 1;
                    if (r) return r.length
                }
                return 0
            }

            function y(e, t) {
                for (var r = new Array(t), n = 0; n < t; ++n) r[n] = e[n];
                return r
            }
            a ? Object.defineProperty(s, "defaultMaxListeners", {
                enumerable: !0,
                get: function () {
                    return u
                },
                set: function (e) {
                    if ("number" != typeof e || e < 0 || e != e) throw new TypeError('"defaultMaxListeners" must be a positive number');
                    u = e
                }
            }) : s.defaultMaxListeners = u, s.prototype.setMaxListeners = function (e) {
                if ("number" != typeof e || e < 0 || isNaN(e)) throw new TypeError('"n" argument must be a positive number');
                return this._maxListeners = e, this
            }, s.prototype.getMaxListeners = function () {
                return h(this)
            }, s.prototype.emit = function (e) {
                var t, r, n, i, o, s, a = "error" === e;
                if (s = this._events) a = a && null == s.error;
                else if (!a) return !1;
                if (a) {
                    if (arguments.length > 1 && (t = arguments[1]), t instanceof Error) throw t;
                    var u = new Error('Unhandled "error" event. (' + t + ")");
                    throw u.context = t, u
                }
                if (!(r = s[e])) return !1;
                var l = "function" == typeof r;
                switch (n = arguments.length) {
                    case 1:
                        ! function (e, t, r) {
                            if (t) e.call(r);
                            else
                                for (var n = e.length, i = y(e, n), o = 0; o < n; ++o) i[o].call(r)
                        }(r, l, this);
                        break;
                    case 2:
                        ! function (e, t, r, n) {
                            if (t) e.call(r, n);
                            else
                                for (var i = e.length, o = y(e, i), s = 0; s < i; ++s) o[s].call(r, n)
                        }(r, l, this, arguments[1]);
                        break;
                    case 3:
                        ! function (e, t, r, n, i) {
                            if (t) e.call(r, n, i);
                            else
                                for (var o = e.length, s = y(e, o), a = 0; a < o; ++a) s[a].call(r, n, i)
                        }(r, l, this, arguments[1], arguments[2]);
                        break;
                    case 4:
                        ! function (e, t, r, n, i, o) {
                            if (t) e.call(r, n, i, o);
                            else
                                for (var s = e.length, a = y(e, s), u = 0; u < s; ++u) a[u].call(r, n, i, o)
                        }(r, l, this, arguments[1], arguments[2], arguments[3]);
                        break;
                    default:
                        for (i = new Array(n - 1), o = 1; o < n; o++) i[o - 1] = arguments[o];
                        ! function (e, t, r, n) {
                            if (t) e.apply(r, n);
                            else
                                for (var i = e.length, o = y(e, i), s = 0; s < i; ++s) o[s].apply(r, n)
                        }(r, l, this, i)
                }
                return !0
            }, s.prototype.addListener = function (e, t) {
                return c(this, e, t, !1)
            }, s.prototype.on = s.prototype.addListener, s.prototype.prependListener = function (e, t) {
                return c(this, e, t, !0)
            }, s.prototype.once = function (e, t) {
                if ("function" != typeof t) throw new TypeError('"listener" argument must be a function');
                return this.on(e, d(this, e, t)), this
            }, s.prototype.prependOnceListener = function (e, t) {
                if ("function" != typeof t) throw new TypeError('"listener" argument must be a function');
                return this.prependListener(e, d(this, e, t)), this
            }, s.prototype.removeListener = function (e, t) {
                var r, i, o, s, a;
                if ("function" != typeof t) throw new TypeError('"listener" argument must be a function');
                if (!(i = this._events)) return this;
                if (!(r = i[e])) return this;
                if (r === t || r.listener === t) 0 == --this._eventsCount ? this._events = n(null) : (delete i[e], i.removeListener && this.emit("removeListener", e, r.listener || t));
                else if ("function" != typeof r) {
                    for (o = -1, s = r.length - 1; s >= 0; s--)
                        if (r[s] === t || r[s].listener === t) {
                            a = r[s].listener, o = s;
                            break
                        } if (o < 0) return this;
                    0 === o ? r.shift() : function (e, t) {
                        for (var r = t, n = r + 1, i = e.length; n < i; r += 1, n += 1) e[r] = e[n];
                        e.pop()
                    }(r, o), 1 === r.length && (i[e] = r[0]), i.removeListener && this.emit("removeListener", e, a || t)
                }
                return this
            }, s.prototype.removeAllListeners = function (e) {
                var t, r, o;
                if (!(r = this._events)) return this;
                if (!r.removeListener) return 0 === arguments.length ? (this._events = n(null), this._eventsCount = 0) : r[e] && (0 == --this._eventsCount ? this._events = n(null) : delete r[e]), this;
                if (0 === arguments.length) {
                    var s, a = i(r);
                    for (o = 0; o < a.length; ++o) "removeListener" !== (s = a[o]) && this.removeAllListeners(s);
                    return this.removeAllListeners("removeListener"), this._events = n(null), this._eventsCount = 0, this
                }
                if ("function" == typeof (t = r[e])) this.removeListener(e, t);
                else if (t)
                    for (o = t.length - 1; o >= 0; o--) this.removeListener(e, t[o]);
                return this
            }, s.prototype.listeners = function (e) {
                return p(this, e, !0)
            }, s.prototype.rawListeners = function (e) {
                return p(this, e, !1)
            }, s.listenerCount = function (e, t) {
                return "function" == typeof e.listenerCount ? e.listenerCount(t) : g.call(e, t)
            }, s.prototype.listenerCount = g, s.prototype.eventNames = function () {
                return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : []
            }
        }, {}],
        5: [function (e, t, r) {
            r.read = function (e, t, r, n, i) {
                var o, s, a = 8 * i - n - 1,
                    u = (1 << a) - 1,
                    l = u >> 1,
                    h = -7,
                    c = r ? i - 1 : 0,
                    f = r ? -1 : 1,
                    d = e[t + c];
                for (c += f, o = d & (1 << -h) - 1, d >>= -h, h += a; h > 0; o = 256 * o + e[t + c], c += f, h -= 8);
                for (s = o & (1 << -h) - 1, o >>= -h, h += n; h > 0; s = 256 * s + e[t + c], c += f, h -= 8);
                if (0 === o) o = 1 - l;
                else {
                    if (o === u) return s ? NaN : 1 / 0 * (d ? -1 : 1);
                    s += Math.pow(2, n), o -= l
                }
                return (d ? -1 : 1) * s * Math.pow(2, o - n)
            }, r.write = function (e, t, r, n, i, o) {
                var s, a, u, l = 8 * o - i - 1,
                    h = (1 << l) - 1,
                    c = h >> 1,
                    f = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                    d = n ? 0 : o - 1,
                    p = n ? 1 : -1,
                    g = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
                for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (a = isNaN(t) ? 1 : 0, s = h) : (s = Math.floor(Math.log(t) / Math.LN2), t * (u = Math.pow(2, -s)) < 1 && (s--, u *= 2), (t += s + c >= 1 ? f / u : f * Math.pow(2, 1 - c)) * u >= 2 && (s++, u /= 2), s + c >= h ? (a = 0, s = h) : s + c >= 1 ? (a = (t * u - 1) * Math.pow(2, i), s += c) : (a = t * Math.pow(2, c - 1) * Math.pow(2, i), s = 0)); i >= 8; e[r + d] = 255 & a, d += p, a /= 256, i -= 8);
                for (s = s << i | a, l += i; l > 0; e[r + d] = 255 & s, d += p, s /= 256, l -= 8);
                e[r + d - p] |= 128 * g
            }
        }, {}],
        6: [function (e, t, r) {
            var n, i, o = t.exports = {};

            function s() {
                throw new Error("setTimeout has not been defined")
            }

            function a() {
                throw new Error("clearTimeout has not been defined")
            }

            function u(e) {
                if (n === setTimeout) return setTimeout(e, 0);
                if ((n === s || !n) && setTimeout) return n = setTimeout, setTimeout(e, 0);
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
                    n = "function" == typeof setTimeout ? setTimeout : s
                } catch (e) {
                    n = s
                }
                try {
                    i = "function" == typeof clearTimeout ? clearTimeout : a
                } catch (e) {
                    i = a
                }
            }();
            var l, h = [],
                c = !1,
                f = -1;

            function d() {
                c && l && (c = !1, l.length ? h = l.concat(h) : f = -1, h.length && p())
            }

            function p() {
                if (!c) {
                    var e = u(d);
                    c = !0;
                    for (var t = h.length; t;) {
                        for (l = h, h = []; ++f < t;) l && l[f].run();
                        f = -1, t = h.length
                    }
                    l = null, c = !1,
                        function (e) {
                            if (i === clearTimeout) return clearTimeout(e);
                            if ((i === a || !i) && clearTimeout) return i = clearTimeout, clearTimeout(e);
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

            function g(e, t) {
                this.fun = e, this.array = t
            }

            function y() {}
            o.nextTick = function (e) {
                var t = new Array(arguments.length - 1);
                if (arguments.length > 1)
                    for (var r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
                h.push(new g(e, t)), 1 !== h.length || c || u(p)
            }, g.prototype.run = function () {
                this.fun.apply(null, this.array)
            }, o.title = "browser", o.browser = !0, o.env = {}, o.argv = [], o.version = "", o.versions = {}, o.on = y, o.addListener = y, o.once = y, o.off = y, o.removeListener = y, o.removeAllListeners = y, o.emit = y, o.prependListener = y, o.prependOnceListener = y, o.listeners = function (e) {
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
        7: [function (e, t, r) {
            (function (r) {
                var n = e("debug")("simple-peer"),
                    i = e("get-browser-rtc"),
                    o = e("randombytes"),
                    s = e("readable-stream"),
                    a = e("queue-microtask"),
                    u = e("err-code"),
                    l = 65536,
                    h = 5e3,
                    c = 5e3;

                function f(e) {
                    return e.replace(/a=ice-options:trickle\s\n/g, "")
                }
                class d extends s.Duplex {
                    constructor(e) {
                        if (super(e = Object.assign({
                                allowHalfOpen: !1
                            }, e)), this._id = o(4).toString("hex").slice(0, 7), this._debug("new peer %o", e), this.channelName = e.initiator ? e.channelName || o(20).toString("hex") : null, this.initiator = e.initiator || !1, this.channelConfig = e.channelConfig || d.channelConfig, this.channelNegotiated = this.channelConfig.negotiated, this.config = Object.assign({}, d.config, e.config), this.offerOptions = e.offerOptions || {}, this.answerOptions = e.answerOptions || {}, this.sdpTransform = e.sdpTransform || (e => e), this.streams = e.streams || (e.stream ? [e.stream] : []), this.trickle = void 0 === e.trickle || e.trickle, this.allowHalfTrickle = void 0 !== e.allowHalfTrickle && e.allowHalfTrickle, this.iceCompleteTimeout = e.iceCompleteTimeout || h, this.destroyed = !1, this._connected = !1, this.remoteAddress = void 0, this.remoteFamily = void 0, this.remotePort = void 0, this.localAddress = void 0, this.localFamily = void 0, this.localPort = void 0, this._wrtc = e.wrtc && "object" == typeof e.wrtc ? e.wrtc : i(), !this._wrtc) throw "undefined" == typeof window ? u(new Error("No WebRTC support: Specify `opts.wrtc` option in this environment"), "ERR_WEBRTC_SUPPORT") : u(new Error("No WebRTC support: Not a supported browser"), "ERR_WEBRTC_SUPPORT");
                        this._pcReady = !1, this._channelReady = !1, this._iceComplete = !1, this._iceCompleteTimer = null, this._channel = null, this._pendingCandidates = [], this._isNegotiating = !1, this._firstNegotiation = !0, this._batchedNegotiation = !1, this._queuedNegotiation = !1, this._sendersAwaitingStable = [], this._senderMap = new Map, this._closingInterval = null, this._remoteTracks = [], this._remoteStreams = [], this._chunk = null, this._cb = null, this._interval = null;
                        try {
                            this._pc = new this._wrtc.RTCPeerConnection(this.config)
                        } catch (e) {
                            return void a(() => this.destroy(u(e, "ERR_PC_CONSTRUCTOR")))
                        }
                        this._isReactNativeWebrtc = "number" == typeof this._pc._peerConnectionId, this._pc.oniceconnectionstatechange = (() => {
                            this._onIceStateChange()
                        }), this._pc.onicegatheringstatechange = (() => {
                            this._onIceStateChange()
                        }), this._pc.onconnectionstatechange = (() => {
                            this._onConnectionStateChange()
                        }), this._pc.onsignalingstatechange = (() => {
                            this._onSignalingStateChange()
                        }), this._pc.onicecandidate = (e => {
                            this._onIceCandidate(e)
                        }), this.initiator || this.channelNegotiated ? this._setupData({
                            channel: this._pc.createDataChannel(this.channelName, this.channelConfig)
                        }) : this._pc.ondatachannel = (e => {
                            this._setupData(e)
                        }), this.streams && this.streams.forEach(e => {
                            this.addStream(e)
                        }), this._pc.ontrack = (e => {
                            this._onTrack(e)
                        }), this._debug("initial negotiation"), this._needsNegotiation(), this._onFinishBound = (() => {
                            this._onFinish()
                        }), this.once("finish", this._onFinishBound)
                    }
                    get bufferSize() {
                        return this._channel && this._channel.bufferedAmount || 0
                    }
                    get connected() {
                        return this._connected && "open" === this._channel.readyState
                    }
                    address() {
                        return {
                            port: this.localPort,
                            family: this.localFamily,
                            address: this.localAddress
                        }
                    }
                    signal(e) {
                        if (this.destroyed) throw u(new Error("cannot signal after peer is destroyed"), "ERR_SIGNALING");
                        if ("string" == typeof e) try {
                            e = JSON.parse(e)
                        } catch (t) {
                            e = {}
                        }
                        this._debug("signal()"), e.renegotiate && this.initiator && (this._debug("got request to renegotiate"), this._needsNegotiation()), e.transceiverRequest && this.initiator && (this._debug("got request for transceiver"), this.addTransceiver(e.transceiverRequest.kind, e.transceiverRequest.init)), e.candidate && (this._pc.remoteDescription && this._pc.remoteDescription.type ? this._addIceCandidate(e.candidate) : this._pendingCandidates.push(e.candidate)), e.sdp && this._pc.setRemoteDescription(new this._wrtc.RTCSessionDescription(e)).then(() => {
                            this.destroyed || (this._pendingCandidates.forEach(e => {
                                this._addIceCandidate(e)
                            }), this._pendingCandidates = [], "offer" === this._pc.remoteDescription.type && this._createAnswer())
                        }).catch(e => {
                            this.destroy(u(e, "ERR_SET_REMOTE_DESCRIPTION"))
                        }), e.sdp || e.candidate || e.renegotiate || e.transceiverRequest || this.destroy(u(new Error("signal() called with invalid signal data"), "ERR_SIGNALING"))
                    }
                    _addIceCandidate(e) {
                        var t = new this._wrtc.RTCIceCandidate(e);
                        this._pc.addIceCandidate(t).catch(e => {
                            !t.address || t.address.endsWith(".local") ? function (e) {
                                console.warn(e)
                            }("Ignoring unsupported ICE candidate.") : this.destroy(u(e, "ERR_ADD_ICE_CANDIDATE"))
                        })
                    }
                    send(e) {
                        this._channel.send(e)
                    }
                    addTransceiver(e, t) {
                        if (this._debug("addTransceiver()"), this.initiator) try {
                            this._pc.addTransceiver(e, t), this._needsNegotiation()
                        } catch (e) {
                            this.destroy(u(e, "ERR_ADD_TRANSCEIVER"))
                        } else this.emit("signal", {
                            transceiverRequest: {
                                kind: e,
                                init: t
                            }
                        })
                    }
                    addStream(e) {
                        this._debug("addStream()"), e.getTracks().forEach(t => {
                            this.addTrack(t, e)
                        })
                    }
                    addTrack(e, t) {
                        this._debug("addTrack()");
                        var r = this._senderMap.get(e) || new Map,
                            n = r.get(t);
                        if (n) throw n.removed ? u(new Error("Track has been removed. You should enable/disable tracks that you want to re-add."), "ERR_SENDER_REMOVED") : u(new Error("Track has already been added to that stream."), "ERR_SENDER_ALREADY_ADDED");
                        n = this._pc.addTrack(e, t), r.set(t, n), this._senderMap.set(e, r), this._needsNegotiation()
                    }
                    replaceTrack(e, t, r) {
                        this._debug("replaceTrack()");
                        var n = this._senderMap.get(e),
                            i = n ? n.get(r) : null;
                        if (!i) throw u(new Error("Cannot replace track that was never added."), "ERR_TRACK_NOT_ADDED");
                        t && this._senderMap.set(t, n), null != i.replaceTrack ? i.replaceTrack(t) : this.destroy(u(new Error("replaceTrack is not supported in this browser"), "ERR_UNSUPPORTED_REPLACETRACK"))
                    }
                    removeTrack(e, t) {
                        this._debug("removeSender()");
                        var r = this._senderMap.get(e),
                            n = r ? r.get(t) : null;
                        if (!n) throw u(new Error("Cannot remove track that was never added."), "ERR_TRACK_NOT_ADDED");
                        try {
                            n.removed = !0, this._pc.removeTrack(n)
                        } catch (e) {
                            "NS_ERROR_UNEXPECTED" === e.name ? this._sendersAwaitingStable.push(n) : this.destroy(u(e, "ERR_REMOVE_TRACK"))
                        }
                        this._needsNegotiation()
                    }
                    removeStream(e) {
                        this._debug("removeSenders()"), e.getTracks().forEach(t => {
                            this.removeTrack(t, e)
                        })
                    }
                    _needsNegotiation() {
                        this._debug("_needsNegotiation"), this._batchedNegotiation || (this._batchedNegotiation = !0, a(() => {
                            this._batchedNegotiation = !1, this.initiator || !this._firstNegotiation ? (this._debug("starting batched negotiation"), this.negotiate()) : this._debug("non-initiator initial negotiation request discarded"), this._firstNegotiation = !1
                        }))
                    }
                    negotiate() {
                        this.initiator ? this._isNegotiating ? (this._queuedNegotiation = !0, this._debug("already negotiating, queueing")) : (this._debug("start negotiation"), setTimeout(() => {
                            this._createOffer()
                        }, 0)) : this._isNegotiating ? (this._queuedNegotiation = !0, this._debug("already negotiating, queueing")) : (this._debug("requesting negotiation from initiator"), this.emit("signal", {
                            renegotiate: !0
                        })), this._isNegotiating = !0
                    }
                    destroy(e) {
                        this._destroy(e, () => {})
                    }
                    _destroy(e, t) {
                        if (!this.destroyed) {
                            if (this._debug("destroy (error: %s)", e && (e.message || e)), this.readable = this.writable = !1, this._readableState.ended || this.push(null), this._writableState.finished || this.end(), this.destroyed = !0, this._connected = !1, this._pcReady = !1, this._channelReady = !1, this._remoteTracks = null, this._remoteStreams = null, this._senderMap = null, clearInterval(this._closingInterval), this._closingInterval = null, clearInterval(this._interval), this._interval = null, this._chunk = null, this._cb = null, this._onFinishBound && this.removeListener("finish", this._onFinishBound), this._onFinishBound = null, this._channel) {
                                try {
                                    this._channel.close()
                                } catch (e) {}
                                this._channel.onmessage = null, this._channel.onopen = null, this._channel.onclose = null, this._channel.onerror = null
                            }
                            if (this._pc) {
                                try {
                                    this._pc.close()
                                } catch (e) {}
                                this._pc.oniceconnectionstatechange = null, this._pc.onicegatheringstatechange = null, this._pc.onsignalingstatechange = null, this._pc.onicecandidate = null, this._pc.ontrack = null, this._pc.ondatachannel = null
                            }
                            this._pc = null, this._channel = null, e && this.emit("error", e), this.emit("close"), t()
                        }
                    }
                    _setupData(e) {
                        if (!e.channel) return this.destroy(u(new Error("Data channel event is missing `channel` property"), "ERR_DATA_CHANNEL"));
                        this._channel = e.channel, this._channel.binaryType = "arraybuffer", "number" == typeof this._channel.bufferedAmountLowThreshold && (this._channel.bufferedAmountLowThreshold = l), this.channelName = this._channel.label, this._channel.onmessage = (e => {
                            this._onChannelMessage(e)
                        }), this._channel.onbufferedamountlow = (() => {
                            this._onChannelBufferedAmountLow()
                        }), this._channel.onopen = (() => {
                            this._onChannelOpen()
                        }), this._channel.onclose = (() => {
                            this._onChannelClose()
                        }), this._channel.onerror = (e => {
                            this.destroy(u(e, "ERR_DATA_CHANNEL"))
                        });
                        var t = !1;
                        this._closingInterval = setInterval(() => {
                            this._channel && "closing" === this._channel.readyState ? (t && this._onChannelClose(), t = !0) : t = !1
                        }, c)
                    }
                    _read() {}
                    _write(e, t, r) {
                        if (this.destroyed) return r(u(new Error("cannot write after peer is destroyed"), "ERR_DATA_CHANNEL"));
                        if (this._connected) {
                            try {
                                this.send(e)
                            } catch (e) {
                                return this.destroy(u(e, "ERR_DATA_CHANNEL"))
                            }
                            this._channel.bufferedAmount > l ? (this._debug("start backpressure: bufferedAmount %d", this._channel.bufferedAmount), this._cb = r) : r(null)
                        } else this._debug("write before connect"), this._chunk = e, this._cb = r
                    }
                    _onFinish() {
                        if (this.destroyed) return;
                        const e = () => {
                            setTimeout(() => this.destroy(), 1e3)
                        };
                        this._connected ? e() : this.once("connect", e)
                    }
                    _startIceCompleteTimeout() {
                        this.destroyed || this._iceCompleteTimer || (this._debug("started iceComplete timeout"), this._iceCompleteTimer = setTimeout(() => {
                            this._iceComplete || (this._iceComplete = !0, this._debug("iceComplete timeout completed"), this.emit("iceTimeout"), this.emit("_iceComplete"))
                        }, this.iceCompleteTimeout))
                    }
                    _createOffer() {
                        this.destroyed || this._pc.createOffer(this.offerOptions).then(e => {
                            if (this.destroyed) return;
                            this.trickle || this.allowHalfTrickle || (e.sdp = f(e.sdp)), e.sdp = this.sdpTransform(e.sdp);
                            const t = () => {
                                if (!this.destroyed) {
                                    var t = this._pc.localDescription || e;
                                    this._debug("signal"), this.emit("signal", {
                                        type: t.type,
                                        sdp: t.sdp
                                    })
                                }
                            };
                            this._pc.setLocalDescription(e).then(() => {
                                this._debug("createOffer success"), this.destroyed || (this.trickle || this._iceComplete ? t() : this.once("_iceComplete", t))
                            }).catch(e => {
                                this.destroy(u(e, "ERR_SET_LOCAL_DESCRIPTION"))
                            })
                        }).catch(e => {
                            this.destroy(u(e, "ERR_CREATE_OFFER"))
                        })
                    }
                    _requestMissingTransceivers() {
                        this._pc.getTransceivers && this._pc.getTransceivers().forEach(e => {
                            e.mid || !e.sender.track || e.requested || (e.requested = !0, this.addTransceiver(e.sender.track.kind))
                        })
                    }
                    _createAnswer() {
                        this.destroyed || this._pc.createAnswer(this.answerOptions).then(e => {
                            if (this.destroyed) return;
                            this.trickle || this.allowHalfTrickle || (e.sdp = f(e.sdp)), e.sdp = this.sdpTransform(e.sdp);
                            const t = () => {
                                if (!this.destroyed) {
                                    var t = this._pc.localDescription || e;
                                    this._debug("signal"), this.emit("signal", {
                                        type: t.type,
                                        sdp: t.sdp
                                    }), this.initiator || this._requestMissingTransceivers()
                                }
                            };
                            this._pc.setLocalDescription(e).then(() => {
                                this.destroyed || (this.trickle || this._iceComplete ? t() : this.once("_iceComplete", t))
                            }).catch(e => {
                                this.destroy(u(e, "ERR_SET_LOCAL_DESCRIPTION"))
                            })
                        }).catch(e => {
                            this.destroy(u(e, "ERR_CREATE_ANSWER"))
                        })
                    }
                    _onConnectionStateChange() {
                        this.destroyed || "failed" === this._pc.connectionState && this.destroy(u(new Error("Connection failed."), "ERR_CONNECTION_FAILURE"))
                    }
                    _onIceStateChange() {
                        if (!this.destroyed) {
                            var e = this._pc.iceConnectionState,
                                t = this._pc.iceGatheringState;
                            this._debug("iceStateChange (connection: %s) (gathering: %s)", e, t), this.emit("iceStateChange", e, t), "connected" !== e && "completed" !== e || (this._pcReady = !0, this._maybeReady()), "failed" === e && this.destroy(u(new Error("Ice connection failed."), "ERR_ICE_CONNECTION_FAILURE")), "closed" === e && this.destroy(u(new Error("Ice connection closed."), "ERR_ICE_CONNECTION_CLOSED"))
                        }
                    }
                    getStats(e) {
                        const t = e => ("[object Array]" === Object.prototype.toString.call(e.values) && e.values.forEach(t => {
                            Object.assign(e, t)
                        }), e);
                        0 === this._pc.getStats.length || this._isReactNativeWebrtc ? this._pc.getStats().then(r => {
                            var n = [];
                            r.forEach(e => {
                                n.push(t(e))
                            }), e(null, n)
                        }, t => e(t)) : this._pc.getStats.length > 0 ? this._pc.getStats(r => {
                            if (!this.destroyed) {
                                var n = [];
                                r.result().forEach(e => {
                                    var r = {};
                                    e.names().forEach(t => {
                                        r[t] = e.stat(t)
                                    }), r.id = e.id, r.type = e.type, r.timestamp = e.timestamp, n.push(t(r))
                                }), e(null, n)
                            }
                        }, t => e(t)) : e(null, [])
                    }
                    _maybeReady() {
                        if (this._debug("maybeReady pc %s channel %s", this._pcReady, this._channelReady), this._connected || this._connecting || !this._pcReady || !this._channelReady) return;
                        this._connecting = !0;
                        const e = () => {
                            this.destroyed || this.getStats((t, r) => {
                                if (this.destroyed) return;
                                t && (r = []);
                                var n = {},
                                    i = {},
                                    o = {},
                                    s = !1;
                                r.forEach(e => {
                                    "remotecandidate" !== e.type && "remote-candidate" !== e.type || (n[e.id] = e), "localcandidate" !== e.type && "local-candidate" !== e.type || (i[e.id] = e), "candidatepair" !== e.type && "candidate-pair" !== e.type || (o[e.id] = e)
                                });
                                const a = e => {
                                    s = !0;
                                    var t = i[e.localCandidateId];
                                    t && (t.ip || t.address) ? (this.localAddress = t.ip || t.address, this.localPort = Number(t.port)) : t && t.ipAddress ? (this.localAddress = t.ipAddress, this.localPort = Number(t.portNumber)) : "string" == typeof e.googLocalAddress && (t = e.googLocalAddress.split(":"), this.localAddress = t[0], this.localPort = Number(t[1])), this.localAddress && (this.localFamily = this.localAddress.includes(":") ? "IPv6" : "IPv4");
                                    var r = n[e.remoteCandidateId];
                                    r && (r.ip || r.address) ? (this.remoteAddress = r.ip || r.address, this.remotePort = Number(r.port)) : r && r.ipAddress ? (this.remoteAddress = r.ipAddress, this.remotePort = Number(r.portNumber)) : "string" == typeof e.googRemoteAddress && (r = e.googRemoteAddress.split(":"), this.remoteAddress = r[0], this.remotePort = Number(r[1])), this.remoteAddress && (this.remoteFamily = this.remoteAddress.includes(":") ? "IPv6" : "IPv4"), this._debug("connect local: %s:%s remote: %s:%s", this.localAddress, this.localPort, this.remoteAddress, this.remotePort)
                                };
                                if (r.forEach(e => {
                                        "transport" === e.type && e.selectedCandidatePairId && a(o[e.selectedCandidatePairId]), ("googCandidatePair" === e.type && "true" === e.googActiveConnection || ("candidatepair" === e.type || "candidate-pair" === e.type) && e.selected) && a(e)
                                    }), s || Object.keys(o).length && !Object.keys(i).length) {
                                    if (this._connecting = !1, this._connected = !0, this._chunk) {
                                        try {
                                            this.send(this._chunk)
                                        } catch (t) {
                                            return this.destroy(u(t, "ERR_DATA_CHANNEL"))
                                        }
                                        this._chunk = null, this._debug('sent chunk from "write before connect"');
                                        var l = this._cb;
                                        this._cb = null, l(null)
                                    }
                                    "number" != typeof this._channel.bufferedAmountLowThreshold && (this._interval = setInterval(() => this._onInterval(), 150), this._interval.unref && this._interval.unref()), this._debug("connect"), this.emit("connect")
                                } else setTimeout(e, 100)
                            })
                        };
                        e()
                    }
                    _onInterval() {
                        !this._cb || !this._channel || this._channel.bufferedAmount > l || this._onChannelBufferedAmountLow()
                    }
                    _onSignalingStateChange() {
                        this.destroyed || ("stable" === this._pc.signalingState && (this._isNegotiating = !1, this._debug("flushing sender queue", this._sendersAwaitingStable), this._sendersAwaitingStable.forEach(e => {
                            this._pc.removeTrack(e), this._queuedNegotiation = !0
                        }), this._sendersAwaitingStable = [], this._queuedNegotiation ? (this._debug("flushing negotiation queue"), this._queuedNegotiation = !1, this._needsNegotiation()) : (this._debug("negotiate"), this.emit("negotiate"))), this._debug("signalingStateChange %s", this._pc.signalingState), this.emit("signalingStateChange", this._pc.signalingState))
                    }
                    _onIceCandidate(e) {
                        this.destroyed || (e.candidate && this.trickle ? this.emit("signal", {
                            candidate: {
                                candidate: e.candidate.candidate,
                                sdpMLineIndex: e.candidate.sdpMLineIndex,
                                sdpMid: e.candidate.sdpMid
                            }
                        }) : e.candidate || this._iceComplete || (this._iceComplete = !0, this.emit("_iceComplete")), e.candidate && this._startIceCompleteTimeout())
                    }
                    _onChannelMessage(e) {
                        if (!this.destroyed) {
                            var t = e.data;
                            t instanceof ArrayBuffer && (t = r.from(t)), this.push(t)
                        }
                    }
                    _onChannelBufferedAmountLow() {
                        if (!this.destroyed && this._cb) {
                            this._debug("ending backpressure: bufferedAmount %d", this._channel.bufferedAmount);
                            var e = this._cb;
                            this._cb = null, e(null)
                        }
                    }
                    _onChannelOpen() {
                        this._connected || this.destroyed || (this._debug("on channel open"), this._channelReady = !0, this._maybeReady())
                    }
                    _onChannelClose() {
                        this.destroyed || (this._debug("on channel close"), this.destroy())
                    }
                    _onTrack(e) {
                        this.destroyed || e.streams.forEach(t => {
                            this._debug("on track"), this.emit("track", e.track, t), this._remoteTracks.push({
                                track: e.track,
                                stream: t
                            }), this._remoteStreams.some(e => e.id === t.id) || (this._remoteStreams.push(t), a(() => {
                                this.emit("stream", t)
                            }))
                        })
                    }
                    _debug() {
                        var e = [].slice.call(arguments);
                        e[0] = "[" + this._id + "] " + e[0], n.apply(null, e)
                    }
                }
                d.WEBRTC_SUPPORT = !!i(), d.config = {
                    iceServers: [{
                        urls: ["stun:stun.l.google.com:19302", "stun:global.stun.twilio.com:3478"]
                    }],
                    sdpSemantics: "unified-plan"
                }, d.channelConfig = {}, t.exports = d
            }).call(this, e("buffer").Buffer)
        }, {
            buffer: 3,
            debug: 8,
            "err-code": 10,
            "get-browser-rtc": 11,
            "queue-microtask": 14,
            randombytes: 15,
            "readable-stream": 30
        }],
        8: [function (e, t, r) {
            (function (n) {
                r.formatArgs = function (e) {
                    if (e[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + e[0] + (this.useColors ? "%c " : " ") + "+" + t.exports.humanize(this.diff), !this.useColors) return;
                    const r = "color: " + this.color;
                    e.splice(1, 0, r, "color: inherit");
                    let n = 0,
                        i = 0;
                    e[0].replace(/%[a-zA-Z%]/g, e => {
                        "%%" !== e && (n++, "%c" === e && (i = n))
                    }), e.splice(i, 0, r)
                }, r.save = function (e) {
                    try {
                        e ? r.storage.setItem("debug", e) : r.storage.removeItem("debug")
                    } catch (e) {}
                }, r.load = function () {
                    let e;
                    try {
                        e = r.storage.getItem("debug")
                    } catch (e) {}!e && void 0 !== n && "env" in n && (e = n.env.DEBUG);
                    return e
                }, r.useColors = function () {
                    if ("undefined" != typeof window && window.process && ("renderer" === window.process.type || window.process.__nwjs)) return !0;
                    if ("undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) return !1;
                    return "undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)
                }, r.storage = function () {
                    try {
                        return localStorage
                    } catch (e) {}
                }(), r.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"], r.log = console.debug || console.log || (() => {}), t.exports = e("./common")(r);
                const {
                    formatters: i
                } = t.exports;
                i.j = function (e) {
                    try {
                        return JSON.stringify(e)
                    } catch (e) {
                        return "[UnexpectedJSONParseError]: " + e.message
                    }
                }
            }).call(this, e("_process"))
        }, {
            "./common": 9,
            _process: 6
        }],
        9: [function (e, t, r) {
            t.exports = function (t) {
                function r(e) {
                    let t;

                    function o(...e) {
                        if (!o.enabled) return;
                        const n = o,
                            i = Number(new Date),
                            s = i - (t || i);
                        n.diff = s, n.prev = t, n.curr = i, t = i, e[0] = r.coerce(e[0]), "string" != typeof e[0] && e.unshift("%O");
                        let a = 0;
                        e[0] = e[0].replace(/%([a-zA-Z%])/g, (t, i) => {
                            if ("%%" === t) return t;
                            a++;
                            const o = r.formatters[i];
                            if ("function" == typeof o) {
                                const r = e[a];
                                t = o.call(n, r), e.splice(a, 1), a--
                            }
                            return t
                        }), r.formatArgs.call(n, e), (n.log || r.log).apply(n, e)
                    }
                    return o.namespace = e, o.enabled = r.enabled(e), o.useColors = r.useColors(), o.color = r.selectColor(e), o.destroy = n, o.extend = i, "function" == typeof r.init && r.init(o), r.instances.push(o), o
                }

                function n() {
                    const e = r.instances.indexOf(this);
                    return -1 !== e && (r.instances.splice(e, 1), !0)
                }

                function i(e, t) {
                    const n = r(this.namespace + (void 0 === t ? ":" : t) + e);
                    return n.log = this.log, n
                }

                function o(e) {
                    return e.toString().substring(2, e.toString().length - 2).replace(/\.\*\?$/, "*")
                }
                return r.debug = r, r.default = r, r.coerce = function (e) {
                    return e instanceof Error ? e.stack || e.message : e
                }, r.disable = function () {
                    const e = [...r.names.map(o), ...r.skips.map(o).map(e => "-" + e)].join(",");
                    return r.enable(""), e
                }, r.enable = function (e) {
                    let t;
                    r.save(e), r.names = [], r.skips = [];
                    const n = ("string" == typeof e ? e : "").split(/[\s,]+/),
                        i = n.length;
                    for (t = 0; t < i; t++) n[t] && ("-" === (e = n[t].replace(/\*/g, ".*?"))[0] ? r.skips.push(new RegExp("^" + e.substr(1) + "$")) : r.names.push(new RegExp("^" + e + "$")));
                    for (t = 0; t < r.instances.length; t++) {
                        const e = r.instances[t];
                        e.enabled = r.enabled(e.namespace)
                    }
                }, r.enabled = function (e) {
                    if ("*" === e[e.length - 1]) return !0;
                    let t, n;
                    for (t = 0, n = r.skips.length; t < n; t++)
                        if (r.skips[t].test(e)) return !1;
                    for (t = 0, n = r.names.length; t < n; t++)
                        if (r.names[t].test(e)) return !0;
                    return !1
                }, r.humanize = e("ms"), Object.keys(t).forEach(e => {
                    r[e] = t[e]
                }), r.instances = [], r.names = [], r.skips = [], r.formatters = {}, r.selectColor = function (e) {
                    let t = 0;
                    for (let r = 0; r < e.length; r++) t = (t << 5) - t + e.charCodeAt(r), t |= 0;
                    return r.colors[Math.abs(t) % r.colors.length]
                }, r.enable(r.load()), r
            }
        }, {
            ms: 13
        }],
        10: [function (e, t, r) {
            "use strict";

            function n(e, t) {
                for (const r in t) Object.defineProperty(e, r, {
                    value: t[r],
                    enumerable: !0,
                    configurable: !0
                });
                return e
            }
            t.exports = function (e, t, r) {
                if (!e || "string" == typeof e) throw new TypeError("Please pass an Error to err-code");
                r || (r = {}), "object" == typeof t && (r = t, t = void 0), null != t && (r.code = t);
                try {
                    return n(e, r)
                } catch (t) {
                    r.message = e.message, r.stack = e.stack;
                    const i = function () {};
                    return i.prototype = Object.create(Object.getPrototypeOf(e)), n(new i, r)
                }
            }
        }, {}],
        11: [function (e, t, r) {
            t.exports = function () {
                if ("undefined" == typeof window) return null;
                var e = {
                    RTCPeerConnection: window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection,
                    RTCSessionDescription: window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription,
                    RTCIceCandidate: window.RTCIceCandidate || window.mozRTCIceCandidate || window.webkitRTCIceCandidate
                };
                return e.RTCPeerConnection ? e : null
            }
        }, {}],
        12: [function (e, t, r) {
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
        13: [function (e, t, r) {
            var n = 1e3,
                i = 60 * n,
                o = 60 * i,
                s = 24 * o,
                a = 7 * s,
                u = 365.25 * s;

            function l(e, t, r, n) {
                var i = t >= 1.5 * r;
                return Math.round(e / r) + " " + n + (i ? "s" : "")
            }
            t.exports = function (e, t) {
                t = t || {};
                var r = typeof e;
                if ("string" === r && e.length > 0) return function (e) {
                    if ((e = String(e)).length > 100) return;
                    var t = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);
                    if (!t) return;
                    var r = parseFloat(t[1]);
                    switch ((t[2] || "ms").toLowerCase()) {
                        case "years":
                        case "year":
                        case "yrs":
                        case "yr":
                        case "y":
                            return r * u;
                        case "weeks":
                        case "week":
                        case "w":
                            return r * a;
                        case "days":
                        case "day":
                        case "d":
                            return r * s;
                        case "hours":
                        case "hour":
                        case "hrs":
                        case "hr":
                        case "h":
                            return r * o;
                        case "minutes":
                        case "minute":
                        case "mins":
                        case "min":
                        case "m":
                            return r * i;
                        case "seconds":
                        case "second":
                        case "secs":
                        case "sec":
                        case "s":
                            return r * n;
                        case "milliseconds":
                        case "millisecond":
                        case "msecs":
                        case "msec":
                        case "ms":
                            return r;
                        default:
                            return
                    }
                }(e);
                if ("number" === r && isFinite(e)) return t.long ? function (e) {
                    var t = Math.abs(e);
                    if (t >= s) return l(e, t, s, "day");
                    if (t >= o) return l(e, t, o, "hour");
                    if (t >= i) return l(e, t, i, "minute");
                    if (t >= n) return l(e, t, n, "second");
                    return e + " ms"
                }(e) : function (e) {
                    var t = Math.abs(e);
                    if (t >= s) return Math.round(e / s) + "d";
                    if (t >= o) return Math.round(e / o) + "h";
                    if (t >= i) return Math.round(e / i) + "m";
                    if (t >= n) return Math.round(e / n) + "s";
                    return e + "ms"
                }(e);
                throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e))
            }
        }, {}],
        14: [function (e, t, r) {
            let n;
            t.exports = "function" == typeof queueMicrotask ? queueMicrotask.bind(globalThis) : e => (n || (n = Promise.resolve())).then(e).catch(e => setTimeout(() => {
                throw e
            }, 0))
        }, {}],
        15: [function (e, t, r) {
            (function (r, n) {
                "use strict";
                var i = 65536,
                    o = 4294967295;
                var s = e("safe-buffer").Buffer,
                    a = n.crypto || n.msCrypto;
                a && a.getRandomValues ? t.exports = function (e, t) {
                    if (e > o) throw new RangeError("requested too many random bytes");
                    var n = s.allocUnsafe(e);
                    if (e > 0)
                        if (e > i)
                            for (var u = 0; u < e; u += i) a.getRandomValues(n.slice(u, u + i));
                        else a.getRandomValues(n);
                    if ("function" == typeof t) return r.nextTick(function () {
                        t(null, n)
                    });
                    return n
                } : t.exports = function () {
                    throw new Error("Secure random number generation is not supported by this browser.\nUse Chrome, Firefox or Internet Explorer 11")
                }
            }).call(this, e("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {
            _process: 6,
            "safe-buffer": 31
        }],
        16: [function (e, t, r) {
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
                var n, i, s, a;
                if ("string" == typeof t && (i = "not ", t.substr(!s || s < 0 ? 0 : +s, i.length) === i) ? (n = "must not be", t = t.replace(/^not /, "")) : n = "must be", function (e, t, r) {
                        return (void 0 === r || r > e.length) && (r = e.length), e.substring(r - t.length, r) === t
                    }(e, " argument")) a = "The ".concat(e, " ").concat(n, " ").concat(o(t, "type"));
                else {
                    var u = function (e, t, r) {
                        return "number" != typeof r && (r = 0), !(r + t.length > e.length) && -1 !== e.indexOf(t, r)
                    }(e, ".") ? "property" : "argument";
                    a = 'The "'.concat(e, '" ').concat(u, " ").concat(n, " ").concat(o(t, "type"))
                }
                return a += ". Received type ".concat(typeof r)
            }, TypeError), i("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF"), i("ERR_METHOD_NOT_IMPLEMENTED", function (e) {
                return "The " + e + " method is not implemented"
            }), i("ERR_STREAM_PREMATURE_CLOSE", "Premature close"), i("ERR_STREAM_DESTROYED", function (e) {
                return "Cannot call " + e + " after a stream was destroyed"
            }), i("ERR_MULTIPLE_CALLBACK", "Callback called multiple times"), i("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable"), i("ERR_STREAM_WRITE_AFTER_END", "write after end"), i("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError), i("ERR_UNKNOWN_ENCODING", function (e) {
                return "Unknown encoding: " + e
            }, TypeError), i("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event"), t.exports.codes = n
        }, {}],
        17: [function (e, t, r) {
            (function (r) {
                "use strict";
                var n = Object.keys || function (e) {
                    var t = [];
                    for (var r in e) t.push(r);
                    return t
                };
                t.exports = l;
                var i = e("./_stream_readable"),
                    o = e("./_stream_writable");
                e("inherits")(l, i);
                for (var s = n(o.prototype), a = 0; a < s.length; a++) {
                    var u = s[a];
                    l.prototype[u] || (l.prototype[u] = o.prototype[u])
                }

                function l(e) {
                    if (!(this instanceof l)) return new l(e);
                    i.call(this, e), o.call(this, e), this.allowHalfOpen = !0, e && (!1 === e.readable && (this.readable = !1), !1 === e.writable && (this.writable = !1), !1 === e.allowHalfOpen && (this.allowHalfOpen = !1, this.once("end", h)))
                }

                function h() {
                    this._writableState.ended || r.nextTick(c, this)
                }

                function c(e) {
                    e.end()
                }
                Object.defineProperty(l.prototype, "writableHighWaterMark", {
                    enumerable: !1,
                    get: function () {
                        return this._writableState.highWaterMark
                    }
                }), Object.defineProperty(l.prototype, "writableBuffer", {
                    enumerable: !1,
                    get: function () {
                        return this._writableState && this._writableState.getBuffer()
                    }
                }), Object.defineProperty(l.prototype, "writableLength", {
                    enumerable: !1,
                    get: function () {
                        return this._writableState.length
                    }
                }), Object.defineProperty(l.prototype, "destroyed", {
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
            "./_stream_readable": 19,
            "./_stream_writable": 21,
            _process: 6,
            inherits: 12
        }],
        18: [function (e, t, r) {
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
            "./_stream_transform": 20,
            inherits: 12
        }],
        19: [function (e, t, r) {
            (function (r, n) {
                "use strict";
                var i;
                t.exports = S, S.ReadableState = R;
                e("events").EventEmitter;
                var o = function (e, t) {
                        return e.listeners(t).length
                    },
                    s = e("./internal/streams/stream"),
                    a = e("buffer").Buffer,
                    u = n.Uint8Array || function () {};
                var l, h = e("util");
                l = h && h.debuglog ? h.debuglog("stream") : function () {};
                var c, f, d, p = e("./internal/streams/buffer_list"),
                    g = e("./internal/streams/destroy"),
                    y = e("./internal/streams/state").getHighWaterMark,
                    b = e("../errors").codes,
                    _ = b.ERR_INVALID_ARG_TYPE,
                    m = b.ERR_STREAM_PUSH_AFTER_EOF,
                    w = b.ERR_METHOD_NOT_IMPLEMENTED,
                    v = b.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;
                e("inherits")(S, s);
                var E = g.errorOrDestroy,
                    C = ["error", "close", "destroy", "pause", "resume"];

                function R(t, r, n) {
                    i = i || e("./_stream_duplex"), t = t || {}, "boolean" != typeof n && (n = r instanceof i), this.objectMode = !!t.objectMode, n && (this.objectMode = this.objectMode || !!t.readableObjectMode), this.highWaterMark = y(this, t, "readableHighWaterMark", n), this.buffer = new p, this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.paused = !0, this.emitClose = !1 !== t.emitClose, this.autoDestroy = !!t.autoDestroy, this.destroyed = !1, this.defaultEncoding = t.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, t.encoding && (c || (c = e("string_decoder/").StringDecoder), this.decoder = new c(t.encoding), this.encoding = t.encoding)
                }

                function S(t) {
                    if (i = i || e("./_stream_duplex"), !(this instanceof S)) return new S(t);
                    var r = this instanceof i;
                    this._readableState = new R(t, this, r), this.readable = !0, t && ("function" == typeof t.read && (this._read = t.read), "function" == typeof t.destroy && (this._destroy = t.destroy)), s.call(this)
                }

                function T(e, t, r, n, i) {
                    l("readableAddChunk", t);
                    var o, s = e._readableState;
                    if (null === t) s.reading = !1,
                        function (e, t) {
                            if (l("onEofChunk"), t.ended) return;
                            if (t.decoder) {
                                var r = t.decoder.end();
                                r && r.length && (t.buffer.push(r), t.length += t.objectMode ? 1 : r.length)
                            }
                            t.ended = !0, t.sync ? N(e) : (t.needReadable = !1, t.emittedReadable || (t.emittedReadable = !0, O(e)))
                        }(e, s);
                    else if (i || (o = function (e, t) {
                            var r;
                            n = t, a.isBuffer(n) || n instanceof u || "string" == typeof t || void 0 === t || e.objectMode || (r = new _("chunk", ["string", "Buffer", "Uint8Array"], t));
                            var n;
                            return r
                        }(s, t)), o) E(e, o);
                    else if (s.objectMode || t && t.length > 0)
                        if ("string" == typeof t || s.objectMode || Object.getPrototypeOf(t) === a.prototype || (t = function (e) {
                                return a.from(e)
                            }(t)), n) s.endEmitted ? E(e, new v) : A(e, s, t, !0);
                        else if (s.ended) E(e, new m);
                    else {
                        if (s.destroyed) return !1;
                        s.reading = !1, s.decoder && !r ? (t = s.decoder.write(t), s.objectMode || 0 !== t.length ? A(e, s, t, !1) : x(e, s)) : A(e, s, t, !1)
                    } else n || (s.reading = !1, x(e, s));
                    return !s.ended && (s.length < s.highWaterMark || 0 === s.length)
                }

                function A(e, t, r, n) {
                    t.flowing && 0 === t.length && !t.sync ? (t.awaitDrain = 0, e.emit("data", r)) : (t.length += t.objectMode ? 1 : r.length, n ? t.buffer.unshift(r) : t.buffer.push(r), t.needReadable && N(e)), x(e, t)
                }
                Object.defineProperty(S.prototype, "destroyed", {
                    enumerable: !1,
                    get: function () {
                        return void 0 !== this._readableState && this._readableState.destroyed
                    },
                    set: function (e) {
                        this._readableState && (this._readableState.destroyed = e)
                    }
                }), S.prototype.destroy = g.destroy, S.prototype._undestroy = g.undestroy, S.prototype._destroy = function (e, t) {
                    t(e)
                }, S.prototype.push = function (e, t) {
                    var r, n = this._readableState;
                    return n.objectMode ? r = !0 : "string" == typeof e && ((t = t || n.defaultEncoding) !== n.encoding && (e = a.from(e, t), t = ""), r = !0), T(this, e, t, !1, r)
                }, S.prototype.unshift = function (e) {
                    return T(this, e, null, !0, !1)
                }, S.prototype.isPaused = function () {
                    return !1 === this._readableState.flowing
                }, S.prototype.setEncoding = function (t) {
                    c || (c = e("string_decoder/").StringDecoder);
                    var r = new c(t);
                    this._readableState.decoder = r, this._readableState.encoding = this._readableState.decoder.encoding;
                    for (var n = this._readableState.buffer.head, i = ""; null !== n;) i += r.write(n.data), n = n.next;
                    return this._readableState.buffer.clear(), "" !== i && this._readableState.buffer.push(i), this._readableState.length = i.length, this
                };
                var k = 1073741824;

                function L(e, t) {
                    return e <= 0 || 0 === t.length && t.ended ? 0 : t.objectMode ? 1 : e != e ? t.flowing && t.length ? t.buffer.head.data.length : t.length : (e > t.highWaterMark && (t.highWaterMark = function (e) {
                        return e >= k ? e = k : (e--, e |= e >>> 1, e |= e >>> 2, e |= e >>> 4, e |= e >>> 8, e |= e >>> 16, e++), e
                    }(e)), e <= t.length ? e : t.ended ? t.length : (t.needReadable = !0, 0))
                }

                function N(e) {
                    var t = e._readableState;
                    l("emitReadable", t.needReadable, t.emittedReadable), t.needReadable = !1, t.emittedReadable || (l("emitReadable", t.flowing), t.emittedReadable = !0, r.nextTick(O, e))
                }

                function O(e) {
                    var t = e._readableState;
                    l("emitReadable_", t.destroyed, t.length, t.ended), t.destroyed || !t.length && !t.ended || (e.emit("readable"), t.emittedReadable = !1), t.needReadable = !t.flowing && !t.ended && t.length <= t.highWaterMark, F(e)
                }

                function x(e, t) {
                    t.readingMore || (t.readingMore = !0, r.nextTick(M, e, t))
                }

                function M(e, t) {
                    for (; !t.reading && !t.ended && (t.length < t.highWaterMark || t.flowing && 0 === t.length);) {
                        var r = t.length;
                        if (l("maybeReadMore read 0"), e.read(0), r === t.length) break
                    }
                    t.readingMore = !1
                }

                function I(e) {
                    var t = e._readableState;
                    t.readableListening = e.listenerCount("readable") > 0, t.resumeScheduled && !t.paused ? t.flowing = !0 : e.listenerCount("data") > 0 && e.resume()
                }

                function P(e) {
                    l("readable nexttick read 0"), e.read(0)
                }

                function D(e, t) {
                    l("resume", t.reading), t.reading || e.read(0), t.resumeScheduled = !1, e.emit("resume"), F(e), t.flowing && !t.reading && e.read(0)
                }

                function F(e) {
                    var t = e._readableState;
                    for (l("flow", t.flowing); t.flowing && null !== e.read(););
                }

                function j(e, t) {
                    return 0 === t.length ? null : (t.objectMode ? r = t.buffer.shift() : !e || e >= t.length ? (r = t.decoder ? t.buffer.join("") : 1 === t.buffer.length ? t.buffer.first() : t.buffer.concat(t.length), t.buffer.clear()) : r = t.buffer.consume(e, t.decoder), r);
                    var r
                }

                function B(e) {
                    var t = e._readableState;
                    l("endReadable", t.endEmitted), t.endEmitted || (t.ended = !0, r.nextTick(U, t, e))
                }

                function U(e, t) {
                    if (l("endReadableNT", e.endEmitted, e.length), !e.endEmitted && 0 === e.length && (e.endEmitted = !0, t.readable = !1, t.emit("end"), e.autoDestroy)) {
                        var r = t._writableState;
                        (!r || r.autoDestroy && r.finished) && t.destroy()
                    }
                }

                function q(e, t) {
                    for (var r = 0, n = e.length; r < n; r++)
                        if (e[r] === t) return r;
                    return -1
                }
                S.prototype.read = function (e) {
                    l("read", e), e = parseInt(e, 10);
                    var t = this._readableState,
                        r = e;
                    if (0 !== e && (t.emittedReadable = !1), 0 === e && t.needReadable && ((0 !== t.highWaterMark ? t.length >= t.highWaterMark : t.length > 0) || t.ended)) return l("read: emitReadable", t.length, t.ended), 0 === t.length && t.ended ? B(this) : N(this), null;
                    if (0 === (e = L(e, t)) && t.ended) return 0 === t.length && B(this), null;
                    var n, i = t.needReadable;
                    return l("need readable", i), (0 === t.length || t.length - e < t.highWaterMark) && l("length less than watermark", i = !0), t.ended || t.reading ? l("reading or ended", i = !1) : i && (l("do read"), t.reading = !0, t.sync = !0, 0 === t.length && (t.needReadable = !0), this._read(t.highWaterMark), t.sync = !1, t.reading || (e = L(r, t))), null === (n = e > 0 ? j(e, t) : null) ? (t.needReadable = t.length <= t.highWaterMark, e = 0) : (t.length -= e, t.awaitDrain = 0), 0 === t.length && (t.ended || (t.needReadable = !0), r !== e && t.ended && B(this)), null !== n && this.emit("data", n), n
                }, S.prototype._read = function (e) {
                    E(this, new w("_read()"))
                }, S.prototype.pipe = function (e, t) {
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
                    i.pipesCount += 1, l("pipe count=%d opts=%j", i.pipesCount, t);
                    var s = (!t || !1 !== t.end) && e !== r.stdout && e !== r.stderr ? u : y;

                    function a(t, r) {
                        l("onunpipe"), t === n && r && !1 === r.hasUnpiped && (r.hasUnpiped = !0, l("cleanup"), e.removeListener("close", p), e.removeListener("finish", g), e.removeListener("drain", h), e.removeListener("error", d), e.removeListener("unpipe", a), n.removeListener("end", u), n.removeListener("end", y), n.removeListener("data", f), c = !0, !i.awaitDrain || e._writableState && !e._writableState.needDrain || h())
                    }

                    function u() {
                        l("onend"), e.end()
                    }
                    i.endEmitted ? r.nextTick(s) : n.once("end", s), e.on("unpipe", a);
                    var h = function (e) {
                        return function () {
                            var t = e._readableState;
                            l("pipeOnDrain", t.awaitDrain), t.awaitDrain && t.awaitDrain--, 0 === t.awaitDrain && o(e, "data") && (t.flowing = !0, F(e))
                        }
                    }(n);
                    e.on("drain", h);
                    var c = !1;

                    function f(t) {
                        l("ondata");
                        var r = e.write(t);
                        l("dest.write", r), !1 === r && ((1 === i.pipesCount && i.pipes === e || i.pipesCount > 1 && -1 !== q(i.pipes, e)) && !c && (l("false write response, pause", i.awaitDrain), i.awaitDrain++), n.pause())
                    }

                    function d(t) {
                        l("onerror", t), y(), e.removeListener("error", d), 0 === o(e, "error") && E(e, t)
                    }

                    function p() {
                        e.removeListener("finish", g), y()
                    }

                    function g() {
                        l("onfinish"), e.removeListener("close", p), y()
                    }

                    function y() {
                        l("unpipe"), n.unpipe(e)
                    }
                    return n.on("data", f),
                        function (e, t, r) {
                            if ("function" == typeof e.prependListener) return e.prependListener(t, r);
                            e._events && e._events[t] ? Array.isArray(e._events[t]) ? e._events[t].unshift(r) : e._events[t] = [r, e._events[t]] : e.on(t, r)
                        }(e, "error", d), e.once("close", p), e.once("finish", g), e.emit("pipe", n), i.flowing || (l("pipe resume"), n.resume()), e
                }, S.prototype.unpipe = function (e) {
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
                    var s = q(t.pipes, e);
                    return -1 === s ? this : (t.pipes.splice(s, 1), t.pipesCount -= 1, 1 === t.pipesCount && (t.pipes = t.pipes[0]), e.emit("unpipe", this, r), this)
                }, S.prototype.on = function (e, t) {
                    var n = s.prototype.on.call(this, e, t),
                        i = this._readableState;
                    return "data" === e ? (i.readableListening = this.listenerCount("readable") > 0, !1 !== i.flowing && this.resume()) : "readable" === e && (i.endEmitted || i.readableListening || (i.readableListening = i.needReadable = !0, i.flowing = !1, i.emittedReadable = !1, l("on readable", i.length, i.reading), i.length ? N(this) : i.reading || r.nextTick(P, this))), n
                }, S.prototype.addListener = S.prototype.on, S.prototype.removeListener = function (e, t) {
                    var n = s.prototype.removeListener.call(this, e, t);
                    return "readable" === e && r.nextTick(I, this), n
                }, S.prototype.removeAllListeners = function (e) {
                    var t = s.prototype.removeAllListeners.apply(this, arguments);
                    return "readable" !== e && void 0 !== e || r.nextTick(I, this), t
                }, S.prototype.resume = function () {
                    var e = this._readableState;
                    return e.flowing || (l("resume"), e.flowing = !e.readableListening, function (e, t) {
                        t.resumeScheduled || (t.resumeScheduled = !0, r.nextTick(D, e, t))
                    }(this, e)), e.paused = !1, this
                }, S.prototype.pause = function () {
                    return l("call pause flowing=%j", this._readableState.flowing), !1 !== this._readableState.flowing && (l("pause"), this._readableState.flowing = !1, this.emit("pause")), this._readableState.paused = !0, this
                }, S.prototype.wrap = function (e) {
                    var t = this,
                        r = this._readableState,
                        n = !1;
                    for (var i in e.on("end", function () {
                            if (l("wrapped end"), r.decoder && !r.ended) {
                                var e = r.decoder.end();
                                e && e.length && t.push(e)
                            }
                            t.push(null)
                        }), e.on("data", function (i) {
                            (l("wrapped data"), r.decoder && (i = r.decoder.write(i)), r.objectMode && null == i) || (r.objectMode || i && i.length) && (t.push(i) || (n = !0, e.pause()))
                        }), e) void 0 === this[i] && "function" == typeof e[i] && (this[i] = function (t) {
                        return function () {
                            return e[t].apply(e, arguments)
                        }
                    }(i));
                    for (var o = 0; o < C.length; o++) e.on(C[o], this.emit.bind(this, C[o]));
                    return this._read = function (t) {
                        l("wrapped _read", t), n && (n = !1, e.resume())
                    }, this
                }, "function" == typeof Symbol && (S.prototype[Symbol.asyncIterator] = function () {
                    return void 0 === f && (f = e("./internal/streams/async_iterator")), f(this)
                }), Object.defineProperty(S.prototype, "readableHighWaterMark", {
                    enumerable: !1,
                    get: function () {
                        return this._readableState.highWaterMark
                    }
                }), Object.defineProperty(S.prototype, "readableBuffer", {
                    enumerable: !1,
                    get: function () {
                        return this._readableState && this._readableState.buffer
                    }
                }), Object.defineProperty(S.prototype, "readableFlowing", {
                    enumerable: !1,
                    get: function () {
                        return this._readableState.flowing
                    },
                    set: function (e) {
                        this._readableState && (this._readableState.flowing = e)
                    }
                }), S._fromList = j, Object.defineProperty(S.prototype, "readableLength", {
                    enumerable: !1,
                    get: function () {
                        return this._readableState.length
                    }
                }), "function" == typeof Symbol && (S.from = function (t, r) {
                    return void 0 === d && (d = e("./internal/streams/from")), d(S, t, r)
                })
            }).call(this, e("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {
            "../errors": 16,
            "./_stream_duplex": 17,
            "./internal/streams/async_iterator": 22,
            "./internal/streams/buffer_list": 23,
            "./internal/streams/destroy": 24,
            "./internal/streams/from": 26,
            "./internal/streams/state": 28,
            "./internal/streams/stream": 29,
            _process: 6,
            buffer: 3,
            events: 4,
            inherits: 12,
            "string_decoder/": 32,
            util: 2
        }],
        20: [function (e, t, r) {
            "use strict";
            t.exports = h;
            var n = e("../errors").codes,
                i = n.ERR_METHOD_NOT_IMPLEMENTED,
                o = n.ERR_MULTIPLE_CALLBACK,
                s = n.ERR_TRANSFORM_ALREADY_TRANSFORMING,
                a = n.ERR_TRANSFORM_WITH_LENGTH_0,
                u = e("./_stream_duplex");

            function l(e, t) {
                var r = this._transformState;
                r.transforming = !1;
                var n = r.writecb;
                if (null === n) return this.emit("error", new o);
                r.writechunk = null, r.writecb = null, null != t && this.push(t), n(e);
                var i = this._readableState;
                i.reading = !1, (i.needReadable || i.length < i.highWaterMark) && this._read(i.highWaterMark)
            }

            function h(e) {
                if (!(this instanceof h)) return new h(e);
                u.call(this, e), this._transformState = {
                    afterTransform: l.bind(this),
                    needTransform: !1,
                    transforming: !1,
                    writecb: null,
                    writechunk: null,
                    writeencoding: null
                }, this._readableState.needReadable = !0, this._readableState.sync = !1, e && ("function" == typeof e.transform && (this._transform = e.transform), "function" == typeof e.flush && (this._flush = e.flush)), this.on("prefinish", c)
            }

            function c() {
                var e = this;
                "function" != typeof this._flush || this._readableState.destroyed ? f(this, null, null) : this._flush(function (t, r) {
                    f(e, t, r)
                })
            }

            function f(e, t, r) {
                if (t) return e.emit("error", t);
                if (null != r && e.push(r), e._writableState.length) throw new a;
                if (e._transformState.transforming) throw new s;
                return e.push(null)
            }
            e("inherits")(h, u), h.prototype.push = function (e, t) {
                return this._transformState.needTransform = !1, u.prototype.push.call(this, e, t)
            }, h.prototype._transform = function (e, t, r) {
                r(new i("_transform()"))
            }, h.prototype._write = function (e, t, r) {
                var n = this._transformState;
                if (n.writecb = r, n.writechunk = e, n.writeencoding = t, !n.transforming) {
                    var i = this._readableState;
                    (n.needTransform || i.needReadable || i.length < i.highWaterMark) && this._read(i.highWaterMark)
                }
            }, h.prototype._read = function (e) {
                var t = this._transformState;
                null === t.writechunk || t.transforming ? t.needTransform = !0 : (t.transforming = !0, this._transform(t.writechunk, t.writeencoding, t.afterTransform))
            }, h.prototype._destroy = function (e, t) {
                u.prototype._destroy.call(this, e, function (e) {
                    t(e)
                })
            }
        }, {
            "../errors": 16,
            "./_stream_duplex": 17,
            inherits: 12
        }],
        21: [function (e, t, r) {
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
                t.exports = S, S.WritableState = R;
                var s = {
                        deprecate: e("util-deprecate")
                    },
                    a = e("./internal/streams/stream"),
                    u = e("buffer").Buffer,
                    l = n.Uint8Array || function () {};
                var h, c = e("./internal/streams/destroy"),
                    f = e("./internal/streams/state").getHighWaterMark,
                    d = e("../errors").codes,
                    p = d.ERR_INVALID_ARG_TYPE,
                    g = d.ERR_METHOD_NOT_IMPLEMENTED,
                    y = d.ERR_MULTIPLE_CALLBACK,
                    b = d.ERR_STREAM_CANNOT_PIPE,
                    _ = d.ERR_STREAM_DESTROYED,
                    m = d.ERR_STREAM_NULL_VALUES,
                    w = d.ERR_STREAM_WRITE_AFTER_END,
                    v = d.ERR_UNKNOWN_ENCODING,
                    E = c.errorOrDestroy;

                function C() {}

                function R(t, n, s) {
                    o = o || e("./_stream_duplex"), t = t || {}, "boolean" != typeof s && (s = n instanceof o), this.objectMode = !!t.objectMode, s && (this.objectMode = this.objectMode || !!t.writableObjectMode), this.highWaterMark = f(this, t, "writableHighWaterMark", s), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
                    var a = !1 === t.decodeStrings;
                    this.decodeStrings = !a, this.defaultEncoding = t.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function (e) {
                        ! function (e, t) {
                            var n = e._writableState,
                                i = n.sync,
                                o = n.writecb;
                            if ("function" != typeof o) throw new y;
                            if (function (e) {
                                    e.writing = !1, e.writecb = null, e.length -= e.writelen, e.writelen = 0
                                }(n), t) ! function (e, t, n, i, o) {
                                --t.pendingcb, n ? (r.nextTick(o, i), r.nextTick(O, e, t), e._writableState.errorEmitted = !0, E(e, i)) : (o(i), e._writableState.errorEmitted = !0, E(e, i), O(e, t))
                            }(e, n, i, t, o);
                            else {
                                var s = L(n) || e.destroyed;
                                s || n.corked || n.bufferProcessing || !n.bufferedRequest || k(e, n), i ? r.nextTick(A, e, n, s, o) : A(e, n, s, o)
                            }
                        }(n, e)
                    }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.emitClose = !1 !== t.emitClose, this.autoDestroy = !!t.autoDestroy, this.bufferedRequestCount = 0, this.corkedRequestsFree = new i(this)
                }

                function S(t) {
                    var r = this instanceof(o = o || e("./_stream_duplex"));
                    if (!r && !h.call(S, this)) return new S(t);
                    this._writableState = new R(t, this, r), this.writable = !0, t && ("function" == typeof t.write && (this._write = t.write), "function" == typeof t.writev && (this._writev = t.writev), "function" == typeof t.destroy && (this._destroy = t.destroy), "function" == typeof t.final && (this._final = t.final)), a.call(this)
                }

                function T(e, t, r, n, i, o, s) {
                    t.writelen = n, t.writecb = s, t.writing = !0, t.sync = !0, t.destroyed ? t.onwrite(new _("write")) : r ? e._writev(i, t.onwrite) : e._write(i, o, t.onwrite), t.sync = !1
                }

                function A(e, t, r, n) {
                    r || function (e, t) {
                        0 === t.length && t.needDrain && (t.needDrain = !1, e.emit("drain"))
                    }(e, t), t.pendingcb--, n(), O(e, t)
                }

                function k(e, t) {
                    t.bufferProcessing = !0;
                    var r = t.bufferedRequest;
                    if (e._writev && r && r.next) {
                        var n = t.bufferedRequestCount,
                            o = new Array(n),
                            s = t.corkedRequestsFree;
                        s.entry = r;
                        for (var a = 0, u = !0; r;) o[a] = r, r.isBuf || (u = !1), r = r.next, a += 1;
                        o.allBuffers = u, T(e, t, !0, t.length, o, "", s.finish), t.pendingcb++, t.lastBufferedRequest = null, s.next ? (t.corkedRequestsFree = s.next, s.next = null) : t.corkedRequestsFree = new i(t), t.bufferedRequestCount = 0
                    } else {
                        for (; r;) {
                            var l = r.chunk,
                                h = r.encoding,
                                c = r.callback;
                            if (T(e, t, !1, t.objectMode ? 1 : l.length, l, h, c), r = r.next, t.bufferedRequestCount--, t.writing) break
                        }
                        null === r && (t.lastBufferedRequest = null)
                    }
                    t.bufferedRequest = r, t.bufferProcessing = !1
                }

                function L(e) {
                    return e.ending && 0 === e.length && null === e.bufferedRequest && !e.finished && !e.writing
                }

                function N(e, t) {
                    e._final(function (r) {
                        t.pendingcb--, r && E(e, r), t.prefinished = !0, e.emit("prefinish"), O(e, t)
                    })
                }

                function O(e, t) {
                    var n = L(t);
                    if (n && (function (e, t) {
                            t.prefinished || t.finalCalled || ("function" != typeof e._final || t.destroyed ? (t.prefinished = !0, e.emit("prefinish")) : (t.pendingcb++, t.finalCalled = !0, r.nextTick(N, e, t)))
                        }(e, t), 0 === t.pendingcb && (t.finished = !0, e.emit("finish"), t.autoDestroy))) {
                        var i = e._readableState;
                        (!i || i.autoDestroy && i.endEmitted) && e.destroy()
                    }
                    return n
                }
                e("inherits")(S, a), R.prototype.getBuffer = function () {
                        for (var e = this.bufferedRequest, t = []; e;) t.push(e), e = e.next;
                        return t
                    },
                    function () {
                        try {
                            Object.defineProperty(R.prototype, "buffer", {
                                get: s.deprecate(function () {
                                    return this.getBuffer()
                                }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
                            })
                        } catch (e) {}
                    }(), "function" == typeof Symbol && Symbol.hasInstance && "function" == typeof Function.prototype[Symbol.hasInstance] ? (h = Function.prototype[Symbol.hasInstance], Object.defineProperty(S, Symbol.hasInstance, {
                        value: function (e) {
                            return !!h.call(this, e) || this === S && (e && e._writableState instanceof R)
                        }
                    })) : h = function (e) {
                        return e instanceof this
                    }, S.prototype.pipe = function () {
                        E(this, new b)
                    }, S.prototype.write = function (e, t, n) {
                        var i, o = this._writableState,
                            s = !1,
                            a = !o.objectMode && (i = e, u.isBuffer(i) || i instanceof l);
                        return a && !u.isBuffer(e) && (e = function (e) {
                            return u.from(e)
                        }(e)), "function" == typeof t && (n = t, t = null), a ? t = "buffer" : t || (t = o.defaultEncoding), "function" != typeof n && (n = C), o.ending ? function (e, t) {
                            var n = new w;
                            E(e, n), r.nextTick(t, n)
                        }(this, n) : (a || function (e, t, n, i) {
                            var o;
                            return null === n ? o = new m : "string" == typeof n || t.objectMode || (o = new p("chunk", ["string", "Buffer"], n)), !o || (E(e, o), r.nextTick(i, o), !1)
                        }(this, o, e, n)) && (o.pendingcb++, s = function (e, t, r, n, i, o) {
                            if (!r) {
                                var s = function (e, t, r) {
                                    e.objectMode || !1 === e.decodeStrings || "string" != typeof t || (t = u.from(t, r));
                                    return t
                                }(t, n, i);
                                n !== s && (r = !0, i = "buffer", n = s)
                            }
                            var a = t.objectMode ? 1 : n.length;
                            t.length += a;
                            var l = t.length < t.highWaterMark;
                            l || (t.needDrain = !0);
                            if (t.writing || t.corked) {
                                var h = t.lastBufferedRequest;
                                t.lastBufferedRequest = {
                                    chunk: n,
                                    encoding: i,
                                    isBuf: r,
                                    callback: o,
                                    next: null
                                }, h ? h.next = t.lastBufferedRequest : t.bufferedRequest = t.lastBufferedRequest, t.bufferedRequestCount += 1
                            } else T(e, t, !1, a, n, i, o);
                            return l
                        }(this, o, a, e, t, n)), s
                    }, S.prototype.cork = function () {
                        this._writableState.corked++
                    }, S.prototype.uncork = function () {
                        var e = this._writableState;
                        e.corked && (e.corked--, e.writing || e.corked || e.bufferProcessing || !e.bufferedRequest || k(this, e))
                    }, S.prototype.setDefaultEncoding = function (e) {
                        if ("string" == typeof e && (e = e.toLowerCase()), !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((e + "").toLowerCase()) > -1)) throw new v(e);
                        return this._writableState.defaultEncoding = e, this
                    }, Object.defineProperty(S.prototype, "writableBuffer", {
                        enumerable: !1,
                        get: function () {
                            return this._writableState && this._writableState.getBuffer()
                        }
                    }), Object.defineProperty(S.prototype, "writableHighWaterMark", {
                        enumerable: !1,
                        get: function () {
                            return this._writableState.highWaterMark
                        }
                    }), S.prototype._write = function (e, t, r) {
                        r(new g("_write()"))
                    }, S.prototype._writev = null, S.prototype.end = function (e, t, n) {
                        var i = this._writableState;
                        return "function" == typeof e ? (n = e, e = null, t = null) : "function" == typeof t && (n = t, t = null), null != e && this.write(e, t), i.corked && (i.corked = 1, this.uncork()), i.ending || function (e, t, n) {
                            t.ending = !0, O(e, t), n && (t.finished ? r.nextTick(n) : e.once("finish", n));
                            t.ended = !0, e.writable = !1
                        }(this, i, n), this
                    }, Object.defineProperty(S.prototype, "writableLength", {
                        enumerable: !1,
                        get: function () {
                            return this._writableState.length
                        }
                    }), Object.defineProperty(S.prototype, "destroyed", {
                        enumerable: !1,
                        get: function () {
                            return void 0 !== this._writableState && this._writableState.destroyed
                        },
                        set: function (e) {
                            this._writableState && (this._writableState.destroyed = e)
                        }
                    }), S.prototype.destroy = c.destroy, S.prototype._undestroy = c.undestroy, S.prototype._destroy = function (e, t) {
                        t(e)
                    }
            }).call(this, e("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {
            "../errors": 16,
            "./_stream_duplex": 17,
            "./internal/streams/destroy": 24,
            "./internal/streams/state": 28,
            "./internal/streams/stream": 29,
            _process: 6,
            buffer: 3,
            inherits: 12,
            "util-deprecate": 33
        }],
        22: [function (e, t, r) {
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
                    s = Symbol("lastResolve"),
                    a = Symbol("lastReject"),
                    u = Symbol("error"),
                    l = Symbol("ended"),
                    h = Symbol("lastPromise"),
                    c = Symbol("handlePromise"),
                    f = Symbol("stream");

                function d(e, t) {
                    return {
                        value: e,
                        done: t
                    }
                }

                function p(e) {
                    var t = e[s];
                    if (null !== t) {
                        var r = e[f].read();
                        null !== r && (e[h] = null, e[s] = null, e[a] = null, t(d(r, !1)))
                    }
                }
                var g = Object.getPrototypeOf(function () {}),
                    y = Object.setPrototypeOf((i(n = {
                        get stream() {
                            return this[f]
                        },
                        next: function () {
                            var e = this,
                                t = this[u];
                            if (null !== t) return Promise.reject(t);
                            if (this[l]) return Promise.resolve(d(void 0, !0));
                            if (this[f].destroyed) return new Promise(function (t, n) {
                                r.nextTick(function () {
                                    e[u] ? n(e[u]) : t(d(void 0, !0))
                                })
                            });
                            var n, i = this[h];
                            if (i) n = new Promise(function (e, t) {
                                return function (r, n) {
                                    e.then(function () {
                                        t[l] ? r(d(void 0, !0)) : t[c](r, n)
                                    }, n)
                                }
                            }(i, this));
                            else {
                                var o = this[f].read();
                                if (null !== o) return Promise.resolve(d(o, !1));
                                n = new Promise(this[c])
                            }
                            return this[h] = n, n
                        }
                    }, Symbol.asyncIterator, function () {
                        return this
                    }), i(n, "return", function () {
                        var e = this;
                        return new Promise(function (t, r) {
                            e[f].destroy(null, function (e) {
                                e ? r(e) : t(d(void 0, !0))
                            })
                        })
                    }), n), g);
                t.exports = function (e) {
                    var t, n = Object.create(y, (i(t = {}, f, {
                        value: e,
                        writable: !0
                    }), i(t, s, {
                        value: null,
                        writable: !0
                    }), i(t, a, {
                        value: null,
                        writable: !0
                    }), i(t, u, {
                        value: null,
                        writable: !0
                    }), i(t, l, {
                        value: e._readableState.endEmitted,
                        writable: !0
                    }), i(t, c, {
                        value: function (e, t) {
                            var r = n[f].read();
                            r ? (n[h] = null, n[s] = null, n[a] = null, e(d(r, !1))) : (n[s] = e, n[a] = t)
                        },
                        writable: !0
                    }), t));
                    return n[h] = null, o(e, function (e) {
                        if (e && "ERR_STREAM_PREMATURE_CLOSE" !== e.code) {
                            var t = n[a];
                            return null !== t && (n[h] = null, n[s] = null, n[a] = null, t(e)), void(n[u] = e)
                        }
                        var r = n[s];
                        null !== r && (n[h] = null, n[s] = null, n[a] = null, r(d(void 0, !0))), n[l] = !0
                    }), e.on("readable", function (e) {
                        r.nextTick(p, e)
                    }.bind(null, n)), n
                }
            }).call(this, e("_process"))
        }, {
            "./end-of-stream": 25,
            _process: 6
        }],
        23: [function (e, t, r) {
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
            var s = e("buffer").Buffer,
                a = e("util").inspect,
                u = a && a.custom || "inspect";
            t.exports = function () {
                function e() {
                    ! function (e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), this.head = null, this.tail = null, this.length = 0
                }
                var t, r, l;
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
                        if (0 === this.length) return s.alloc(0);
                        for (var t, r, n, i = s.allocUnsafe(e >>> 0), o = this.head, a = 0; o;) t = o.data, r = i, n = a, s.prototype.copy.call(t, r, n), a += o.data.length, o = o.next;
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
                        var t = s.allocUnsafe(e),
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
                        return a(this, function (e) {
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
                }]) && o(t.prototype, r), l && o(t, l), e
            }()
        }, {
            buffer: 3,
            util: 2
        }],
        24: [function (e, t, r) {
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
                        var s = this,
                            a = this._readableState && this._readableState.destroyed,
                            u = this._writableState && this._writableState.destroyed;
                        return a || u ? (o ? o(t) : t && (this._writableState ? this._writableState.errorEmitted || (this._writableState.errorEmitted = !0, e.nextTick(i, this, t)) : e.nextTick(i, this, t)), this) : (this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), this._destroy(t || null, function (t) {
                            !o && t ? s._writableState ? s._writableState.errorEmitted ? e.nextTick(n, s) : (s._writableState.errorEmitted = !0, e.nextTick(r, s, t)) : e.nextTick(r, s, t) : o ? (e.nextTick(n, s), o(t)) : e.nextTick(n, s)
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
            _process: 6
        }],
        25: [function (e, t, r) {
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
                var s = r.readable || !1 !== r.readable && t.readable,
                    a = r.writable || !1 !== r.writable && t.writable,
                    u = function () {
                        t.writable || h()
                    },
                    l = t._writableState && t._writableState.finished,
                    h = function () {
                        a = !1, l = !0, s || o.call(t)
                    },
                    c = t._readableState && t._readableState.endEmitted,
                    f = function () {
                        s = !1, c = !0, a || o.call(t)
                    },
                    d = function (e) {
                        o.call(t, e)
                    },
                    p = function () {
                        var e;
                        return s && !c ? (t._readableState && t._readableState.ended || (e = new n), o.call(t, e)) : a && !l ? (t._writableState && t._writableState.ended || (e = new n), o.call(t, e)) : void 0
                    },
                    g = function () {
                        t.req.on("finish", h)
                    };
                return function (e) {
                        return e.setHeader && "function" == typeof e.abort
                    }(t) ? (t.on("complete", h), t.on("abort", p), t.req ? g() : t.on("request", g)) : a && !t._writableState && (t.on("end", u), t.on("close", u)), t.on("end", f), t.on("finish", h), !1 !== r.error && t.on("error", d), t.on("close", p),
                    function () {
                        t.removeListener("complete", h), t.removeListener("abort", p), t.removeListener("request", g), t.req && t.req.removeListener("finish", h), t.removeListener("end", u), t.removeListener("close", u), t.removeListener("finish", h), t.removeListener("end", f), t.removeListener("error", d), t.removeListener("close", p)
                    }
            }
        }, {
            "../../../errors": 16
        }],
        26: [function (e, t, r) {
            t.exports = function () {
                throw new Error("Readable.from is not available in the browser")
            }
        }, {}],
        27: [function (e, t, r) {
            "use strict";
            var n;
            var i = e("../../../errors").codes,
                o = i.ERR_MISSING_ARGS,
                s = i.ERR_STREAM_DESTROYED;

            function a(e) {
                if (e) throw e
            }

            function u(e) {
                e()
            }

            function l(e, t) {
                return e.pipe(t)
            }
            t.exports = function () {
                for (var t = arguments.length, r = new Array(t), i = 0; i < t; i++) r[i] = arguments[i];
                var h, c = function (e) {
                    return e.length ? "function" != typeof e[e.length - 1] ? a : e.pop() : a
                }(r);
                if (Array.isArray(r[0]) && (r = r[0]), r.length < 2) throw new o("streams");
                var f = r.map(function (t, i) {
                    var o = i < r.length - 1;
                    return function (t, r, i, o) {
                        o = function (e) {
                            var t = !1;
                            return function () {
                                t || (t = !0, e.apply(void 0, arguments))
                            }
                        }(o);
                        var a = !1;
                        t.on("close", function () {
                            a = !0
                        }), void 0 === n && (n = e("./end-of-stream")), n(t, {
                            readable: r,
                            writable: i
                        }, function (e) {
                            if (e) return o(e);
                            a = !0, o()
                        });
                        var u = !1;
                        return function (e) {
                            if (!a && !u) return u = !0,
                                function (e) {
                                    return e.setHeader && "function" == typeof e.abort
                                }(t) ? t.abort() : "function" == typeof t.destroy ? t.destroy() : void o(e || new s("pipe"))
                        }
                    }(t, o, i > 0, function (e) {
                        h || (h = e), e && f.forEach(u), o || (f.forEach(u), c(h))
                    })
                });
                return r.reduce(l)
            }
        }, {
            "../../../errors": 16,
            "./end-of-stream": 25
        }],
        28: [function (e, t, r) {
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
            "../../../errors": 16
        }],
        29: [function (e, t, r) {
            t.exports = e("events").EventEmitter
        }, {
            events: 4
        }],
        30: [function (e, t, r) {
            (r = t.exports = e("./lib/_stream_readable.js")).Stream = r, r.Readable = r, r.Writable = e("./lib/_stream_writable.js"), r.Duplex = e("./lib/_stream_duplex.js"), r.Transform = e("./lib/_stream_transform.js"), r.PassThrough = e("./lib/_stream_passthrough.js"), r.finished = e("./lib/internal/streams/end-of-stream.js"), r.pipeline = e("./lib/internal/streams/pipeline.js")
        }, {
            "./lib/_stream_duplex.js": 17,
            "./lib/_stream_passthrough.js": 18,
            "./lib/_stream_readable.js": 19,
            "./lib/_stream_transform.js": 20,
            "./lib/_stream_writable.js": 21,
            "./lib/internal/streams/end-of-stream.js": 25,
            "./lib/internal/streams/pipeline.js": 27
        }],
        31: [function (e, t, r) {
            var n = e("buffer"),
                i = n.Buffer;

            function o(e, t) {
                for (var r in e) t[r] = e[r]
            }

            function s(e, t, r) {
                return i(e, t, r)
            }
            i.from && i.alloc && i.allocUnsafe && i.allocUnsafeSlow ? t.exports = n : (o(n, r), r.Buffer = s), s.prototype = Object.create(i.prototype), o(i, s), s.from = function (e, t, r) {
                if ("number" == typeof e) throw new TypeError("Argument must not be a number");
                return i(e, t, r)
            }, s.alloc = function (e, t, r) {
                if ("number" != typeof e) throw new TypeError("Argument must be a number");
                var n = i(e);
                return void 0 !== t ? "string" == typeof r ? n.fill(t, r) : n.fill(t) : n.fill(0), n
            }, s.allocUnsafe = function (e) {
                if ("number" != typeof e) throw new TypeError("Argument must be a number");
                return i(e)
            }, s.allocUnsafeSlow = function (e) {
                if ("number" != typeof e) throw new TypeError("Argument must be a number");
                return n.SlowBuffer(e)
            }
        }, {
            buffer: 3
        }],
        32: [function (e, t, r) {
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
                        this.text = u, this.end = l, t = 4;
                        break;
                    case "utf8":
                        this.fillLast = a, t = 4;
                        break;
                    case "base64":
                        this.text = h, this.end = c, t = 3;
                        break;
                    default:
                        return this.write = f, void(this.end = d)
                }
                this.lastNeed = 0, this.lastTotal = 0, this.lastChar = n.allocUnsafe(t)
            }

            function s(e) {
                return e <= 127 ? 0 : e >> 5 == 6 ? 2 : e >> 4 == 14 ? 3 : e >> 3 == 30 ? 4 : e >> 6 == 2 ? -1 : -2
            }

            function a(e) {
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

            function l(e) {
                var t = e && e.length ? this.write(e) : "";
                if (this.lastNeed) {
                    var r = this.lastTotal - this.lastNeed;
                    return t + this.lastChar.toString("utf16le", 0, r)
                }
                return t
            }

            function h(e, t) {
                var r = (e.length - t) % 3;
                return 0 === r ? e.toString("base64", t) : (this.lastNeed = 3 - r, this.lastTotal = 3, 1 === r ? this.lastChar[0] = e[e.length - 1] : (this.lastChar[0] = e[e.length - 2], this.lastChar[1] = e[e.length - 1]), e.toString("base64", t, e.length - r))
            }

            function c(e) {
                var t = e && e.length ? this.write(e) : "";
                return this.lastNeed ? t + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : t
            }

            function f(e) {
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
                    var i = s(t[n]);
                    if (i >= 0) return i > 0 && (e.lastNeed = i - 1), i;
                    if (--n < r || -2 === i) return 0;
                    if ((i = s(t[n])) >= 0) return i > 0 && (e.lastNeed = i - 2), i;
                    if (--n < r || -2 === i) return 0;
                    if ((i = s(t[n])) >= 0) return i > 0 && (2 === i ? i = 0 : e.lastNeed = i - 3), i;
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
            "safe-buffer": 31
        }],
        33: [function (e, t, r) {
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
        }, {}]
    }, {}, [7])(7)
});